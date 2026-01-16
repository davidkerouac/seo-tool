# SEO Tool

A comprehensive SEO toolkit for content generation, optimization, and analysis. Generate SEO-optimized articles, analyze keyword density, create meta tags, generate sitemaps, and perform complete SEO audits.

## Features

### 🚀 Content Generation
- **SEO-Optimized Article Generator**: Create well-structured articles with proper heading hierarchy
- **Article Outline Generator**: Generate comprehensive outlines with sections and subsections
- **Meta Tag Generator**: Create complete meta tags for social media and search engines
- **Structured Data Generator**: Generate Schema.org JSON-LD for better search visibility

### 📊 Content Analysis
- **Keyword Density Analyzer**: Analyze keyword usage and get optimization recommendations
- **Top Keywords Extraction**: Identify the most frequently used keywords in content
- **Readability Analysis**: Measure content readability and get improvement suggestions
- **SEO Audit**: Comprehensive SEO analysis with scoring and recommendations

### 🛠️ SEO Tools
- **XML Sitemap Generator**: Create valid XML sitemaps for search engines
- **robots.txt Generator**: Generate robots.txt files with custom rules
- **Meta Description Validator**: Check if meta descriptions are optimal length
- **Content Structure Analyzer**: Analyze HTML structure and heading hierarchy

### 💾 File Management
- **Automatic File Saving**: Save all generated content to organized directories
- **HTML Report Generation**: Generate beautiful HTML reports for SEO audits
- **JSON Export**: Export analysis results in JSON format
- **File Organization**: Automatic organization of articles, sitemaps, meta tags, and reports

## Installation

```bash
npm install
```

## Usage

### Quick Start

```javascript
import seoTool from './src/index.js';

const {
  generators: { article, metaTags, sitemap },
  analyzers: { keyword, content }
} = seoTool;

// Generate an article
const generatedArticle = article.generateArticle({
  topic: 'Digital Marketing',
  keywords: ['SEO', 'content marketing', 'social media'],
  targetWordCount: 1500,
  sections: 5
});

console.log(generatedArticle.html);
```

### Generate SEO-Optimized Article

```javascript
import { articleGenerator } from './src/index.js';

const config = {
  topic: 'Digital Marketing Strategies',
  keywords: ['digital marketing', 'SEO', 'content marketing'],
  targetWordCount: 1500,
  sections: 4,
  includeImages: true
};

const article = articleGenerator.generateArticle(config);

// Access generated content
console.log('Title:', article.outline.title);
console.log('Meta Description:', article.outline.metaDescription);
console.log('HTML:', article.html);
console.log('SEO Tips:', article.seoTips);
```

### Analyze Keyword Density

```javascript
import { keywordAnalyzer } from './src/index.js';

const text = "Your content here...";
const keyword = "SEO";

const analysis = keywordAnalyzer.analyzeKeywordDensity(text, keyword);

console.log('Keyword Density:', analysis.density + '%');
console.log('Recommendation:', analysis.recommendation);
console.log('Is Optimal:', analysis.isOptimal);
```

### Generate Meta Tags

```javascript
import { metaTagGenerator } from './src/index.js';

const config = {
  title: 'Your Page Title',
  description: 'Your page description',
  keywords: ['keyword1', 'keyword2'],
  url: 'https://example.com',
  image: 'https://example.com/image.jpg',
  siteName: 'Your Site Name'
};

const metaTags = metaTagGenerator.generateMetaTags(config);
console.log(metaTags);
```

### Perform SEO Audit

```javascript
import { contentAnalyzer } from './src/index.js';

const htmlContent = "<html>...</html>";
const mainKeyword = "SEO";

const audit = contentAnalyzer.performSEOAudit(htmlContent, mainKeyword);

console.log('Overall Score:', audit.overallScore + '/100');
console.log('Grade:', audit.grade);
console.log('Recommendations:', audit.allRecommendations);
```

### Generate XML Sitemap

```javascript
import { sitemapGenerator } from './src/index.js';

const urls = [
  { loc: '/', changefreq: 'daily', priority: 1.0 },
  { loc: '/about', changefreq: 'monthly', priority: 0.8 },
  { loc: '/blog', changefreq: 'weekly', priority: 0.9 }
];

const sitemap = sitemapGenerator.generateSitemap(urls, {
  baseUrl: 'https://example.com'
});

console.log(sitemap);
```

