import { Navbar } from "@/components/layout/Navbar";
import { getBlogPosts, getCategories, BlogPost, Category } from "@/lib/blog-api";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogGrid } from "@/components/blog/BlogGrid";

// Revalidate data every hour
export const revalidate = 3600;

export default async function BlogPage() {
  // Fetch data in parallel
  // Handle potential failures gracefully if API is down
  let posts: BlogPost[] = [];
  let categories: Category[] = [];

  try {
    [posts, categories] = await Promise.all([
      getBlogPosts(),
      getCategories()
    ]);
  } catch (error) {
    console.error("Failed to fetch blog data:", error);
    // We can choose to show an error UI or just empty state
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] selection:bg-primary/20 selection:text-primary">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <BlogSidebar categories={categories || []} />
            <div className="flex-1 w-full">
              <BlogGrid posts={posts || []} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
