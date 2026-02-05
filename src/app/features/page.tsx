import { PageTemplate } from "@/components/templates/PageTemplate";
import { Mic, Brain, Calendar, Bell, Shield, Zap, CheckSquare, RefreshCw, Users, BookOpen } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Features - Voice Notes, Daily Planner, Task Manager & More",
    description: "Explore Codot's powerful features: voice notes, daily planner, AI task prioritization, habit tracker, smart reminders, brain dump for ADHD, meeting notes, and personal CRM. The best free productivity app.",
    keywords: "voice notes app, daily planner features, task manager app, habit tracker, reminder app, brain dump, adhd planner, meeting notes, personal crm, voice journal, to do list, checklist",
};

export default function FeaturesPage() {
    return (
        <PageTemplate
            title="Productivity App Features"
            subtitle="Voice notes, daily planner, task manager, habit tracker, and AI-powered features for ADHD and busy professionals."
        >
            <div className="grid md:grid-cols-2 gap-8 not-prose">
                {[
                    {
                        icon: <Mic className="w-8 h-8 text-secondary" />,
                        title: "Voice Notes & Voice Journal",
                        desc: "Capture ideas with voice diary and voice memos. Brain dump your thoughts hands-free - our AI transcribes and organizes everything automatically."
                    },
                    {
                        icon: <Brain className="w-8 h-8 text-primary" />,
                        title: "AI Task Prioritization for ADHD",
                        desc: "Smart to-do list that understands your workload. Perfect ADHD planner that breaks down tasks and helps you focus on what matters most."
                    },
                    {
                        icon: <Calendar className="w-8 h-8 text-accent" />,
                        title: "Daily & Weekly Planner",
                        desc: "AI calendar and schedule planner that syncs with Google Calendar. Smart scheduling respects your energy levels and existing commitments."
                    },
                    {
                        icon: <Bell className="w-8 h-8 text-yellow-400" />,
                        title: "Smart Reminder App",
                        desc: "Contextual reminders that learn your patterns. Get reminded at the right time and place - the best reminder app that actually works."
                    },
                    {
                        icon: <RefreshCw className="w-8 h-8 text-green-400" />,
                        title: "Habit Tracker",
                        desc: "Build better routines with habit tracking. Monitor daily habits, set goals, and achieve consistency with smart streak tracking."
                    },
                    {
                        icon: <CheckSquare className="w-8 h-8 text-blue-400" />,
                        title: "Checklist & To Do List",
                        desc: "Powerful checklist and todo app with smart categories. Create, organize, and complete tasks with satisfying completion tracking."
                    },
                    {
                        icon: <BookOpen className="w-8 h-8 text-purple-400" />,
                        title: "Meeting Notes & Note Taking",
                        desc: "Capture meeting notes with voice assistant. Organize notes automatically and build your personal knowledge base effortlessly."
                    },
                    {
                        icon: <Users className="w-8 h-8 text-pink-400" />,
                        title: "Contact Manager & Personal CRM",
                        desc: "Your personal address book and networking tool. Track relationships, remember important details, and never lose a valuable contact."
                    },
                    {
                        icon: <Shield className="w-8 h-8 text-emerald-400" />,
                        title: "Private & Secure",
                        desc: "Your data is encrypted and processed with privacy as a priority. We never sell your personal information."
                    },
                    {
                        icon: <Zap className="w-8 h-8 text-orange-400" />,
                        title: "Calendar Widget & Instant Sync",
                        desc: "Beautiful calendar widget for your home screen. Access your tasks from any device with instant sync across all platforms."
                    }
                ].map((feature, i) => (
                    <div key={i} className="p-6 rounded-xl bg-white border border-slate-200 hover:shadow-lg transition-shadow">
                        <div className="mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                        <p className="text-slate-600">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </PageTemplate>
    );
}
