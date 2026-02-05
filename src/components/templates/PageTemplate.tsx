import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

interface PageTemplateProps {
    title: string;
    subtitle: string;
    children?: React.ReactNode;
}

export function PageTemplate({ title, subtitle, children }: PageTemplateProps) {
    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold font-display text-slate-900 mb-6">
                            {title}
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        {children}
                    </div>

                    <div className="mt-20 p-8 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to get started?</h2>
                        <p className="text-slate-600 mb-8">Join thousands of productive users today.</p>
                        <Button size="lg">Download Codot</Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
