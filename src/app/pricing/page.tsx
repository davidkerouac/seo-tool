import { Metadata } from "next";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Pricing - Limited Time Free",
    description: "Get unlimited access to Codot.ai's intelligent task management features. Limited time free offer!",
};

export default function PricingPage() {
    return (
        <PageTemplate
            title="Limited Time Free"
            subtitle="Get started today with full access to all features at no cost"
        >
            <div className="not-prose">
                {/* Pricing Card */}
                <div className="max-w-lg mx-auto mb-16">
                    <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-2 border-secondary rounded-3xl p-8 md:p-10 shadow-xl">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <Sparkles className="w-4 h-4" />
                                Limited Offer
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">
                                Free Access
                            </h2>
                            <div className="flex items-baseline justify-center gap-2 mb-4">
                                <span className="text-5xl font-bold text-slate-900">$0</span>
                                <span className="text-slate-500">/month</span>
                            </div>
                            <p className="text-slate-600">
                                Enjoy all premium features at zero cost
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-4 mb-8">
                            {[
                                "Unlimited task management",
                                "AI-powered prioritization",
                                "Voice input",
                                "Cross-platform sync",
                                "Priority support",
                                "All future updates"
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-slate-700">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <Button className="w-full py-6 text-lg" size="lg">
                            Get Started Free
                        </Button>

                        <p className="text-center text-sm text-slate-500 mt-4">
                            No credit card required · Start instantly
                        </p>
                    </div>
                </div>

                {/* FAQ */}
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-semibold text-slate-900 mb-2">
                                How long will this offer last?
                            </h3>
                            <p className="text-slate-600">
                                During our limited-time free period, all new users can access all features at no cost. We&apos;ll notify users in advance of any pricing changes.
                            </p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-semibold text-slate-900 mb-2">
                                Do I need to provide payment information?
                            </h3>
                            <p className="text-slate-600">
                                No! It&apos;s completely free right now, and you can start using Codot without providing any payment details.
                            </p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-semibold text-slate-900 mb-2">
                                Are there any feature limitations in the free version?
                            </h3>
                            <p className="text-slate-600">
                                None! During the limited-time free period, you have access to all premium features with no restrictions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
}
