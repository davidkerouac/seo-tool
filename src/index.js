/**
 * SEO Tool - Main Entry Point
 * A comprehensive SEO toolkit for content generation and optimization
 */

import articleGenerator from './generators/articleGenerator.js';
import metaTagGenerator from './generators/metaTagGenerator.js';
import sitemapGenerator from './generators/sitemapGenerator.js';
import keywordAnalyzer from './analyzers/keywordAnalyzer.js';
import contentAnalyzer from './analyzers/contentAnalyzer.js';

// Export all modules
export {
  articleGenerator,
  metaTagGenerator,
  sitemapGenerator,
  keywordAnalyzer,
  contentAnalyzer
};

// Export classes for custom instances
export { ArticleGenerator } from './generators/articleGenerator.js';
export { MetaTagGenerator } from './generators/metaTagGenerator.js';
export { SitemapGenerator } from './generators/sitemapGenerator.js';
export { KeywordAnalyzer } from './analyzers/keywordAnalyzer.js';
export { ContentAnalyzer } from './analyzers/contentAnalyzer.js';

// Default export with all tools
export default {
  generators: {
    article: articleGenerator,
    metaTags: metaTagGenerator,
    sitemap: sitemapGenerator
  },
  analyzers: {
    keyword: keywordAnalyzer,
    content: contentAnalyzer
  }
};
