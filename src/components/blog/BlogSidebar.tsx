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
      <div className="sticky top-32 bg-[#fffdf8]/85 backdrop-blur-sm rounded-2xl border border-[#f5b842]/20 p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-[#5d4e42] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#f5b842]" />
          {text.exploreTopics}
        </h3>
        <nav className="space-y-1">
          <Link
            href={blogBasePath}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium group ${
              !activeCategory
                ? "bg-gradient-to-r from-[#f5b842] to-[#ffb385] text-white shadow-md shadow-[#f5b842]/20"
                : "text-[#8b7355] hover:bg-[#fff9f0] hover:text-[#5d4e42]"
            }`}
          >
            <LayoutGrid className={`w-4 h-4 ${!activeCategory ? "text-white" : "text-[#b8a590] group-hover:text-[#8b7355]"}`} />
            <span className="flex-1">{text.allPosts}</span>
          </Link>

          <div className="my-2 border-t border-[#f5b842]/15 mx-2" />

          {categories.map((cat) => (
            <Link
              key={cat.category}
              href={`${blogBasePath}/${encodeURIComponent(cat.category)}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium group ${
                activeCategory === cat.category
                  ? "bg-gradient-to-r from-[#f4978e] to-[#ffc4bc] text-white shadow-md shadow-[#f4978e]/20"
                  : "text-[#8b7355] hover:bg-[#fff9f0] hover:text-[#5d4e42]"
              }`}
            >
              <Hash className={`w-4 h-4 ${activeCategory === cat.category ? "text-white" : "text-[#b8a590] group-hover:text-[#8b7355]"}`} />
              <span className="flex-1 truncate">{cat.category}</span>
              <span
                className={`text-xs py-0.5 px-2 rounded-full min-w-[1.5rem] text-center ${
                  activeCategory === cat.category
                    ? "bg-white/25 text-white"
                    : "bg-[#fff9f0] text-[#b8a590] group-hover:bg-white group-hover:shadow-sm"
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
