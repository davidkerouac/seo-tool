import type { Metadata } from "next";
import { Inter, Outfit, Literata, Noto_Sans_JP, Noto_Sans_Arabic } from "next/font/google";
import { Schema } from "@/components/seo/Schema";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { locales, defaultLocale, type Locale, isRTL } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-jp",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Keywords by locale for SEO
const keywordsByLocale: Partial<Record<Locale, string[]>> = {
  en: ["brain dump", "daily planner", "weekly planner", "reminder app", "voice journal", "voice notes", "to do list", "task manager", "adhd planner", "habit tracker", "productivity app"],
  zh: ["语音记录", "清单", "日程", "日历", "笔记", "效率", "提醒", "待办", "AI助手", "ADHD规划器", "习惯追踪", "任务管理"],
  ja: ["デイリープランナー", "ボイスメモ", "ToDoリスト", "タスク管理", "ADHDプランナー", "習慣トラッカー", "生産性アプリ", "音声日記", "リマインダー", "スケジュール管理"],
  ar: ["مخطط يومي", "ملاحظات صوتية", "قائمة المهام", "إدارة المهام", "ADHD", "متتبع العادات", "تطبيق الإنتاجية", "تذكيرات ذكية", "تقويم"],
};

// OpenGraph locale mapping
const ogLocaleMap: Partial<Record<Locale, string>> = {
  en: "en_US",
  zh: "zh_CN",
  ja: "ja_JP",
  ar: "ar_SA",
};

// Template suffix by locale
const templateSuffix: Partial<Record<Locale, string>> = {
  en: "AI Productivity App",
  zh: "AI效率应用",
  ja: "AI生産性アプリ",
  ar: "تطبيق الإنتاجية بالذكاء الاصطناعي",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const dict = await getDictionary(resolvedLocale);

  return {
    metadataBase: new URL("https://codot.ai"),
    title: {
      default: dict.metadata.title,
      template: `%s | Codot - ${templateSuffix[resolvedLocale] ?? templateSuffix[defaultLocale]!}`,
    },
    description: dict.metadata.description,
    keywords: keywordsByLocale[resolvedLocale] ?? keywordsByLocale[defaultLocale],
    openGraph: {
      type: "website",
      locale: ogLocaleMap[resolvedLocale] ?? ogLocaleMap[defaultLocale] ?? "en_US",
      url: `https://codot.ai/${resolvedLocale}`,
      siteName: "Codot",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: dict.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@codotai",
      creator: "@codotai",
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    icons: {
      icon: "/codot.svg",
      shortcut: "/codot.svg",
    },
    alternates: {
      canonical: `https://codot.ai/${resolvedLocale}`,
      languages: {
        "en-US": "https://codot.ai/en",
        "zh-CN": "https://codot.ai/zh",
        "ja-JP": "https://codot.ai/ja",
        "ar-SA": "https://codot.ai/ar",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "Productivity",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const rtl = isRTL(resolvedLocale);

  return (
    <html lang={resolvedLocale} dir={rtl ? "rtl" : "ltr"} className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} ${literata.variable} ${notoSansJP.variable} ${notoSansArabic.variable} antialiased bg-background text-foreground font-sans ${rtl ? 'rtl' : ''}`}
      >
        <AnimatedBackground />
        <Schema />
        {children}
      </body>
    </html>
  );
}
