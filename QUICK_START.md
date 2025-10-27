# Quick Start Guide

This guide will help you get started with the CSP2 Plugin Repository in 5 minutes.

## 🎯 For Users

### Using Plugins in CSP2

1. **Install CSP2** (if not already installed)
   ```bash
   # Download from releases
   # Or build from source
   ```

2. **Access Plugin Market**
   - Open CSP2
   - Click "Plugin Market" in sidebar
   - Browse available plugins

3. **Install a Plugin**
   - Search or browse for your desired plugin
   - Click "Install"
   - Wait for download and installation
   - Done! Plugin is ready to use

### Plugin Categories

- **Gameplay**: Weapon skins, shop systems, game modes
- **Admin**: Server management, voting, match tools
- **Utility**: Practice modes, statistics, training
- **Fun**: Entertainment, sounds, effects

## 🚀 For Developers

### Quick Plugin Submission

1. **Prepare Your Plugin**
   - Host on GitHub (public repository)
   - Create a Release with .zip file
   - Add clear README

2. **Fork & Clone**
   ```bash
   git clone https://github.com/your-username/csp2-plugin-repository.git
   cd csp2-plugin-repository
   npm install
   ```

3. **Create Config**
   ```bash
   cp plugins/template.json plugins/my-plugin.json
   ```

4. **Edit Configuration**
   ```json
   {
     "id": "my-awesome-plugin",
     "repository": {
       "owner": "your-username",
       "repo": "my-plugin-repo"
     },
     "metadata": {
       "name": "My Awesome Plugin",
       "category": "gameplay"
     }
   }
   ```

5. **Validate**
   ```bash
   npm run validate
   ```

6. **Submit PR**
   ```bash
   git add plugins/my-plugin.json
   git commit -m "feat: add My Awesome Plugin"
   git push
   # Create Pull Request on GitHub
   ```

## 🛠️ Development Setup

### Running Locally

```bash
# Install dependencies
npm install

# Generate manifest from plugin configs
npm run generate

# Validate all configurations
npm run validate

# Check download links
npm run check-links
```

### Testing with CSP2

1. Generate local manifest:
   ```bash
   npm run generate
   ```

2. Copy `manifest.json` to CSP2's data directory:
   ```bash
   cp manifest.json /path/to/csp2/data/plugins-cache.json
   ```

3. Launch CSP2 and check Plugin Market

### Common Commands

```bash
# Add new plugin
cp plugins/template.json plugins/your-plugin.json
# Edit the file
npm run validate

# Update manifest
npm run generate

# Run all checks
npm test
```

## 📖 Next Steps

- **Users**: Check out [README.md](README.md) for more info
- **Developers**: Read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines
- **Questions**: Join our [Discord](https://discord.gg/your-invite)

## 💡 Tips

### For Plugin Users

- ⭐ Star plugins you like on GitHub
- 🐛 Report issues to plugin authors
- 📝 Leave feedback in discussions

### For Plugin Developers

- 📚 Write clear documentation
- 🔄 Keep plugins updated
- 💬 Respond to user issues
- 🏷️ Use semantic versioning
- ✅ Test before releasing

## 🆘 Troubleshooting

### Plugin Won't Install
- Check if download URL is accessible
- Verify .zip file is valid
- Check CSP2 logs for errors

### Plugin Not Listed
- Wait up to 6 hours for manifest update
- Check if PR was merged
- Verify `enabled: true` in config

### Update Not Showing
- Force refresh in CSP2
- Check if new release has correct asset name
- Wait for next manifest update (every 6 hours)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/csp2-plugin-repository/issues)
- **Discord**: [Join server](https://discord.gg/your-invite)
- **Docs**: [Full Documentation](README.md)

---

**Happy plugin hunting! 🎮**

