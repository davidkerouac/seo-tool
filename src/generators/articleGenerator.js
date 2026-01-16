/**
 * Article Generator - Generates SEO-optimized articles
 */

import fileManager from '../utils/fileManager.js';

export class ArticleGenerator {
  /**
   * Generate article outline based on topic and keywords
   * @param {string} topic - Main topic
   * @param {array} keywords - Array of keywords to include
   * @param {number} sections - Number of sections
   * @returns {object} Article outline
   */
  generateOutline(topic, keywords = [], sections = 5) {
    const outline = {
      title: this.generateTitle(topic, keywords[0]),
      metaDescription: this.generateMetaDescription(topic, keywords),
      sections: []
    };

    // Introduction
    outline.sections.push({
      heading: 'Introduction',
      type: 'h2',
      suggestedContent: `Introduce the topic of ${topic}. Include main keyword "${keywords[0] || topic}" naturally.`,
      keywords: keywords.slice(0, 2)
    });

    // Main sections
    for (let i = 0; i < sections; i++) {
      const sectionKeyword = keywords[i % keywords.length] || topic;
      outline.sections.push({
        heading: this.generateSectionHeading(topic, sectionKeyword, i + 1),
        type: 'h2',
        suggestedContent: `Discuss ${sectionKeyword} in detail. Provide valuable information and examples.`,
        keywords: [sectionKeyword],
        subsections: this.generateSubsections(sectionKeyword, 2)
      });
    }

    // Conclusion
    outline.sections.push({
      heading: 'Conclusion',
      type: 'h2',
      suggestedContent: `Summarize key points about ${topic}. Include call-to-action if appropriate.`,
      keywords: [keywords[0] || topic]
    });

    return outline;
  }

