import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBlogPost, getBlogCoverUrl } from "@/lib/blog-api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { BlogArticleTracker } from "@/components/blog/BlogArticleTracker";
import { type Locale } from "@/i18n/config";

export const revalidate = 3600;

type Params = Promise<{ locale: string; category: string; slug: string }>;

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params;
  const post = await getBlogPost(params.slug);
  if (!post) return {};
  const hasCoverImage = Boolean(post.image);
  const coverImageUrl = hasCoverImage && post.slug ? getBlogCoverUrl(post.slug) : undefined;

  return {
    title: `${post.title} | Codot Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: coverImageUrl ? [coverImageUrl] : [],
      type: "article",
    },
    alternates: {
      canonical: post.canonical || undefined,
    }
  };
}

export default async function LocalizedBlogPostPage(props: { params: Params }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const { slug } = params;

  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Check if the post matches the requested locale
  if (post.locale !== locale) {
    notFound();
  }

  const hasCoverImage = Boolean(post.image);
  const coverImageUrl = hasCoverImage && post.slug ? getBlogCoverUrl(post.slug) : undefined;
  const createdAt = post.created_at ? new Date(post.created_at) : null;
  const createdAtText =
    createdAt && !isNaN(createdAt.getTime())
      ? createdAt.toLocaleDateString()
      : undefined;

  const processedContent =
    post.content?.replace(
      /\[(.*?)\]\(image:\/\/([a-zA-Z0-9-]+)\)/g,
      (match, alt, uuid) =>
        `![${alt}](https://codot.ai/api/blog_management/images/${uuid}/download)`
    ) || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffdf8] via-[#fff9f0] to-[#fff5e6] selection:bg-[#f5b842]/20 selection:text-[#f5b842]">
      <Navbar locale={locale} />
      <main className="pt-32 pb-20 px-4">
        <BlogArticleTracker
          slug={slug}
          title={post.title}
          category={post.category}
          content={processedContent}
          locale={locale}
          authorName={post.authorName}
        >
          {/* Header */}
          <header className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-[#f5b842] font-medium mb-4">
              <span className="px-3 py-1 rounded-full bg-[#fff3d4]/60">{post.category}</span>
              {createdAtText && (
                <span className="text-[#b8a590]">{createdAtText}</span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-display text-[#5d4e42] mb-6 leading-tight">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-xl text-[#8b7355] leading-relaxed">
                {post.description}
              </p>
            )}
          </header>

          {/* Featured Image */}
          {coverImageUrl && (
            <div className="mb-12 rounded-2xl overflow-hidden aspect-video shadow-lg shadow-[#f5b842]/15 relative">
              <Image src={coverImageUrl} alt={post.imageAltText || post.title} fill className="object-cover" unoptimized />
            </div>
          )}

          {/* Content */}
          <MarkdownRenderer content={processedContent} />

          {/* Author Info if available */}
          {post.authorName && (
            <div className="mt-16 pt-8 border-t border-[#f5b842]/15 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#fff3d4] to-[#fff0ee] flex items-center justify-center text-xl font-bold text-[#f5b842]">
                {post.authorName.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-[#5d4e42]">{post.authorName}</p>
                <p className="text-[#b8a590] text-sm">Author</p>
              </div>
            </div>
          )}
        </BlogArticleTracker>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
