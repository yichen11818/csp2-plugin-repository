# CSP2 插件仓库

> CSP2 (Counter-Strike 2 Server Panel) 的官方插件仓库

[![Update Manifest](https://github.com/yichen11818/csp2-plugin-repository/actions/workflows/update-manifest.yml/badge.svg)](https://github.com/yichen11818/csp2-plugin-repository/actions/workflows/update-manifest.yml)
[![Validate Plugins](https://github.com/yichen11818/csp2-plugin-repository/actions/workflows/validate-pr.yml/badge.svg)](https://github.com/yichen11818/csp2-plugin-repository/actions/workflows/validate-pr.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[English](README.md) | **简体中文**

## 📦 这是什么？

这个仓库包含了 [CSP2](https://github.com/yichen11818/csp2) 插件市场的元数据，CSP2 是一个现代化的 CS2 服务器管理面板。仓库会自动跟踪和索引 GitHub 上的 CS2 插件，让用户可以通过 CSP2 的图形界面轻松安装插件。

## 🌟 特性

- **自动更新**：GitHub Actions 每 6 小时自动检查新版本
- **验证插件**：所有插件都经过 CSP2 团队或社区的验证
- **简易提交**：通过 Pull Request 提交简单的 JSON 文件即可
- **Schema 验证**：所有插件都会通过 JSON Schema 验证
- **链接检查**：自动检查确保所有下载链接可用
- **多语言支持**：支持英文和中文描述
- **高级文件映射**：支持复杂插件结构的自定义文件映射
- **依赖管理**：自动处理插件依赖关系
- **框架版本控制**：指定所需的框架版本以确保兼容性

## 📊 统计

- **插件总数**：见 [manifest.json](manifest.json)
- **已验证插件**：经 CSP2 团队审核的插件
- **活跃作者**：社区贡献者

## 🚀 用户指南

### 在 CSP2 中使用

此仓库中的插件会自动出现在 CSP2 的插件市场中。只需：

1. 打开 CSP2
2. 导航到"插件市场"
3. 浏览、搜索或筛选插件
4. 点击任意插件的"安装"按钮

### 手动安装

您也可以直接浏览 [manifest.json](manifest.json) 文件并手动下载插件。

## 🔧 开发者指南

### 提交您的插件

想要将您的 CS2 插件添加到市场？请按照以下步骤操作：

1. **Fork 此仓库**

2. **创建插件配置文件**
   ```bash
   cp plugins/template.json plugins/your-plugin-id.json
   ```

3. **填写插件信息**

   **简单安装**（适用于结构简单的插件）：
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
       "name": "您的插件名称",
       "description": "Plugin description in English",
       "descriptionZh": "插件的中文描述",
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

   **高级安装**（适用于文件结构复杂的插件）：
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
       "name": "武器皮肤",
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

4. **提交 Pull Request**

详细指南请查看 [CONTRIBUTING.md](CONTRIBUTING.md)（英文）。

### 插件要求

✅ **必需：**
- 托管在 GitHub 上并包含 Releases
- 开源（公开仓库）
- 与 CounterStrikeSharp 或 Metamod 兼容
- 有包含使用说明的 README
- 使用语义化版本（如 v1.2.3）
- Release 中包含可下载的 .zip 文件

❌ **不允许：**
- 恶意代码或后门
- 破解/盗版内容
- 付费墙或仅限高级用户的插件（可使用外部链接）
- 废弃插件（超过 1 年未更新）

## 🏗️ 仓库结构

```
csp2-plugin-repository/
├── manifest.json              # 自动生成的主清单
├── plugins/                   # 插件配置文件
│   ├── weaponpaints.json
│   ├── matchzy.json
│   └── ...
├── schemas/                   # JSON Schema 定义
│   ├── manifest.schema.json
│   └── plugin.schema.json
├── scripts/                   # 自动化脚本
│   ├── generate-manifest.js   # 从插件配置生成清单
│   ├── validate.js            # 验证插件配置
│   └── check-links.js         # 检查下载链接
├── icons/                     # 插件图标
├── screenshots/               # 插件截图
└── .github/workflows/         # GitHub Actions 工作流
```

## 🤖 自动化

此仓库使用 GitHub Actions 进行自动化：

### 更新清单
- **触发时机**：每 6 小时、手动触发或插件更改时
- **操作**：从 GitHub 获取最新版本并重新生成 `manifest.json`

### 验证 PR
- **触发时机**：修改 `plugins/**` 的 Pull Request
- **操作**：验证 JSON schema、检查仓库可访问性、在 PR 上添加评论

### 检查链接
- **触发时机**：每周或手动触发
- **操作**：验证所有下载 URL 是否可访问，如发现损坏的链接则创建 issue

## 📝 清单格式

生成的 `manifest.json` 遵循以下结构：

```json
{
  "version": "2.0",
  "lastUpdated": "2025-10-27T10:00:00Z",
  "updateInterval": 3600,
  "categories": [...],
  "plugins": [
    {
      "id": "plugin-id",
      "name": "插件名称",
      "author": {...},
      "description": "...",
      "framework": "counterstrikesharp",
      "version": "1.0.0",
      "download": {
        "url": "https://github.com/.../releases/download/...",
        "size": 1234567
      },
      // ... 更多字段
    }
  ],
  "statistics": {...}
}
```

完整 schema：[schemas/manifest.schema.json](schemas/manifest.schema.json)

## 🔗 CDN 与 URL

清单可从多个端点访问：

- **GitHub Raw**：`https://raw.githubusercontent.com/yichen11818/csp2-plugin-repository/main/manifest.json`
- **jsDelivr CDN**（推荐）：`https://cdn.jsdelivr.net/gh/yichen11818/csp2-plugin-repository@main/manifest.json`

CSP2 自动使用 CDN 端点以获得更好的性能。

## 🛠️ 开发

### 前置要求

- Node.js 18+
- npm 或 yarn
- GitHub Personal Access Token（可选，用于提高速率限制）

### 设置

```bash
# 克隆仓库
git clone https://github.com/yichen11818/csp2-plugin-repository.git
cd csp2-plugin-repository

# 安装依赖
npm install

# 设置 GitHub token（可选）
export GITHUB_TOKEN=your_token_here
```

### 脚本

```bash
# 从插件配置生成清单
npm run generate

# 验证所有插件配置
npm run validate

# 检查下载链接是否可访问
npm run check-links

# 运行所有检查
npm test
```

## 📖 文档

- [贡献指南](CONTRIBUTING.md) - 如何提交插件（英文）
- [插件 Schema](schemas/plugin.schema.json) - 插件配置格式
- [清单 Schema](schemas/manifest.schema.json) - 生成的清单格式
- [CSP2 文档](https://github.com/yichen11818/csp2/tree/main/docs) - 主项目文档

## 🤝 贡献

欢迎贡献！请先阅读 [CONTRIBUTING.md](CONTRIBUTING.md)（英文）。

### 贡献方式

- 🆕 提交新插件
- 🐛 报告损坏的链接或过时信息
- 📝 改进文档
- ⭐ 为此仓库点星
- 🔄 分享给 CS2 社区

## 📜 许可证

此仓库采用 [MIT License](LICENSE) 许可。

各个插件有自己的许可证 - 请查看各插件的仓库。

## 💬 社区

- **Issues**：[GitHub Issues](https://github.com/yichen11818/csp2-plugin-repository/issues)
- **讨论**：[GitHub Discussions](https://github.com/yichen11818/csp2-plugin-repository/discussions)

## 🙏 致谢

感谢 CS2 社区中所有创建优秀插件的开发者！

特别感谢：
- [CounterStrikeSharp](https://github.com/roflmuffin/CounterStrikeSharp) 团队
- [Metamod:Source](https://www.metamodsource.net/) 团队
- 此仓库的所有贡献者

---

**Made with ❤️ for the CS2 community**


