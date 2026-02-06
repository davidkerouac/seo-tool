import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";
import type { Locale } from "@/i18n/config";

const footerLinksConfig: Record<string, Record<string, Array<{ name: string; href: string; external?: boolean }>>> = {
    en: {
        Product: [
            { name: "Features", href: "/features" },
            { name: "Pricing", href: "/pricing" },
            { name: "Download", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        Resources: [
            { name: "Blog", href: "/blog" },
            { name: "Help Center", href: "/faq" },
        ],
        Company: [
            { name: "About", href: "/about" },
            { name: "Privacy", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    zh: {
        "产品": [
            { name: "功能", href: "/features" },
            { name: "价格", href: "/pricing" },
            { name: "下载", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "资源": [
            { name: "博客", href: "/blog" },
            { name: "帮助中心", href: "/faq" },
        ],
        "公司": [
            { name: "关于我们", href: "/about" },
            { name: "隐私政策", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    ja: {
        "製品": [
            { name: "機能", href: "/features" },
            { name: "料金", href: "/pricing" },
            { name: "ダウンロード", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "リソース": [
            { name: "ブログ", href: "/blog" },
            { name: "ヘルプセンター", href: "/faq" },
        ],
        "会社": [
            { name: "概要", href: "/about" },
            { name: "プライバシー", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    ar: {
        "المنتج": [
            { name: "المميزات", href: "/features" },
            { name: "الأسعار", href: "/pricing" },
            { name: "تحميل", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "الموارد": [
            { name: "المدونة", href: "/blog" },
            { name: "مركز المساعدة", href: "/faq" },
        ],
        "الشركة": [
            { name: "عنا", href: "/about" },
            { name: "الخصوصية", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    ko: {
        "제품": [
            { name: "기능", href: "/features" },
            { name: "가격", href: "/pricing" },
            { name: "다운로드", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "리소스": [
            { name: "블로그", href: "/blog" },
            { name: "도움말 센터", href: "/faq" },
        ],
        "회사": [
            { name: "소개", href: "/about" },
            { name: "개인정보 보호", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    de: {
        "Produkt": [
            { name: "Funktionen", href: "/features" },
            { name: "Preise", href: "/pricing" },
            { name: "Download", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "Ressourcen": [
            { name: "Blog", href: "/blog" },
            { name: "Hilfecenter", href: "/faq" },
        ],
        "Unternehmen": [
            { name: "Über uns", href: "/about" },
            { name: "Datenschutz", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    fr: {
        "Produit": [
            { name: "Fonctionnalités", href: "/features" },
            { name: "Tarifs", href: "/pricing" },
            { name: "Télécharger", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "Ressources": [
            { name: "Blog", href: "/blog" },
            { name: "Centre d'aide", href: "/faq" },
        ],
        "Entreprise": [
            { name: "À propos", href: "/about" },
            { name: "Confidentialité", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    es: {
        "Producto": [
            { name: "Funciones", href: "/features" },
            { name: "Precios", href: "/pricing" },
            { name: "Descargar", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "Recursos": [
            { name: "Blog", href: "/blog" },
            { name: "Centro de ayuda", href: "/faq" },
        ],
        "Empresa": [
            { name: "Acerca de", href: "/about" },
            { name: "Privacidad", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    ru: {
        "Продукт": [
            { name: "Функции", href: "/features" },
            { name: "Цены", href: "/pricing" },
            { name: "Скачать", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "Ресурсы": [
            { name: "Блог", href: "/blog" },
            { name: "Центр помощи", href: "/faq" },
        ],
        "Компания": [
            { name: "О нас", href: "/about" },
            { name: "Конфиденциальность", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    it: {
        "Prodotto": [
            { name: "Funzionalità", href: "/features" },
            { name: "Prezzi", href: "/pricing" },
            { name: "Scarica", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "Risorse": [
            { name: "Blog", href: "/blog" },
            { name: "Centro assistenza", href: "/faq" },
        ],
        "Azienda": [
            { name: "Chi siamo", href: "/about" },
            { name: "Privacy", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    nl: {
        "Product": [
            { name: "Functies", href: "/features" },
            { name: "Prijzen", href: "/pricing" },
            { name: "Download", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "Bronnen": [
            { name: "Blog", href: "/blog" },
            { name: "Helpcentrum", href: "/faq" },
        ],
        "Bedrijf": [
            { name: "Over ons", href: "/about" },
            { name: "Privacy", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    pt: {
        "Produto": [
            { name: "Recursos", href: "/features" },
            { name: "Preços", href: "/pricing" },
            { name: "Download", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "Ajuda": [
            { name: "Blog", href: "/blog" },
            { name: "Central de ajuda", href: "/faq" },
        ],
        "Empresa": [
            { name: "Sobre", href: "/about" },
            { name: "Privacidade", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    sv: {
        "Produkt": [
            { name: "Funktioner", href: "/features" },
            { name: "Priser", href: "/pricing" },
            { name: "Ladda ner", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "Resurser": [
            { name: "Blogg", href: "/blog" },
            { name: "Hjälpcenter", href: "/faq" },
        ],
        "Företag": [
            { name: "Om oss", href: "/about" },
            { name: "Integritet", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    no: {
        "Produkt": [
            { name: "Funksjoner", href: "/features" },
            { name: "Priser", href: "/pricing" },
            { name: "Last ned", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "Ressurser": [
            { name: "Blogg", href: "/blog" },
            { name: "Hjelpesenter", href: "/faq" },
        ],
        "Selskap": [
            { name: "Om oss", href: "/about" },
            { name: "Personvern", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    da: {
        "Produkt": [
            { name: "Funktioner", href: "/features" },
            { name: "Priser", href: "/pricing" },
            { name: "Download", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "Ressourcer": [
            { name: "Blog", href: "/blog" },
            { name: "Hjælpecenter", href: "/faq" },
        ],
        "Virksomhed": [
            { name: "Om os", href: "/about" },
            { name: "Privatliv", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
    fi: {
        "Tuote": [
            { name: "Ominaisuudet", href: "/features" },
            { name: "Hinnat", href: "/pricing" },
            { name: "Lataa", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
        ],
        "Resurssit": [
            { name: "Blogi", href: "/blog" },
            { name: "Ohjekeskus", href: "/faq" },
        ],
        "Yritys": [
            { name: "Tietoa meistä", href: "/about" },
            { name: "Tietosuoja", href: "https://codot.ai/privacy_policy", external: true },
        ],
    },
};

const footerText: Record<string, { tagline: string; copyright: string; privacy: string }> = {
    en: {
        tagline: "Your intelligent task management assistant. Transform how you organize your day with AI.",
        copyright: "All rights reserved.",
        privacy: "Privacy Policy",
    },
    zh: {
        tagline: "您的智能任务管理助手。用AI改变您的日程管理方式。",
        copyright: "版权所有。",
        privacy: "隐私政策",
    },
    ja: {
        tagline: "あなたのインテリジェントなタスク管理アシスタント。AIで毎日の整理方法を変革。",
        copyright: "All rights reserved.",
        privacy: "プライバシーポリシー",
    },
    ar: {
        tagline: "مساعدك الذكي لإدارة المهام. غيّر طريقة تنظيم يومك بالذكاء الاصطناعي.",
        copyright: "جميع الحقوق محفوظة.",
        privacy: "سياسة الخصوصية",
    },
    ko: {
        tagline: "지능형 작업 관리 어시스턴트입니다. AI로 하루를 정리하는 방식을 혁신하세요.",
        copyright: "All rights reserved.",
        privacy: "개인정보 보호정책",
    },
    de: {
        tagline: "Ihr intelligenter Aufgabenverwaltungsassistent. Transformieren Sie mit KI, wie Sie Ihren Tag organisieren.",
        copyright: "Alle Rechte vorbehalten.",
        privacy: "Datenschutzrichtlinie",
    },
    fr: {
        tagline: "Votre assistant intelligent de gestion des tâches. Transformez votre façon d'organiser votre journée avec l'IA.",
        copyright: "Tous droits réservés.",
        privacy: "Politique de confidentialité",
    },
    es: {
        tagline: "Tu asistente inteligente de gestión de tareas. Transforma cómo organizas tu día con IA.",
        copyright: "Todos los derechos reservados.",
        privacy: "Política de privacidad",
    },
    ru: {
        tagline: "Ваш интеллектуальный помощник по управлению задачами. Измените способ организации дня с помощью ИИ.",
        copyright: "Все права защищены.",
        privacy: "Политика конфиденциальности",
    },
    it: {
        tagline: "Il tuo assistente intelligente per la gestione delle attività. Trasforma il modo in cui organizzi la tua giornata con l'IA.",
        copyright: "Tutti i diritti riservati.",
        privacy: "Informativa sulla privacy",
    },
    nl: {
        tagline: "Uw intelligente taakbeheerassistent. Transformeer hoe u uw dag organiseert met AI.",
        copyright: "Alle rechten voorbehouden.",
        privacy: "Privacybeleid",
    },
    pt: {
        tagline: "Seu assistente inteligente de gerenciamento de tarefas. Transforme como você organiza seu dia com IA.",
        copyright: "Todos os direitos reservados.",
        privacy: "Política de Privacidade",
    },
    sv: {
        tagline: "Din intelligenta uppgiftshanteringsassistent. Förändra hur du organiserar din dag med AI.",
        copyright: "Alla rättigheter förbehållna.",
        privacy: "Integritetspolicy",
    },
    no: {
        tagline: "Din intelligente oppgavehåndteringsassistent. Forvandel hvordan du organiserer dagen din med AI.",
        copyright: "Alle rettigheter reservert.",
        privacy: "Personvernregler",
    },
    da: {
        tagline: "Din intelligente opgavestyringsassistent. Forvandl måden, du organiserer din dag på med AI.",
        copyright: "Alle rettigheder forbeholdes.",
        privacy: "Privatlivspolitik",
    },
    fi: {
        tagline: "Älykäs tehtävienhallinta-avustajasi. Muuta tapasi järjestää päiväsi tekoälyn avulla.",
        copyright: "Kaikki oikeudet pidätetään.",
        privacy: "Tietosuojakäytäntö",
    },
};

interface FooterProps {
    locale?: Locale;
}

export function Footer({ locale = 'en' }: FooterProps) {
    const footerLinks = footerLinksConfig[locale] || footerLinksConfig.en;
    const text = footerText[locale] || footerText.en;

    return (
        <footer className="bg-gradient-to-b from-white to-[#fafafa] border-t border-[#e8e0f0]/30 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
                            <span className="text-2xl font-bold font-display text-[#2d2d2d]">
                                Codot<span className="text-[#9bb8c4]">.ai</span>
                            </span>
                        </Link>
                        <p className="text-[#6b6b6b] text-sm mb-6">
                            {text.tagline}
                        </p>
                        <div className="space-y-2 mb-6">
                            <a href="mailto:david@silverroc.com" className="block text-sm text-[#6b6b6b] hover:text-[#2d2d2d] transition-colors">
                                david@silverroc.com
                            </a>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="text-[#a0a0a0] hover:text-[#9bb8c4] transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-[#a0a0a0] hover:text-[#9bb8c4] transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-[#a0a0a0] hover:text-[#9bb8c4] transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="font-semibold text-[#2d2d2d] mb-4">{category}</h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        {link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-[#6b6b6b] hover:text-[#9bb8c4] transition-colors"
                                            >
                                                {link.name}
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href === '/blog' ? `/${locale}${link.href}` : link.href}
                                                className="text-sm text-[#6b6b6b] hover:text-[#9bb8c4] transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-[#e8e0f0]/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[#a0a0a0]">
                        © {new Date().getFullYear()} Codot. {text.copyright}
                    </p>
                    <div className="flex gap-6">
                        <a href="https://codot.ai/privacy_policy" target="_blank" rel="noopener noreferrer" className="text-sm text-[#a0a0a0] hover:text-[#2d2d2d] transition-colors">
                            {text.privacy}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
