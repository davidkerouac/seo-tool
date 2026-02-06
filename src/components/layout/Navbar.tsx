"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button, cn } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/i18n/config";

const navLinksConfig: Record<string, Array<{ name: string; href: string }>> = {
    en: [
        { name: "Features", href: "/features" },
        { name: "Blog", href: "/blog" },
        { name: "Pricing", href: "/pricing" },
    ],
    zh: [
        { name: "功能", href: "/features" },
        { name: "博客", href: "/blog" },
        { name: "价格", href: "/pricing" },
    ],
    ja: [
        { name: "機能", href: "/features" },
        { name: "ブログ", href: "/blog" },
        { name: "料金", href: "/pricing" },
    ],
    ar: [
        { name: "المميزات", href: "/features" },
        { name: "المدونة", href: "/blog" },
        { name: "الأسعار", href: "/pricing" },
    ],
    ko: [
        { name: "기능", href: "/features" },
        { name: "블로그", href: "/blog" },
        { name: "가격", href: "/pricing" },
    ],
    de: [
        { name: "Funktionen", href: "/features" },
        { name: "Blog", href: "/blog" },
        { name: "Preise", href: "/pricing" },
    ],
    fr: [
        { name: "Fonctionnalités", href: "/features" },
        { name: "Blog", href: "/blog" },
        { name: "Tarifs", href: "/pricing" },
    ],
    es: [
        { name: "Funciones", href: "/features" },
        { name: "Blog", href: "/blog" },
        { name: "Precios", href: "/pricing" },
    ],
    ru: [
        { name: "Функции", href: "/features" },
        { name: "Блог", href: "/blog" },
        { name: "Цены", href: "/pricing" },
    ],
    it: [
        { name: "Funzionalità", href: "/features" },
        { name: "Blog", href: "/blog" },
        { name: "Prezzi", href: "/pricing" },
    ],
    nl: [
        { name: "Functies", href: "/features" },
        { name: "Blog", href: "/blog" },
        { name: "Prijzen", href: "/pricing" },
    ],
    pt: [
        { name: "Recursos", href: "/features" },
        { name: "Blog", href: "/blog" },
        { name: "Preços", href: "/pricing" },
    ],
    sv: [
        { name: "Funktioner", href: "/features" },
        { name: "Blogg", href: "/blog" },
        { name: "Priser", href: "/pricing" },
    ],
    no: [
        { name: "Funksjoner", href: "/features" },
        { name: "Blogg", href: "/blog" },
        { name: "Priser", href: "/pricing" },
    ],
    da: [
        { name: "Funktioner", href: "/features" },
        { name: "Blog", href: "/blog" },
        { name: "Priser", href: "/pricing" },
    ],
    fi: [
        { name: "Ominaisuudet", href: "/features" },
        { name: "Blogi", href: "/blog" },
        { name: "Hinnat", href: "/pricing" },
    ],
};

const downloadText: Record<string, string> = {
    en: "Download App",
    zh: "下载应用",
    ja: "アプリをダウンロード",
    ar: "تحميل التطبيق",
    ko: "앱 다운로드",
    de: "App herunterladen",
    fr: "Télécharger l'app",
    es: "Descargar App",
    ru: "Скачать приложение",
    it: "Scarica l'App",
    nl: "Download App",
    pt: "Baixar App",
    sv: "Ladda ner appen",
    no: "Last ned appen",
    da: "Download App",
    fi: "Lataa sovellus",
};

interface NavbarProps {
    locale?: Locale;
}

export function Navbar({ locale = 'en' }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = navLinksConfig[locale] || navLinksConfig.en;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled
                    ? "bg-white/90 backdrop-blur-xl border-b border-[#e8e0f0]/40 shadow-sm"
                    : "bg-gradient-to-b from-white/60 to-transparent backdrop-blur-sm"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href={`/${locale}`} className="flex items-center gap-2">
                        <span className="text-2xl font-bold font-display text-[#2d2d2d]">
                            Codot<span className="text-[#9bb8c4]">.ai</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href === '/blog' ? `/${locale}${link.href}` : link.href}
                                className="text-sm font-medium text-[#6b6b6b] hover:text-[#2d2d2d] transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA & Language Switcher */}
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSwitcher currentLocale={locale} />
                        <a href="https://apps.apple.com/app/codot/id6743443746" target="_blank" rel="noopener noreferrer">
                            <Button size="sm">{downloadText[locale]}</Button>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[#2d2d2d]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-[#e8e0f0]/40 p-4 md:hidden shadow-lg"
                    >
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href === '/blog' ? `/${locale}${link.href}` : link.href}
                                    className="text-base font-medium text-[#6b6b6b] hover:text-[#2d2d2d] px-2 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-[#e8e0f0]/50 my-2" />

                            <div className="px-2">
                                <LanguageSwitcher currentLocale={locale} />
                            </div>

                            <a href="https://apps.apple.com/app/codot/id6743443746" target="_blank" rel="noopener noreferrer" className="w-full">
                                <Button className="w-full">{downloadText[locale]}</Button>
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
