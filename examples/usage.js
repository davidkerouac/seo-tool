/**
 * SEO Tool - Usage Examples
 * This file demonstrates how to use the various SEO tools
 */

import seoTool from '../src/index.js';

const {
  generators: { article, metaTags, sitemap },
  analyzers: { keyword, content }
} = seoTool;

console.log('=== SEO Tool Usage Examples ===\n');

// ============================================
// 1. Generate SEO-Optimized Article
// ============================================
console.log('1. Generating SEO-Optimized Article');
console.log('-----------------------------------');

const articleConfig = {
  topic: 'Digital Marketing Strategies',
  keywords: ['digital marketing', 'SEO optimization', 'content marketing', 'social media marketing'],
  targetWordCount: 1500,
  sections: 4,
  includeImages: true
};

const generatedArticle = article.generateArticle(articleConfig);

console.log('Title:', generatedArticle.outline.title);
console.log('Meta Description:', generatedArticle.outline.metaDescription);
console.log('Number of Sections:', generatedArticle.metadata.sections);
console.log('Estimated Word Count:', generatedArticle.metadata.estimatedWordCount);
console.log('\nSEO Tips:');
generatedArticle.seoTips.slice(0, 3).forEach((tip, i) => {
  console.log(`  ${i + 1}. ${tip}`);
});
console.log('\n');

// ============================================
// 2. Keyword Analysis
// ============================================
console.log('2. Keyword Analysis');
console.log('-------------------');

const sampleText = `
  Digital marketing is essential for modern businesses. Digital marketing strategies
  include SEO, content marketing, and social media. Effective digital marketing
  requires understanding your audience and creating valuable content. Digital marketing
  tools can help automate and optimize your campaigns.
`;

const keywordDensity = keyword.analyzeKeywordDensity(sampleText, 'digital marketing');

console.log('Keyword:', keywordDensity.keyword);
console.log('Total Words:', keywordDensity.totalWords);
console.log('Keyword Count:', keywordDensity.keywordCount);
console.log('Density:', keywordDensity.density + '%');
console.log('Recommendation:', keywordDensity.recommendation);
console.log('\n');

// ============================================
// 3. Extract Top Keywords
// ============================================
console.log('3. Top Keywords Extraction');
console.log('--------------------------');

const topKeywords = keyword.extractTopKeywords(sampleText, 5);

console.log('Top Keywords:');
topKeywords.forEach((kw, i) => {
  console.log(`  ${i + 1}. "${kw.word}" - Count: ${kw.count}, Frequency: ${kw.frequency}`);
});
console.log('\n');

// ============================================
// 4. Generate Meta Tags
// ============================================
console.log('4. Generate Meta Tags');
console.log('---------------------');

const metaConfig = {
  title: 'Digital Marketing Strategies for 2026 | Complete Guide',
  description: 'Discover the best digital marketing strategies for 2026. Learn SEO, content marketing, and social media tactics to grow your business.',
  keywords: ['digital marketing', 'SEO', 'content marketing', 'social media'],
  author: 'Marketing Expert',
  url: 'https://example.com/digital-marketing-guide',
  image: 'https://example.com/images/digital-marketing.jpg',
  siteName: 'Marketing Hub'
};

const generatedMetaTags = metaTags.generateMetaTags(metaConfig);

console.log('Generated Meta Tags:');
console.log(generatedMetaTags.split('\n').slice(0, 8).join('\n'));
console.log('...\n');

// Validate meta description
const descValidation = metaTags.validateMetaDescription(metaConfig.description);
console.log('Meta Description Validation:');
console.log('  Length:', descValidation.length, 'characters');
console.log('  Status:', descValidation.status);
console.log('  Message:', descValidation.message);
console.log('\n');

// ============================================
// 5. Generate Structured Data
// ============================================
console.log('5. Generate Structured Data (Schema.org)');
console.log('----------------------------------------');

const structuredDataConfig = {
  type: 'Article',
  headline: 'Digital Marketing Strategies for 2026',
  description: 'Complete guide to digital marketing strategies',
  author: 'Marketing Expert',
  datePublished: '2026-01-15',
  image: 'https://example.com/images/digital-marketing.jpg',
  url: 'https://example.com/digital-marketing-guide',
  publisher: {
    name: 'Marketing Hub',
    logo: 'https://example.com/logo.png'
  }
};

