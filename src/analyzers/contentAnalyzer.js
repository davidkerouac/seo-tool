/**
 * Content Analyzer - Analyzes content structure and SEO elements
 */

import fileManager from '../utils/fileManager.js';

export class ContentAnalyzer {
  /**
   * Analyze content readability
   * @param {string} text - Text to analyze
   * @returns {object} Readability metrics
   */
  analyzeReadability(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.match(/\b\w+\b/g) || [];
    const totalWords = words.length;
    const totalSentences = sentences.length;

    // Calculate average sentence length
    const avgSentenceLength = totalSentences > 0
      ? (totalWords / totalSentences).toFixed(2)
      : 0;

    // Calculate average word length
    const totalChars = words.reduce((sum, word) => sum + word.length, 0);
    const avgWordLength = totalWords > 0
      ? (totalChars / totalWords).toFixed(2)
      : 0;

    // Simple readability score (lower is easier to read)
    const readabilityScore = parseFloat(avgSentenceLength) + parseFloat(avgWordLength);

    let readabilityLevel = '';
    if (readabilityScore < 15) {
      readabilityLevel = 'Very Easy';
    } else if (readabilityScore < 20) {
      readabilityLevel = 'Easy';
    } else if (readabilityScore < 25) {
      readabilityLevel = 'Medium';
    } else if (readabilityScore < 30) {
      readabilityLevel = 'Difficult';
    } else {
      readabilityLevel = 'Very Difficult';
    }

    return {
      totalWords,
      totalSentences,
      avgSentenceLength,
      avgWordLength,
      readabilityScore: readabilityScore.toFixed(2),
      readabilityLevel,
      recommendation: readabilityScore > 25
        ? 'Content is complex. Consider shorter sentences and simpler words.'
        : 'Readability is good!'
    };
  }

  /**
   * Analyze content structure
   * @param {string} html - HTML content
   * @returns {object} Structure analysis
   */
  analyzeStructure(html) {
    const h1Count = (html.match(/<h1>/gi) || []).length;
    const h2Count = (html.match(/<h2>/gi) || []).length;
    const h3Count = (html.match(/<h3>/gi) || []).length;
    const paragraphs = (html.match(/<p>/gi) || []).length;
    const images = (html.match(/<img/gi) || []).length;
    const links = (html.match(/<a/gi) || []).length;

    const issues = [];
    const recommendations = [];

    if (h1Count === 0) {
      issues.push('Missing H1 tag');
      recommendations.push('Add one H1 tag as the main heading');
    } else if (h1Count > 1) {
      issues.push('Multiple H1 tags found');
      recommendations.push('Use only one H1 tag per page');
    }

    if (h2Count === 0) {
      recommendations.push('Add H2 tags to structure your content');
    }

    if (paragraphs < 3) {
      recommendations.push('Add more paragraphs for better content depth');
    }

    if (images === 0) {
      recommendations.push('Add relevant images to improve engagement');
    }

    return {
      headings: {
        h1: h1Count,
        h2: h2Count,
        h3: h3Count
      },
      paragraphs,
      images,
      links,
      issues,
      recommendations,
      score: this.calculateStructureScore(h1Count, h2Count, paragraphs, images)
    };
  }

  /**
   * Calculate structure score (0-100)
   */
  calculateStructureScore(h1Count, h2Count, paragraphs, images) {
    let score = 0;

    // H1 scoring (max 25 points)
    if (h1Count === 1) score += 25;
    else if (h1Count > 1) score += 10;

    // H2 scoring (max 25 points)
    if (h2Count >= 2) score += 25;
    else if (h2Count === 1) score += 15;

    // Paragraphs (max 25 points)
    if (paragraphs >= 5) score += 25;
    else if (paragraphs >= 3) score += 15;
    else if (paragraphs >= 1) score += 5;

    // Images (max 25 points)
    if (images >= 2) score += 25;
    else if (images >= 1) score += 15;

    return score;
  }

