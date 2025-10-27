# CSP2 Plugin Repository

> Official plugin repository for CSP2 (Counter-Strike 2 Server Panel)

[![Update Manifest](https://github.com/yichen11818/csp2-plugin-repository/actions/workflows/update-manifest.yml/badge.svg)](https://github.com/yichen11818/csp2-plugin-repository/actions/workflows/update-manifest.yml)
[![Validate Plugins](https://github.com/yichen11818/csp2-plugin-repository/actions/workflows/validate-pr.yml/badge.svg)](https://github.com/yichen11818/csp2-plugin-repository/actions/workflows/validate-pr.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**English** | [简体中文](README.zh-CN.md)

## 📦 What is this?

This repository contains the plugin marketplace metadata for [CSP2](https://github.com/yichen11818/csp2), a modern CS2 server management panel. It automatically tracks and indexes CS2 plugins from GitHub, making them easily installable through CSP2's GUI.

## 🌟 Features

- **Automated Updates**: GitHub Actions automatically check for new plugin versions every 6 hours
- **Verified Plugins**: All plugins are validated and verified by the CSP2 team or community
- **Easy Submission**: Submit your plugin with a simple JSON file via Pull Request
- **Schema Validation**: All plugins are validated against JSON Schema
- **Link Checking**: Automated checks ensure all download links are working
- **Multi-language**: Support for English and Chinese descriptions
- **Advanced File Mapping**: Support complex plugin structures with custom file mappings
- **Dependency Management**: Automatically handle plugin dependencies
- **Framework Version Control**: Specify required framework versions for compatibility

## 📊 Statistics

- **Total Plugins**: See [manifest.json](manifest.json)
- **Verified Plugins**: Plugins reviewed by CSP2 team
- **Active Authors**: Community contributors

## 🚀 For Plugin Users

### Using CSP2

Plugins in this repository are automatically available in CSP2's plugin marketplace. Simply:

1. Open CSP2
2. Navigate to "Plugin Market"
3. Browse, search, or filter plugins
4. Click "Install" on any plugin

### Manual Installation

You can also browse the [manifest.json](manifest.json) file directly and manually download plugins.

## 🔧 For Plugin Developers

### Submitting Your Plugin

Want to add your CS2 plugin to the marketplace? Follow these steps:

1. **Fork this repository**

2. **Create a plugin configuration file**
   ```bash
   cp plugins/template.json plugins/your-plugin-id.json
   ```

3. **Fill in your plugin information**

   **Simple Installation** (for plugins with straightforward structure):
   ```json
   {
     "$schema": "../schemas/plugin.schema.json",
     "id": "your-plugin-id",
     "enabled": true,
     "autoUpdate": true,
     "repository": {
       "type": "github",
       "owner": "your-github-username",
       "repo": "your-plugin-repo",
       "releaseType": "latest"
     },
     "downloadPattern": "YourPlugin.zip",
     "metadata": {
       "name": "Your Plugin Name",
       "description": "Plugin description in English",
       "descriptionZh": "插件的中文描述（可选）",
       "category": "gameplay",
       "tags": ["tag1", "tag2"],
       "framework": "counterstrikesharp",
       "frameworkVersion": ">=1.0.0",
       "featured": false
     },
     "dependencies": [],
     "installation": {
       "type": "extract",
       "targetPath": "game/csgo/addons/counterstrikesharp/plugins",
       "files": ["YourPlugin/*"],
       "requiresRestart": true
     }
   }
   ```

   **Advanced Installation** (for plugins with complex file structure):
   ```json
   {
     "$schema": "../schemas/plugin.schema.json",
     "id": "weaponpaints",
     "enabled": true,
     "autoUpdate": true,
     "repository": {
       "type": "github",
       "owner": "Nereziel",
       "repo": "cs2-WeaponPaints",
       "releaseType": "latest"
     },
     "downloadPattern": "WeaponPaints.zip",
     "metadata": {
       "name": "WeaponPaints",
       "description": "Advanced weapon skin system for CS2",
       "descriptionZh": "CS2 高级武器皮肤系统",
       "category": "gameplay",
       "tags": ["skins", "weapons"],
       "framework": "counterstrikesharp",
       "frameworkVersion": ">=1.0.0"
     },
     "dependencies": ["some-dependency"],
     "installation": {
       "type": "extract",
       "mappings": [
         {
           "source": "addons/counterstrikesharp/plugins/WeaponPaints/*",
           "target": "game/csgo/addons/counterstrikesharp/plugins/WeaponPaints",
           "recursive": true
         },
         {
           "source": "addons/counterstrikesharp/gamedata/*",
           "target": "game/csgo/addons/counterstrikesharp/gamedata",
           "recursive": true
         },
         {
           "source": "addons/counterstrikesharp/configs/**/*",
           "target": "game/csgo/addons/counterstrikesharp/configs",
           "recursive": true
         }
       ],
       "requiresRestart": true
     }
   }
   ```

4. **Submit a Pull Request**

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Plugin Requirements

✅ **Required:**
- Hosted on GitHub with Releases
- Open source (public repository)
- Compatible with CounterStrikeSharp or Metamod
- Has a README with usage instructions
- Uses semantic versioning (e.g., v1.2.3)
- Release includes a downloadable .zip file

❌ **Not Allowed:**
- Malicious code or backdoors
- Cracked/pirated content
- Paywall or premium-only plugins (use external links instead)
- Abandoned plugins (no updates >1 year)

## 🏗️ Repository Structure

```
csp2-plugin-repository/
├── manifest.json              # Auto-generated main manifest
├── plugins/                   # Plugin configuration files
│   ├── weaponpaints.json
│   ├── matchzy.json
│   └── ...
├── schemas/                   # JSON Schema definitions
│   ├── manifest.schema.json
│   └── plugin.schema.json
├── scripts/                   # Automation scripts
│   ├── generate-manifest.js   # Generate manifest from plugins
│   ├── validate.js            # Validate plugin configs
│   └── check-links.js         # Check download links
├── icons/                     # Plugin icons
├── screenshots/               # Plugin screenshots
└── .github/workflows/         # GitHub Actions workflows
```

## 🤖 Automation

This repository uses GitHub Actions for automation:

### Update Manifest
- **Trigger**: Every 6 hours, manual, or on plugin changes
- **Action**: Fetches latest releases from GitHub and regenerates `manifest.json`

### Validate PR
- **Trigger**: Pull requests that modify `plugins/**`
- **Action**: Validates JSON schema, checks repository accessibility, comments on PR

### Check Links
- **Trigger**: Weekly or manual
- **Action**: Verifies all download URLs are accessible, creates issue if broken links found

## 📝 Manifest Format

The generated `manifest.json` follows this structure:

```json
{
  "version": "2.0",
  "lastUpdated": "2025-10-27T10:00:00Z",
  "updateInterval": 3600,
  "categories": [...],
  "plugins": [
    {
      "id": "plugin-id",
      "name": "Plugin Name",
      "author": {...},
      "description": "...",
      "framework": "counterstrikesharp",
      "version": "1.0.0",
      "download": {
        "url": "https://github.com/.../releases/download/...",
        "size": 1234567
      },
      // ... more fields
    }
  ],
  "statistics": {...}
}
```

Full schema: [schemas/manifest.schema.json](schemas/manifest.schema.json)

## 🔗 CDN & URLs

The manifest is available at multiple endpoints:

- **GitHub Raw**: `https://raw.githubusercontent.com/yichen11818/csp2-plugin-repository/main/manifest.json`
- **jsDelivr CDN** (recommended): `https://cdn.jsdelivr.net/gh/yichen11818/csp2-plugin-repository@main/manifest.json`

CSP2 automatically uses the CDN endpoint for better performance.

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn
- GitHub Personal Access Token (optional, for higher rate limits)

### Setup

```bash
# Clone the repository
git clone https://github.com/yichen11818/csp2-plugin-repository.git
cd csp2-plugin-repository

# Install dependencies
npm install

# Set GitHub token (optional)
export GITHUB_TOKEN=your_token_here
```

### Scripts

```bash
# Generate manifest from plugin configs
npm run generate

# Validate all plugin configurations
npm run validate

# Check if download links are accessible
npm run check-links

# Run all checks
npm test
```

## 📖 Documentation

- [Contributing Guide](CONTRIBUTING.md) - How to submit plugins
- [Plugin Schema](schemas/plugin.schema.json) - Plugin configuration format
- [Manifest Schema](schemas/manifest.schema.json) - Generated manifest format
- [CSP2 Documentation](https://github.com/yichen11818/csp2/tree/main/docs) - Main project docs

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

### Ways to Contribute

- 🆕 Submit new plugins
- 🐛 Report broken links or outdated information
- 📝 Improve documentation
- ⭐ Star this repository
- 🔄 Share with the CS2 community

## 📜 License

This repository is licensed under the [MIT License](LICENSE).

Individual plugins have their own licenses - please check each plugin's repository.

## 💬 Community

- **Issues**: [GitHub Issues](https://github.com/yichen11818/csp2-plugin-repository/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yichen11818/csp2-plugin-repository/discussions)

## 🙏 Acknowledgments

Thanks to all plugin developers in the CS2 community for creating awesome plugins!

Special thanks to:
- [CounterStrikeSharp](https://github.com/roflmuffin/CounterStrikeSharp) team
- [Metamod:Source](https://www.metamodsource.net/) team
- All contributors to this repository

---

**Made with ❤️ for the CS2 community**

