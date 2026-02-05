import Script from "next/script";

export function Schema() {
    const appSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Codot",
        "alternateName": ["Codot AI", "Codot Planner", "Codot Voice Notes"],
        "applicationCategory": "ProductivityApplication",
        "applicationSubCategory": [
            "Task Manager",
            "Daily Planner",
            "Voice Notes App",
            "To Do List",
            "Habit Tracker",
            "Reminder App",
            "ADHD Planner"
        ],
        "operatingSystem": "iOS, Android, Web",
        "description": "AI-powered daily planner and voice notes app with task manager, brain dump, habit tracker, and smart reminders. Perfect productivity app for ADHD and busy professionals.",
        "url": "https://codot.ai",
        "downloadUrl": "https://apps.apple.com/app/codot/id6743443746",
        "screenshot": "https://codot.ai/og-image.jpg",
        "featureList": [
            "Voice Notes & Voice Journal",
            "AI Task Prioritization",
            "Daily & Weekly Planner",
            "Smart Reminder App",
            "Habit Tracker",
            "Brain Dump for ADHD",
            "Meeting Notes",
            "Contact Manager & Personal CRM",
            "Google Calendar Sync",
            "Calendar Widget"
        ],
        "keywords": "daily planner, voice notes, to do list, task manager, reminder app, brain dump, adhd planner, habit tracker, voice journal, productivity app, checklist, focus app, personal assistant",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Codot",
        "url": "https://codot.ai",
        "logo": "https://codot.ai/codot.svg",
        "sameAs": [
            "https://twitter.com/codotai"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "availableLanguage": ["English", "Chinese"]
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is Codot free to use?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Codot offers a generous free tier that includes essential task management, voice notes, and AI features. We also have a Pro plan for power users who need advanced analytics and unlimited AI interactions."
                }
            },
            {
                "@type": "Question",
                "name": "Is Codot good for ADHD?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! Codot is designed with ADHD users in mind. Features like brain dump, voice journal, and AI task prioritization help manage executive dysfunction. The app breaks down tasks into manageable steps and provides gentle reminders without overwhelming you."
                }
            },
            {
                "@type": "Question",
                "name": "Can I use voice notes with Codot?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Codot features a powerful voice notes and voice journal system. Simply speak to capture tasks, notes, and ideas. Our AI transcribes and organizes your voice memos automatically."
                }
            },
            {
                "@type": "Question",
                "name": "Does Codot sync with Google Calendar?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Codot integrates seamlessly with Google Calendar, Apple Calendar, and Outlook, ensuring your schedule is always up-to-date across all your devices."
                }
            }
        ]
    };

    return (
        <>
            <Script
                id="json-ld-app"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
            />
            <Script
                id="json-ld-org"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <Script
                id="json-ld-faq"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}
