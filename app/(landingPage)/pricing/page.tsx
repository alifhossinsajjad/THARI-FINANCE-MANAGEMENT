"use client";

import GetStartedButton from "@/components/reusable/GetStartedButton";
import FAQSection from "@/components/user/landing/FAQSection";
import PricingBanner from "@/components/user/landing/pricing/PricingBanner";
import { useGetPricingPlansQuery } from "@/Redux/features/pricing/pricingApi";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { useEffect, useState } from "react";

export default function PricingPage() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const { data: pricing, isLoading, error } = useGetPricingPlansQuery();

  // console.log("Pricing Data:", pricing);
  // console.log("Pricing Error:", error);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10">Failed to load pricing</div>;
  }

  return (
    <ProtectedRoute>
      <div>
        <PricingBanner />
        <div className="max-w-7xl mx-auto my-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pricing?.map((plan, index) => (
              <div
                key={index}
                className={`transition-all duration-700 h-full ${
                  animate
                    ? "opacity-100 translate-y-0"
                    : "opacity-100 translate-y-10"
                } ${plan.is_popular ? "" : ""}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`relative rounded-2xl p-6 md:p-10 transition-all duration-300 h-full min-h-120 flex flex-col justify-between ${
                    plan.is_popular
                      ? "bg-primary text-white shadow-2xl border-blue-700"
                      : "bg-[#F3F9FF] text-gray-900 border border-blue-300 hover:border-blue-200 hover:shadow-lg"
                  }`}
                >
                  <div className="flex justify-between">
                    {/* Plan Name */}
                    <h3
                      className={`text-lg font-bold mb-2 ${
                        plan.is_popular ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {plan.title}
                    </h3>

                    {/* Badge for Popular Plan */}
                    {plan.is_popular && (
                      <div className=" right-6">
                        <span className="inline-block bg-primary text-white border border-[#F2F8FF] px-3 py-1 rounded-lg text-xs font-semibold shadow-md">
                          {/* {plan.is_popular} */}
                          {"Most Popular"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tagline */}
                  <p
                    className={`text-xs mb-5 leading-relaxed min-h-10 ${
                      plan.is_popular ? "text-white/90" : "text-gray-600"
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span
                        className={`text-4xl font-bold ${
                          plan.is_popular ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ${plan.price}
                      </span>
                      <span
                        className={`ml-1 text-sm ${
                          plan.is_popular ? "text-white/80" : "text-gray-600"
                        }`}
                      >
                        {plan.duration_type}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-7">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-2.5"
                      >
                        <div
                          className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                            plan.is_popular ? "bg-white/20" : "bg-gray-900"
                          }`}
                        >
                          <svg
                            className={`w-2.5 h-2.5 ${
                              plan.is_popular ? "text-white" : "text-white"
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
                          className={`text-xs leading-relaxed ${
                            plan.is_popular ? "text-white/90" : "text-gray-700"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <GetStartedButton
                    text="Get Started"
                    href="/auth/register"
                    showArrow={false}
                    borderClass="border  border-blue-200"
                    bgClass={`w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      plan.is_popular
                        ? "bg-white text-blue-900 hover:bg-gray-50 shadow-lg"
                        : "bg-white text-blue-900  hover:bg-blue-50"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <FAQSection />
      </div>
    </ProtectedRoute>
  );
}
