import AboutSection from "@/components/user/landing/about/AboutSection";
import FAQSection from "@/components/user/landing/FAQSection";
import PricingBanner from "@/components/user/landing/pricing/PricingBanner";
import PricingSection from "@/components/user/landing/PricingSection";

export default function PricingPage() {
  return (
    <div>
      <PricingBanner />
      <PricingSection />
      <FAQSection />
    </div>
  );
}
