import React from "react";
import { Lock, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface SubscriptionPaywallProps {
    title?: string;
    description?: string;
}

const SubscriptionPaywall: React.FC<SubscriptionPaywallProps> = ({
    title = "Unlock Premium Analysis",
    description = "Get full access to detailed Shariah reports, advanced business & financial screening, and international stock insights.",
}) => {
    const benefits = [
        "Full Business & Financial screening data",
        "Detailed Shariah compliance reports",
        "International & Regional stock insights",
        "Real-time alerts and watchlist features",
        "Advanced stock search and filtering",
    ];

    return (
        <div className="relative min-h-[500px] flex items-center justify-center p-6 bg-slate-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] right-[-10%] w-1/2 h-1/2 bg-blue-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-1/2 h-1/2 bg-indigo-600/20 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
                {/* Icon & Badge */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center animate-pulse">
                        <Lock className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        <span>Premium Only Feature</span>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        {title}
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3 text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            <span className="text-sm font-medium">{benefit}</span>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/pricing"
                        className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center gap-2"
                    >
                        Upgrade Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-slate-500 text-sm">
                        Plans starting from as low as $9.99/mo
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPaywall;