### Generate robots.txt

```javascript
import { sitemapGenerator } from './src/index.js';

const config = {
  sitemapUrl: 'https://example.com/sitemap.xml',
  userAgents: [{
    name: '*',
    allow: ['/'],
    disallow: ['/admin/', '/private/']
  }]
};

const robotsTxt = sitemapGenerator.generateRobotsTxt(config);
console.log(robotsTxt);
```

### Save Generated Content to Files

All generators support saving content directly to files:

```javascript
import seoTool from './src/index.js';

const { generators, analyzers } = seoTool;

// Generate and save article
const articleResult = generators.article.generateAndSave({
  topic: 'SEO Best Practices',
  keywords: ['SEO', 'optimization'],
  targetWordCount: 1500
});

console.log('Article saved to:', articleResult.saved.filepath);

// Generate and save meta tags
const metaResult = generators.metaTags.generateAndSaveMetaTags({
  title: 'My Page Title',
  description: 'My page description',
  url: 'https://example.com'
});

console.log('Meta tags saved to:', metaResult.saved.filepath);

// Generate and save sitemap
const sitemapResult = generators.sitemap.generateAndSaveSitemap(
  [
    { loc: '/', changefreq: 'daily', priority: 1.0 },
    { loc: '/about', changefreq: 'monthly', priority: 0.8 }
  ],
  { baseUrl: 'https://example.com' }
);

console.log('Sitemap saved to:', sitemapResult.saved.filepath);

// Perform SEO audit and save reports (JSON + HTML)
const auditResult = analyzers.content.auditAndSave(
  htmlContent,
  'SEO',
  'my-page-audit'
);

console.log('JSON report:', auditResult.saved.json.filepath);
console.log('HTML report:', auditResult.saved.html.filepath);
```

### Output Directory Structure

All generated files are automatically saved to the `output/` directory:

```
output/
├── articles/           # Generated SEO-optimized articles
├── sitemaps/          # XML sitemaps and robots.txt files
├── meta-tags/         # Meta tags and structured data
└── reports/           # SEO audit reports (JSON and HTML)
```

Files are automatically named with timestamps to prevent overwriting.

## API Reference

### Article Generator

#### `generateArticle(config)`
Generates a complete SEO-optimized article.

**Parameters:**
- `topic` (string): Main topic of the article
- `keywords` (array): Array of keywords to optimize for
- `targetWordCount` (number): Target word count (default: 1500)
- `sections` (number): Number of main sections (default: 5)
- `includeImages` (boolean): Whether to suggest images (default: true)

**Returns:** Object with `outline`, `html`, `metadata`, and `seoTips`

#### `generateOutline(topic, keywords, sections)`
Generates an article outline with heading structure.

#### `optimizeArticle(html, keyword)`
Analyzes existing article and provides optimization suggestions.

#### `saveArticle(article, options)`
Saves generated article to file.

**Parameters:**
- `article` (object): Generated article object
- `options` (object): Save options including `filename`

**Returns:** Object with save result including `filepath` and `size`

#### `generateAndSave(config, saveOptions)`
Generates and saves article in one step.

**Returns:** Object with `article` and `saved` result

### Keyword Analyzer

#### `analyzeKeywordDensity(text, keyword)`
Calculates keyword density and provides recommendations.

**Returns:** Object with `keyword`, `totalWords`, `keywordCount`, `density`, `recommendation`, `isOptimal`

#### `extractTopKeywords(text, topN)`
Extracts and ranks top keywords from text.

**Parameters:**
- `text` (string): Text to analyze
- `topN` (number): Number of top keywords to return (default: 10)

**Returns:** Array of keyword objects with `word`, `count`, `frequency`

#### `analyzeKeywordInHeadings(html, keyword)`
Analyzes keyword placement in HTML headings.

### Content Analyzer

#### `analyzeReadability(text)`
Analyzes content readability and complexity.

**Returns:** Object with readability metrics and recommendations

#### `analyzeStructure(html)`
Analyzes HTML content structure (headings, paragraphs, images, links).

#### `analyzeMetaTags(html)`
Analyzes meta tags in HTML content.

#### `performSEOAudit(html, mainKeyword)`
Performs comprehensive SEO audit with scoring.

