# Contributing to CSP2 Plugin Repository

Thank you for your interest in contributing to the CSP2 Plugin Repository! This document provides guidelines for submitting plugins and contributing to the project.

## 📋 Table of Contents

- [Submission Process](#submission-process)
- [Plugin Requirements](#plugin-requirements)
- [Configuration Guide](#configuration-guide)
- [Verification Levels](#verification-levels)
- [Best Practices](#best-practices)
- [FAQ](#faq)

## 🚀 Submission Process

### 1. Prerequisites

Before submitting, ensure your plugin:

- ✅ Is hosted on GitHub
- ✅ Has at least one Release with a downloadable .zip file
- ✅ Is compatible with CounterStrikeSharp or Metamod
- ✅ Has a README with installation and usage instructions
- ✅ Uses semantic versioning (e.g., v1.0.0, v2.1.3)
- ✅ Is open source (public repository)
- ✅ Contains no malicious code

### 2. Fork the Repository

```bash
git clone https://github.com/your-username/csp2-plugin-repository.git
cd csp2-plugin-repository
git checkout -b add-my-plugin
```

### 3. Create Plugin Configuration

Create a new file in the `plugins/` directory named `your-plugin-id.json`:

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
  "downloadPattern": "YourPluginName.zip",
  "metadata": {
    "name": "Your Plugin Display Name",
    "descriptionZh": "插件的中文描述（可选但推荐）",
    "category": "gameplay",
    "tags": ["relevant", "tags", "here"],
    "framework": "counterstrikesharp",
    "featured": false
  },
  "installation": {
    "type": "extract",
    "targetPath": "game/csgo/addons/counterstrikesharp/plugins",
    "files": ["YourPluginName/*"]
  },
  "verification": {
    "method": "community",
    "verifiedBy": "your-github-username",
    "verifiedAt": "2025-10-27T00:00:00Z",
    "notes": "Brief description of what you've tested"
  }
}
```

### 4. Validate Your Configuration

```bash
npm install
npm run validate
```

Fix any errors before proceeding.

### 5. Test Manifest Generation

```bash
# Optional: Set GitHub token to avoid rate limits
export GITHUB_TOKEN=your_token_here

npm run generate
```

This ensures your plugin can be fetched from GitHub successfully.

### 6. Submit Pull Request

```bash
git add plugins/your-plugin-id.json
git commit -m "feat: add YourPluginName to repository"
git push origin add-my-plugin
```

Then create a Pull Request on GitHub with:

**Title**: `[Add Plugin] YourPluginName`

**Description**:
```markdown
## Plugin Information

- **Name**: YourPluginName
- **Repository**: https://github.com/your-username/your-repo
- **Latest Version**: v1.0.0
- **Framework**: CounterStrikeSharp / Metamod
- **Category**: gameplay / admin / utility / fun

## Description

Brief description of what your plugin does.

## Testing

- [ ] Plugin installs correctly via CSP2
- [ ] Download link is accessible
- [ ] README has clear instructions
- [ ] No console errors
- [ ] Tested on CS2 version: [version]

## Checklist

- [ ] Plugin is open source
- [ ] Repository has Releases
- [ ] JSON configuration validated (`npm run validate`)
- [ ] Chinese description provided (optional)
- [ ] Icons/screenshots added (optional)
```

### 7. Review Process

1. **Automated Checks**: GitHub Actions will automatically validate your submission
2. **Community Review**: Other contributors may provide feedback
3. **Maintainer Approval**: A CSP2 team member will review and merge
4. **Manifest Update**: After merge, the plugin will be available in CSP2 within 6 hours

## 📐 Plugin Requirements

### ✅ Required

| Requirement | Description |
|------------|-------------|
| **GitHub Hosted** | Must be a public GitHub repository |
| **Has Releases** | At least one GitHub Release with .zip asset |
| **Open Source** | Source code must be publicly viewable |
| **README** | Clear installation and usage instructions |
| **Semantic Versioning** | Follow semver (v1.2.3) for releases |
| **CS2 Compatible** | Works with current CS2 version |
| **Framework Compatible** | Works with CounterStrikeSharp or Metamod |
| **No Malicious Code** | Clean, safe code - will be reviewed |

### ✨ Recommended

| Feature | Why It's Important |
|---------|-------------------|
| **Chinese Description** | Helps Chinese users understand your plugin |
| **Icons & Screenshots** | Makes your plugin more appealing |
| **Detailed README** | Better user experience |
| **Changelog** | Users know what changed |
| **Configuration Docs** | Easier to configure |
| **Active Maintenance** | Users prefer maintained plugins |

### ❌ Not Allowed

- **Malicious Code**: Backdoors, data theft, cryptominers, etc.
- **Cracked Content**: Pirated or unauthorized content
- **Paywall-Only**: Must be free and open source
- **Abandoned Projects**: No updates for >1 year (exceptions for stable plugins)
- **Copyright Violations**: Respect others' licenses
- **NSFW Content**: Keep it appropriate

## 🔧 Configuration Guide

### Plugin ID

- Must be unique across all plugins
- Use lowercase letters, numbers, and hyphens only
- Should match your filename (without .json)
- Example: `weapon-paints`, `matchzy`, `admin-system`

### Categories

Choose the most appropriate category:

- **`gameplay`**: Modify game mechanics (weapon skins, shop systems, game modes)
- **`admin`**: Server management tools (admin panels, voting systems, match managers)
- **`utility`**: Helper tools (practice modes, statistics, training)
- **`fun`**: Entertainment plugins (sounds, effects, mini-games)

### Tags

Add 3-6 relevant tags to help users find your plugin:

Examples:
- Weapon skins: `["skins", "weapons", "customization", "database"]`
- Match plugin: `["match", "competitive", "tournament", "admin"]`
- Practice mode: `["practice", "training", "aim", "utility"]`

### Framework

Specify the required framework:

- `counterstrikesharp`: For CounterStrikeSharp plugins
- `metamod`: For Metamod:Source plugins
- `sourcemod`: For SourceMod plugins (if supported in future)

### Installation Configuration

```json
"installation": {
  "type": "extract",
  "targetPath": "game/csgo/addons/counterstrikesharp/plugins",
  "files": ["YourPlugin/*"]
}
```

- **`type`**: Usually `extract` for .zip files
- **`targetPath`**: Where to extract (relative to CS2 server root)
- **`files`**: Which files/folders to extract (supports wildcards)

### Verification

```json
"verification": {
  "method": "community",
  "verifiedBy": "your-github-username",
  "verifiedAt": "2025-10-27T00:00:00Z",
  "notes": "Tested on CS2 build 13971, works with CSS v180"
}
```

Methods:
- **`community`**: Verified by community member (you)
- **`github-verified`**: Official verification by CSP2 team (assigned by maintainers)
- **`manual`**: Manual verification

## 🏆 Verification Levels

### Community Verified
- Submitted by community members
- Basic testing performed
- Standard listing in marketplace
- Badge: ⚡ Community

### GitHub Verified  
- Reviewed by CSP2 team
- Extensive testing performed
- Popular and well-maintained plugins
- Badge: ✓ Verified

### Featured
- Hand-picked by CSP2 team
- Exceptional quality and utility
- Highlighted in marketplace
- Badge: ⭐ Featured

To get your plugin featured:
1. Must be GitHub Verified first
2. High quality code and documentation
3. Active maintenance
4. Positive community feedback
5. Unique or essential functionality

## 💡 Best Practices

### 1. Release Management

```bash
# Good versioning
v1.0.0 - Initial release
v1.1.0 - Add new feature
v1.1.1 - Bug fix
v2.0.0 - Breaking changes

# Bad versioning
v1 - Too vague
version-1.0 - Non-standard format
latest - Not a version number
```

### 2. Asset Naming

Your GitHub Release should have an asset named consistently:

```
✅ Good:
- WeaponPaints.zip
- MatchZy.zip
- AdminSystem.zip

❌ Bad:
- plugin.zip (too generic)
- wp-v1.2.3-final-updated.zip (too specific)
- WeaponPaints-source.zip (might be source code, not compiled)
```

### 3. README Structure

Your plugin repository should have a README with:

```markdown
# Plugin Name

Brief description

## Features
- Feature 1
- Feature 2

## Requirements
- CounterStrikeSharp v180+
- Metamod 2.0+

## Installation
1. Step 1
2. Step 2

## Configuration
Explain config.json

## Commands
List commands and permissions

## Known Issues
Any known bugs

## Credits
Attribution
```

### 4. Changelog

Include a changelog in your releases:

```markdown
## v1.1.0 - 2025-10-27

### Added
- New feature X
- Support for Y

### Fixed
- Bug where Z happened

### Changed
- Improved performance of W
```

### 5. Support

Provide support channels:
- GitHub Issues
- Discord server
- Documentation wiki

## ❓ FAQ

### Q: How long does review take?
**A**: Typically 1-3 days for community submissions. Automated checks are instant.

### Q: Can I submit closed-source plugins?
**A**: No, all plugins must be open source (public GitHub repository).

### Q: Can I update my plugin?
**A**: Yes! If `autoUpdate: true`, updates are automatic. Otherwise, submit a PR to update the version.

### Q: Can I submit someone else's plugin?
**A**: Yes, if it's open source and meets requirements. Credit the original author.

### Q: What if my GitHub username changes?
**A**: Submit a PR to update the repository owner in your plugin config.

### Q: Can I remove my plugin?
**A**: Yes, submit a PR setting `"enabled": false` in your plugin config.

### Q: How do I add icons/screenshots?
**A**: Add files to `icons/` and `screenshots/your-plugin-id/` directories, then reference them in your plugin config's `metadata.icon` and `metadata.screenshots` fields.

### Q: My PR failed validation, what now?
**A**: Check the automated comment on your PR. Fix the errors mentioned and push an update.

### Q: How do I get "Featured" status?
**A**: Focus on quality, documentation, and community feedback. Maintainers periodically review and feature outstanding plugins.

### Q: Can I submit beta/experimental plugins?
**A**: Yes, but mark them clearly in the description and set `verification.notes` to indicate it's experimental.

## 📞 Need Help?

- **Documentation**: Check [README.md](README.md)
- **Issues**: [GitHub Issues](https://github.com/your-org/csp2-plugin-repository/issues)
- **Discord**: [Join our server](https://discord.gg/your-invite)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/csp2-plugin-repository/discussions)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the CS2 community! 🎮

