/**
 * Sitemap Generator - Generates XML sitemaps for SEO
 */

import fileManager from '../utils/fileManager.js';

export class SitemapGenerator {
  /**
   * Generate XML sitemap
   * @param {array} urls - Array of URL objects
   * @param {object} options - Sitemap options
   * @returns {string} XML sitemap
   */
  generateSitemap(urls, options = {}) {
    const {
      baseUrl = '',
      defaultChangeFreq = 'weekly',
      defaultPriority = 0.5
    } = options;

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach(urlObj => {
      const {
        loc,
        lastmod,
        changefreq = defaultChangeFreq,
        priority = defaultPriority
      } = typeof urlObj === 'string' ? { loc: urlObj } : urlObj;

      const fullUrl = loc.startsWith('http') ? loc : `${baseUrl}${loc}`;

      xml += '  <url>\n';
      xml += `    <loc>${this.escapeXml(fullUrl)}</loc>\n`;

      if (lastmod) {
        xml += `    <lastmod>${this.formatDate(lastmod)}</lastmod>\n`;
      }

      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    return xml;
  }

  /**
   * Generate sitemap index for large sites
   * @param {array} sitemaps - Array of sitemap URLs
   * @returns {string} XML sitemap index
   */
  generateSitemapIndex(sitemaps) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    sitemaps.forEach(sitemap => {
      const { loc, lastmod } = typeof sitemap === 'string' ? { loc: sitemap } : sitemap;

      xml += '  <sitemap>\n';
      xml += `    <loc>${this.escapeXml(loc)}</loc>\n`;

      if (lastmod) {
        xml += `    <lastmod>${this.formatDate(lastmod)}</lastmod>\n`;
      }

      xml += '  </sitemap>\n';
    });

    xml += '</sitemapindex>';

    return xml;
  }

  /**
   * Generate robots.txt file
   * @param {object} config - Robots.txt configuration
   * @returns {string} Robots.txt content
   */
  generateRobotsTxt(config = {}) {
    const {
      sitemapUrl = '',
      userAgents = [{ name: '*', allow: ['/'], disallow: [] }],
      crawlDelay = null
    } = config;

    let robotsTxt = '';

    userAgents.forEach(agent => {
      robotsTxt += `User-agent: ${agent.name}\n`;

      if (agent.allow && agent.allow.length > 0) {
        agent.allow.forEach(path => {
          robotsTxt += `Allow: ${path}\n`;
        });
      }

      if (agent.disallow && agent.disallow.length > 0) {
        agent.disallow.forEach(path => {
          robotsTxt += `Disallow: ${path}\n`;
        });
      }

      if (crawlDelay) {
        robotsTxt += `Crawl-delay: ${crawlDelay}\n`;
      }

      robotsTxt += '\n';
    });

    if (sitemapUrl) {
      robotsTxt += `Sitemap: ${sitemapUrl}\n`;
    }

    return robotsTxt.trim();
  }

  /**
   * Escape XML special characters
   * @param {string} str - String to escape
   * @returns {string} Escaped string
   */
  escapeXml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Format date for sitemap (W3C datetime format)
   * @param {Date|string} date - Date to format
   * @returns {string} Formatted date
   */
  formatDate(date) {
    const d = date instanceof Date ? date : new Date(date);
    return d.toISOString().split('T')[0];
  }

  /**
   * Validate sitemap URLs
   * @param {array} urls - Array of URLs
   * @returns {object} Validation results
   */
  validateSitemap(urls) {
    const issues = [];
    const warnings = [];

    // Check total URL count (max 50,000 per sitemap)
    if (urls.length > 50000) {
      issues.push({
        type: 'count',
        message: `Too many URLs (${urls.length}). Split into multiple sitemaps (max 50,000 per sitemap).`
      });
    }

    // Validate individual URLs
    urls.forEach((urlObj, index) => {
      const url = typeof urlObj === 'string' ? urlObj : urlObj.loc;

      // Check URL format
      if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) {
        issues.push({
          type: 'format',
          url,
          index,
          message: 'URL must start with http://, https://, or /'
        });
      }

      // Check URL length (max 2,048 characters)
      if (url.length > 2048) {
        issues.push({
          type: 'length',
          url,
          index,
          message: 'URL exceeds 2,048 characters'
        });
      }

      // Check priority value
      if (typeof urlObj === 'object' && urlObj.priority !== undefined) {
        const priority = parseFloat(urlObj.priority);
        if (priority < 0 || priority > 1) {
          warnings.push({
            type: 'priority',
            url,
            index,
            message: 'Priority should be between 0.0 and 1.0'
          });
        }
      }

      // Check change frequency
      if (typeof urlObj === 'object' && urlObj.changefreq) {
        const validFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
        if (!validFreqs.includes(urlObj.changefreq)) {
          warnings.push({
            type: 'changefreq',
            url,
            index,
            message: `Invalid changefreq: ${urlObj.changefreq}`
          });
        }
      }
    });

    return {
      valid: issues.length === 0,
      totalUrls: urls.length,
      issues,
      warnings
    };
  }

  /**
   * Generate example sitemap structure for a website
   * @param {string} baseUrl - Base URL of the website
   * @returns {array} Example URL structure
   */
  generateExampleStructure(baseUrl) {
    return [
      {
        loc: `${baseUrl}/`,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date()
      },
      {
        loc: `${baseUrl}/about`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date()
      },
      {
        loc: `${baseUrl}/blog`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date()
      },
      {
        loc: `${baseUrl}/products`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date()
      },
      {
        loc: `${baseUrl}/contact`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date()
      }
    ];
  }

  /**
   * Save sitemap to file
   * @param {string} sitemapXml - Sitemap XML content
   * @param {object} options - Save options
   * @returns {object} Save result
   */
  saveSitemap(sitemapXml, options = {}) {
    const { filename = 'sitemap' } = options;
    return fileManager.saveSitemap(sitemapXml, filename);
  }

  /**
   * Save robots.txt to file
   * @param {string} robotsTxt - Robots.txt content
   * @returns {object} Save result
   */
  saveRobotsTxt(robotsTxt) {
    return fileManager.saveRobotsTxt(robotsTxt);
  }

  /**
   * Generate and save sitemap in one step
   * @param {array} urls - Array of URL objects
   * @param {object} options - Sitemap options
   * @param {object} saveOptions - Save options
   * @returns {object} Generated sitemap and save result
   */
  generateAndSaveSitemap(urls, options = {}, saveOptions = {}) {
    const sitemap = this.generateSitemap(urls, options);
    const saveResult = this.saveSitemap(sitemap, saveOptions);

    return {
      sitemap,
      saved: saveResult
    };
  }

  /**
   * Generate and save robots.txt in one step
   * @param {object} config - Robots.txt configuration
   * @returns {object} Generated robots.txt and save result
   */
  generateAndSaveRobotsTxt(config) {
    const robotsTxt = this.generateRobotsTxt(config);
    const saveResult = this.saveRobotsTxt(robotsTxt);

    return {
      robotsTxt,
      saved: saveResult
    };
  }
}

export default new SitemapGenerator();
