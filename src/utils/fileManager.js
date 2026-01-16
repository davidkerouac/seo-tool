/**
 * File Manager - Handles file operations for SEO tool outputs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class FileManager {
  constructor() {
    this.outputDir = path.join(__dirname, '../../output');
    this.ensureOutputDirs();
  }

  /**
   * Ensure all output directories exist
   */
  ensureOutputDirs() {
    const dirs = [
      path.join(this.outputDir, 'articles'),
      path.join(this.outputDir, 'sitemaps'),
      path.join(this.outputDir, 'meta-tags'),
      path.join(this.outputDir, 'reports')
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Generate unique filename with timestamp
   * @param {string} prefix - File prefix
   * @param {string} extension - File extension (without dot)
   * @returns {string} Filename
   */
  generateFilename(prefix, extension = 'html') {
    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
    return `${prefix}_${timestamp}.${extension}`;
  }

  /**
   * Sanitize filename to remove invalid characters
   * @param {string} name - Original name
   * @returns {string} Sanitized name
   */
  sanitizeFilename(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Save article to file
   * @param {string} content - HTML content
   * @param {string} title - Article title
   * @returns {object} Save result with path
   */
  saveArticle(content, title = 'article') {
    const filename = this.generateFilename(this.sanitizeFilename(title), 'html');
    const filepath = path.join(this.outputDir, 'articles', filename);

    fs.writeFileSync(filepath, content, 'utf8');

    return {
      success: true,
      filepath,
      filename,
      size: fs.statSync(filepath).size
    };
  }

  /**
   * Save sitemap to file
   * @param {string} content - XML content
   * @param {string} name - Sitemap name
   * @returns {object} Save result with path
   */
  saveSitemap(content, name = 'sitemap') {
    const filename = this.generateFilename(this.sanitizeFilename(name), 'xml');
    const filepath = path.join(this.outputDir, 'sitemaps', filename);

    fs.writeFileSync(filepath, content, 'utf8');

    return {
      success: true,
      filepath,
      filename,
      size: fs.statSync(filepath).size
    };
  }

  /**
   * Save robots.txt to file
   * @param {string} content - robots.txt content
   * @returns {object} Save result with path
   */
  saveRobotsTxt(content) {
    const filename = this.generateFilename('robots', 'txt');
    const filepath = path.join(this.outputDir, 'sitemaps', filename);

    fs.writeFileSync(filepath, content, 'utf8');

    return {
      success: true,
      filepath,
      filename,
      size: fs.statSync(filepath).size
    };
  }

  /**
   * Save meta tags to file
   * @param {string} content - Meta tags HTML
   * @param {string} title - Page title
   * @returns {object} Save result with path
   */
  saveMetaTags(content, title = 'meta-tags') {
    const filename = this.generateFilename(this.sanitizeFilename(title), 'html');
    const filepath = path.join(this.outputDir, 'meta-tags', filename);

    fs.writeFileSync(filepath, content, 'utf8');

    return {
      success: true,
      filepath,
      filename,
      size: fs.statSync(filepath).size
    };
  }

  /**
   * Save structured data (JSON-LD) to file
   * @param {string} content - JSON-LD content
   * @param {string} name - File name
   * @returns {object} Save result with path
   */
  saveStructuredData(content, name = 'structured-data') {
    const filename = this.generateFilename(this.sanitizeFilename(name), 'json');
    const filepath = path.join(this.outputDir, 'meta-tags', filename);

    fs.writeFileSync(filepath, content, 'utf8');

    return {
      success: true,
      filepath,
      filename,
      size: fs.statSync(filepath).size
    };
  }

  /**
   * Save SEO audit report to file
   * @param {object} report - Audit report object
   * @param {string} name - Report name
   * @returns {object} Save result with path
   */
  saveReport(report, name = 'seo-audit') {
    const filename = this.generateFilename(this.sanitizeFilename(name), 'json');
    const filepath = path.join(this.outputDir, 'reports', filename);

    const content = JSON.stringify(report, null, 2);
    fs.writeFileSync(filepath, content, 'utf8');

    return {
      success: true,
      filepath,
      filename,
      size: fs.statSync(filepath).size
    };
  }

  /**
   * Save report as HTML
   * @param {string} html - HTML report content
   * @param {string} name - Report name
   * @returns {object} Save result with path
   */
  saveReportHTML(html, name = 'seo-audit') {
    const filename = this.generateFilename(this.sanitizeFilename(name), 'html');
    const filepath = path.join(this.outputDir, 'reports', filename);

    fs.writeFileSync(filepath, html, 'utf8');

    return {
      success: true,
      filepath,
      filename,
      size: fs.statSync(filepath).size
    };
  }

  /**
   * List files in a specific output directory
   * @param {string} type - Type of files (articles, sitemaps, meta-tags, reports)
   * @returns {array} List of files
   */
  listFiles(type) {
    const dir = path.join(this.outputDir, type);

    if (!fs.existsSync(dir)) {
      return [];
    }

    return fs.readdirSync(dir)
      .filter(file => !file.startsWith('.'))
      .map(file => {
        const filepath = path.join(dir, file);
        const stats = fs.statSync(filepath);

        return {
          filename: file,
          filepath,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime
        };
      })
      .sort((a, b) => b.modified - a.modified);
  }

  /**
   * Delete a file
   * @param {string} filepath - Full path to file
   * @returns {object} Delete result
   */
  deleteFile(filepath) {
    try {
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        return { success: true, filepath };
      }
      return { success: false, error: 'File not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Read file content
   * @param {string} filepath - Full path to file
   * @returns {string} File content
   */
  readFile(filepath) {
    return fs.readFileSync(filepath, 'utf8');
  }

  /**
   * Get storage statistics
   * @returns {object} Storage stats
   */
  getStats() {
    const types = ['articles', 'sitemaps', 'meta-tags', 'reports'];
    const stats = {};

    types.forEach(type => {
      const files = this.listFiles(type);
      stats[type] = {
        count: files.length,
        totalSize: files.reduce((sum, file) => sum + file.size, 0),
        files: files.length > 0 ? files[0].filename : null // Most recent file
      };
    });

    return stats;
  }
}

export default new FileManager();
