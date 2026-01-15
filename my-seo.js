/**
 * 我的SEO工具使用示例
 * 运行方法：node my-seo.js
 */

import seoTool from './src/index.js';

const {
  generators: { article, metaTags, sitemap },
  analyzers: { keyword, content }
} = seoTool;

// ========================================
// 示例1: 生成一篇SEO优化的文章
// ========================================
console.log('=== 生成SEO文章 ===\n');

const myArticle = article.generateArticle({
  topic: '人工智能在教育中的应用',
  keywords: ['人工智能', 'AI教育', '在线学习', '智能辅导'],
  targetWordCount: 2000,
  sections: 5
});

console.log('文章标题:', myArticle.outline.title);
console.log('元描述:', myArticle.outline.metaDescription);
console.log('\n文章结构:');
myArticle.outline.sections.forEach((section, i) => {
  console.log(`  ${i + 1}. ${section.heading}`);
});

// 保存生成的HTML文件
import fs from 'fs';
fs.writeFileSync('generated-article.html', myArticle.html);
console.log('\n✅ 文章已保存到: generated-article.html\n');


// ========================================
// 示例2: 分析一段文本的关键词密度
// ========================================
console.log('=== 关键词密度分析 ===\n');

const myText = `
人工智能正在改变教育行业。人工智能技术可以帮助教师更好地了解学生。
通过人工智能，我们能够提供个性化的学习体验。人工智能驱动的教育平台
越来越受欢迎。未来，人工智能将继续在教育领域发挥重要作用。
`;

const keywordResult = keyword.analyzeKeywordDensity(myText, '人工智能');

console.log('关键词:', keywordResult.keyword);
console.log('总词数:', keywordResult.totalWords);
console.log('关键词出现次数:', keywordResult.keywordCount);
console.log('关键词密度:', keywordResult.density + '%');
console.log('是否最佳:', keywordResult.isOptimal ? '✅' : '❌');
console.log('建议:', keywordResult.recommendation);
console.log();


// ========================================
// 示例3: 提取热门关键词
// ========================================
console.log('=== 提取热门关键词 ===\n');

const topKeywords = keyword.extractTopKeywords(myText, 5);

console.log('热门关键词（前5个）:');
topKeywords.forEach((kw, i) => {
  console.log(`  ${i + 1}. "${kw.word}" - 出现${kw.count}次`);
});
console.log();


// ========================================
// 示例4: 生成网页元标签
// ========================================
console.log('=== 生成元标签 ===\n');

const myMetaTags = metaTags.generateMetaTags({
  title: '人工智能教育平台 - AI驱动的个性化学习',
  description: '探索如何使用人工智能技术改变教育。我们提供AI驱动的个性化学习解决方案，帮助学生提高学习效率。',
  keywords: ['人工智能', 'AI教育', '在线学习'],
  author: '教育科技团队',
  url: 'https://example.com/ai-education',
  image: 'https://example.com/images/ai-education.jpg',
  siteName: 'AI教育平台'
});

console.log('生成的元标签:');
console.log(myMetaTags);
console.log();

// 验证元描述
const descCheck = metaTags.validateMetaDescription(
  '探索如何使用人工智能技术改变教育。我们提供AI驱动的个性化学习解决方案，帮助学生提高学习效率。'
);
console.log('元描述验证:');
console.log('  长度:', descCheck.length, '字符');
console.log('  状态:', descCheck.status);
console.log('  评价:', descCheck.message);
console.log();


// ========================================
// 示例5: SEO审计（分析HTML页面）
// ========================================
console.log('=== SEO审计 ===\n');

const htmlPage = `
<!DOCTYPE html>
<html>
<head>
  <title>AI教育</title>
  <meta name="description" content="AI教育平台">
</head>
<body>
  <h1>人工智能教育</h1>
  <p>欢迎来到AI教育平台。</p>
  <h2>课程介绍</h2>
  <p>我们提供优质的AI课程。</p>
  <img src="course.jpg" alt="AI课程">
</body>
</html>
`;

const auditResult = content.performSEOAudit(htmlPage, '人工智能');

console.log('SEO评分:', auditResult.overallScore + '/100');
console.log('等级:', auditResult.grade);
console.log('\n优化建议:');
auditResult.allRecommendations.forEach((rec, i) => {
  if (i < 5) { // 只显示前5条
    console.log(`  ${i + 1}. ${rec}`);
  }
});
console.log();


// ========================================
// 示例6: 生成网站地图
// ========================================
console.log('=== 生成网站地图 ===\n');

const myUrls = [
  { loc: '/', changefreq: 'daily', priority: 1.0 },
  { loc: '/courses', changefreq: 'weekly', priority: 0.9 },
  { loc: '/about', changefreq: 'monthly', priority: 0.7 },
  { loc: '/blog', changefreq: 'weekly', priority: 0.8 },
  { loc: '/contact', changefreq: 'monthly', priority: 0.6 }
];

const mySitemap = sitemap.generateSitemap(myUrls, {
  baseUrl: 'https://ai-education.com'
});

// 保存sitemap
fs.writeFileSync('sitemap.xml', mySitemap);
console.log('✅ 网站地图已保存到: sitemap.xml\n');


// ========================================
// 示例7: 生成 robots.txt
// ========================================
console.log('=== 生成 robots.txt ===\n');

const myRobotsTxt = sitemap.generateRobotsTxt({
  sitemapUrl: 'https://ai-education.com/sitemap.xml',
  userAgents: [
    {
      name: '*',
      allow: ['/'],
      disallow: ['/admin/', '/private/', '/api/']
    }
  ]
});

fs.writeFileSync('robots.txt', myRobotsTxt);
console.log(myRobotsTxt);
console.log('\n✅ robots.txt 已保存到: robots.txt\n');


console.log('=== 所有示例完成！ ===');
console.log('\n生成的文件:');
console.log('  📄 generated-article.html - 生成的文章');
console.log('  📄 sitemap.xml - 网站地图');
console.log('  📄 robots.txt - 机器人协议');