  /**
   * Analyze meta tags
   * @param {string} html - HTML content
   * @returns {object} Meta tag analysis
   */
  analyzeMetaTags(html) {
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    const keywordsMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["'](.*?)["']/i);

    const title = titleMatch ? titleMatch[1] : null;
    const description = descMatch ? descMatch[1] : null;
    const keywords = keywordsMatch ? keywordsMatch[1] : null;

    const issues = [];
    const recommendations = [];

    // Title analysis
    if (!title) {
      issues.push('Missing title tag');
      recommendations.push('Add a descriptive title (50-60 characters)');
    } else {
      const titleLength = title.length;
      if (titleLength < 30) {
        recommendations.push('Title is too short. Aim for 50-60 characters');
      } else if (titleLength > 60) {
        recommendations.push('Title is too long. May be truncated in search results');
      }
    }

    // Description analysis
    if (!description) {
      issues.push('Missing meta description');
      recommendations.push('Add a meta description (150-160 characters)');
    } else {
      const descLength = description.length;
      if (descLength < 120) {
        recommendations.push('Meta description is too short. Aim for 150-160 characters');
      } else if (descLength > 160) {
        recommendations.push('Meta description is too long. May be truncated');
      }
    }

    return {
      title: {
        content: title,
        length: title ? title.length : 0,
        optimal: title && title.length >= 30 && title.length <= 60
      },
      description: {
        content: description,
        length: description ? description.length : 0,
        optimal: description && description.length >= 120 && description.length <= 160
      },
      keywords: {
        content: keywords,
        hasKeywords: !!keywords
      },
      issues,
      recommendations
    };
  }

  /**
   * Comprehensive SEO audit
   * @param {string} html - HTML content
   * @param {string} mainKeyword - Primary keyword
   * @returns {object} Complete audit report
   */
  performSEOAudit(html, mainKeyword = '') {
    const textContent = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    const metaAnalysis = this.analyzeMetaTags(html);
    const structureAnalysis = this.analyzeStructure(html);
    const readabilityAnalysis = this.analyzeReadability(textContent);

    let overallScore = 0;
    let totalChecks = 0;

    // Meta tags score
    if (metaAnalysis.title.optimal) overallScore += 15;
    if (metaAnalysis.description.optimal) overallScore += 15;
    totalChecks += 30;

    // Structure score
    overallScore += structureAnalysis.score * 0.4; // 40 points max
    totalChecks += 40;

    // Readability score
    if (readabilityAnalysis.readabilityLevel === 'Easy' || readabilityAnalysis.readabilityLevel === 'Medium') {
      overallScore += 30;
    } else if (readabilityAnalysis.readabilityLevel === 'Very Easy') {
      overallScore += 25;
    } else {
      overallScore += 10;
    }
    totalChecks += 30;

    return {
      overallScore: Math.round(overallScore),
      maxScore: 100,
      grade: this.getGrade(overallScore),
      metaAnalysis,
      structureAnalysis,
      readabilityAnalysis,
      allRecommendations: [
        ...metaAnalysis.recommendations,
        ...structureAnalysis.recommendations,
        [readabilityAnalysis.recommendation]
      ].flat()
    };
  }

  /**
   * Get letter grade from score
   */
  getGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  /**
   * Save SEO audit report to file (JSON format)
   * @param {object} report - Audit report object
   * @param {string} name - Report name
   * @returns {object} Save result
   */
  saveReport(report, name = 'seo-audit') {
    return fileManager.saveReport(report, name);
  }

  /**
   * Generate HTML report from audit results
   * @param {object} report - Audit report object
   * @returns {string} HTML report
   */
  generateHTMLReport(report) {
    const { overallScore, grade, metaAnalysis, structureAnalysis, readabilityAnalysis, allRecommendations } = report;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SEO Audit Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    .header h1 { font-size: 2.5em; margin-bottom: 10px; }
    .score-circle {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px auto;
      border: 5px solid white;
    }
    .score-text { font-size: 3em; font-weight: bold; }
    .grade { font-size: 1.2em; opacity: 0.9; }
    .content { padding: 40px; }
    .section {
      margin-bottom: 40px;
      padding-bottom: 40px;
      border-bottom: 1px solid #eee;
    }
    .section:last-child { border-bottom: none; }
    .section h2 {
      color: #667eea;
      margin-bottom: 20px;
      font-size: 1.8em;
    }
    .metric {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      background: #f9f9f9;
      margin-bottom: 8px;
      border-radius: 4px;
    }
    .metric-label { font-weight: 500; }
    .metric-value { color: #667eea; font-weight: 600; }
    .recommendations {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin-top: 15px;
    }
    .recommendations h3 {
      color: #856404;
      margin-bottom: 10px;
    }
    .recommendations ul {
      list-style: none;
      padding-left: 0;
    }
    .recommendations li {
      padding: 5px 0;
      padding-left: 20px;
      position: relative;
    }
    .recommendations li:before {
      content: "→";
      position: absolute;
      left: 0;
      color: #ffc107;
    }
    .status-good { color: #28a745; }
    .status-warning { color: #ffc107; }
    .status-error { color: #dc3545; }
    .timestamp {
      text-align: center;
      color: #999;
      padding: 20px;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SEO Audit Report</h1>
      <div class="score-circle">
        <div>
          <div class="score-text">${overallScore}</div>
          <div class="grade">Grade: ${grade}</div>
        </div>
      </div>
    </div>

    <div class="content">
      <!-- Meta Tags Analysis -->
      <div class="section">
        <h2>Meta Tags Analysis</h2>
        <div class="metric">
          <span class="metric-label">Title Tag</span>
          <span class="metric-value ${metaAnalysis.title.optimal ? 'status-good' : 'status-warning'}">
            ${metaAnalysis.title.content || 'Missing'}
          </span>
        </div>
        <div class="metric">
          <span class="metric-label">Title Length</span>
          <span class="metric-value">${metaAnalysis.title.length} characters</span>
        </div>
        <div class="metric">
          <span class="metric-label">Meta Description</span>
          <span class="metric-value ${metaAnalysis.description.optimal ? 'status-good' : 'status-warning'}">
            ${metaAnalysis.description.content ? 'Present' : 'Missing'}
          </span>
        </div>
        <div class="metric">
          <span class="metric-label">Description Length</span>
          <span class="metric-value">${metaAnalysis.description.length} characters</span>
        </div>
      </div>

      <!-- Structure Analysis -->
      <div class="section">
        <h2>Content Structure</h2>
        <div class="metric">
          <span class="metric-label">H1 Headings</span>
          <span class="metric-value ${structureAnalysis.headings.h1 === 1 ? 'status-good' : 'status-warning'}">
            ${structureAnalysis.headings.h1}
          </span>
        </div>
        <div class="metric">
          <span class="metric-label">H2 Headings</span>
          <span class="metric-value">${structureAnalysis.headings.h2}</span>
        </div>
        <div class="metric">
          <span class="metric-label">H3 Headings</span>
          <span class="metric-value">${structureAnalysis.headings.h3}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Paragraphs</span>
          <span class="metric-value">${structureAnalysis.paragraphs}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Images</span>
          <span class="metric-value">${structureAnalysis.images}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Links</span>
          <span class="metric-value">${structureAnalysis.links}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Structure Score</span>
          <span class="metric-value">${structureAnalysis.score}/100</span>
        </div>
      </div>

      <!-- Readability Analysis -->
      <div class="section">
        <h2>Readability Analysis</h2>
        <div class="metric">
          <span class="metric-label">Total Words</span>
          <span class="metric-value">${readabilityAnalysis.totalWords}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Total Sentences</span>
          <span class="metric-value">${readabilityAnalysis.totalSentences}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Avg Sentence Length</span>
          <span class="metric-value">${readabilityAnalysis.avgSentenceLength} words</span>
        </div>
        <div class="metric">
          <span class="metric-label">Readability Level</span>
          <span class="metric-value">${readabilityAnalysis.readabilityLevel}</span>
        </div>
      </div>

      <!-- Recommendations -->
      ${allRecommendations.length > 0 ? `
      <div class="section">
        <h2>Recommendations</h2>
        <div class="recommendations">
          <h3>Suggested Improvements</h3>
          <ul>
            ${allRecommendations.map(rec => `<li>${rec}</li>`).join('')}
          </ul>
        </div>
      </div>
      ` : ''}
    </div>

    <div class="timestamp">
      Report generated on ${new Date().toLocaleString()}
    </div>
  </div>
</body>
</html>`;
  }

  /**
   * Save SEO audit report as HTML
   * @param {object} report - Audit report object
   * @param {string} name - Report name
   * @returns {object} Save result
   */
  saveHTMLReport(report, name = 'seo-audit') {
    const html = this.generateHTMLReport(report);
    return fileManager.saveReportHTML(html, name);
  }

  /**
   * Perform SEO audit and save reports (both JSON and HTML)
   * @param {string} html - HTML content
   * @param {string} mainKeyword - Primary keyword
   * @param {string} name - Report name
   * @returns {object} Audit results and save results
   */
  auditAndSave(html, mainKeyword = '', name = 'seo-audit') {
    const report = this.performSEOAudit(html, mainKeyword);
    const jsonSave = this.saveReport(report, name);
    const htmlSave = this.saveHTMLReport(report, name);

    return {
      report,
      saved: {
        json: jsonSave,
        html: htmlSave
      }
    };
  }
}

export default new ContentAnalyzer();
