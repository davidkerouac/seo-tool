/**
 * Keyword Analyzer - Analyzes keyword density and distribution in content
 */

export class KeywordAnalyzer {
  /**
   * Calculate keyword density in text
   * @param {string} text - The text to analyze
   * @param {string} keyword - The keyword to search for
   * @returns {object} Analysis results
   */
  analyzeKeywordDensity(text, keyword) {
    const lowerText = text.toLowerCase();
    const lowerKeyword = keyword.toLowerCase();

    // Count total words
    const words = text.match(/\b\w+\b/g) || [];
    const totalWords = words.length;

    // Count keyword occurrences
    const keywordRegex = new RegExp(`\\b${lowerKeyword}\\b`, 'gi');
    const matches = lowerText.match(keywordRegex) || [];
    const keywordCount = matches.length;

    // Calculate density
    const density = totalWords > 0 ? (keywordCount / totalWords) * 100 : 0;

    // Determine if density is optimal (1-3% is generally good)
    let recommendation = '';
    if (density < 1) {
      recommendation = 'Keyword density is too low. Consider using the keyword more frequently.';
    } else if (density > 3) {
      recommendation = 'Keyword density is too high. Risk of keyword stuffing. Reduce usage.';
    } else {
      recommendation = 'Keyword density is optimal!';
    }

    return {
      keyword,
      totalWords,
      keywordCount,
      density: density.toFixed(2),
      recommendation,
      isOptimal: density >= 1 && density <= 3
    };
  }

  /**
   * Extract and rank keywords from text
   * @param {string} text - The text to analyze
   * @param {number} topN - Number of top keywords to return
   * @returns {array} Top keywords with frequencies
   */
  extractTopKeywords(text, topN = 10) {
    const lowerText = text.toLowerCase();
    const words = lowerText.match(/\b\w+\b/g) || [];

    // Common stop words to filter out
    const stopWords = new Set([
      'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
      'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
      'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
      'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'is'
    ]);

    // Count word frequencies
    const wordCount = {};
    words.forEach(word => {
      if (word.length > 3 && !stopWords.has(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });

    // Sort by frequency and get top N
    const sortedWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN)
      .map(([word, count]) => ({
        word,
        count,
        frequency: ((count / words.length) * 100).toFixed(2) + '%'
      }));

    return sortedWords;
  }

  /**
   * Analyze keyword placement in headings
   * @param {string} html - HTML content
   * @param {string} keyword - Keyword to check
   * @returns {object} Heading analysis
   */
  analyzeKeywordInHeadings(html, keyword) {
    const lowerKeyword = keyword.toLowerCase();
    const headingPattern = /<h([1-6])>(.*?)<\/h\1>/gi;
    const headings = {
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: []
    };

    let match;
    while ((match = headingPattern.exec(html)) !== null) {
      const level = match[1];
      const content = match[2];
      const hasKeyword = content.toLowerCase().includes(lowerKeyword);

      headings[`h${level}`].push({
        content,
        hasKeyword
      });
    }

    // Check if keyword is in H1
    const h1HasKeyword = headings.h1.some(h => h.hasKeyword);

    return {
      headings,
      h1HasKeyword,
      recommendation: h1HasKeyword
        ? 'Good! Keyword found in H1 tag.'
        : 'Consider adding keyword to H1 tag for better SEO.'
    };
  }
}

export default new KeywordAnalyzer();
