/**
 * 简单使用示例 - 修改这个文件来生成你自己的内容
 */

import seoTool from './src/index.js';

const { generators, analyzers } = seoTool;

console.log('🚀 开始生成 SEO 内容...\n');

// ====================================
// 1. 生成并保存文章
// ====================================
console.log('📝 正在生成文章...');

const articleResult = generators.article.generateAndSave({
  topic: '如何学习编程',  // 👈 修改这里：你的文章主题
  keywords: ['编程', 'JavaScript', 'Python', '学习方法'],  // 👈 修改这里：关键词
  targetWordCount: 1500,  // 👈 修改这里：目标字数
  sections: 5  // 👈 修改这里：章节数量
});

console.log('✅ 文章已生成！');
console.log('   保存位置:', articleResult.saved.filepath);
console.log('   文件大小:', articleResult.saved.size, '字节\n');

// ====================================
// 2. 生成并保存 Meta 标签
// ====================================
console.log('🏷️  正在生成 Meta 标签...');

const metaResult = generators.metaTags.generateAndSaveMetaTags({
  title: '如何学习编程 | 编程教程网',  // 👈 修改这里：网页标题
  description: '完整的编程学习指南，包含 JavaScript 和 Python 教程，适合初学者的学习方法和实践建议。',  // 👈 修改这里：描述
  keywords: ['编程', 'JavaScript', 'Python'],
  url: 'https://example.com/how-to-learn-programming',  // 👈 修改这里：网页URL
  author: '编程导师',  // 👈 修改这里：作者名
  siteName: '编程教程网'
});

console.log('✅ Meta 标签已生成！');
console.log('   保存位置:', metaResult.saved.filepath);
console.log('   文件大小:', metaResult.saved.size, '字节\n');

// ====================================
// 3. 生成并保存站点地图
// ====================================
console.log('🗺️  正在生成站点地图...');

const sitemapResult = generators.sitemap.generateAndSaveSitemap(
  [
    { loc: '/', changefreq: 'daily', priority: 1.0 },
    { loc: '/tutorials', changefreq: 'weekly', priority: 0.9 },
    { loc: '/about', changefreq: 'monthly', priority: 0.7 },
    // 👈 在这里添加更多页面
  ],
  { baseUrl: 'https://example.com' }  // 👈 修改这里：你的网站域名
);

console.log('✅ 站点地图已生成！');
console.log('   保存位置:', sitemapResult.saved.filepath);
console.log('   文件大小:', sitemapResult.saved.size, '字节\n');

// ====================================
// 4. SEO 审计（分析现有网页）
// ====================================
console.log('🔍 正在执行 SEO 审计...');

// 这里放你想分析的 HTML 内容
const myHtmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <title>如何学习编程</title>
  <meta name="description" content="完整的编程学习指南">
</head>
<body>
  <h1>如何学习编程</h1>
  <p>编程是一项重要的技能...</p>
  <h2>选择编程语言</h2>
  <p>Python 和 JavaScript 是初学者的好选择...</p>
</body>
</html>
`;

const auditResult = analyzers.content.auditAndSave(
  myHtmlContent,
  '编程',  // 👈 修改这里：主要关键词
  'my-website-audit'  // 👈 修改这里：报告名称
);

console.log('✅ SEO 审计完成！');
console.log('   评分:', auditResult.report.overallScore + '/100');
console.log('   等级:', auditResult.report.grade);
console.log('   JSON 报告:', auditResult.saved.json.filepath);
console.log('   HTML 报告:', auditResult.saved.html.filepath);

// ====================================
// 完成总结
// ====================================
console.log('\n🎉 全部完成！');
console.log('\n📁 生成的文件位置:');
console.log('   output/articles/  - 文章文件');
console.log('   output/meta-tags/ - Meta 标签');
console.log('   output/sitemaps/  - 站点地图');
console.log('   output/reports/   - SEO 报告');
console.log('\n💡 提示: 用浏览器打开 .html 文件可以查看效果！');
