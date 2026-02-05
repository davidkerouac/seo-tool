import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBlogPosts, getCategoriesByLocale, BlogPost, Category } from "@/lib/blog-api";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { locales, type Locale } from "@/i18n/config";

// Revalidate data every hour
export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export default async function LocalizedBlogPage(props: { params: Params }) {
  const params = await props.params;
  const locale = params.locale as Locale;

  // Fetch data filtered by locale
  let posts: BlogPost[] = [];
  let categories: Category[] = [];

  try {
    [posts, categories] = await Promise.all([
      getBlogPosts(1, 100, locale),
      getCategoriesByLocale(locale)
    ]);
  } catch (error) {
    console.error(`Failed to fetch blog data for locale ${locale}:`, error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffef9] via-[#fefcf6] to-[#f8f6f0] selection:bg-[#5ba3c8]/20 selection:text-[#5ba3c8]">
      <Navbar locale={locale} />

      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <BlogSidebar categories={categories || []} locale={locale} />
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
