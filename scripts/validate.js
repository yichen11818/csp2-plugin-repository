#!/usr/bin/env node

/**
 * CSP2 Plugin Repository - Validator
 * 
 * Validates all plugin configuration files against the JSON schema
 * and checks for common issues.
 */

const fs = require('fs').promises;
const path = require('path');
const Ajv = require('ajv');
const chalk = require('chalk');

// Configuration
const PLUGINS_DIR = path.join(__dirname, '../plugins');
const PLUGIN_SCHEMA_PATH = path.join(__dirname, '../schemas/plugin.schema.json');
const MANIFEST_SCHEMA_PATH = path.join(__dirname, '../schemas/manifest.schema.json');
const MANIFEST_PATH = path.join(__dirname, '../manifest.json');

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

let totalErrors = 0;
let totalWarnings = 0;

/**
 * Validate a single plugin configuration
 */
async function validatePluginConfig(filePath) {
  const fileName = path.basename(filePath);
  const pluginId = fileName.replace('.json', '');

  console.log(`\n${chalk.blue('📦')} Validating ${chalk.bold(fileName)}...`);

  try {
    // Read and parse JSON
    const content = await fs.readFile(filePath, 'utf-8');
    let config;
    try {
      config = JSON.parse(content);
    } catch (error) {
      console.error(`${chalk.red('✗')} Invalid JSON: ${error.message}`);
      totalErrors++;
      return false;
    }

    // Load schema
    const schemaContent = await fs.readFile(PLUGIN_SCHEMA_PATH, 'utf-8');
    const schema = JSON.parse(schemaContent);

    // Validate against schema
    const validate = ajv.compile(schema);
    const valid = validate(config);

    if (!valid) {
      console.error(`${chalk.red('✗')} Schema validation failed:`);
      validate.errors.forEach(error => {
        console.error(`  ${chalk.red('•')} ${error.instancePath} ${error.message}`);
      });
      totalErrors++;
      return false;
    }

    // Additional checks
    let hasWarnings = false;

    // Check if ID matches filename
    if (config.id !== pluginId) {
      console.warn(`${chalk.yellow('⚠')} ID mismatch: config.id="${config.id}" but filename="${pluginId}.json"`);
      totalWarnings++;
      hasWarnings = true;
    }

    // Check if repository exists (basic check)
    if (!config.repository || !config.repository.owner || !config.repository.repo) {
      console.error(`${chalk.red('✗')} Missing or invalid repository information`);
      totalErrors++;
      return false;
    }

    // Check if metadata is present
    if (!config.metadata) {
      console.warn(`${chalk.yellow('⚠')} Missing metadata - plugin will have limited information`);
      totalWarnings++;
      hasWarnings = true;
    }

    // Check for Chinese description
    if (!config.metadata?.descriptionZh) {
      console.warn(`${chalk.yellow('⚠')} Missing Chinese description (descriptionZh)`);
      totalWarnings++;
      hasWarnings = true;
    }

    if (!hasWarnings && totalErrors === 0) {
      console.log(`${chalk.green('✓')} Valid`);
    }

    return true;

  } catch (error) {
    console.error(`${chalk.red('✗')} Error: ${error.message}`);
    totalErrors++;
    return false;
  }
}

/**
 * Validate all plugin configurations
 */
async function validateAllPlugins() {
  console.log(chalk.bold('\n🔍 Validating Plugin Configurations\n'));

  try {
    const files = await fs.readdir(PLUGINS_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    if (jsonFiles.length === 0) {
      console.warn(chalk.yellow('⚠️  No plugin configuration files found'));
      return false;
    }

    let validCount = 0;
    for (const file of jsonFiles) {
      const filePath = path.join(PLUGINS_DIR, file);
      const valid = await validatePluginConfig(filePath);
      if (valid) validCount++;
    }

    console.log(chalk.bold('\n📊 Summary:'));
    console.log(`   Total files: ${jsonFiles.length}`);
    console.log(`   ${chalk.green('Valid')}: ${validCount}`);
    console.log(`   ${chalk.red('Errors')}: ${totalErrors}`);
    console.log(`   ${chalk.yellow('Warnings')}: ${totalWarnings}`);

    return totalErrors === 0;

  } catch (error) {
    console.error(chalk.red('❌ Error validating plugins:', error.message));
    return false;
  }
}

/**
 * Validate manifest.json
 */
async function validateManifest() {
  console.log(chalk.bold('\n🔍 Validating Manifest\n'));

  try {
    // Check if manifest exists
    try {
      await fs.access(MANIFEST_PATH);
    } catch {
      console.warn(chalk.yellow('⚠️  manifest.json not found - run "npm run generate" first'));
      return true; // Not an error, just hasn't been generated yet
    }

    // Read and parse
    const content = await fs.readFile(MANIFEST_PATH, 'utf-8');
    let manifest;
    try {
      manifest = JSON.parse(content);
    } catch (error) {
      console.error(`${chalk.red('✗')} Invalid JSON: ${error.message}`);
      totalErrors++;
      return false;
    }

    // Load schema
    const schemaContent = await fs.readFile(MANIFEST_SCHEMA_PATH, 'utf-8');
    const schema = JSON.parse(schemaContent);

    // Validate
    const validate = ajv.compile(schema);
    const valid = validate(manifest);

    if (!valid) {
      console.error(`${chalk.red('✗')} Schema validation failed:`);
      validate.errors.forEach(error => {
        console.error(`  ${chalk.red('•')} ${error.instancePath} ${error.message}`);
      });
      totalErrors++;
      return false;
    }

    console.log(`${chalk.green('✓')} Manifest is valid`);
    console.log(`   Version: ${manifest.version}`);
    console.log(`   Plugins: ${manifest.plugins.length}`);
    console.log(`   Last updated: ${new Date(manifest.lastUpdated).toLocaleString()}`);

    return true;

  } catch (error) {
    console.error(chalk.red('❌ Error validating manifest:', error.message));
    totalErrors++;
    return false;
  }
}

/**
 * Main validation function
 */
async function validate() {
  console.log(chalk.bold.cyan('\n╔═══════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║  CSP2 Plugin Repository Validator    ║'));
  console.log(chalk.bold.cyan('╚═══════════════════════════════════════╝'));

  const pluginsValid = await validateAllPlugins();
  const manifestValid = await validateManifest();

  console.log(chalk.bold('\n' + '='.repeat(50)));

  if (pluginsValid && manifestValid && totalErrors === 0) {
    console.log(chalk.green.bold('\n✅ All validations passed!'));
    if (totalWarnings > 0) {
      console.log(chalk.yellow(`\n⚠️  ${totalWarnings} warning(s) found - please review`));
    }
    process.exit(0);
  } else {
    console.log(chalk.red.bold('\n❌ Validation failed!'));
    console.log(chalk.red(`   ${totalErrors} error(s) found`));
    if (totalWarnings > 0) {
      console.log(chalk.yellow(`   ${totalWarnings} warning(s) found`));
    }
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  validate();
}

module.exports = { validate, validatePluginConfig, validateManifest };

