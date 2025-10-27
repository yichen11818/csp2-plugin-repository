#!/usr/bin/env node

/**
 * CSP2 Plugin Repository - Link Checker
 * 
 * Checks that all download links and repository URLs are accessible
 */

const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const chalk = require('chalk');

// Configuration
const MANIFEST_PATH = path.join(__dirname, '../manifest.json');
const TIMEOUT = 10000; // 10 seconds

let totalChecks = 0;
let failedChecks = 0;

/**
 * Check if a URL is accessible
 */
async function checkUrl(url, description) {
  totalChecks++;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'CSP2-Plugin-Repository-LinkChecker/1.0'
      }
    });

    clearTimeout(timeout);

    if (response.ok) {
      console.log(`${chalk.green('✓')} ${description}`);
      return true;
    } else {
      console.error(`${chalk.red('✗')} ${description} - Status: ${response.status}`);
      failedChecks++;
      return false;
    }

  } catch (error) {
    console.error(`${chalk.red('✗')} ${description} - Error: ${error.message}`);
    failedChecks++;
    return false;
  }
}

/**
 * Check a single plugin's links
 */
async function checkPluginLinks(plugin) {
  console.log(`\n${chalk.blue('📦')} ${chalk.bold(plugin.name)} (${plugin.id})`);

  const checks = [];

  // Check download URL
  if (plugin.download?.url) {
    checks.push(checkUrl(
      plugin.download.url,
      `Download: ${plugin.download.url.substring(0, 60)}...`
    ));
  }

  // Check repository
  if (plugin.repository?.owner && plugin.repository?.repo) {
    const repoUrl = `https://github.com/${plugin.repository.owner}/${plugin.repository.repo}`;
    checks.push(checkUrl(repoUrl, `Repository: ${repoUrl}`));
  }

  // Check homepage if different from repository
  if (plugin.links?.homepage && !plugin.links.homepage.includes('github.com')) {
    checks.push(checkUrl(plugin.links.homepage, `Homepage: ${plugin.links.homepage}`));
  }

  // Check icon
  if (plugin.media?.icon) {
    checks.push(checkUrl(plugin.media.icon, `Icon: ${plugin.media.icon}`));
  }

  // Wait for all checks
  await Promise.all(checks);
}

/**
 * Check all links in manifest
 */
async function checkAllLinks() {
  console.log(chalk.bold.cyan('\n╔═══════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║  CSP2 Link Checker                    ║'));
  console.log(chalk.bold.cyan('╚═══════════════════════════════════════╝'));

  try {
    // Check if manifest exists
    try {
      await fs.access(MANIFEST_PATH);
    } catch {
      console.error(chalk.red('\n❌ manifest.json not found!'));
      console.log(chalk.yellow('   Run "npm run generate" first\n'));
      process.exit(1);
    }

    // Read manifest
    const content = await fs.readFile(MANIFEST_PATH, 'utf-8');
    const manifest = JSON.parse(content);

    console.log(`\n🔍 Checking links for ${manifest.plugins.length} plugins...\n`);

    // Check each plugin
    for (const plugin of manifest.plugins) {
      await checkPluginLinks(plugin);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Summary
    console.log(chalk.bold('\n' + '='.repeat(50)));
    console.log(chalk.bold('\n📊 Summary:'));
    console.log(`   Total checks: ${totalChecks}`);
    console.log(`   ${chalk.green('Passed')}: ${totalChecks - failedChecks}`);
    console.log(`   ${chalk.red('Failed')}: ${failedChecks}`);

    if (failedChecks === 0) {
      console.log(chalk.green.bold('\n✅ All links are accessible!\n'));
      process.exit(0);
    } else {
      console.log(chalk.red.bold('\n❌ Some links are not accessible!\n'));
      console.log(chalk.yellow('   This might be due to:'));
      console.log(chalk.yellow('   - Network issues'));
      console.log(chalk.yellow('   - Rate limiting'));
      console.log(chalk.yellow('   - Deleted/moved resources'));
      console.log(chalk.yellow('   - Invalid URLs\n'));
      process.exit(1);
    }

  } catch (error) {
    console.error(chalk.red('\n❌ Error:', error.message));
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  checkAllLinks();
}

module.exports = { checkAllLinks, checkUrl };

