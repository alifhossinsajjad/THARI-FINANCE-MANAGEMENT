import EducationCardsGrid from "@/components/user/dashboard/news/EducationCardsGrid";
import FeaturedHalalPortfolioCard from "@/components/user/dashboard/news/FeaturedHalalPortfolioCard";
import NewsletterSubscribe from "@/components/user/dashboard/news/NewsletterSubscribe";

export default function NewsPage() {
  return (
    <div className="min-h-screen ">
      <div className=" mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Articles & Insights
          </h1>
          <p className="text-slate-500">
            Stay informed with the latest news, analysis, and educational
            content about halal investing.
          </p>
        </header>

        <FeaturedHalalPortfolioCard />
        <EducationCardsGrid />
        <NewsletterSubscribe />
      </div>
    </div>
  );
}