const structuredData = metaTags.generateStructuredData(structuredDataConfig);
console.log('Structured Data Generated:');
console.log(structuredData.split('\n').slice(0, 6).join('\n'));
console.log('...\n');

// ============================================
// 6. Content Analysis & SEO Audit
// ============================================
console.log('6. Content SEO Audit');
console.log('--------------------');

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Digital Marketing Guide</title>
  <meta name="description" content="Learn digital marketing strategies for your business success.">
</head>
<body>
  <h1>Digital Marketing Strategies</h1>
  <p>Digital marketing is crucial for business growth.</p>

  <h2>SEO Optimization</h2>
  <p>Search engine optimization helps improve visibility.</p>

  <h2>Content Marketing</h2>
  <p>Creating valuable content attracts and engages customers.</p>

  <img src="marketing.jpg" alt="Digital Marketing">
</body>
</html>
`;

const auditReport = content.performSEOAudit(htmlContent, 'digital marketing');

console.log('SEO Audit Results:');
console.log('  Overall Score:', auditReport.overallScore + '/' + auditReport.maxScore);
console.log('  Grade:', auditReport.grade);
console.log('\nTop Recommendations:');
auditReport.allRecommendations.slice(0, 3).forEach((rec, i) => {
  console.log(`  ${i + 1}. ${rec}`);
});
console.log('\n');

// ============================================
// 7. Generate Sitemap
// ============================================
console.log('7. Generate XML Sitemap');
console.log('-----------------------');

const sitemapUrls = [
  { loc: '/', changefreq: 'daily', priority: 1.0, lastmod: new Date() },
  { loc: '/blog', changefreq: 'weekly', priority: 0.9 },
  { loc: '/about', changefreq: 'monthly', priority: 0.7 },
  { loc: '/contact', changefreq: 'monthly', priority: 0.6 }
];

const xmlSitemap = sitemap.generateSitemap(sitemapUrls, {
  baseUrl: 'https://example.com'
});

console.log('Sitemap Generated:');
console.log(xmlSitemap.split('\n').slice(0, 10).join('\n'));
console.log('...\n');

// ============================================
// 8. Generate robots.txt
// ============================================
console.log('8. Generate robots.txt');
console.log('----------------------');

const robotsConfig = {
  sitemapUrl: 'https://example.com/sitemap.xml',
  userAgents: [
    {
      name: '*',
      allow: ['/'],
      disallow: ['/admin/', '/private/']
    }
  ]
};

const robotsTxt = sitemap.generateRobotsTxt(robotsConfig);

console.log('robots.txt Content:');
console.log(robotsTxt);
console.log('\n');

// ============================================
// 9. Readability Analysis
// ============================================
console.log('9. Readability Analysis');
console.log('-----------------------');

const articleText = `
  Digital marketing encompasses various strategies and techniques. It includes
  search engine optimization, content creation, and social media management.
  Successful digital marketing requires planning and execution. Understanding
  your target audience is essential. Analytics help measure campaign effectiveness.
`;

const readability = content.analyzeReadability(articleText);

console.log('Readability Metrics:');
console.log('  Total Words:', readability.totalWords);
console.log('  Total Sentences:', readability.totalSentences);
console.log('  Avg Sentence Length:', readability.avgSentenceLength);
console.log('  Readability Level:', readability.readabilityLevel);
console.log('  Recommendation:', readability.recommendation);
console.log('\n');

// ============================================
// 10. Article Optimization Suggestions
// ============================================
console.log('10. Article Optimization');
console.log('------------------------');

const existingHtml = `
<html>
<head>
  <title>Marketing Tips</title>
</head>
<body>
  <h1>Marketing Guide</h1>
  <h1>Another Title</h1>
  <p>Content here...</p>
</body>
</html>
`;

const optimization = article.optimizeArticle(existingHtml, 'marketing');

console.log('Optimization Suggestions:');
console.log('  Total Issues Found:', optimization.totalSuggestions);
optimization.suggestions.forEach((suggestion, i) => {
  console.log(`  ${i + 1}. [${suggestion.priority.toUpperCase()}] ${suggestion.message}`);
});

console.log('\n=== Examples Complete ===');
