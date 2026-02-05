"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
    {
        role: "user",
        content: "Today I need to visit Mom in the morning, submit school application doc by 4pm and buy Tesla stock when the market opens",
        delay: 0
    },
    {
        role: "assistant",
        content: "Got it. I've scheduled your visit to Mom for this morning, set a reminder for the school application at 4 PM, and added a task to buy Tesla stock at 9:30 AM.",
        delay: 1500
    },
    {
        role: "user",
        content: "Move all unfinished tasks last week to this week, finish before Wednesday",
        delay: 4000
    },
    {
        role: "assistant",
        content: "Done. I've rescheduled 3 unfinished tasks to Monday and Tuesday. Your schedule is clear by Wednesday.",
        delay: 5500
    }
];

export function MessageDialog() {
    const [visibleMessages, setVisibleMessages] = useState<number>(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const showNextMessage = (index: number) => {
            if (index < messages.length) {
                timeout = setTimeout(() => {
                    setVisibleMessages(prev => prev + 1);
                    showNextMessage(index + 1);
                }, messages[index].delay - (index > 0 ? messages[index - 1].delay : 0));
            }
        };

        showNextMessage(0);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="ml-auto text-xs text-slate-600 font-medium">Codot Assistant</div>
            </div>

            {/* Messages Area */}
            <div className="p-6 space-y-6 min-h-[400px]">
                {messages.slice(0, visibleMessages).map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${msg.role === 'user'
                                ? 'bg-secondary/10 text-slate-900 rounded-tr-sm border border-secondary/20'
                                : 'bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200'
                                }`}
                        >
                            {msg.content}
                        </div>
                    </motion.div>
                ))}

                {visibleMessages < messages.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-1 ml-4"
                    >
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </motion.div>
                )}
            </div>
        </div>
    );
}
