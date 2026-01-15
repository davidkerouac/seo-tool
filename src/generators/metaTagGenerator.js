/**
 * Meta Tag Generator - Generates SEO meta tags
 */

export class MetaTagGenerator {
  /**
   * Generate complete meta tags for a page
   * @param {object} config - Page configuration
   * @returns {string} HTML meta tags
   */
  generateMetaTags(config) {
    const {
      title,
      description,
      keywords = [],
      author = '',
      url = '',
      image = '',
      type = 'website',
      siteName = '',
      twitterCard = 'summary_large_image',
      locale = 'en_US'
    } = config;

    let metaTags = '';

    // Basic meta tags
    metaTags += `<!-- Basic Meta Tags -->\n`;
    metaTags += `<meta charset="UTF-8">\n`;
    metaTags += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
    metaTags += `<meta http-equiv="X-UA-Compatible" content="IE=edge">\n`;
    metaTags += `<title>${title}</title>\n`;
    metaTags += `<meta name="description" content="${description}">\n`;

    if (keywords.length > 0) {
      metaTags += `<meta name="keywords" content="${keywords.join(', ')}">\n`;
    }

    if (author) {
      metaTags += `<meta name="author" content="${author}">\n`;
    }

    // Open Graph meta tags
    metaTags += `\n<!-- Open Graph / Facebook -->\n`;
    metaTags += `<meta property="og:type" content="${type}">\n`;
    metaTags += `<meta property="og:title" content="${title}">\n`;
    metaTags += `<meta property="og:description" content="${description}">\n`;

    if (url) {
      metaTags += `<meta property="og:url" content="${url}">\n`;
    }

    if (image) {
      metaTags += `<meta property="og:image" content="${image}">\n`;
    }

    if (siteName) {
      metaTags += `<meta property="og:site_name" content="${siteName}">\n`;
    }

    metaTags += `<meta property="og:locale" content="${locale}">\n`;

    // Twitter Card meta tags
    metaTags += `\n<!-- Twitter -->\n`;
    metaTags += `<meta name="twitter:card" content="${twitterCard}">\n`;
    metaTags += `<meta name="twitter:title" content="${title}">\n`;
    metaTags += `<meta name="twitter:description" content="${description}">\n`;

    if (image) {
      metaTags += `<meta name="twitter:image" content="${image}">\n`;
    }

    // Additional SEO meta tags
    metaTags += `\n<!-- Additional SEO -->\n`;
    metaTags += `<meta name="robots" content="index, follow">\n`;
    metaTags += `<meta name="googlebot" content="index, follow">\n`;
    metaTags += `<link rel="canonical" href="${url || ''}">\n`;

    return metaTags;
  }

  /**
   * Generate structured data (Schema.org JSON-LD)
   * @param {object} config - Content configuration
   * @returns {string} JSON-LD script tag
   */
  generateStructuredData(config) {
    const {
      type = 'Article',
      headline,
      description,
      author,
      datePublished,
      dateModified,
      image,
      url,
      publisher = {}
    } = config;

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type,
      headline: headline,
      description: description,
      author: {
        '@type': 'Person',
        name: author || 'Anonymous'
      },
      datePublished: datePublished || new Date().toISOString(),
      dateModified: dateModified || new Date().toISOString()
    };

    if (image) {
      structuredData.image = image;
    }

    if (url) {
      structuredData.url = url;
      structuredData.mainEntityOfPage = {
        '@type': 'WebPage',
        '@id': url
      };
    }

    if (publisher.name) {
      structuredData.publisher = {
        '@type': 'Organization',
        name: publisher.name,
        logo: publisher.logo ? {
          '@type': 'ImageObject',
          url: publisher.logo
        } : undefined
      };
    }

    return `<script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n</script>`;
  }

  /**
   * Generate FAQ structured data
   * @param {array} faqs - Array of {question, answer} objects
   * @returns {string} JSON-LD script tag
   */
  generateFAQStructuredData(faqs) {
    const faqData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };

    return `<script type="application/ld+json">\n${JSON.stringify(faqData, null, 2)}\n</script>`;
  }

  /**
   * Generate breadcrumb structured data
   * @param {array} breadcrumbs - Array of {name, url} objects
   * @returns {string} JSON-LD script tag
   */
  generateBreadcrumbStructuredData(breadcrumbs) {
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };

    return `<script type="application/ld+json">\n${JSON.stringify(breadcrumbData, null, 2)}\n</script>`;
  }

  /**
   * Validate meta description length
   * @param {string} description - Meta description
   * @returns {object} Validation result
   */
  validateMetaDescription(description) {
    const length = description.length;
    const optimal = length >= 120 && length <= 160;

    let status = 'optimal';
    let message = 'Meta description length is optimal';

    if (length < 120) {
      status = 'too_short';
      message = `Too short (${length} chars). Recommended: 120-160 characters`;
    } else if (length > 160) {
      status = 'too_long';
      message = `Too long (${length} chars). May be truncated in search results`;
    }

    return {
      length,
      optimal,
      status,
      message,
      recommendation: optimal ? null : (
        status === 'too_short'
          ? 'Add more descriptive content to reach 120-160 characters'
          : 'Shorten to 160 characters or less'
      )
    };
  }

  /**
   * Validate title tag length
   * @param {string} title - Title tag
   * @returns {object} Validation result
   */
  validateTitle(title) {
    const length = title.length;
    const optimal = length >= 30 && length <= 60;

    let status = 'optimal';
    let message = 'Title length is optimal';

    if (length < 30) {
      status = 'too_short';
      message = `Too short (${length} chars). Recommended: 30-60 characters`;
    } else if (length > 60) {
      status = 'too_long';
      message = `Too long (${length} chars). May be truncated in search results`;
    }

    return {
      length,
      optimal,
      status,
      message,
      recommendation: optimal ? null : (
        status === 'too_short'
          ? 'Expand title to 30-60 characters for better SEO'
          : 'Shorten to 60 characters or less'
      )
    };
  }

  /**
   * Generate social media preview
   * @param {object} config - Page configuration
   * @returns {object} Preview data
   */
  generateSocialPreview(config) {
    const {
      title,
      description,
      image,
      url
    } = config;

    return {
      facebook: {
        title: title.length > 60 ? title.substring(0, 57) + '...' : title,
        description: description.length > 155 ? description.substring(0, 152) + '...' : description,
        image: image || 'https://via.placeholder.com/1200x630?text=No+Image',
        url: url || ''
      },
      twitter: {
        title: title.length > 70 ? title.substring(0, 67) + '...' : title,
        description: description.length > 200 ? description.substring(0, 197) + '...' : description,
        image: image || 'https://via.placeholder.com/1200x675?text=No+Image',
        url: url || ''
      },
      google: {
        title: title.length > 60 ? title.substring(0, 57) + '...' : title,
        description: description.length > 160 ? description.substring(0, 157) + '...' : description,
        url: url || ''
      }
    };
  }
}

export default new MetaTagGenerator();
