// components/FeaturedHalalPortfolioCard.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react"; // npm install lucide-react
import Image from "next/image";

export default function FeaturedHalalPortfolioCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 max-w-full mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* LEFT: Chart Visualization */}
        <div className="relative  flex flex-col justify-center items-center min-h-[320px] lg:min-h-auto">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]" />
          </div>

          <Image
            src="/images/user/dashboard/news/article.png"
            alt="halal portfolio"
            width={1600}
            height={1600}
            quality={100}
          />
        </div>

        {/* RIGHT: Content */}
        <div className="px-8 md:px-12 lg:px-16 flex flex-col justify-center bg-white">
          <div className="inline-block w-fit bg-[#D0FAE5] text-[#007A55] text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Featured
          </div>

          <h3 className="text-2xl md:text-3xl  text-gray-900 mb-4 leading-tight">
            How to Build a Halal Portfolio in 2025
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Learn the essential steps to create a diversified halal investment
            portfolio that aligns with Islamic principles while maximizing
            returns.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
            <span className="font-medium text-gray-900">Ahmad Khan</span>
            <span>•</span>
            <span>Jan 5, 2025</span>
            <span>•</span>
            <span>5 min read</span>
          </div>

          <Link
            href="/blog/how-to-build-halal-portfolio-2025"
            className="inline-flex items-center gap-2 text-[#009966] font-semibold hover:text-[#00996] transition group"
          >
            Read More
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
