import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://codot.ai/sitemap.xml',
    host: 'https://codot.ai',
  }
}
