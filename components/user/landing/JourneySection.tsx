"use client";

import GetStartedButton from "@/components/reusable/GetStartedButton";

type JourneySectionProps = {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonHref?: string;
};

export default function JourneySection({
  heading = "Ready to Start Your Halal Investment Journey?",
  subheading = "Join thousands of investors making ethical and informed financial decisions",
  buttonText = "Create Free Account",
  buttonHref = "/auth/register",
}: JourneySectionProps) {
  return (
    <section className="relative w-full px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0230C9]/80 to-[#00249A]/75">
      <div className="relative z-50 mx-auto max-w-4xl text-center ">
        <h2 className="mb-6 text-3xl font-bold text-balance text-white sm:text-4xl ">
          {heading}
        </h2>

        <p className="mx-auto mb-8 max-w-3xl text-lg text-pretty text-gray-200 sm:text-xl">
          {subheading}
        </p>

        {/* Using CommonButton with custom styling */}

        <GetStartedButton
          text={buttonText}
          href={buttonHref}
          showArrow={true}
          borderClass="border-[#0051C3]"
          bgClass="bg-white  hover:bg-gray-100"
        />
      </div>
    </section>
  );
}
