import Link from "next/link";
import { Category } from "@/lib/blog-api";
import { Hash, Layers, LayoutGrid } from "lucide-react";

const sidebarText: Record<string, { exploreTopics: string; allPosts: string }> = {
  en: { exploreTopics: "Explore Topics", allPosts: "All Posts" },
  zh: { exploreTopics: "浏览主题", allPosts: "所有文章" },
  ja: { exploreTopics: "トピックを探す", allPosts: "すべての記事" },
  ar: { exploreTopics: "استكشف المواضيع", allPosts: "جميع المقالات" },
  ko: { exploreTopics: "주제 탐색", allPosts: "모든 글" },
  de: { exploreTopics: "Themen erkunden", allPosts: "Alle Beiträge" },
  fr: { exploreTopics: "Explorer les sujets", allPosts: "Tous les articles" },
  es: { exploreTopics: "Explorar temas", allPosts: "Todos los artículos" },
  ru: { exploreTopics: "Обзор тем", allPosts: "Все статьи" },
  it: { exploreTopics: "Esplora argomenti", allPosts: "Tutti gli articoli" },
  nl: { exploreTopics: "Onderwerpen verkennen", allPosts: "Alle berichten" },
  pt: { exploreTopics: "Explorar tópicos", allPosts: "Todos os artigos" },
  sv: { exploreTopics: "Utforska ämnen", allPosts: "Alla inlägg" },
  no: { exploreTopics: "Utforsk emner", allPosts: "Alle innlegg" },
  da: { exploreTopics: "Udforsk emner", allPosts: "Alle indlæg" },
  fi: { exploreTopics: "Selaa aiheita", allPosts: "Kaikki artikkelit" },
};

interface BlogSidebarProps {
  categories: Category[];
  activeCategory?: string;
  locale?: string;
}

export function BlogSidebar({ categories, activeCategory, locale = 'en' }: BlogSidebarProps) {
  const text = sidebarText[locale] || sidebarText.en;
  const blogBasePath = `/${locale}/blog`;

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="sticky top-32 bg-white/85 backdrop-blur-sm rounded-2xl border border-[#e8e0f0]/40 p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-[#2d2d2d] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#9bb8c4]" />
          {text.exploreTopics}
        </h3>
        <nav className="space-y-1">
          <Link
            href={blogBasePath}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium group ${
              !activeCategory
                ? "bg-gradient-to-r from-[#c5e5ed] to-[#dff0f5] text-[#2d2d2d] shadow-md shadow-[#c5e5ed]/20"
                : "text-[#6b6b6b] hover:bg-[#fafafa] hover:text-[#2d2d2d]"
            }`}
          >
            <LayoutGrid className={`w-4 h-4 ${!activeCategory ? "text-[#2d2d2d]" : "text-[#a0a0a0] group-hover:text-[#6b6b6b]"}`} />
            <span className="flex-1">{text.allPosts}</span>
          </Link>

          <div className="my-2 border-t border-[#e8e0f0]/30 mx-2" />

          {categories.map((cat) => (
            <Link
              key={cat.category}
              href={`${blogBasePath}/${encodeURIComponent(cat.category)}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium group ${
                activeCategory === cat.category
                  ? "bg-gradient-to-r from-[#f8e0dd] to-[#fbedeb] text-[#2d2d2d] shadow-md shadow-[#f8e0dd]/20"
                  : "text-[#6b6b6b] hover:bg-[#fafafa] hover:text-[#2d2d2d]"
              }`}
            >
              <Hash className={`w-4 h-4 ${activeCategory === cat.category ? "text-[#2d2d2d]" : "text-[#a0a0a0] group-hover:text-[#6b6b6b]"}`} />
              <span className="flex-1 truncate">{cat.category}</span>
              <span
                className={`text-xs py-0.5 px-2 rounded-full min-w-[1.5rem] text-center ${
                  activeCategory === cat.category
                    ? "bg-white/50 text-[#2d2d2d]"
                    : "bg-[#fafafa] text-[#a0a0a0] group-hover:bg-white group-hover:shadow-sm"
                }`}
              >
                {cat.count}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
