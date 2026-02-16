import HeroBanner from "@/components/user/landing/banner/HeroBanner";
import JourneySection from "@/components/user/landing/JourneySection";
import PricingSection from "@/components/user/landing/PricingSection";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <HeroBanner />
        {/* <FeaturesSection /> */}
        <PricingSection />
        <JourneySection />
      </main>
    </div>
  );
}
