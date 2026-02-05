"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mic, Brain, Calendar, Bell, RefreshCw, Book, Tag, MessageSquare, Smartphone, Watch, Globe, MessageCircle, CheckCircle2, Utensils, Flame, Users, StickyNote, Check, X as XIcon, ChevronDown, Briefcase, GraduationCap } from "lucide-react";
import { MessageDialog } from "@/components/ui/MessageDialog";
import { useState } from "react";

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

  return (
    <div className="min-h-screen bg-[#f8f9fa] overflow-hidden selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Column: Headline & CTA */}
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
                <span className="text-sm font-medium text-slate-600">Codot Online</span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold font-display text-slate-900 mb-8 leading-tight tracking-tight"
              >
                AI Daily Planner & <br />
                <span className="text-gradient animate-gradient-x inline-block">Voice Notes App</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-slate-600 mb-8 max-w-lg leading-relaxed"
              >
                Your personal assistant for task management, voice journal, brain dump, and smart reminders. The ultimate to-do list app for ADHD and busy professionals.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <a href="https://chat.codot.ai" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto hover:scale-105 transition-all duration-300 shadow-lg shadow-secondary/20">
                    Visit Web
                  </Button>
                </a>
                <a href="https://apps.apple.com/app/codot/id6743443746" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
                    <span className="relative z-10 flex items-center">
                      Download Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient-x" />
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column: Simulated Chat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="relative z-10 perspective-1000"
            >
              <div className="relative transform transition-transform hover:scale-[1.02] duration-500">
                {/* Glow effect behind the chat */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-2xl blur-2xl -z-10 transform translate-y-4 opacity-60" />
                
                {/* Floating Icons */}
                {[
                  // Top Edge
                  { Icon: MessageCircle, top: "-4%", left: "5%", delay: 0, color: "text-indigo-500", bg: "bg-indigo-50" },
                  { Icon: CheckCircle2, top: "-6%", right: "5%", delay: 0.2, color: "text-emerald-500", bg: "bg-emerald-50" },
                  
                  // Right Edge
                  { Icon: Utensils, top: "15%", right: "-4%", delay: 0.4, color: "text-orange-500", bg: "bg-orange-50" },
                  { Icon: Watch, top: "45%", right: "-6%", delay: 0.6, color: "text-purple-500", bg: "bg-purple-50" },
                  { Icon: Flame, bottom: "15%", right: "-4%", delay: 0.8, color: "text-red-500", bg: "bg-red-50" },

                  // Bottom Edge
                  { Icon: StickyNote, bottom: "-4%", right: "5%", delay: 1.0, color: "text-yellow-500", bg: "bg-yellow-50" },
                  { Icon: Users, bottom: "-6%", left: "5%", delay: 1.2, color: "text-pink-500", bg: "bg-pink-50" },

                  // Left Edge
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

          {/* Hero Image / Mockup (Centered below) */}

        </div>
      </section>

      {/* Video Section */}
      <section id="demo-video" className="py-24 bg-slate-50/50 relative border-y border-slate-200 backdrop-blur-sm overflow-hidden">
         {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-transparent via-white/50 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold font-display text-slate-900 mb-8">
              Make Daily Plan with Rap Song <br />
              <span className="text-gradient">&apos;It&apos;s a Good Day&apos;</span> for Ice Cube in LA in 1992
            </h2>
            <div className="relative max-w-4xl mx-auto group">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary via-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
                
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
                    <video
                    controls
                    preload="metadata"
                    className="w-full h-full object-contain aspect-video"
                    poster="/asset/video-poster.jpg"
                    >
                    <source src="https://codot.blob.core.windows.net/codot/land_page_assets/codot_rap_song_raw.mp4?sp=r&st=2025-05-26T15:42:48Z&se=2029-05-26T23:42:48Z&spr=https&sv=2024-11-04&sr=b&sig=xWkbu%2Fg0rlO%2FPVURExuKpYoZE%2FMwKsAPicZ8XLLOcD0%3D" type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                </div>
            </div>
          </motion.div>
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
              Productivity App <span className="text-gradient">Features</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Voice notes, daily planner, task manager, habit tracker, and smart reminders - all powered by AI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Mic className="w-6 h-6 text-secondary" />,
                title: "Voice Notes & Voice Journal",
                desc: "Record voice memos, create voice diary entries, and capture brain dumps hands-free with AI transcription."
              },
              {
                icon: <Brain className="w-6 h-6 text-primary" />,
                title: "AI Task Prioritization",
                desc: "Smart to-do list that auto-prioritizes your checklist based on deadlines and importance - perfect for ADHD."
              },
              {
                icon: <Calendar className="w-6 h-6 text-accent" />,
                title: "Daily & Weekly Planner",
                desc: "AI calendar with schedule planner that syncs with Google Calendar. Plan your day effortlessly."
              },
              {
                icon: <Bell className="w-6 h-6 text-yellow-400" />,
                title: "Smart Reminder App",
                desc: "Adaptive reminders that learn from your habits. Never miss important tasks with intelligent notifications."
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-green-400" />,
                title: "Habit Tracker",
                desc: "Build better routines with habit tracking. Monitor daily habits and achieve your goals consistently."
              },
              {
                icon: <Brain className="w-6 h-6 text-purple-400" />,
                title: "Focus App for ADHD",
                desc: "Designed for neurodivergent minds. Brain dump feature helps clear mental clutter and stay focused."
              },
              {
                icon: <Book className="w-6 h-6 text-blue-400" />,
                title: "Note Taking & Meeting Notes",
                desc: "Capture meeting notes with voice, organize with AI. Build your personal knowledge base effortlessly."
              },
              {
                icon: <Tag className="w-6 h-6 text-pink-400" />,
                title: "Contact Manager & Personal CRM",
                desc: "Manage your network like an address book. Track relationships and never forget important contacts."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all group cursor-default relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/5 rounded-2xl transition-colors duration-300" />
                
                <div className="relative z-10">
                  <div className="mb-4 p-3 bg-slate-50 rounded-lg w-fit group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                    {feature.icon}
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
              How Codot <span className="text-gradient">Works</span>
            </h2>
          </motion.div>

          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {[
              { step: "1", title: "Speak or Chat", desc: "Communicate with Codot through voice or text, just like talking to a friend." },
              { step: "2", title: "Codot Understands", desc: "The AI comprehends context, urgency, and your personal patterns." },
              { step: "3", title: "Tasks Organized", desc: "Your commitments are automatically organized and prioritized." },
              { step: "4", title: "Stay on Track", desc: "Receive timely reminders and updates tailored to your preferences." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 transition-colors shadow-sm hover:shadow-xl group"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform">
                  {item.step}
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
            What Users <span className="text-gradient">Say</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "Codot has completely transformed how I manage my busy schedule. The voice interaction is so natural, it's like having a personal assistant by my side.", author: "Emma J.", title: "Marketing Executive" },
              { quote: "As someone who struggles with organization, Codot has been a game-changer. It somehow knows exactly how to prioritize my tasks better than I ever could.", author: "Michael T.", title: "Software Engineer" },
              { quote: "The adaptive reminders are what make Codot special. It actually learns when I'm most likely to complete certain types of tasks and reminds me accordingly.", author: "Sarah L.", title: "Freelance Designer" }
            ].map((testimonial, i) => (
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
              Best Productivity App for <span className="text-gradient">Everyone</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Whether you need an ADHD planner, personal assistant, or task manager - Codot adapts to your lifestyle.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "ADHD Planner & Focus App",
                desc: "The best productivity app for ADHD. Brain dump your thoughts, break tasks into manageable steps, and use voice journal to capture ideas without overwhelm. Perfect focus app for neurodivergent minds.",
                icon: <Brain className="w-8 h-8 text-purple-500" />,
                color: "bg-purple-50 border-purple-100"
              },
              {
                title: "Personal Assistant for Executives",
                desc: "Your virtual assistant for time management. Task manager with meeting notes, schedule planner, and smart reminders. The ultimate productivity app for busy professionals and entrepreneurs.",
                icon: <Briefcase className="w-8 h-8 text-blue-500" />,
                color: "bg-blue-50 border-blue-100"
              },
              {
                title: "Students & Life Organizer",
                desc: "All-in-one note taking app with checklist, daily planner, and habit tracker. Manage assignments, capture voice notes during lectures, and build your personal knowledge base.",
                icon: <GraduationCap className="w-8 h-8 text-emerald-500" />,
                color: "bg-emerald-50 border-emerald-100"
              }
            ].map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl border ${useCase.color} hover:shadow-lg transition-all cursor-default`}
              >
                <div className="mb-6 p-4 bg-white rounded-xl w-fit shadow-sm">{useCase.icon}</div>
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
              Why Choose <span className="text-gradient">Codot</span>?
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px] bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="grid grid-cols-4 bg-slate-50 p-6 border-b border-slate-200">
                <div className="col-span-1 font-bold text-slate-500">Feature</div>
                <div className="col-span-1 font-bold text-center text-primary text-xl">Codot</div>
                <div className="col-span-1 font-bold text-center text-slate-400">Notion</div>
                <div className="col-span-1 font-bold text-center text-slate-400">Todoist</div>
              </div>
              
              {[
                { feature: "Voice-First Interaction", codot: true, notion: false, todoist: false },
                { feature: "Context-Aware AI", codot: true, notion: "Limited", todoist: false },
                { feature: "Auto-Prioritization", codot: true, notion: false, todoist: "Limited" },
                { feature: "Smart Scheduling", codot: true, notion: false, todoist: false },
                { feature: "Knowledge Base", codot: true, notion: true, todoist: false },
                { feature: "Daily Routine Learning", codot: true, notion: false, todoist: false },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-4 p-6 border-b border-slate-100 hover:bg-slate-50/50 transition-colors items-center">
                  <div className="col-span-1 font-medium text-slate-700">{row.feature}</div>
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
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h2>

          <div className="space-y-4">
            {[
              { q: "Is Codot a free daily planner and to-do list app?", a: "Yes, Codot offers a generous free tier that includes essential task management, voice notes, daily planner, and AI features. We also have a Pro plan for power users who need advanced habit tracker analytics and unlimited AI interactions." },
              { q: "Is Codot good for ADHD and brain dump?", a: "Absolutely! Codot is the best ADHD planner with brain dump feature. Our AI breaks down overwhelming tasks into manageable steps, provides gentle reminders without nagging, and supports voice journal for capturing thoughts on the go. It's designed specifically to help with executive dysfunction." },
              { q: "How does the voice notes and voice journal work?", a: "Simply speak to capture tasks, notes, or diary entries. Our AI transcribes your voice memos, organizes them automatically, and can even extract action items from your voice journal entries. Perfect for meeting notes and quick brain dumps." },
              { q: "Does the daily planner sync with Google Calendar?", a: "Yes! Codot integrates seamlessly with Google Calendar, Apple Calendar, and Outlook. Your schedule planner and calendar widget stay up-to-date across all your devices automatically." },
              { q: "What makes Codot different from other task manager apps?", a: "Codot combines voice notes, AI task prioritization, habit tracker, personal CRM, and smart reminders in one app. Unlike traditional to-do lists, Codot learns your patterns and provides personalized assistance - like having a personal assistant in your pocket." },
              { q: "Does the reminder app work offline?", a: "Yes, you can view and manage your checklist and to-do list offline. Changes will automatically sync once you're back online, and reminders work even without internet." }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
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
            Your Free AI <br />
            <span className="text-gradient">Personal Assistant</span> Awaits
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Download the best daily planner, voice notes, and task manager app. Start organizing your life with AI today - it&apos;s free!
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="https://apps.apple.com/app/codot/id6743443746" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-16 px-8 text-lg shadow-xl shadow-primary/20">
                <span className="mr-2"></span> Download on the App Store
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
