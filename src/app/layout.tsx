import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://codot.ai"),
  title: {
    default: "Codot - AI Daily Planner & Voice Notes App | To Do List & Task Manager",
    template: "%s | Codot - AI Productivity App",
  },
  description: "Codot is your AI-powered personal assistant for daily planning, voice notes, and task management. Perfect for ADHD users with brain dump feature, smart reminders, habit tracker, and calendar widget.",
  icons: {
    icon: "/codot.svg",
    shortcut: "/codot.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