  /**
   * Generate SEO-optimized title
   * @param {string} topic - Main topic
   * @param {string} keyword - Primary keyword
   * @returns {string} Optimized title
   */
  generateTitle(topic, keyword = '') {
    const templates = [
      `${topic}: Complete Guide to ${keyword || topic}`,
      `The Ultimate Guide to ${topic} in 2026`,
      `${topic}: Everything You Need to Know About ${keyword || topic}`,
      `How to Master ${topic}: ${keyword || topic} Tips and Strategies`,
      `${topic} Explained: A Comprehensive Guide`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  }

  /**
   * Generate meta description
   * @param {string} topic - Main topic
   * @param {array} keywords - Keywords
   * @returns {string} Meta description
   */
  generateMetaDescription(topic, keywords = []) {
    const keywordString = keywords.slice(0, 2).join(', ');
    const description = `Discover everything about ${topic}. Learn about ${keywordString} and more in this comprehensive guide. Expert tips and practical insights.`;

    // Ensure it's within optimal length (150-160 characters)
    if (description.length > 160) {
      return description.substring(0, 157) + '...';
    }

    return description;
  }

  /**
   * Generate section headings
   */
  generateSectionHeading(topic, keyword, index) {
    const templates = [
      `Understanding ${keyword}`,
      `How ${keyword} Works`,
      `Benefits of ${keyword}`,
      `${keyword}: Best Practices`,
      `Key Features of ${keyword}`,
      `Why ${keyword} Matters`
    ];

    return templates[index % templates.length];
  }

  /**
   * Generate subsections
   */
  generateSubsections(keyword, count) {
    const subsections = [];
    const templates = [
      `Key Aspects of ${keyword}`,
      `Common Challenges with ${keyword}`,
      `Tips for ${keyword}`,
      `${keyword} Examples`
    ];

    for (let i = 0; i < count; i++) {
      subsections.push({
        heading: templates[i % templates.length],
        type: 'h3',
        suggestedContent: `Provide detailed information about this aspect of ${keyword}.`
      });
    }

    return subsections;
  }

  /**
   * Generate full article from outline
   * @param {object} outline - Article outline
   * @returns {string} HTML article
   */
  generateArticleHTML(outline) {
    let html = '';

    // Add title and meta tags
    html += `<!DOCTYPE html>\n`;
    html += `<html lang="en">\n`;
    html += `<head>\n`;
    html += `  <meta charset="UTF-8">\n`;
    html += `  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
    html += `  <title>${outline.title}</title>\n`;
    html += `  <meta name="description" content="${outline.metaDescription}">\n`;
    html += `</head>\n`;
    html += `<body>\n`;
    html += `  <article>\n`;
    html += `    <h1>${outline.title}</h1>\n\n`;

    // Add sections
    outline.sections.forEach(section => {
      html += `    <section>\n`;
      html += `      <${section.type}>${section.heading}</${section.type}>\n`;
      html += `      <p>${section.suggestedContent}</p>\n`;

      // Add subsections if they exist
      if (section.subsections) {
        section.subsections.forEach(subsection => {
          html += `      <${subsection.type}>${subsection.heading}</${subsection.type}>\n`;
          html += `      <p>${subsection.suggestedContent}</p>\n`;
        });
      }

      html += `    </section>\n\n`;
    });

    html += `  </article>\n`;
    html += `</body>\n`;
    html += `</html>`;

    return html;
  }

  /**
   * Generate article with specific content
   * @param {object} config - Article configuration
   * @returns {object} Generated article
   */
  generateArticle(config) {
    const {
      topic,
      keywords = [],
      targetWordCount = 1500,
      sections = 5,
      includeImages = true
    } = config;

    const outline = this.generateOutline(topic, keywords, sections);
    const html = this.generateArticleHTML(outline);

    // Calculate approximate word count
    const wordsPerSection = Math.floor(targetWordCount / (sections + 2)); // +2 for intro and conclusion

    return {
      outline,
      html,
      metadata: {
        topic,
        keywords,
        targetWordCount,
        estimatedWordCount: (sections + 2) * wordsPerSection,
        sections: sections + 2, // +2 for intro and conclusion
        generatedAt: new Date().toISOString()
      },
      seoTips: this.generateSEOTips(keywords)
    };
  }

  /**
   * Generate SEO tips for the article
   */
  generateSEOTips(keywords) {
    return [
      `Use primary keyword "${keywords[0] || 'main topic'}" in first 100 words`,
      'Include internal and external links to authoritative sources',
      'Add relevant images with descriptive alt text',
      'Use keywords naturally throughout the content',
      'Break up text with headings (H2, H3) for better readability',
      'Keep paragraphs short (3-4 sentences)',
      'Include a table of contents for long articles',
      'Add schema markup for better search visibility',
      'Optimize images for web (compress, use descriptive filenames)',
      'Include a compelling call-to-action in conclusion'
    ];
  }

  /**
   * Optimize existing article
   * @param {string} html - Existing HTML content
   * @param {string} keyword - Primary keyword
   * @returns {object} Optimization suggestions
   */
  optimizeArticle(html, keyword) {
    const suggestions = [];

    // Check for keyword in title
    if (!html.toLowerCase().includes(`<title>${keyword.toLowerCase()}`)) {
      suggestions.push({
        type: 'title',
        priority: 'high',
        message: `Include keyword "${keyword}" in the title tag`
      });
    }

    // Check for H1
    const h1Match = html.match(/<h1>/gi);
    if (!h1Match || h1Match.length === 0) {
      suggestions.push({
        type: 'structure',
        priority: 'high',
        message: 'Add an H1 heading'
      });
    } else if (h1Match.length > 1) {
      suggestions.push({
        type: 'structure',
        priority: 'medium',
        message: 'Use only one H1 heading per page'
      });
    }

    // Check for images
    const imgMatch = html.match(/<img/gi);
    if (!imgMatch || imgMatch.length === 0) {
      suggestions.push({
        type: 'engagement',
        priority: 'medium',
        message: 'Add relevant images to improve engagement'
      });
    }

    // Check for alt tags on images
    if (imgMatch) {
      const imgWithoutAlt = html.match(/<img(?![^>]*alt=)[^>]*>/gi);
      if (imgWithoutAlt && imgWithoutAlt.length > 0) {
        suggestions.push({
          type: 'accessibility',
          priority: 'high',
          message: `${imgWithoutAlt.length} image(s) missing alt attribute`
        });
      }
    }

    // Check for meta description
    if (!html.includes('meta name="description"')) {
      suggestions.push({
        type: 'meta',
        priority: 'high',
        message: 'Add meta description tag'
      });
    }

    // Check for internal links
    const internalLinks = html.match(/<a\s+(?:[^>]*?\s+)?href=["']\/[^"']*["']/gi);
    if (!internalLinks || internalLinks.length < 2) {
      suggestions.push({
        type: 'linking',
        priority: 'medium',
        message: 'Add more internal links (at least 2-3)'
      });
    }

    return {
      totalSuggestions: suggestions.length,
      suggestions: suggestions.sort((a, b) => {
        const priority = { high: 3, medium: 2, low: 1 };
        return priority[b.priority] - priority[a.priority];
      })
    };
  }

  /**
   * Save article to file
   * @param {object} article - Generated article object
   * @param {object} options - Save options
   * @returns {object} Save result
   */
  saveArticle(article, options = {}) {
    const { filename } = options;
    const title = filename || article.outline.title;

    const result = fileManager.saveArticle(article.html, title);

    return {
      ...result,
      article: {
        title: article.outline.title,
        metadata: article.metadata
      }
    };
  }

  /**
   * Generate and save article in one step
   * @param {object} config - Article configuration
   * @param {object} saveOptions - Save options
   * @returns {object} Generated article and save result
   */
  generateAndSave(config, saveOptions = {}) {
    const article = this.generateArticle(config);
    const saveResult = this.saveArticle(article, saveOptions);

    return {
      article,
      saved: saveResult
    };
  }
}

export default new ArticleGenerator();
