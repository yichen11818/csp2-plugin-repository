#!/usr/bin/env node

/**
 * CSP2 Plugin Repository - Manifest Generator
 * 
 * This script automatically generates the main manifest.json file
 * by reading all plugin configuration files and fetching latest
 * release information from GitHub.
 */

const fs = require('fs').promises;
const path = require('path');
const { Octokit } = require('@octokit/rest');

// Configuration
const PLUGINS_DIR = path.join(__dirname, '../plugins');
const MANIFEST_PATH = path.join(__dirname, '../manifest.json');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Initialize Octokit
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
  userAgent: 'CSP2-Plugin-Repository/1.0'
});

// Categories definition
const CATEGORIES = [
  {
    id: 'gameplay',
    name: 'Gameplay',
    nameZh: '游戏玩法',
    description: 'Modify game mechanics and add new features',
    descriptionZh: '修改游戏机制和添加新功能'
  },
  {
    id: 'admin',
    name: 'Administration',
    nameZh: '服务器管理',
    description: 'Server management and moderation tools',
    descriptionZh: '服务器管理和审核工具'
  },
  {
    id: 'utility',
    name: 'Utility',
    nameZh: '实用工具',
    description: 'Helpful utilities and practice tools',
    descriptionZh: '实用工具和练习辅助'
  },
  {
    id: 'fun',
    name: 'Fun',
    nameZh: '娱乐',
    description: 'Entertainment and fun plugins',
    descriptionZh: '娱乐和趣味插件'
  }
];

/**
 * Read all plugin configuration files
 */
async function readPluginConfigs() {
  const files = await fs.readdir(PLUGINS_DIR);
  const configs = [];

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const filePath = path.join(PLUGINS_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const config = JSON.parse(content);

    if (config.enabled !== false) {
      configs.push(config);
    }
  }

  console.log(`📦 Found ${configs.length} enabled plugins`);
  return configs;
}

/**
 * Fetch latest release information from GitHub
 */
async function fetchLatestRelease(owner, repo) {
  try {
    const { data } = await octokit.repos.getLatestRelease({
      owner,
      repo
    });

    // 提取版本号，处理各种格式
    let version = data.tag_name.replace(/^v/, '');  // 移除 'v' 前缀
    
    // 如果不符合 semver 格式，尝试修复
    if (!/^\d+\.\d+\.\d+/.test(version)) {
      console.warn(`⚠️  Non-semver version "${version}" detected, attempting to normalize`);
      
      // 尝试多种模式提取版本号
      const patterns = [
        /(\d+)\.(\d+)\.(\d+)/,           // 标准 x.y.z
        /build[_-]?(\d+)/i,              // build-123 或 build_123
        /(\d+)/                          // 纯数字
      ];
      
      let matched = false;
      for (const pattern of patterns) {
        const match = version.match(pattern);
        if (match) {
          if (pattern === patterns[1]) {
            // build-number 格式，转换为 0.0.build
            version = `0.0.${match[1]}`;
            console.log(`   Normalized to: ${version}`);
          } else if (pattern === patterns[2]) {
            // 纯数字，转换为 0.0.number
            version = `0.0.${match[1]}`;
            console.log(`   Normalized to: ${version}`);
          } else {
            version = `${match[1]}.${match[2]}.${match[3]}`;
          }
          matched = true;
          break;
        }
      }
      
      if (!matched) {
        // 如果完全无法解析，使用 tag 名称但转换为 0.0.0
        console.warn(`⚠️  Unable to parse version "${version}", using 0.0.1`);
        version = '0.0.1';
      }
    }
    
    return {
      version,
      publishedAt: data.published_at,
      changelog: data.html_url,
      body: data.body,
      assets: data.assets
    };
  } catch (error) {
    console.warn(`⚠️  Failed to fetch release for ${owner}/${repo}: ${error.message}`);
    return null;
  }
}

/**
 * Fetch repository information
 */
