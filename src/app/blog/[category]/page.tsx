import { Navbar } from "@/components/layout/Navbar";
import { getBlogPostsByCategory, getCategories, getBlogPost, BlogPost, Category } from "@/lib/blog-api";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { redirect } from "next/navigation";

export const revalidate = 3600;

type Params = Promise<{ category: string }>;

export default async function CategoryPage(props: { params: Params }) {
  const params = await props.params;
  const category = decodeURIComponent(params.category);

  // Handle API failures
  let posts: BlogPost[] = [];
  let categories: Category[] = [];

  try {
    [posts, categories] = await Promise.all([
      getBlogPostsByCategory(category),
      getCategories()
    ]);
  } catch (error) {
    console.error(`Failed to fetch blog data for category ${category}:`, error);
  }

  // If no posts found, check if this "category" param is actually a blog slug
  // This handles old Google-indexed URLs like /blog/codot-adhd (after .html stripped)
  if ((!posts || posts.length === 0) && categories.length > 0) {
    const isValidCategory = categories.some(c => c.category === category);

    if (!isValidCategory) {
      try {
        const post = await getBlogPost(category);
        if (post) {
          // Found a post by slug - 301 redirect to correct URL
          redirect(`/en/blog/${encodeURIComponent(post.category)}/${encodeURIComponent(post.slug)}`);
        }
      } catch {
        // Not a valid slug either, show empty state
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <BlogSidebar categories={categories || []} activeCategory={category} />
            <div className="flex-1 w-full">
              <BlogGrid posts={posts || []} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
