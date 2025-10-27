# Plugin Repository as Submodule

这个目录是一个 Git Submodule，指向独立的插件仓库。

## 🔗 仓库信息

- **独立仓库**: [yichen11818/csp2-plugin-repository](https://github.com/yichen11818/csp2-plugin-repository)
- **主项目**: CSP2 (cs2)
- **引用方式**: Git Submodule

## 📦 什么是 Submodule？

Git Submodule 允许你在一个 Git 仓库中包含另一个 Git 仓库。这样可以：

- ✅ 保持插件仓库独立维护
- ✅ 在 CSP2 项目中直接使用
- ✅ GitHub 自动识别并提供目录跳转
- ✅ 各自有独立的提交历史

## 🚀 使用方法

### 克隆主项目（包含 Submodule）

```bash
# 克隆主项目并初始化 submodule
git clone --recurse-submodules https://github.com/yichen11818/csp2.git

# 或者先克隆，再初始化 submodule
git clone https://github.com/yichen11818/csp2.git
cd csp2
git submodule init
git submodule update
```

### 更新 Submodule 到最新版本

```bash
cd plugin-repository
git pull origin main
cd ..
git add plugin-repository
git commit -m "chore: update plugin repository submodule"
```

### 在 Submodule 中进行修改

```bash
# 进入 submodule 目录
cd plugin-repository

# 创建分支并修改
git checkout -b add-new-plugin
# ... 进行修改 ...

# 提交到 submodule 仓库
git add .
git commit -m "feat: add new plugin"
git push origin add-new-plugin

# 返回主项目，更新 submodule 引用
cd ..
git add plugin-repository
git commit -m "chore: update plugin repository to include new plugin"
```

## 🔄 同步工作流

### 更新插件仓库
1. 在 `plugin-repository/` 目录修改
2. 提交到 `csp2-plugin-repository` 仓库
3. 在主项目中更新 submodule 引用

### 更新 CSP2 主项目
1. 在 CSP2 主目录修改
2. 提交到 `csp2` 仓库
3. 如果需要，拉取最新的 submodule

## 📂 目录结构

```
csp2/                                    # 主项目
├── src/                                 # CSP2 源代码
├── docs/                                # 文档
├── plugin-repository/                   # Submodule (独立仓库)
│   ├── .git/                           # Submodule 的 Git 信息
│   ├── plugins/                        # 插件配置
│   ├── scripts/                        # 自动化脚本
│   └── manifest.json                   # 生成的清单
└── .gitmodules                         # Submodule 配置
```

## 🌐 GitHub 支持

在 GitHub 上查看主项目时：
- 点击 `plugin-repository/` 目录会跳转到独立仓库
- 显示当前引用的 commit hash
- 可以看到 submodule 的更新历史

## ⚠️ 注意事项

1. **不要忘记提交 submodule 引用**
   - 修改 submodule 后，主项目也需要提交

2. **团队协作**
   - 团队成员需要运行 `git submodule update` 来获取最新版本

3. **分离的历史**
   - 插件仓库和主项目有各自独立的提交历史

4. **CI/CD 配置**
   - 确保 CI 系统正确初始化 submodules

## 📖 更多信息

- [Git Submodule 官方文档](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- [GitHub Submodule 指南](https://github.blog/2016-02-01-working-with-submodules/)
- [Plugin Repository 独立文档](https://github.com/yichen11818/csp2-plugin-repository)

---

**配置时间**: 2025-10-27  
**状态**: ✅ 正常工作

