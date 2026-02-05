export const locales = ['en', 'zh', 'ja', 'ar', 'ko', 'de', 'fr', 'es', 'ru', 'it', 'nl', 'pt', 'sv', 'no', 'da', 'fi'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ar: 'العربية',
  ko: '한국어',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  ru: 'Русский',
  it: 'Italiano',
  nl: 'Nederlands',
  pt: 'Português',
  sv: 'Svenska',
  no: 'Norsk',
  da: 'Dansk',
  fi: 'Suomi',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  zh: '🇨🇳',
  ja: '🇯🇵',
  ar: '🇸🇦',
  ko: '🇰🇷',
  de: '🇩🇪',
  fr: '🇫🇷',
  es: '🇪🇸',
  ru: '🇷🇺',
  it: '🇮🇹',
  nl: '🇳🇱',
  pt: '🇵🇹',
  sv: '🇸🇪',
  no: '🇳🇴',
  da: '🇩🇰',
  fi: '🇫🇮',
};

// RTL languages
export const rtlLocales: Locale[] = ['ar'];

export const isRTL = (locale: Locale): boolean => rtlLocales.includes(locale);
