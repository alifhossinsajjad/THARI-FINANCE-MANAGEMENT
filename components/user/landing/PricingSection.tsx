"use client";

import GetStartedButton from "@/components/reusable/GetStartedButton";
import { useState, useEffect } from "react";

export default function PricingSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const pricingPlans = [
    {
      name: "Beginner",
      tagline: "Perfect for individuals taking control of their portfolio",
      price: "9.95",
      period: "/month",
      features: [
        "Perfect for small projects & individual contractors",
        "Generate 15 proposals per month",
        "Basic AI templates for bids & quotes",
        "Access on web & mobile",
        "Community support",
      ],
      buttonText: "Get Started",
      highlighted: false,
    },
    {
      name: "Elite",
      badge: "Popular",
      tagline: "For growing professionals who want deeper insights",
      price: "29.95",
      period: "/month",
      features: [
        "Designed for growing businesses & professionals",
        "Generate unlimited proposals",
        "Advanced AI templates & customization",
        "Basic AI templates for bids & quotes",
        "Priority support",
      ],
      buttonText: "See Pricing",
      highlighted: true,
    },
    {
      name: "Elite Pro",
      tagline: "Designed for company and constructor who want complete control",
      price: "49.95",
      period: "/month",
      features: [
        "Designed for growing businesses & professionals",
        "Generate unlimited proposals",
        "Advanced AI templates & customization",
        "Basic AI templates for bids & quotes",
      ],
      buttonText: "Get Started",
      highlighted: false,
    },
  ];

  return (
    <section className="relative py-16 lg:py-20 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-10 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-40"></div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Simple, Transparent Pricing
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Start free and upgrade when you&#39;re ready for more features
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${animate
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
                } ${plan.highlighted ? "" : ""}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`relative rounded-2xl p-7 transition-all duration-300 h-[500px] flex flex-col justify-between ${plan.highlighted
                    ? "bg-primary text-white shadow-2xl border-blue-700"
                    : "bg-[#F3F9FF] text-gray-900 border border-blue-300 hover:border-blue-200 hover:shadow-lg"
                  }`}
              >
                {/* Badge for Popular Plan */}
                {plan.badge && (
                  <div className="absolute -top-3 right-6">
                    <span className="inline-block bg-white text-blue-900 px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan Name */}
                <h3
                  className={`text-lg font-bold mb-2 ${plan.highlighted ? "text-white" : "text-gray-900"
                    }`}
                >
                  {plan.name}
                </h3>

                {/* Tagline */}
                <p
                  className={`text-xs mb-5 leading-relaxed min-h-[2.5rem] ${plan.highlighted ? "text-white/90" : "text-gray-600"
                    }`}
                >
                  {plan.tagline}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span
                      className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-gray-900"
                        }`}
                    >
                      ${plan.price}
                    </span>
                    <span
                      className={`ml-1 text-sm ${plan.highlighted ? "text-white/80" : "text-gray-600"
                        }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-7">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2.5">
                      <div
                        className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${plan.highlighted ? "bg-white/20" : "bg-gray-900"
                          }`}
                      >
                        <svg
                          className={`w-2.5 h-2.5 ${plan.highlighted ? "text-white" : "text-white"
                            }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span
                        className={`text-xs leading-relaxed ${plan.highlighted ? "text-white/90" : "text-gray-700"
                          }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <GetStartedButton
                  text={plan.buttonText}
                  href="/auth/register"
                  showArrow={false}
                  borderClass="border  border-blue-200"
                  bgClass={`w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 ${plan.highlighted
                      ? "bg-white text-blue-900 hover:bg-gray-50 shadow-lg"
                      : "bg-white text-blue-900  hover:bg-blue-50"
                    }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div
          className={`text-center mt-10 transition-all duration-1000 delay-500 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <p className="text-gray-600 text-xs">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
