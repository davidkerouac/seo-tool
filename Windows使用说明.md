# SEO 工具 - Windows 使用说明

## 🚀 快速开始（Windows CMD）

### 第一步：启动服务器

双击运行 `启动服务器.bat`，或在 CMD 中输入：

```cmd
启动服务器.bat
```

你会看到：
```
╔════════════════════════════════════════════════════════════╗
║                  🚀 SEO Tool Web Server                    ║
╚════════════════════════════════════════════════════════════╝

✅ 服务器已启动！
🌐 访问地址: http://localhost:3000
```

**保持这个窗口开着！** 不要关闭。

---

### 第二步：使用工具

#### 方法 1: 图形化菜单（最简单）

**打开新的 CMD 窗口**，然后运行：

```cmd
seo-tool.bat
```

你会看到一个菜单：
```
================================
   SEO 工具 - Windows 版本
================================

请选择功能:

[1] 生成文章
[2] 分析关键词
[3] SEO 审计
[4] 生成 Meta 标签
[5] 生成站点地图
[6] 查看所有生成的文件
[0] 退出

请输入选项 (0-6):
```

**示例使用：**
1. 输入 `1` 生成文章
2. 按提示输入主题、关键词等
3. 等待生成完成
4. 文件自动保存到 `output` 文件夹

---

#### 方法 2: 直接命令（适合高级用户）

**1. 生成文章**
```cmd
curl -X POST http://localhost:3000/api/generate-article -H "Content-Type: application/json" -d "{\"topic\":\"人工智能发展\",\"keywords\":[\"AI\",\"机器学习\"],\"targetWordCount\":1500,\"sections\":5}"
```

**2. 分析关键词**
```cmd
curl -X POST http://localhost:3000/api/analyze-keywords -H "Content-Type: application/json" -d "{\"text\":\"你的文本内容\",\"keyword\":\"关键词\"}"
```

**3. SEO 审计**
```cmd
curl -X POST http://localhost:3000/api/seo-audit -H "Content-Type: application/json" -d "{\"html\":\"<html><head><title>测试</title></head><body><h1>标题</h1></body></html>\",\"keyword\":\"测试\",\"name\":\"my-audit\"}"
```

**4. 生成 Meta 标签**
```cmd
curl -X POST http://localhost:3000/api/generate-meta-tags -H "Content-Type: application/json" -d "{\"title\":\"页面标题\",\"description\":\"页面描述\",\"url\":\"https://example.com\"}"
```

**5. 生成站点地图**
```cmd
curl -X POST http://localhost:3000/api/generate-sitemap -H "Content-Type: application/json" -d "{\"urls\":[{\"loc\":\"/\",\"changefreq\":\"daily\",\"priority\":1.0}],\"baseUrl\":\"https://example.com\"}"
```

---

#### 方法 3: 网页界面（最直观）

在浏览器中打开：
```
http://localhost:3000
```

你会看到一个漂亮的网页界面，可以直接在网页上使用所有功能！

---

## 📂 查看生成的文件

### 在 Windows 资源管理器中：

1. 打开项目文件夹
2. 找到 `output` 文件夹
3. 里面包含：
   - `articles\` - 生成的文章（HTML 文件）
   - `reports\` - SEO 审计报告（HTML 和 JSON）
   - `sitemaps\` - 站点地图（XML 文件）
   - `meta-tags\` - Meta 标签（HTML 文件）

### 在 CMD 中查看：

```cmd
# 查看文章
dir output\articles

# 查看报告
dir output\reports

# 查看所有文件
dir output\* /s
```

### 打开文件：

**查看 HTML 文件：**
```cmd
# 用默认浏览器打开最新的 SEO 报告
start output\reports\*.html
```

**查看文本内容：**
```cmd
type output\articles\文件名.html
```

---

## 🎯 完整使用示例

### 示例 1: 生成一篇博客文章

1. 启动服务器（双击 `启动服务器.bat`）
2. 打开新 CMD 窗口
3. 运行 `seo-tool.bat`
4. 选择 `1` (生成文章)
5. 输入：
   - 主题：`Python 编程入门教程`
   - 关键词：`Python,编程,入门`
   - 字数：`2000`
6. 等待生成完成
7. 查看文件：打开 `output\articles` 文件夹

### 示例 2: 分析文章关键词密度

1. 运行 `seo-tool.bat`
2. 选择 `2` (分析关键词)
3. 输入文本和关键词
4. 查看分析结果

### 示例 3: 生成完整的网站 SEO 包

创建一个批处理脚本 `生成SEO包.bat`：

```batch
@echo off
echo 生成完整 SEO 包...

