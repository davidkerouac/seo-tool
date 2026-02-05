const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "https://codot.ai/api/blog_management").replace(/\/$/, "");

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  keywords: string;
  slug: string;
  url: string;
  image: string;
  imageAltText: string;
  imageMimeType: string;
  locale: string;
  alternateLocales: string[];
  canonical: string;
  type: string;
  authorName: string;
  authorUrl: string;
  siteName: string;
  twitterSite: string;
  twitterCreator: string;
  logo: string;
  appStoreId: string;
  rating: number;
  reviewCount: number;
  sameAs: string[];
  created_at: string;
  updated_at?: string;
}

export interface Category {
  category: string;
  count: number;
}

export interface PaginatedResponse<T> {
  items: T[]; // Verify this structure. Some APIs return { items: [], total: ... } or just []
  // The doc says "Response: Array of BlogPostResponse" for list. 
  // But it also says "paginated list". 
  // Usually paginated APIs return a wrapper. 
  // If the doc says "Array of ...", maybe it returns the array directly? 
  // But then how do we know total pages?
  // I'll assume it returns an array for now based on "Response: Array of BlogPostResponse".
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    cache: 'no-store', // Ensure fresh data for now, or use revalidate
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchAPI('/blogs/categories');
  return data || [];
}

export async function getBlogPosts(page = 1, limit = 20, locale?: string): Promise<BlogPost[]> {
  // Doc says "Response: Array of BlogPostResponse"
  const data = await fetchAPI(`/blogs/?page=${page}&limit=${limit}`);
  const posts = data || [];

  // Filter by locale if provided
  if (locale) {
    return posts.filter((post: BlogPost) => post.locale === locale);
  }
  return posts;
}

export async function getBlogPostsByCategory(category: string, page = 1, limit = 20, locale?: string): Promise<BlogPost[]> {
  const data = await fetchAPI(`/blogs/categories/${encodeURIComponent(category)}/blogs?page=${page}&limit=${limit}`);
  const posts = data || [];

  // Filter by locale if provided
  if (locale) {
    return posts.filter((post: BlogPost) => post.locale === locale);
  }
  return posts;
}

export async function getAllBlogPosts(limit = 50, maxPages = 50, locale?: string): Promise<BlogPost[]> {
  const allPosts: BlogPost[] = [];

  for (let page = 1; page <= maxPages; page++) {
    const pageItems = await getBlogPosts(page, limit);
    if (!Array.isArray(pageItems) || pageItems.length === 0) {
      break;
    }

    allPosts.push(...pageItems);

    if (pageItems.length < limit) {
      break;
    }
  }

  // Filter by locale if provided
  if (locale) {
    return allPosts.filter((post: BlogPost) => post.locale === locale);
  }
  return allPosts;
}

export async function getCategoriesByLocale(locale: string): Promise<Category[]> {
  // Get all posts for the locale and extract unique categories
  const posts = await getAllBlogPosts(100, 10, locale);
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });

  return Array.from(categoryMap.entries()).map(([category, count]) => ({
    category,
    count,
  }));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const data = await fetchAPI(`/blogs/${slug}`);
  if (!data) return null;
  return data;
}

export function getBlogCoverUrl(slug: string) {
  const encodedSlug = encodeURIComponent(slug);
  return `${API_BASE_URL}/images/blog/${encodedSlug}/cover/download`;
}

export function buildBlogPath(post: Pick<BlogPost, "category" | "slug" | "locale">, currentLocale?: string) {
  const locale = currentLocale || post.locale || "en";
  const category = encodeURIComponent(post.category);
  const slug = encodeURIComponent(post.slug);

  return `/${locale}/blog/${category}/${slug}`;
}