**Returns:** Object with `overallScore`, `grade`, and detailed analysis

#### `saveReport(report, name)`
Saves SEO audit report to JSON file.

#### `saveHTMLReport(report, name)`
Saves SEO audit report as formatted HTML file.

#### `auditAndSave(html, mainKeyword, name)`
Performs SEO audit and saves both JSON and HTML reports.

**Returns:** Object with `report` and `saved` results (json and html)

### Meta Tag Generator

#### `generateMetaTags(config)`
Generates complete meta tags including Open Graph and Twitter Cards.

#### `generateStructuredData(config)`
Generates Schema.org JSON-LD structured data.

#### `generateFAQStructuredData(faqs)`
Generates FAQ schema markup.

#### `generateBreadcrumbStructuredData(breadcrumbs)`
Generates breadcrumb schema markup.

#### `validateMetaDescription(description)`
Validates meta description length.

#### `validateTitle(title)`
Validates title tag length.

#### `saveMetaTags(metaTags, title)`
Saves meta tags to HTML file.

#### `saveStructuredData(structuredData, name)`
Saves structured data to JSON file.

#### `generateAndSaveMetaTags(config, saveOptions)`
Generates and saves meta tags in one step.

#### `generateAndSaveStructuredData(config, saveOptions)`
Generates and saves structured data in one step.

### Sitemap Generator

#### `generateSitemap(urls, options)`
Generates XML sitemap.

**Parameters:**
- `urls` (array): Array of URL objects with `loc`, `changefreq`, `priority`, `lastmod`
- `options` (object): Options including `baseUrl`, `defaultChangeFreq`, `defaultPriority`

#### `generateSitemapIndex(sitemaps)`
Generates sitemap index for large sites.

#### `generateRobotsTxt(config)`
Generates robots.txt file.

#### `validateSitemap(urls)`
Validates sitemap URLs and returns issues/warnings.

#### `saveSitemap(sitemapXml, options)`
Saves sitemap to XML file.

#### `saveRobotsTxt(robotsTxt)`
Saves robots.txt to file.

#### `generateAndSaveSitemap(urls, options, saveOptions)`
Generates and saves sitemap in one step.

#### `generateAndSaveRobotsTxt(config)`
Generates and saves robots.txt in one step.

## Examples

Run the examples to see all features in action:

```bash
# Basic usage examples
npm run example

# File saving examples
node examples/save-files-example.js
```

This will demonstrate:
1. Article generation with file saving
2. Keyword analysis
3. Meta tag generation and saving
4. Structured data creation and export
5. SEO audit with HTML/JSON reports
6. Sitemap generation and saving
7. robots.txt generation and saving
8. Readability analysis
9. Content optimization

## Best Practices

### Keyword Density
- Optimal: 1-3%
- Below 1%: Keyword is underused
- Above 3%: Risk of keyword stuffing

### Meta Description
- Optimal length: 120-160 characters
- Include primary keyword
- Make it compelling and descriptive

### Title Tag
- Optimal length: 30-60 characters
- Include primary keyword near the beginning
- Make it unique and descriptive

### Content Structure
- Use only one H1 per page
- Use H2 and H3 tags to structure content
- Include relevant images with alt text
- Add internal and external links

## Project Structure

```
seo-tool/
├── src/
│   ├── generators/
│   │   ├── articleGenerator.js    # Article generation
│   │   ├── metaTagGenerator.js    # Meta tags & structured data
│   │   └── sitemapGenerator.js    # Sitemap & robots.txt
│   ├── analyzers/
│   │   ├── keywordAnalyzer.js     # Keyword analysis
│   │   └── contentAnalyzer.js     # Content & SEO analysis
│   ├── utils/
│   │   └── fileManager.js         # File operations & saving
│   └── index.js                   # Main entry point
├── examples/
│   ├── usage.js                   # Basic usage examples
│   └── save-files-example.js      # File saving examples
├── output/                        # Generated files (auto-created)
│   ├── articles/                  # Saved articles
│   ├── sitemaps/                  # Saved sitemaps
│   ├── meta-tags/                 # Saved meta tags
│   └── reports/                   # SEO audit reports
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Keywords

SEO, content generation, article generator, keyword analysis, meta tags, sitemap, robots.txt, SEO audit, content optimization, digital marketing, search engine optimization