echo 1. 生成文章...
curl -s -X POST http://localhost:3000/api/generate-article -H "Content-Type: application/json" -d "{\"topic\":\"我的主题\",\"keywords\":[\"关键词1\"],\"targetWordCount\":1500}"

echo.
echo 2. 生成 Meta 标签...
curl -s -X POST http://localhost:3000/api/generate-meta-tags -H "Content-Type: application/json" -d "{\"title\":\"我的标题\",\"description\":\"我的描述\",\"url\":\"https://example.com\"}"

echo.
echo 3. 生成站点地图...
curl -s -X POST http://localhost:3000/api/generate-sitemap -H "Content-Type: application/json" -d "{\"urls\":[{\"loc\":\"/\",\"changefreq\":\"daily\",\"priority\":1.0}],\"baseUrl\":\"https://example.com\"}"

echo.
echo 完成！查看 output 文件夹
pause
```

---

## ⚠️ 常见问题

### 1. "curl 不是内部或外部命令"

**解决方法：**

**选项 A：** 使用 Windows 10/11 自带的 curl（推荐）
```cmd
# Windows 10 1803 及以上版本自带 curl
curl --version
```

**选项 B：** 安装 curl
- 下载：https://curl.se/windows/
- 或使用 PowerShell 替代（见下方）

**选项 C：** 使用 PowerShell
```powershell
Invoke-WebRequest -Uri http://localhost:3000/api/generate-article -Method POST -ContentType "application/json" -Body '{"topic":"主题","keywords":["关键词"],"targetWordCount":1500}'
```

### 2. "端口 3000 被占用"

修改 `server.js` 中的端口：
```javascript
const PORT = process.env.PORT || 3001;  // 改成 3001 或其他端口
```

### 3. "服务器启动失败"

检查 Node.js 是否安装：
```cmd
node --version
```

如果未安装，下载：https://nodejs.org/

### 4. "找不到生成的文件"

文件保存在项目根目录的 `output` 文件夹：
```cmd
cd /d %~dp0
dir output /s
```

---

## 🔧 高级用法

### 批量生成多篇文章

创建 `批量生成.bat`：

```batch
@echo off
setlocal enabledelayedexpansion

set topics=人工智能,机器学习,深度学习,自然语言处理

for %%t in (%topics%) do (
    echo 生成文章: %%t
    curl -s -X POST http://localhost:3000/api/generate-article -H "Content-Type: application/json" -d "{\"topic\":\"%%t\",\"keywords\":[\"AI\"],\"targetWordCount\":1500}"
    echo.
)

echo 全部完成！
pause
```

### 定时任务

使用 Windows 任务计划程序：
1. 打开"任务计划程序"
2. 创建基本任务
3. 设置触发器（如每天早上 9:00）
4. 操作：启动程序 → 选择你的批处理脚本

---

## 📊 查看统计

创建 `统计.bat`：

```batch
@echo off
echo === SEO 工具使用统计 ===
echo.

for /f %%i in ('dir /b output\articles 2^>nul ^| find /c /v ""') do set article_count=%%i
for /f %%i in ('dir /b output\reports 2^>nul ^| find /c /v ""') do set report_count=%%i
for /f %%i in ('dir /b output\sitemaps 2^>nul ^| find /c /v ""') do set sitemap_count=%%i

echo 文章数量: %article_count%
echo 报告数量: %report_count%
echo 站点地图: %sitemap_count%
echo.

pause
```

---

## 💡 提示

1. **保持服务器运行**：在使用工具时，确保 `启动服务器.bat` 窗口保持打开
2. **文件位置**：所有生成的文件都在 `output` 文件夹中
3. **浏览器查看**：HTML 报告双击即可用浏览器打开，非常漂亮！
4. **备份文件**：文件名包含时间戳，不会互相覆盖
5. **中文支持**：批处理脚本已设置 UTF-8 编码，支持中文

---

## 🆘 获取帮助

遇到问题？尝试：

1. 重启服务器（关闭并重新运行 `启动服务器.bat`）
2. 检查 CMD 是否以管理员身份运行
3. 确认 Node.js 已正确安装
4. 查看完整文档：`使用指南.md`

---

## 📞 快速命令参考

```cmd
# 启动服务器
启动服务器.bat

# 使用图形菜单
seo-tool.bat

# 查看文件
dir output\* /s

# 打开输出文件夹
start output

# 用浏览器打开最新报告
start output\reports\*.html
```

---

**现在就开始使用吧！** 🚀

1. 双击运行 `启动服务器.bat`
2. 打开新 CMD，运行 `seo-tool.bat`
3. 选择你想要的功能
4. 享受自动化的 SEO 内容生成！
