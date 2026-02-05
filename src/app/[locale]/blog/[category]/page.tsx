import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBlogPostsByCategory, getCategoriesByLocale, getBlogPost, BlogPost, Category } from "@/lib/blog-api";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { type Locale } from "@/i18n/config";
import { redirect } from "next/navigation";

export const revalidate = 3600;

type Params = Promise<{ locale: string; category: string }>;

export default async function LocalizedCategoryPage(props: { params: Params }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const category = decodeURIComponent(params.category);

  // Fetch data filtered by locale
  let posts: BlogPost[] = [];
  let categories: Category[] = [];

  try {
    [posts, categories] = await Promise.all([
      getBlogPostsByCategory(category, 1, 100, locale),
      getCategoriesByLocale(locale)
    ]);
  } catch (error) {
    console.error(`Failed to fetch blog data for category ${category} locale ${locale}:`, error);
  }

  // If no posts found, check if this "category" param is actually a blog slug
  // This handles old Google-indexed URLs like /blog/codot-adhd
  if ((!posts || posts.length === 0) && categories.length > 0) {
    const isValidCategory = categories.some(c => c.category === category);

    if (!isValidCategory) {
      try {
        const post = await getBlogPost(category);
        if (post) {
          redirect(`/${locale}/blog/${encodeURIComponent(post.category)}/${encodeURIComponent(post.slug)}`);
        }
      } catch {
        // Not a valid slug either, show empty state
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffdf8] via-[#fff9f0] to-[#fff5e6] selection:bg-[#f5b842]/20 selection:text-[#f5b842]">
      <Navbar locale={locale} />

      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <BlogSidebar categories={categories || []} activeCategory={category} locale={locale} />
            <div className="flex-1 w-full">
              <BlogGrid posts={posts || []} locale={locale} />
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
