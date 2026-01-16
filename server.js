/**
 * SEO Tool Web Server
 * 简单的 Web 服务器，提供网页界面和 API
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import seoTool from './src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { generators, analyzers } = seoTool;

const PORT = process.env.PORT || 3000;

// 创建 HTTP 服务器
const server = http.createServer(async (req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 路由处理
  if (req.url === '/' || req.url === '/index.html') {
    // 提供主页
    serveStaticFile(res, path.join(__dirname, 'public', 'index.html'), 'text/html');
  } else if (req.url.startsWith('/public/')) {
    // 提供静态文件
    serveStaticFile(res, path.join(__dirname, req.url), getContentType(req.url));
  } else if (req.url === '/api/generate-article' && req.method === 'POST') {
    // API: 生成文章
    await handleGenerateArticle(req, res);
  } else if (req.url === '/api/generate-meta-tags' && req.method === 'POST') {
    // API: 生成 Meta 标签
    await handleGenerateMetaTags(req, res);
  } else if (req.url === '/api/generate-sitemap' && req.method === 'POST') {
    // API: 生成站点地图
    await handleGenerateSitemap(req, res);
  } else if (req.url === '/api/seo-audit' && req.method === 'POST') {
    // API: SEO 审计
    await handleSEOAudit(req, res);
  } else if (req.url === '/api/analyze-keywords' && req.method === 'POST') {
    // API: 关键词分析
    await handleAnalyzeKeywords(req, res);
  } else {
    // 404
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  }
});

// 提供静态文件
function serveStaticFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

// 获取内容类型
function getContentType(filePath) {
  const ext = path.extname(filePath);
  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };
  return types[ext] || 'text/plain';
}

// 读取请求 Body
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

// API: 生成文章
async function handleGenerateArticle(req, res) {
  try {
    const data = await getRequestBody(req);
    const { topic, keywords, targetWordCount, sections } = data;

    const result = generators.article.generateAndSave({
      topic: topic || '默认主题',
      keywords: keywords || ['关键词'],
      targetWordCount: parseInt(targetWordCount) || 1500,
      sections: parseInt(sections) || 5
    });

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      success: true,
      data: {
        title: result.article.outline.title,
        html: result.article.html,
        filepath: result.saved.filepath,
        size: result.saved.size
      }
    }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
}

// API: 生成 Meta 标签
async function handleGenerateMetaTags(req, res) {
  try {
    const data = await getRequestBody(req);
    const { title, description, keywords, url, author, siteName } = data;

    const result = generators.metaTags.generateAndSaveMetaTags({
      title: title || '默认标题',
      description: description || '默认描述',
      keywords: keywords || [],
      url: url || '',
      author: author || '',
      siteName: siteName || ''
    });

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      success: true,
      data: {
        metaTags: result.metaTags,
        filepath: result.saved.filepath,
        size: result.saved.size
      }
    }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
}

// API: 生成站点地图
async function handleGenerateSitemap(req, res) {
  try {
    const data = await getRequestBody(req);
    const { urls, baseUrl } = data;

    const result = generators.sitemap.generateAndSaveSitemap(
      urls || [{ loc: '/', changefreq: 'daily', priority: 1.0 }],
      { baseUrl: baseUrl || 'https://example.com' }
    );

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      success: true,
      data: {
        sitemap: result.sitemap,
        filepath: result.saved.filepath,
        size: result.saved.size
      }
    }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
}

// API: SEO 审计
async function handleSEOAudit(req, res) {
  try {
    const data = await getRequestBody(req);
    const { html, keyword, name } = data;

    const result = analyzers.content.auditAndSave(
      html || '<html></html>',
      keyword || '',
      name || 'seo-audit'
    );

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      success: true,
      data: {
        score: result.report.overallScore,
        grade: result.report.grade,
        recommendations: result.report.allRecommendations,
        jsonPath: result.saved.json.filepath,
        htmlPath: result.saved.html.filepath
      }
    }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
}

// API: 关键词分析
async function handleAnalyzeKeywords(req, res) {
  try {
    const data = await getRequestBody(req);
    const { text, keyword } = data;

    const density = analyzers.keyword.analyzeKeywordDensity(text, keyword);
    const topKeywords = analyzers.keyword.extractTopKeywords(text, 10);

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      success: true,
      data: {
        density,
        topKeywords
      }
    }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: false, error: error.message }));
  }
}

// 启动服务器
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                  🚀 SEO Tool Web Server                    ║
╚════════════════════════════════════════════════════════════╝

✅ 服务器已启动！

🌐 访问地址: http://localhost:${PORT}
📝 API 端点:
   - POST /api/generate-article      生成文章
   - POST /api/generate-meta-tags    生成 Meta 标签
   - POST /api/generate-sitemap      生成站点地图
   - POST /api/seo-audit             SEO 审计
   - POST /api/analyze-keywords      关键词分析

💡 提示: 在浏览器中打开 http://localhost:${PORT} 使用网页界面

按 Ctrl+C 停止服务器
  `);
});
