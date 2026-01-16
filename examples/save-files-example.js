/**
 * SEO Tool - File Saving Examples
 * This file demonstrates how to save generated SEO content to files
 */

import seoTool from '../src/index.js';

const {
  generators: { article, metaTags, sitemap },
  analyzers: { content }
} = seoTool;

console.log('=== SEO Tool - File Saving Examples ===\n');

// ============================================
// 1. Generate and Save Article
// ============================================
console.log('1. Generate and Save Article');
console.log('----------------------------');

const articleConfig = {
  topic: 'Complete Guide to SEO in 2026',
  keywords: ['SEO', 'search optimization', 'digital marketing', 'content strategy'],
  targetWordCount: 1200,
  sections: 5,
  includeImages: true
};

const articleResult = article.generateAndSave(articleConfig);

console.log('Article Generated and Saved!');
console.log('Title:', articleResult.article.outline.title);
console.log('Saved to:', articleResult.saved.filepath);
console.log('File size:', articleResult.saved.size, 'bytes');
console.log('\n');

// ============================================
// 2. Generate and Save Meta Tags
// ============================================
console.log('2. Generate and Save Meta Tags');
console.log('------------------------------');

const metaConfig = {
  title: 'Complete Guide to SEO in 2026 | Marketing Hub',
  description: 'Learn the latest SEO strategies for 2026. Comprehensive guide covering technical SEO, content optimization, and link building techniques.',
  keywords: ['SEO 2026', 'search optimization', 'digital marketing'],
  author: 'SEO Expert',
  url: 'https://marketinghub.com/seo-guide-2026',
  image: 'https://marketinghub.com/images/seo-guide.jpg',
  siteName: 'Marketing Hub'
};

const metaResult = metaTags.generateAndSaveMetaTags(metaConfig);

console.log('Meta Tags Generated and Saved!');
console.log('Saved to:', metaResult.saved.filepath);
console.log('File size:', metaResult.saved.size, 'bytes');
console.log('\n');

// ============================================
// 3. Generate and Save Structured Data
// ============================================
console.log('3. Generate and Save Structured Data');
console.log('------------------------------------');

const structuredDataConfig = {
  type: 'Article',
  headline: 'Complete Guide to SEO in 2026',
  description: 'Comprehensive SEO guide for modern digital marketing',
  author: 'SEO Expert',
  datePublished: '2026-01-15',
  image: 'https://marketinghub.com/images/seo-guide.jpg',
  url: 'https://marketinghub.com/seo-guide-2026',
  publisher: {
    name: 'Marketing Hub',
    logo: 'https://marketinghub.com/logo.png'
  }
};

const structuredDataResult = metaTags.generateAndSaveStructuredData(structuredDataConfig);

console.log('Structured Data Generated and Saved!');
console.log('Saved to:', structuredDataResult.saved.filepath);
console.log('File size:', structuredDataResult.saved.size, 'bytes');
console.log('\n');

// ============================================
// 4. Generate and Save Sitemap
// ============================================
console.log('4. Generate and Save Sitemap');
console.log('----------------------------');

const sitemapUrls = [
  { loc: '/', changefreq: 'daily', priority: 1.0, lastmod: new Date() },
  { loc: '/blog', changefreq: 'weekly', priority: 0.9 },
  { loc: '/seo-guide-2026', changefreq: 'monthly', priority: 0.8 },
  { loc: '/about', changefreq: 'monthly', priority: 0.7 },
  { loc: '/contact', changefreq: 'monthly', priority: 0.6 }
];

const sitemapResult = sitemap.generateAndSaveSitemap(
  sitemapUrls,
  { baseUrl: 'https://marketinghub.com' }
);

console.log('Sitemap Generated and Saved!');
console.log('Saved to:', sitemapResult.saved.filepath);
console.log('File size:', sitemapResult.saved.size, 'bytes');
console.log('\n');

// ============================================
// 5. Generate and Save robots.txt
// ============================================
console.log('5. Generate and Save robots.txt');
console.log('-------------------------------');

const robotsConfig = {
  sitemapUrl: 'https://marketinghub.com/sitemap.xml',
  userAgents: [
    {
      name: '*',
      allow: ['/'],
      disallow: ['/admin/', '/private/', '/api/']
    }
  ]
};

const robotsResult = sitemap.generateAndSaveRobotsTxt(robotsConfig);

console.log('robots.txt Generated and Saved!');
console.log('Saved to:', robotsResult.saved.filepath);
console.log('File size:', robotsResult.saved.size, 'bytes');
console.log('\n');

// ============================================
// 6. Perform SEO Audit and Save Reports
// ============================================
console.log('6. Perform SEO Audit and Save Reports');
console.log('-------------------------------------');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Complete Guide to SEO in 2026</title>
  <meta name="description" content="Learn the latest SEO strategies for 2026 including technical SEO, content optimization, and link building.">
  <meta name="keywords" content="SEO, search optimization, digital marketing">
</head>
<body>
  <h1>Complete Guide to SEO in 2026</h1>

  <p>Search Engine Optimization (SEO) continues to evolve. In 2026, staying ahead requires understanding the latest trends and best practices.</p>

  <h2>Understanding SEO Fundamentals</h2>
  <p>SEO is the practice of optimizing your website to rank higher in search engine results. It involves both technical and content-focused strategies.</p>

  <h2>Technical SEO Best Practices</h2>
  <p>Technical SEO ensures search engines can crawl and index your site effectively. This includes site speed, mobile-friendliness, and proper URL structure.</p>

  <h2>Content Optimization Strategies</h2>
  <p>Quality content is essential for SEO success. Focus on creating valuable, relevant content that answers user queries.</p>

  <h2>Link Building Techniques</h2>
  <p>Building high-quality backlinks remains a crucial ranking factor. Focus on earning links from authoritative, relevant sources.</p>

  <img src="seo-diagram.jpg" alt="SEO Strategy Diagram">
  <img src="analytics-chart.jpg" alt="SEO Analytics Chart">
</body>
</html>
`;

const auditResult = content.auditAndSave(htmlContent, 'SEO', 'seo-guide-2026-audit');

console.log('SEO Audit Complete and Saved!');
console.log('Overall Score:', auditResult.report.overallScore + '/100');
console.log('Grade:', auditResult.report.grade);
console.log('JSON Report saved to:', auditResult.saved.json.filepath);
console.log('HTML Report saved to:', auditResult.saved.html.filepath);
console.log('\n');

// ============================================
// Summary
// ============================================
console.log('=== Summary ===');
console.log('All files have been generated and saved to the output/ directory:');
console.log('- output/articles/       - Generated articles');
console.log('- output/sitemaps/       - XML sitemaps and robots.txt');
console.log('- output/meta-tags/      - Meta tags and structured data');
console.log('- output/reports/        - SEO audit reports (JSON and HTML)');
console.log('\nYou can open the HTML files in a browser to view them!');
