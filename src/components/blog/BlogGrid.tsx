import Link from "next/link";
import Image from "next/image";
import { BlogPost, getBlogCoverUrl, buildBlogPath } from "@/lib/blog-api";
import { ArrowRight, Calendar, FolderOpen } from "lucide-react";

const emptyStateText: Record<string, { title: string; description: string; readArticle: string }> = {
  en: { title: "No posts found", description: "We couldn't find any articles in this category. Check back later for updates.", readArticle: "Read Article" },
  zh: { title: "未找到文章", description: "此分类下暂无文章，请稍后再来查看。", readArticle: "阅读文章" },
  ja: { title: "記事が見つかりません", description: "このカテゴリには記事がありません。後ほどご確認ください。", readArticle: "記事を読む" },
  ar: { title: "لم يتم العثور على مقالات", description: "لم نتمكن من العثور على أي مقالات في هذه الفئة. يرجى المراجعة لاحقًا.", readArticle: "اقرأ المقال" },
  ko: { title: "글이 없습니다", description: "이 카테고리에 글이 없습니다. 나중에 다시 확인해 주세요.", readArticle: "글 읽기" },
  de: { title: "Keine Beiträge gefunden", description: "In dieser Kategorie wurden keine Artikel gefunden. Schauen Sie später wieder vorbei.", readArticle: "Artikel lesen" },
  fr: { title: "Aucun article trouvé", description: "Aucun article n'a été trouvé dans cette catégorie. Revenez plus tard.", readArticle: "Lire l'article" },
  es: { title: "No se encontraron artículos", description: "No pudimos encontrar artículos en esta categoría. Vuelve más tarde.", readArticle: "Leer artículo" },
  ru: { title: "Статьи не найдены", description: "В этой категории пока нет статей. Загляните позже.", readArticle: "Читать статью" },
  it: { title: "Nessun articolo trovato", description: "Non abbiamo trovato articoli in questa categoria. Ricontrolla più tardi.", readArticle: "Leggi articolo" },
  nl: { title: "Geen berichten gevonden", description: "Er zijn geen artikelen in deze categorie gevonden. Kom later terug.", readArticle: "Lees artikel" },
  pt: { title: "Nenhum artigo encontrado", description: "Não encontramos artigos nesta categoria. Volte mais tarde.", readArticle: "Ler artigo" },
  sv: { title: "Inga inlägg hittades", description: "Vi hittade inga artiklar i denna kategori. Kom tillbaka senare.", readArticle: "Läs artikel" },
  no: { title: "Ingen innlegg funnet", description: "Vi fant ingen artikler i denne kategorien. Kom tilbake senere.", readArticle: "Les artikkel" },
  da: { title: "Ingen indlæg fundet", description: "Vi kunne ikke finde artikler i denne kategori. Kom tilbage senere.", readArticle: "Læs artikel" },
  fi: { title: "Artikkeleita ei löytynyt", description: "Tästä kategoriasta ei löytynyt artikkeleita. Tule takaisin myöhemmin.", readArticle: "Lue artikkeli" },
};

const dateLocaleMap: Record<string, string> = {
  en: "en-US",
  zh: "zh-CN",
  ja: "ja-JP",
  ar: "ar-SA",
  ko: "ko-KR",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
  ru: "ru-RU",
  it: "it-IT",
  nl: "nl-NL",
  pt: "pt-BR",
  sv: "sv-SE",
  no: "nb-NO",
  da: "da-DK",
  fi: "fi-FI",
};

interface BlogGridProps {
  posts: BlogPost[];
  locale?: string;
}

export function BlogGrid({ posts, locale = 'en' }: BlogGridProps) {
  const text = emptyStateText[locale] || emptyStateText.en;
  const dateLocale = dateLocaleMap[locale] || "en-US";

  if (!posts || posts.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 text-center bg-[#fffdf8]/85 rounded-2xl border border-[#f5b842]/15 border-dashed">
        <div className="w-16 h-16 bg-[#fff9f0] rounded-full flex items-center justify-center mb-6">
            <FolderOpen className="w-8 h-8 text-[#b8a590]" />
        </div>
        <h3 className="text-xl font-bold text-[#5d4e42] mb-2">{text.title}</h3>
        <p className="text-[#8b7355] max-w-xs mx-auto">
          {text.description}
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {posts.map((post) => {
        const coverImageUrl = post.image && post.slug ? getBlogCoverUrl(post.slug) : null;
        const blogPath = buildBlogPath(post, locale);
        const createdAt = post.created_at ? new Date(post.created_at) : null;
        const hasValidDate = createdAt && !isNaN(createdAt.getTime());
        const formattedDate = hasValidDate
          ? createdAt.toLocaleDateString(dateLocale, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Recent";

        return (
          <Link
            key={post.slug}
            href={blogPath}
            className="group flex flex-col h-full bg-[#fffdf8]/85 backdrop-blur-sm rounded-2xl border border-[#f5b842]/15 hover:border-[#f5b842]/35 hover:shadow-xl hover:shadow-[#f5b842]/10 transition-all duration-500 overflow-hidden"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-[#fff9f0] to-[#fff5e6] relative overflow-hidden">
              {coverImageUrl ? (
                <Image
                  src={coverImageUrl}
                  alt={post.imageAltText || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#fff3d4]/40 to-[#fff0ee]/40 text-[#b8a590]">
                  <span className="text-sm font-medium">No Image</span>
                </div>
              )}
              <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#fffdf8]/90 backdrop-blur-sm text-xs font-bold text-[#f5b842] shadow-sm">
                      {post.category}
                  </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-sm text-[#b8a590] mb-3">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>

              <h3 className="text-xl font-bold text-[#5d4e42] mb-3 group-hover:text-[#f5b842] transition-colors duration-300 line-clamp-2 leading-tight">
                {post.title}
              </h3>

              <p className="text-[#8b7355] mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                {post.description}
              </p>

              <div className="flex items-center text-[#f5b842] font-bold text-sm group-hover:translate-x-1 transition-transform duration-300">
                {text.readArticle} <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
