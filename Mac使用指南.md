# SEO 工具 - Mac 使用指南

## 🍎 Mac 快速开始

### 第一步：打开终端

1. 按 `Command (⌘) + 空格`
2. 输入 `Terminal` 或 `终端`
3. 按 `Enter`

---

## 🌐 两种使用场景

### 场景 A：项目在你的 Mac 本地

```bash
# 1. 进入项目目录
cd ~/seo-tool  # 或你的实际路径

# 2. 安装依赖（首次使用）
npm install

# 3. 启动服务器
npm start
```

然后在浏览器打开：`http://localhost:3000`

---

### 场景 B：项目在远程服务器上 ⭐（你的情况）

#### 方法 1：SSH 端口转发（推荐）

在 Mac 终端运行：

```bash
ssh -L 3000:localhost:3000 用户名@服务器IP地址
```

**示例：**
```bash
ssh -L 3000:localhost:3000 root@192.168.1.100
```

**然后：**
1. 在 SSH 会话中启动服务器：`npm start`
2. 在 Mac 浏览器打开：`http://localhost:3000`

**优点：** 安全，不需要开放服务器端口

#### 方法 2：直接 SSH 连接使用命令行

```bash
# 1. SSH 连接到服务器
ssh 用户名@服务器IP

# 2. 进入项目目录
cd /home/user/seo-tool

# 3. 启动服务器（在后台）
npm start &

# 4. 使用交互式菜单
bash quick-generate.sh
```

#### 方法 3：暴露服务器端口（需要防火墙设置）

**在服务器上：**
```bash
# 修改 server.js，让它监听所有网络接口
# 将 server.listen(PORT) 改为 server.listen(PORT, '0.0.0.0')
```

**然后在 Mac 浏览器访问：**
```
http://服务器IP:3000
```

**注意：** 需要在服务器防火墙开放 3000 端口

---

## 💻 Mac 终端使用技巧

### 多个终端窗口管理

**方法 1：新标签页**
- `Command (⌘) + T` - 新建标签页
- `Command (⌘) + Shift + [/]` - 切换标签页

**方法 2：分屏**
- `Command (⌘) + D` - 垂直分屏
- `Command (⌘) + Shift + D` - 水平分屏

**推荐设置：**
- 标签页 1：运行 `npm start`（保持服务器运行）
- 标签页 2：使用 `bash quick-generate.sh`（操作工具）

### 常用快捷键

- `Command (⌘) + K` - 清屏
- `Command (⌘) + W` - 关闭当前标签页
- `Control + C` - 停止当前命令
- `Control + Z` - 暂停当前命令
- `Control + D` - 退出终端

---

## 🚀 三种使用方式

### 方式 1：网页界面（最直观）

**启动服务器后，在浏览器打开：**
```
http://localhost:3000
```

**或者使用 Mac 命令直接打开：**
```bash
open http://localhost:3000
```

**特点：**
- ✅ 图形化界面，最容易使用
- ✅ 实时预览结果
- ✅ 适合不熟悉命令行的用户

---

### 方式 2：交互式菜单（推荐）

```bash
cd /home/user/seo-tool
bash quick-generate.sh
```

**菜单示例：**
```
🚀 开始生成 SEO 内容...

请选择功能：
1) 生成文章
2) 分析关键词
3) SEO 审计
4) 生成站点地图

请输入选项 (1-4):
```

**特点：**
- ✅ 简单易用，有向导提示
- ✅ 不需要记忆命令
- ✅ 适合日常使用

---

### 方式 3：直接命令（最快速）

#### 生成文章
```bash
curl -X POST http://localhost:3000/api/generate-article \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Mac 使用技巧",
    "keywords": ["Mac", "技巧", "教程"],
    "targetWordCount": 1500,
    "sections": 5
  }' | jq .
```

#### 分析关键词
```bash
curl -X POST http://localhost:3000/api/analyze-keywords \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Mac 是苹果公司开发的电脑。Mac 系统简洁易用。许多人喜欢使用 Mac 进行创作。",
    "keyword": "Mac"
  }' | jq .
```

#### SEO 审计
```bash
curl -X POST http://localhost:3000/api/seo-audit \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<html><head><title>Mac 使用指南</title></head><body><h1>欢迎使用 Mac</h1></body></html>",
    "keyword": "Mac",
    "name": "mac-guide-audit"
  }' | jq .
```

**特点：**
- ✅ 最快速
- ✅ 可以脚本化、自动化
- ✅ 适合批量处理

---

## 📂 查看生成的文件

### 在终端查看

```bash
# 查看所有文章
ls -lh output/articles/

# 查看所有报告
ls -lh output/reports/

# 查看最新文件
ls -lt output/articles/ | head -5

# 查看文件内容
cat output/articles/文件名.html
```

### 在 Finder 中查看

```bash
# 在 Finder 中打开 output 文件夹
open output/

# 在 Finder 中打开 articles 文件夹
open output/articles/
```

### 用浏览器打开 HTML 文件

```bash
# 打开最新的 SEO 报告
open output/reports/*.html

# 打开最新的文章
open output/articles/*.html

# 打开指定文件
open output/reports/seo-audit_2026-01-16.html
```

### 快速预览（Mac 特有）

```bash
# 在 Finder 中选中文件，按空格键快速预览
# 或者使用命令
qlmanage -p output/reports/report.html
```

---

## 🔧 Mac 专属配置

### 安装 jq（用于格式化 JSON）

