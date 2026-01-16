@echo off
chcp 65001 >nul
echo ================================
echo    SEO 工具 - Windows 版本
echo ================================
echo.

:menu
echo 请选择功能:
echo.
echo [1] 生成文章
echo [2] 分析关键词
echo [3] SEO 审计
echo [4] 生成 Meta 标签
echo [5] 生成站点地图
echo [6] 查看所有生成的文件
echo [0] 退出
echo.
set /p choice=请输入选项 (0-6):

if "%choice%"=="1" goto generate_article
if "%choice%"=="2" goto analyze_keywords
if "%choice%"=="3" goto seo_audit
if "%choice%"=="4" goto generate_meta
if "%choice%"=="5" goto generate_sitemap
if "%choice%"=="6" goto list_files
if "%choice%"=="0" goto end
echo 无效选项，请重试
goto menu

:generate_article
echo.
echo === 生成文章 ===
set /p topic=文章主题:
set /p keywords=关键词（用逗号分隔）:
set /p words=目标字数 (默认1500):
if "%words%"=="" set words=1500

echo.
echo 正在生成文章...
curl -s -X POST http://localhost:3000/api/generate-article -H "Content-Type: application/json" -d "{\"topic\":\"%topic%\",\"keywords\":[\"%keywords%\"],\"targetWordCount\":%words%,\"sections\":5}"

echo.
echo.
pause
goto menu

:analyze_keywords
echo.
echo === 分析关键词 ===
set /p text=输入要分析的文本:
set /p keyword=目标关键词:

echo.
echo 正在分析...
curl -s -X POST http://localhost:3000/api/analyze-keywords -H "Content-Type: application/json" -d "{\"text\":\"%text%\",\"keyword\":\"%keyword%\"}"

echo.
echo.
pause
goto menu

:seo_audit
echo.
echo === SEO 审计 ===
echo 请输入 HTML 文件路径，或输入简单的 HTML 代码:
set /p html=HTML:
set /p keyword=主要关键词:

echo.
echo 正在执行审计...
curl -s -X POST http://localhost:3000/api/seo-audit -H "Content-Type: application/json" -d "{\"html\":\"%html%\",\"keyword\":\"%keyword%\",\"name\":\"audit\"}"

echo.
echo.
pause
goto menu

:generate_meta
echo.
echo === 生成 Meta 标签 ===
set /p title=页面标题:
set /p desc=页面描述:
set /p url=网站URL:

echo.
echo 正在生成 Meta 标签...
curl -s -X POST http://localhost:3000/api/generate-meta-tags -H "Content-Type: application/json" -d "{\"title\":\"%title%\",\"description\":\"%desc%\",\"url\":\"%url%\"}"

echo.
echo.
pause
goto menu

:generate_sitemap
echo.
echo === 生成站点地图 ===
set /p baseurl=网站域名 (如 https://example.com):

echo.
echo 正在生成站点地图...
curl -s -X POST http://localhost:3000/api/generate-sitemap -H "Content-Type: application/json" -d "{\"urls\":[{\"loc\":\"/\",\"changefreq\":\"daily\",\"priority\":1.0}],\"baseUrl\":\"%baseurl%\"}"

echo.
echo.
pause
goto menu

:list_files
echo.
echo === 生成的文件 ===
echo.
echo 文章:
dir /b output\articles 2>nul || echo   (暂无文件)
echo.
echo SEO 报告:
dir /b output\reports 2>nul || echo   (暂无文件)
echo.
echo 站点地图:
dir /b output\sitemaps 2>nul || echo   (暂无文件)
echo.
echo Meta 标签:
dir /b output\meta-tags 2>nul || echo   (暂无文件)
echo.
pause
goto menu

:end
echo 再见！
exit /b