async function fetchRepoInfo(owner, repo) {
  try {
    const { data } = await octokit.repos.get({
      owner,
      repo
    });

    return {
      description: data.description,
      stars: data.stargazers_count,
      homepage: data.homepage,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.warn(`⚠️  Failed to fetch repo info for ${owner}/${repo}: ${error.message}`);
    return null;
  }
}

/**
 * Build plugin entry for manifest
 */
async function buildPluginEntry(config) {
  const { repository, metadata } = config;

  console.log(`\n🔄 Processing ${config.id}...`);

  // Fetch GitHub data
  const release = await fetchLatestRelease(repository.owner, repository.repo);
  const repoInfo = await fetchRepoInfo(repository.owner, repository.repo);

  if (!release) {
    console.warn(`⚠️  Skipping ${config.id} - no release found`);
    return null;
  }

  // Find download asset
  const asset = release.assets.find(a => 
    a.name.includes(config.downloadPattern || '.zip')
  );

  if (!asset) {
    console.warn(`⚠️  Skipping ${config.id} - no matching asset found`);
    return null;
  }

  // Extract author info from GitHub
  const authorName = metadata.author?.name || repository.owner;
  const author = {
    name: authorName,
    github: repository.owner
  };

  // Build complete plugin entry
  const plugin = {
    id: config.id,
    name: metadata.name || config.id,
    slug: config.id,
    author,
    description: metadata.description || repoInfo?.description || `Plugin ${metadata.name || config.id}`,
    descriptionZh: metadata.descriptionZh || '',
    framework: metadata.framework || 'counterstrikesharp',
    frameworkVersion: metadata.frameworkVersion || '>=1.0.0',
    dependencies: config.dependencies || metadata.dependencies || [],  // 优先从顶层读取，兼容旧格式
    category: metadata.category || 'utility',
    tags: metadata.tags || [],
    version: release.version,
    changelog: release.changelog,
    downloads: {
      total: 0,  // Will be updated by stats tracker
      lastMonth: 0
    },
    rating: {
      average: 0,  // Will be updated by rating system
      count: 0
    },
    repository: {
      type: 'github',
      owner: repository.owner,
      repo: repository.repo,
      branch: repository.branch || 'main'
    },
    download: {
      url: asset.browser_download_url,
      size: asset.size
    },
    installation: config.installation || {
      type: 'extract',
      targetPath: 'game/csgo/addons/counterstrikesharp/plugins',
      files: ['*']
    },
    configuration: {
      required: false,
      files: [],
      documentation: `https://github.com/${repository.owner}/${repository.repo}#readme`
    },
    media: {
      ...(metadata.icon && { icon: metadata.icon }),
      ...(metadata.banner && { banner: metadata.banner }),
      screenshots: metadata.screenshots || []
    },
    links: {
      homepage: repoInfo?.homepage || `https://github.com/${repository.owner}/${repository.repo}`,
      documentation: `https://github.com/${repository.owner}/${repository.repo}/wiki`,
      issues: `https://github.com/${repository.owner}/${repository.repo}/issues`,
      ...(metadata.discord && { discord: metadata.discord })
    },
    verified: config.verification?.method === 'github-verified',
    featured: metadata.featured || false,
    officialSupport: false,
    compatibility: {
      cs2Version: '>=1.0.0',
      platforms: ['windows', 'linux']
    },
    metadata: {
      addedAt: config.verification?.verifiedAt || new Date().toISOString(),
      updatedAt: release.publishedAt,
      lastChecked: new Date().toISOString()
    }
  };

  console.log(`✅ ${config.id} - v${release.version}`);
  return plugin;
}

/**
 * Generate complete manifest
 */
async function generateManifest() {
  console.log('🚀 Starting manifest generation...\n');

  try {
    // Read plugin configs
    const configs = await readPluginConfigs();

    // Build plugin entries
    const plugins = [];
    for (const config of configs) {
      const plugin = await buildPluginEntry(config);
      if (plugin) {
        plugins.push(plugin);
      }

      // Rate limiting - wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Calculate statistics
    const statistics = {
      totalPlugins: plugins.length,
      verifiedPlugins: plugins.filter(p => p.verified).length,
      totalDownloads: plugins.reduce((sum, p) => sum + p.downloads.total, 0),
      activeAuthors: new Set(plugins.map(p => p.author.github)).size
    };

    // Build final manifest
    const manifest = {
      version: '2.0',
      lastUpdated: new Date().toISOString(),
      updateInterval: 3600,
      categories: CATEGORIES,
      plugins: plugins.sort((a, b) => {
        // Sort: featured first, then by name
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.name.localeCompare(b.name);
      }),
      statistics
    };

    // Write manifest
    await fs.writeFile(
      MANIFEST_PATH,
      JSON.stringify(manifest, null, 2),
      'utf-8'
    );

    console.log('\n✅ Manifest generated successfully!');
    console.log(`📊 Statistics:`);
    console.log(`   - Total plugins: ${statistics.totalPlugins}`);
    console.log(`   - Verified plugins: ${statistics.verifiedPlugins}`);
    console.log(`   - Active authors: ${statistics.activeAuthors}`);
    console.log(`\n📄 Output: ${MANIFEST_PATH}`);

  } catch (error) {
    console.error('❌ Error generating manifest:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  if (!GITHUB_TOKEN) {
    console.warn('⚠️  Warning: GITHUB_TOKEN not set. Rate limits will be strict.');
    console.log('Set GITHUB_TOKEN environment variable for higher rate limits.\n');
  }

  generateManifest();
}

module.exports = { generateManifest };

