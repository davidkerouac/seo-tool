/**
 * Content Analyzer - Analyzes content structure and SEO elements
 */

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
}

export default new ContentAnalyzer();
