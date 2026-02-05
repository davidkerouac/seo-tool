"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mic, Brain, Calendar, Bell, RefreshCw, Book, Tag, MessageSquare, Smartphone, Watch, Globe, MessageCircle, CheckCircle2, Utensils, Flame, Users, StickyNote, Check, X as XIcon, ChevronDown, Briefcase, GraduationCap } from "lucide-react";
import { MessageDialog } from "@/components/ui/MessageDialog";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import type { Locale } from "@/i18n/config";

// Client-side dictionary loading
function useDictionary(locale: Locale) {
  const [dict, setDict] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    import(`@/i18n/dictionaries/${locale}.json`).then((module) => {
      setDict(module.default);
    });
  }, [locale]);

  return dict;
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-4 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const dict = useDictionary(locale);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  } as const;

  // Loading state
  if (!dict) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    );
  }

  const hero = dict.hero as Record<string, string>;
  const features = dict.features as { title: string; titleHighlight: string; subtitle: string; items: Array<{ title: string; desc: string }> };
  const howItWorks = dict.howItWorks as { title: string; titleHighlight: string; steps: Array<{ title: string; desc: string }> };
  const testimonials = dict.testimonials as { title: string; titleHighlight: string; items: Array<{ quote: string; author: string; title: string }> };
  const useCases = dict.useCases as { title: string; titleHighlight: string; subtitle: string; items: Array<{ title: string; desc: string }> };
  const comparison = dict.comparison as { title: string; titleHighlight: string; feature: string; features: string[] };
  const faq = dict.faq as { title: string; titleHighlight: string; items: Array<{ q: string; a: string }> };
  const cta = dict.cta as Record<string, string>;

  const featureIcons = [
    <Mic key="mic" className="w-6 h-6 text-secondary" />,
    <Brain key="brain1" className="w-6 h-6 text-primary" />,
    <Calendar key="cal" className="w-6 h-6 text-accent" />,
    <Bell key="bell" className="w-6 h-6 text-yellow-400" />,
    <RefreshCw key="refresh" className="w-6 h-6 text-green-400" />,
    <Brain key="brain2" className="w-6 h-6 text-purple-400" />,
    <Book key="book" className="w-6 h-6 text-blue-400" />,
    <Tag key="tag" className="w-6 h-6 text-pink-400" />
  ];

  const useCaseConfigs = [
    { icon: <Brain className="w-8 h-8 text-purple-500" />, color: "bg-purple-50 border-purple-100" },
    { icon: <Briefcase className="w-8 h-8 text-blue-500" />, color: "bg-blue-50 border-blue-100" },
    { icon: <GraduationCap className="w-8 h-8 text-emerald-500" />, color: "bg-emerald-50 border-emerald-100" }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] overflow-hidden selection:bg-primary/20 selection:text-primary">
      <Navbar locale={locale} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-left"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/60 mb-8 backdrop-blur-md hover:bg-white/80 transition-colors cursor-default shadow-sm hover:shadow-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span className="text-sm font-medium text-slate-600">{hero.badge}</span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold font-display text-slate-900 mb-8 leading-tight tracking-tight"
              >
                {hero.title1} <br />
                <span className="text-gradient animate-gradient-x inline-block">{hero.title2}</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-slate-600 mb-8 max-w-lg leading-relaxed"
              >
                {hero.description}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <a href="https://chat.codot.ai" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto hover:scale-105 transition-all duration-300 shadow-lg shadow-secondary/20">
                    {hero.visitWeb}
                  </Button>
                </a>
                <a href="https://apps.apple.com/app/codot/id6743443746" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
                    <span className="relative z-10 flex items-center">
                      {hero.downloadNow}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="relative z-10 perspective-1000"
            >
              <div className="relative transform transition-transform hover:scale-[1.02] duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-2xl blur-2xl -z-10 transform translate-y-4 opacity-60" />

                {[
                  { Icon: MessageCircle, top: "-4%", left: "5%", delay: 0, color: "text-indigo-500", bg: "bg-indigo-50" },
                  { Icon: CheckCircle2, top: "-6%", right: "5%", delay: 0.2, color: "text-emerald-500", bg: "bg-emerald-50" },
                  { Icon: Utensils, top: "15%", right: "-4%", delay: 0.4, color: "text-orange-500", bg: "bg-orange-50" },
                  { Icon: Watch, top: "45%", right: "-6%", delay: 0.6, color: "text-purple-500", bg: "bg-purple-50" },
                  { Icon: Flame, bottom: "15%", right: "-4%", delay: 0.8, color: "text-red-500", bg: "bg-red-50" },
                  { Icon: StickyNote, bottom: "-4%", right: "5%", delay: 1.0, color: "text-yellow-500", bg: "bg-yellow-50" },
                  { Icon: Users, bottom: "-6%", left: "5%", delay: 1.2, color: "text-pink-500", bg: "bg-pink-50" },
                  { Icon: Globe, bottom: "15%", left: "-4%", delay: 1.4, color: "text-cyan-500", bg: "bg-cyan-50" },
                  { Icon: Smartphone, top: "45%", left: "-6%", delay: 1.6, color: "text-blue-500", bg: "bg-blue-50" },
                  { Icon: Mic, top: "15%", left: "-4%", delay: 1.8, color: "text-rose-500", bg: "bg-rose-50" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`absolute p-3 rounded-2xl shadow-lg border border-white/50 backdrop-blur-md z-20 hidden md:flex items-center justify-center ${item.bg} ${item.color}`}
                    style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -10, 0],
                      rotate: [0, i % 2 === 0 ? 5 : -5, 0]
                    }}
                    transition={{
                      opacity: { duration: 0.5, delay: 0.5 + item.delay * 0.1 },
                      scale: { duration: 0.5, delay: 0.5 + item.delay * 0.1, type: "spring", stiffness: 260, damping: 20 },
                      y: { duration: 3 + (i * 0.5), repeat: Infinity, ease: "easeInOut", delay: item.delay },
                      rotate: { duration: 4 + (i * 0.5), repeat: Infinity, ease: "easeInOut", delay: item.delay }
                    }}
                  >
                    <item.Icon className="w-6 h-6" />
                  </motion.div>
                ))}

                <MessageDialog />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-900 mb-4">
              {features.title} <span className="text-gradient">{features.titleHighlight}</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {features.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.items.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all group cursor-default relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="mb-4 p-3 bg-slate-50 rounded-lg w-fit group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                    {featureIcons[i]}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-900 mb-16 text-center">
              {howItWorks.title} <span className="text-gradient">{howItWorks.titleHighlight}</span>
            </h2>
          </motion.div>

          <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {howItWorks.steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 transition-colors shadow-sm hover:shadow-xl group"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 mt-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-50/50 -skew-y-3 transform origin-top-left scale-110 z-0" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-display text-slate-900 mb-16 text-center"
          >
            {testimonials.title} <span className="text-gradient">{testimonials.titleHighlight}</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.items.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="p-8 rounded-2xl bg-white border border-slate-200 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <MessageSquare className="w-8 h-8 text-secondary mb-4 opacity-50" />
                <p className="text-slate-700 mb-6 flex-1 italic leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="text-slate-900 font-bold">{testimonial.author}</p>
                  <p className="text-secondary text-sm">{testimonial.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 relative bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-900 mb-4">
              {useCases.title} <span className="text-gradient">{useCases.titleHighlight}</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {useCases.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.items.map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl border ${useCaseConfigs[i].color} hover:shadow-lg transition-all cursor-default`}
              >
                <div className="mb-6 p-4 bg-white rounded-xl w-fit shadow-sm">{useCaseConfigs[i].icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{useCase.title}</h3>
                <p className="text-slate-700 leading-relaxed">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-900 mb-4">
              {comparison.title} <span className="text-gradient">{comparison.titleHighlight}</span>?
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px] bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="grid grid-cols-4 bg-slate-50 p-6 border-b border-slate-200">
                <div className="col-span-1 font-bold text-slate-500">{comparison.feature}</div>
                <div className="col-span-1 font-bold text-center text-primary text-xl">Codot</div>
                <div className="col-span-1 font-bold text-center text-slate-400">Notion</div>
                <div className="col-span-1 font-bold text-center text-slate-400">Todoist</div>
              </div>

              {[
                { codot: true, notion: false, todoist: false },
                { codot: true, notion: "Limited", todoist: false },
                { codot: true, notion: false, todoist: "Limited" },
                { codot: true, notion: false, todoist: false },
                { codot: true, notion: true, todoist: false },
                { codot: true, notion: false, todoist: false },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-4 p-6 border-b border-slate-100 hover:bg-slate-50/50 transition-colors items-center">
                  <div className="col-span-1 font-medium text-slate-700">{comparison.features[i]}</div>
                  <div className="col-span-1 flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Check className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center text-slate-400">
                    {row.notion === true ? <Check className="w-5 h-5 text-slate-600" /> : row.notion === false ? <XIcon className="w-5 h-5" /> : <span className="text-sm">{row.notion}</span>}
                  </div>
                  <div className="col-span-1 flex justify-center text-slate-400">
                    {row.todoist === true ? <Check className="w-5 h-5 text-slate-600" /> : row.todoist === false ? <XIcon className="w-5 h-5" /> : <span className="text-sm">{row.todoist}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-display text-slate-900 mb-12 text-center"
          >
            {faq.title} <span className="text-gradient">{faq.titleHighlight}</span>
          </motion.h2>

          <div className="space-y-4">
            {faq.items.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-display text-slate-900 mb-8">
            {cta.title1} <br />
            <span className="text-gradient">{cta.title2}</span> {cta.titleHighlight}
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            {cta.description}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="https://apps.apple.com/app/codot/id6743443746" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-16 px-8 text-lg shadow-xl shadow-primary/20">
                <span className="mr-2"></span> {cta.downloadButton}
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      <Footer locale={locale} />
    </div>
  );
}
