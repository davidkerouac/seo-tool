import { MetadataRoute } from 'next'
import { buildBlogPath, getAllBlogPosts } from '@/lib/blog-api'

function safeDate(value?: string) {
  if (!value) return undefined
  const date = new Date(value)
  return isNaN(date.getTime()) ? undefined : date
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://codot.ai'

  // Static pages - SEO optimized routes
  const staticRoutes = [
    '',
    '/about',
    '/features',
    '/private_policy.html',
    '/pricing',
    '/faq',
    '/blog',
    // SEO landing pages
    '/ai-task-prioritization-app',
    '/productivity-apps-for-adhd',
    '/best-productivity-apps-for-entrepreneurs',
    '/ADHD',
    '/Executives',
    '/Entrepreneurs',
    // Competitor comparison pages
    '/codot-vs-notion',
    '/codot-vs-todoist',
    '/codot-vs-ticktick',
  ]

  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Blog posts
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await getAllBlogPosts()
    if (Array.isArray(posts)) {
      blogRoutes = posts.map((post) => {
        const lastModified = safeDate(post.updated_at || post.created_at) || new Date()

        return {
          url: `${baseUrl}${buildBlogPath(post)}`,
          lastModified,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }
      })
    }
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error)
  }

  return [...routes, ...blogRoutes]
}
