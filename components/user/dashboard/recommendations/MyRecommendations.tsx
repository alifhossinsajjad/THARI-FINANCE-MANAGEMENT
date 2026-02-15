// components/MyRecommendations.tsx
import { Target, TrendingUp } from "lucide-react";

type Recommendation = {
  symbol: string;
  company: string;
  status: "Active";
  entryPrice: number;
  currentPrice: number;
  stopLoss: number;
  target: number;
  return: number;
  addedDate: string;
};

const recommendations: Recommendation[] = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    status: "Active",
    entryPrice: 175.5,
    currentPrice: 178.32,
    stopLoss: 165,
    target: 195,
    return: 1.61,
    addedDate: "Jan 5, 2025",
  },
  // Duplicate for demo (in real app, fetch from API)
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    status: "Active",
    entryPrice: 175.5,
    currentPrice: 178.32,
    stopLoss: 165,
    target: 195,
    return: 1.61,
    addedDate: "Jan 5, 2025",
  },
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    status: "Active",
    entryPrice: 175.5,
    currentPrice: 178.32,
    stopLoss: 165,
    target: 195,
    return: 1.61,
    addedDate: "Jan 5, 2025",
  },
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    status: "Active",
    entryPrice: 175.5,
    currentPrice: 178.32,
    stopLoss: 165,
    target: 195,
    return: 1.61,
    addedDate: "Jan 5, 2025",
  },
];

export default function MyRecommendations() {
  // Stats data for mapping
  const stats = [
    {
      title: "Active Recommendations",
      value: recommendations.length,
      icon: Target,
      iconColor: "blue",
      iconBgColor: "bg-blue-100",
      textColor: "text-gray-900",
    },
    {
      title: "Targets Reached",
      value: 3, // Example
      icon: TrendingUp,
      iconColor: "green",
      iconBgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Average Return",
      value: `+12.4%`, // %
      icon: TrendingUp,
      iconColor: "purple",
      iconBgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
  ];

  return (
    <section className="py-6  bg-gray-50 min-h-screen">
      <div className="mx-auto px-4  max-w-full">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const bgColor = stat.iconBgColor || `bg-${stat.iconColor}-100`;
            const iconColor = `text-${stat.iconColor}-600`;

            return (
              <div
                key={index}
                className="bg-white flex justify-between rounded-xl p-6 shadow-sm border border-gray-200 text-center"
              >
                <div>
                  <p className="text-sm  text-gray-500 mb-1">{stat.title}</p>
                  <p
                    className={`text-xl text-left font-bold ${stat.textColor}`}
                  >
                    {stat.value}
                  </p>
                </div>
                <div className="flex justify-center mb-3">
                  <div
                    className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center`}
                  >
                    <IconComponent className={`w-6 h-6 ${iconColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendation Cards */}
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl py-4 hover:shadow-sm transition"
            >
              {/* ROW CONTENT */}
              <div className="px-5 py-4 grid grid-cols-12 items-center gap-4 text-md space-y-1">
                {/* SYMBOL + STATUS */}
                <div className="col-span-3">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-900">
                      {rec.symbol}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{rec.company}</p>
                  <p className="text-sm text-gray-400">
                    Added: {rec.addedDate}
                  </p>
                </div>

                {/* ENTRY */}
                <div className="col-span-2 text-center">
                  <p className="text-gray-400 text-sm">Entry Price</p>
                  <p className="font-semibold text-gray-900">
                    ${rec.entryPrice.toFixed(2)}
                  </p>
                </div>

                {/* CURRENT */}
                <div className="col-span-2 text-center">
                  <p className="text-gray-400 text-sm">Current Price</p>
                  <p className="font-semibold text-gray-900">
                    ${rec.currentPrice.toFixed(2)}
                  </p>
                </div>

                {/* STOP LOSS */}
                <div className="col-span-2 text-center">
                  <p className="text-gray-400 text-sm">Stop Loss</p>
                  <p className="font-semibold text-red-500">${rec.stopLoss}</p>
                </div>

                {/* TARGET */}
                <div className="col-span-2 text-center">
                  <p className="text-gray-400 text-sm">Target</p>
                  <p className="font-semibold text-green-600">${rec.target}</p>
                </div>

                {/* RETURN */}
                <div className="col-span-1 text-right">
                  <p className="text-gray-400 text-sm">Return</p>
                  <p className="font-semibold text-green-600 flex items-center justify-end gap-1">
                    <TrendingUp className="mr-3" /> +{rec.return.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 p-6 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-gray-700">
          <p className="font-medium mb-2">Disclaimer</p>
          <p>
            These recommendations are for informational purposes only and should
            not be considered as financial advice. Always conduct your own
            research and consult with a qualified financial advisor before
            making investment decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
