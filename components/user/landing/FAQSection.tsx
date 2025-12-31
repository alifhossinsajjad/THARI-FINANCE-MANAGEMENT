// components/FAQSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

const faqItems: FAQItem[] = [
  {
    question: "Can I upgrade or downgrade plan?",
    answer:
      "Yes, you can change your subscription plan at any time. Upgrades take effect immediately, and downgrades will apply at the end of your current billing period.",
    defaultOpen: true,
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes, your payment information is processed through secure, encrypted channels and stored with industry-standard security measures.",
  },
  {
    question: "How is Sharia compliance determined?",
    answer:
      "Sharia compliance is evaluated by our certified Sharia advisory board in accordance with AAOIFI standards and other recognized Islamic finance principles.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you may cancel your subscription at any time. Access continues until the end of the current billing period with no partial refunds.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#FBFBFB] py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find quick answers to common questions.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* LEFT: Image */}
          <div className="relative h-92  w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/user/faq.png" // ← Replace with your actual image path or public URL
              // If using Image ID: 1 from upload → use public URL or static file
              alt="Growth chart with glowing arrow"
              fill
              className=""
              priority
              quality={90}
            />
          </div>

          {/* RIGHT: Content + Accordion */}
          <div className="flex flex-col col-span-2 justify-center">
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-xl border-b transition-all duration-300 ${
                    openIndex === index
                      ? "border-blue-200 bg-white "
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                  >
                    <span className="text-lg font-medium text-[#00008B] pr-4">
                      {item.question}
                    </span>
                    <span
                      className={`text-2xl font-light cursor-pointer text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                        openIndex === index ? "rotate-45" : ""
                      }`}
                    >
                      {openIndex === index ? (
                        <X className="w-6 h-6 text-[#00008B]" />
                      ) : (
                        <Plus className="w-6 h-6 text-[#00008B]" />
                      )}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all cursor-pointer duration-500 ease-in-out ${
                      openIndex === index ? "max-h-96 px-6 pb-6" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
