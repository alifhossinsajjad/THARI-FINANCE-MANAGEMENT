"use client";

import  { useState } from "react";
import { Search, ShieldCheck, TrendingUp, Sparkles, Plus } from "lucide-react";

type Stock = {
  name: string;
  symbol: string;
  price: number;
  halalStatus: string;
  complianceScore: number;
  rating: string;
  priceTarget: number;
  upside: number;
  aiAnalysis: string;
};

// Mock stock data
const MOCK_STOCKS: Record<string, Stock> = {
  AAPL: {
    name: "Apple Inc.",
    symbol: "AAPL",
    price: 178.32,
    halalStatus: "Halal",
    complianceScore: 85,
    rating: "Strong Buy",
    priceTarget: 195.5,
    upside: 9.63,
    aiAnalysis:
      "Based on halal screening & market data, this stock is considered compliant with Islamic finance principles. The company has low debt levels and minimal revenue from prohibited activities. Analyst consensus shows strong buy signals with positive growth outlook.",
  },
  TSLA: {
    name: "Tesla Inc.",
    symbol: "TSLA",
    price: 245.67,
    halalStatus: "Halal",
    complianceScore: 78,
    rating: "Buy",
    priceTarget: 270,
    upside: 9.9,
    aiAnalysis: "Tesla is compliant with low debt levels. Positive growth outlook.",
  },
  MSFT: {
    name: "Microsoft Corp.",
    symbol: "MSFT",
    price: 310.12,
    halalStatus: "Halal",
    complianceScore: 90,
    rating: "Strong Buy",
    priceTarget: 340,
    upside: 9.68,
    aiAnalysis: "Strong halal compliance. Analysts expect solid growth.",
  },
  AMZN: {
    name: "Amazon.com Inc.",
    symbol: "AMZN",
    price: 135.45,
    halalStatus: "Halal",
    complianceScore: 82,
    rating: "Buy",
    priceTarget: 150,
    upside: 10.7,
    aiAnalysis: "Compliant stock. Positive analyst sentiment.",
  },
};

export default function StockSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState<Stock | "NOT_FOUND" | null>(null);

  const suggestedStocks = Object.keys(MOCK_STOCKS);

  const handleSearch = (query?: string) => {
    const search = (query || searchQuery).toUpperCase();
    if (MOCK_STOCKS[search]) {
      setSelectedStock(MOCK_STOCKS[search]);
    } else {
      setSelectedStock("NOT_FOUND");
    }
  };

  return (
    <div className="min-h-screen ">
      <div className=" mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Stock Search</h1>
          <p className="text-slate-500">Search and find stocks quickly and easily.</p>
        </header>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="relative flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter stock symbol... (e.g., AAPL, TSLA, MSFT)"
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Suggested Stocks */}
        {!selectedStock && (
          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-4">Try searching for:</h2>
            <div className="flex flex-wrap gap-3">
              {suggestedStocks.map((stock) => (
                <button
                  key={stock}
                  onClick={() => {
                    setSearchQuery(stock);
                    handleSearch(stock);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors"
                >
                  {stock}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Not Found */}
        {selectedStock === "NOT_FOUND" && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-center font-bold">
            Stock not found. Try another symbol.
          </div>
        )}

        {/* Stock Details */}
        {selectedStock && selectedStock !== "NOT_FOUND" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Price Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 flex justify-between items-start shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{selectedStock.name}</h2>
                <p className="text-slate-500 font-medium">{selectedStock.symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-slate-800">${selectedStock.price}</p>
                <p className="text-xs text-slate-400 uppercase font-semibold">Current Price</p>
              </div>
            </div>

            {/* Halal Compliance */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Halal Compliance
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 text-sm">Status</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                  {selectedStock.halalStatus}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-600">Compliance Score</span>
                  <span className="text-slate-800">{selectedStock.complianceScore}/100</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary  h-full rounded-full"
                    style={{ width: `${selectedStock.complianceScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Analyst Rating */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Analyst Rating
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Rating</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                    {selectedStock.rating}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Price Target</span>
                  <span className="text-slate-800 font-bold">${selectedStock.priceTarget}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Potential Upside</span>
                  <span className="text-emerald-500 font-bold">+{selectedStock.upside}%</span>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-indigo-50/30 border border-indigo-100 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                <Sparkles className="w-5 h-5 text-purple-500" />
                AI Analysis
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{selectedStock.aiAnalysis}</p>
            </div>

            {/* Add to Watchlist */}
            <button className="w-full bg-blue-900  text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer">
              <Plus className="w-5 h-5" />
              Add to Watchlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