```bash
# 使用 Homebrew 安装
brew install jq

# 如果没有 Homebrew，先安装：
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 创建别名（简化命令）

编辑 `~/.zshrc` 或 `~/.bash_profile`：

```bash
nano ~/.zshrc
```

添加：
```bash
# SEO 工具别名
alias seo-start='cd /home/user/seo-tool && npm start'
alias seo-gen='cd /home/user/seo-tool && bash quick-generate.sh'
alias seo-open='open http://localhost:3000'
alias seo-files='open /home/user/seo-tool/output'
```

保存后重新加载：
```bash
source ~/.zshrc
```

**现在可以使用：**
```bash
seo-start   # 启动服务器
seo-gen     # 打开生成菜单
seo-open    # 打开网页界面
seo-files   # 打开文件夹
```

---

## 📱 创建 Mac 应用快捷方式（高级）

### 方法 1：使用 Automator

1. 打开 `Automator`（在应用程序文件夹）
2. 新建 `应用程序`
3. 添加 `运行 Shell 脚本`
4. 输入：
```bash
cd /home/user/seo-tool
npm start
open http://localhost:3000
```
5. 保存为 `SEO工具.app`
6. 双击即可启动！

### 方法 2：创建启动脚本

创建 `start-seo.command`：

```bash
#!/bin/bash
cd /home/user/seo-tool
npm start
```

设置权限：
```bash
chmod +x start-seo.command
```

双击即可运行！

---

## 🎯 完整工作流程示例

### 示例 1：生成博客文章

**步骤 1：启动服务器**
```bash
# 终端标签页 1
cd /home/user/seo-tool
npm start
```

**步骤 2：生成文章**
```bash
# 终端标签页 2（Command + T 新建）
bash quick-generate.sh
# 选择 1 -> 输入主题和关键词
```

**步骤 3：查看结果**
```bash
open output/articles/
```

**步骤 4：在浏览器预览**
```bash
open output/articles/最新文件.html
```

---

### 示例 2：完整 SEO 工作流

创建脚本 `generate-seo-package.sh`：

```bash
#!/bin/bash

echo "🚀 生成完整 SEO 包..."

# 1. 生成文章
echo "📝 生成文章..."
curl -s -X POST http://localhost:3000/api/generate-article \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "我的主题",
    "keywords": ["关键词1", "关键词2"],
    "targetWordCount": 2000
  }' | jq -r '.data.filepath'

# 2. 生成 Meta 标签
echo "🏷️  生成 Meta 标签..."
curl -s -X POST http://localhost:3000/api/generate-meta-tags \
  -H "Content-Type: application/json" \
  -d '{
    "title": "我的页面标题",
    "description": "我的页面描述",
    "url": "https://example.com"
  }' | jq -r '.data.filepath'

# 3. 生成站点地图
echo "🗺️  生成站点地图..."
curl -s -X POST http://localhost:3000/api/generate-sitemap \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      {"loc": "/", "changefreq": "daily", "priority": 1.0}
    ],
    "baseUrl": "https://example.com"
  }' | jq -r '.data.filepath'

echo "✅ 完成！打开文件夹..."
open output/
```

使用：
```bash
chmod +x generate-seo-package.sh
./generate-seo-package.sh
```

---

## ⚠️ 常见问题（Mac 专属）

### 1. "Permission denied"

```bash
# 给脚本执行权限
chmod +x quick-generate.sh
chmod +x *.sh
```

### 2. "Command not found: npm"

```bash
# 安装 Node.js
brew install node

# 或下载安装：
# https://nodejs.org/
```

### 3. "端口 3000 已被占用"

```bash
# 查找占用端口的进程
lsof -i :3000

# 杀死进程
kill -9 进程ID

# 或使用其他端口
PORT=3001 npm start
```

### 4. "jq: command not found"

```bash
# 安装 jq
brew install jq
```

### 5. SSH 连接断开

使用 `tmux` 或 `screen` 保持会话：

```bash
# 安装 tmux
brew install tmux

# 在服务器上使用
ssh 用户@服务器
tmux new -s seo
npm start
# 按 Control + B，然后按 D 分离会话
# 重新连接：tmux attach -t seo
```

---

## 🎨 Mac 终端美化（可选）

### 使用 iTerm2（推荐）

1. 下载：https://iterm2.com/
2. 安装 Oh My Zsh：
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 配色方案

```bash
# 安装 Powerlevel10k 主题
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

---

## 📊 性能监控（Mac 专属）

### 监控服务器资源

```bash
# CPU 和内存使用
top -l 1 | grep -E "^CPU|^PhysMem"

# 查看 Node.js 进程
ps aux | grep node

# 实时监控
watch -n 1 'ps aux | grep node'
```

---

## 🔐 安全提示

1. **不要暴露端口到公网**（除非必要）
2. **使用 SSH 端口转发**而不是直接暴露
3. **定期更新依赖**：`npm update`
4. **备份重要文件**

---

## 📞 快速命令参考卡

```bash
# === 启动相关 ===
npm start                      # 启动服务器
npm start &                    # 后台启动
PORT=3001 npm start           # 使用其他端口

# === 使用相关 ===
bash quick-generate.sh        # 交互式菜单
open http://localhost:3000    # 打开网页界面

# === 文件相关 ===
ls -lh output/articles/       # 查看文章
open output/                  # 在 Finder 中打开
open output/reports/*.html    # 浏览器打开报告

# === SSH 相关 ===
ssh -L 3000:localhost:3000 user@server   # 端口转发
ssh user@server "cd /path && npm start"  # 远程启动

# === 工具相关 ===
brew install jq               # 安装 JSON 格式化工具
brew install node             # 安装 Node.js
```

---

**现在开始使用吧！** 🚀

1. 打开终端
2. 连接服务器（如果需要）
3. 运行 `npm start`
4. 选择你喜欢的使用方式！
