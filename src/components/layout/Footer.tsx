import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";
import type { Locale } from "@/i18n/config";

const footerLinksConfig: Record<string, Record<string, Array<{ name: string; href: string; external?: boolean }>>> = {
    en: {
        Product: [
            { name: "Features", href: "/features" },
            { name: "Pricing", href: "/pricing" },
            { name: "Download", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "Changelog", href: "/changelog" },
        ],
        Resources: [
            { name: "Blog", href: "/blog" },
            { name: "Community", href: "/community" },
            { name: "Help Center", href: "/faq" },
            { name: "API Docs", href: "/docs" },
        ],
        Company: [
            { name: "About", href: "/about" },
            { name: "Careers", href: "/careers" },
            { name: "Legal", href: "/legal" },
            { name: "Privacy", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    zh: {
        "产品": [
            { name: "功能", href: "/features" },
            { name: "价格", href: "/pricing" },
            { name: "下载", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "更新日志", href: "/changelog" },
        ],
        "资源": [
            { name: "博客", href: "/blog" },
            { name: "社区", href: "/community" },
            { name: "帮助中心", href: "/faq" },
            { name: "API文档", href: "/docs" },
        ],
        "公司": [
            { name: "关于我们", href: "/about" },
            { name: "招聘", href: "/careers" },
            { name: "法律条款", href: "/legal" },
            { name: "隐私政策", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    ja: {
        "製品": [
            { name: "機能", href: "/features" },
            { name: "料金", href: "/pricing" },
            { name: "ダウンロード", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "変更履歴", href: "/changelog" },
        ],
        "リソース": [
            { name: "ブログ", href: "/blog" },
            { name: "コミュニティ", href: "/community" },
            { name: "ヘルプセンター", href: "/faq" },
            { name: "APIドキュメント", href: "/docs" },
        ],
        "会社": [
            { name: "概要", href: "/about" },
            { name: "採用情報", href: "/careers" },
            { name: "法的情報", href: "/legal" },
            { name: "プライバシー", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    ar: {
        "المنتج": [
            { name: "المميزات", href: "/features" },
            { name: "الأسعار", href: "/pricing" },
            { name: "تحميل", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "سجل التغييرات", href: "/changelog" },
        ],
        "الموارد": [
            { name: "المدونة", href: "/blog" },
            { name: "المجتمع", href: "/community" },
            { name: "مركز المساعدة", href: "/faq" },
            { name: "وثائق API", href: "/docs" },
        ],
        "الشركة": [
            { name: "عنا", href: "/about" },
            { name: "الوظائف", href: "/careers" },
            { name: "قانوني", href: "/legal" },
            { name: "الخصوصية", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    ko: {
        "제품": [
            { name: "기능", href: "/features" },
            { name: "가격", href: "/pricing" },
            { name: "다운로드", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "변경 내역", href: "/changelog" },
        ],
        "리소스": [
            { name: "블로그", href: "/blog" },
            { name: "커뮤니티", href: "/community" },
            { name: "도움말 센터", href: "/faq" },
            { name: "API 문서", href: "/docs" },
        ],
        "회사": [
            { name: "소개", href: "/about" },
            { name: "채용", href: "/careers" },
            { name: "법적 고지", href: "/legal" },
            { name: "개인정보 보호", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    de: {
        "Produkt": [
            { name: "Funktionen", href: "/features" },
            { name: "Preise", href: "/pricing" },
            { name: "Download", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "Änderungsprotokoll", href: "/changelog" },
        ],
        "Ressourcen": [
            { name: "Blog", href: "/blog" },
            { name: "Community", href: "/community" },
            { name: "Hilfecenter", href: "/faq" },
            { name: "API-Dokumentation", href: "/docs" },
        ],
        "Unternehmen": [
            { name: "Über uns", href: "/about" },
            { name: "Karriere", href: "/careers" },
            { name: "Rechtliches", href: "/legal" },
            { name: "Datenschutz", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    fr: {
        "Produit": [
            { name: "Fonctionnalités", href: "/features" },
            { name: "Tarifs", href: "/pricing" },
            { name: "Télécharger", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "Changelog", href: "/changelog" },
        ],
        "Ressources": [
            { name: "Blog", href: "/blog" },
            { name: "Communauté", href: "/community" },
            { name: "Centre d'aide", href: "/faq" },
            { name: "Documentation API", href: "/docs" },
        ],
        "Entreprise": [
            { name: "À propos", href: "/about" },
            { name: "Carrières", href: "/careers" },
            { name: "Mentions légales", href: "/legal" },
            { name: "Confidentialité", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    es: {
        "Producto": [
            { name: "Funciones", href: "/features" },
            { name: "Precios", href: "/pricing" },
            { name: "Descargar", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "Registro de cambios", href: "/changelog" },
        ],
        "Recursos": [
            { name: "Blog", href: "/blog" },
            { name: "Comunidad", href: "/community" },
            { name: "Centro de ayuda", href: "/faq" },
            { name: "Documentación API", href: "/docs" },
        ],
        "Empresa": [
            { name: "Acerca de", href: "/about" },
            { name: "Carreras", href: "/careers" },
            { name: "Legal", href: "/legal" },
            { name: "Privacidad", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    ru: {
        "Продукт": [
            { name: "Функции", href: "/features" },
            { name: "Цены", href: "/pricing" },
            { name: "Скачать", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "История изменений", href: "/changelog" },
        ],
        "Ресурсы": [
            { name: "Блог", href: "/blog" },
            { name: "Сообщество", href: "/community" },
            { name: "Центр помощи", href: "/faq" },
            { name: "Документация API", href: "/docs" },
        ],
        "Компания": [
            { name: "О нас", href: "/about" },
            { name: "Карьера", href: "/careers" },
            { name: "Правовая информация", href: "/legal" },
            { name: "Конфиденциальность", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    it: {
        "Prodotto": [
            { name: "Funzionalità", href: "/features" },
            { name: "Prezzi", href: "/pricing" },
            { name: "Scarica", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "Changelog", href: "/changelog" },
        ],
        "Risorse": [
            { name: "Blog", href: "/blog" },
            { name: "Community", href: "/community" },
            { name: "Centro assistenza", href: "/faq" },
            { name: "Documentazione API", href: "/docs" },
        ],
        "Azienda": [
            { name: "Chi siamo", href: "/about" },
            { name: "Carriere", href: "/careers" },
            { name: "Legale", href: "/legal" },
            { name: "Privacy", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    nl: {
        "Product": [
            { name: "Functies", href: "/features" },
            { name: "Prijzen", href: "/pricing" },
            { name: "Download", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "Changelog", href: "/changelog" },
        ],
        "Bronnen": [
            { name: "Blog", href: "/blog" },
            { name: "Community", href: "/community" },
            { name: "Helpcentrum", href: "/faq" },
            { name: "API-documentatie", href: "/docs" },
        ],
        "Bedrijf": [
            { name: "Over ons", href: "/about" },
            { name: "Carrière", href: "/careers" },
            { name: "Juridisch", href: "/legal" },
            { name: "Privacy", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    pt: {
        "Produto": [
            { name: "Recursos", href: "/features" },
            { name: "Preços", href: "/pricing" },
            { name: "Download", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "Changelog", href: "/changelog" },
        ],
        "Recursos": [
            { name: "Blog", href: "/blog" },
            { name: "Comunidade", href: "/community" },
            { name: "Central de ajuda", href: "/faq" },
            { name: "Documentação API", href: "/docs" },
        ],
        "Empresa": [
            { name: "Sobre", href: "/about" },
            { name: "Carreiras", href: "/careers" },
            { name: "Legal", href: "/legal" },
            { name: "Privacidade", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    sv: {
        "Produkt": [
            { name: "Funktioner", href: "/features" },
            { name: "Priser", href: "/pricing" },
            { name: "Ladda ner", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "Ändringslogg", href: "/changelog" },
        ],
        "Resurser": [
            { name: "Blogg", href: "/blog" },
            { name: "Community", href: "/community" },
            { name: "Hjälpcenter", href: "/faq" },
            { name: "API-dokumentation", href: "/docs" },
        ],
        "Företag": [
            { name: "Om oss", href: "/about" },
            { name: "Karriär", href: "/careers" },
            { name: "Juridiskt", href: "/legal" },
            { name: "Integritet", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    no: {
        "Produkt": [
            { name: "Funksjoner", href: "/features" },
            { name: "Priser", href: "/pricing" },
            { name: "Last ned", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "Endringslogg", href: "/changelog" },
        ],
        "Ressurser": [
            { name: "Blogg", href: "/blog" },
            { name: "Fellesskap", href: "/community" },
            { name: "Hjelpesenter", href: "/faq" },
            { name: "API-dokumentasjon", href: "/docs" },
        ],
        "Selskap": [
            { name: "Om oss", href: "/about" },
            { name: "Karriere", href: "/careers" },
            { name: "Juridisk", href: "/legal" },
            { name: "Personvern", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    da: {
        "Produkt": [
            { name: "Funktioner", href: "/features" },
            { name: "Priser", href: "/pricing" },
            { name: "Download", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "Ændringslog", href: "/changelog" },
        ],
        "Ressourcer": [
            { name: "Blog", href: "/blog" },
            { name: "Fællesskab", href: "/community" },
            { name: "Hjælpecenter", href: "/faq" },
            { name: "API-dokumentation", href: "/docs" },
        ],
        "Virksomhed": [
            { name: "Om os", href: "/about" },
            { name: "Karriere", href: "/careers" },
            { name: "Juridisk", href: "/legal" },
            { name: "Privatliv", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
    fi: {
        "Tuote": [
            { name: "Ominaisuudet", href: "/features" },
            { name: "Hinnat", href: "/pricing" },
            { name: "Lataa", href: "https://apps.apple.com/app/codot/id6743443746", external: true },
            { name: "Muutosloki", href: "/changelog" },
        ],
        "Resurssit": [
            { name: "Blogi", href: "/blog" },
            { name: "Yhteisö", href: "/community" },
            { name: "Ohjekeskus", href: "/faq" },
            { name: "API-dokumentaatio", href: "/docs" },
        ],
        "Yritys": [
            { name: "Tietoa meistä", href: "/about" },
            { name: "Ura", href: "/careers" },
            { name: "Oikeudelliset", href: "/legal" },
            { name: "Tietosuoja", href: "https://codot.ai/private_policy.html", external: true },
        ],
    },
};

const footerText: Record<string, { tagline: string; copyright: string; privacy: string; terms: string }> = {
    en: {
        tagline: "Your intelligent task management assistant. Transform how you organize your day with AI.",
        copyright: "All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
    },
    zh: {
        tagline: "您的智能任务管理助手。用AI改变您的日程管理方式。",
        copyright: "版权所有。",
        privacy: "隐私政策",
        terms: "服务条款",
    },
    ja: {
        tagline: "あなたのインテリジェントなタスク管理アシスタント。AIで毎日の整理方法を変革。",
        copyright: "All rights reserved.",
        privacy: "プライバシーポリシー",
        terms: "利用規約",
    },
    ar: {
        tagline: "مساعدك الذكي لإدارة المهام. غيّر طريقة تنظيم يومك بالذكاء الاصطناعي.",
        copyright: "جميع الحقوق محفوظة.",
        privacy: "سياسة الخصوصية",
        terms: "شروط الخدمة",
    },
    ko: {
        tagline: "지능형 작업 관리 어시스턴트입니다. AI로 하루를 정리하는 방식을 혁신하세요.",
        copyright: "All rights reserved.",
        privacy: "개인정보 보호정책",
        terms: "서비스 약관",
    },
    de: {
        tagline: "Ihr intelligenter Aufgabenverwaltungsassistent. Transformieren Sie mit KI, wie Sie Ihren Tag organisieren.",
        copyright: "Alle Rechte vorbehalten.",
        privacy: "Datenschutzrichtlinie",
        terms: "Nutzungsbedingungen",
    },
    fr: {
        tagline: "Votre assistant intelligent de gestion des tâches. Transformez votre façon d'organiser votre journée avec l'IA.",
        copyright: "Tous droits réservés.",
        privacy: "Politique de confidentialité",
        terms: "Conditions d'utilisation",
    },
    es: {
        tagline: "Tu asistente inteligente de gestión de tareas. Transforma cómo organizas tu día con IA.",
        copyright: "Todos los derechos reservados.",
        privacy: "Política de privacidad",
        terms: "Términos de servicio",
    },
    ru: {
        tagline: "Ваш интеллектуальный помощник по управлению задачами. Измените способ организации дня с помощью ИИ.",
        copyright: "Все права защищены.",
        privacy: "Политика конфиденциальности",
        terms: "Условия использования",
    },
    it: {
        tagline: "Il tuo assistente intelligente per la gestione delle attività. Trasforma il modo in cui organizzi la tua giornata con l'IA.",
        copyright: "Tutti i diritti riservati.",
        privacy: "Informativa sulla privacy",
        terms: "Termini di servizio",
    },
    nl: {
        tagline: "Uw intelligente taakbeheerassistent. Transformeer hoe u uw dag organiseert met AI.",
        copyright: "Alle rechten voorbehouden.",
        privacy: "Privacybeleid",
        terms: "Servicevoorwaarden",
    },
    pt: {
        tagline: "Seu assistente inteligente de gerenciamento de tarefas. Transforme como você organiza seu dia com IA.",
        copyright: "Todos os direitos reservados.",
        privacy: "Política de Privacidade",
        terms: "Termos de Serviço",
    },
    sv: {
        tagline: "Din intelligenta uppgiftshanteringsassistent. Förändra hur du organiserar din dag med AI.",
        copyright: "Alla rättigheter förbehållna.",
        privacy: "Integritetspolicy",
        terms: "Användarvillkor",
    },
    no: {
        tagline: "Din intelligente oppgavehåndteringsassistent. Forvandel hvordan du organiserer dagen din med AI.",
        copyright: "Alle rettigheter reservert.",
        privacy: "Personvernregler",
        terms: "Tjenestevilkår",
    },
    da: {
        tagline: "Din intelligente opgavestyringsassistent. Forvandl måden, du organiserer din dag på med AI.",
        copyright: "Alle rettigheder forbeholdes.",
        privacy: "Privatlivspolitik",
        terms: "Servicevilkår",
    },
    fi: {
        tagline: "Älykäs tehtävienhallinta-avustajasi. Muuta tapasi järjestää päiväsi tekoälyn avulla.",
        copyright: "Kaikki oikeudet pidätetään.",
        privacy: "Tietosuojakäytäntö",
        terms: "Käyttöehdot",
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
                        <Link href="/" className="flex items-center gap-2 mb-4">
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
                            <a href="tel:+6596665907" className="block text-sm text-[#6b6b6b] hover:text-[#2d2d2d] transition-colors">
                                +65 9666 5907
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
                                                href={link.href}
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
                        <a
                            href="https://codot.ai/private_policy.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#a0a0a0] hover:text-[#2d2d2d] transition-colors"
                        >
                            {text.privacy}
                        </a>
                        <Link href="/terms" className="text-sm text-[#a0a0a0] hover:text-[#2d2d2d] transition-colors">
                            {text.terms}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
