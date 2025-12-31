import MyRecommendations from "@/components/user/dashboard/recommendations/MyRecommendations";

export default function RecommendationPage() {
  return (
    <div className="min-h-screen ">
      <div className=" mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            My Recommendations
          </h1>
          <p className="text-slate-500">
            Expert stock picks curated for halal investors.
          </p>
        </header>

        <MyRecommendations />
      </div>
    </div>
  );
}
