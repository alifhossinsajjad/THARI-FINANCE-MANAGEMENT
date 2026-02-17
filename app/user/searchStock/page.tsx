"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useGetUsBasedStockReportsQuery, useSearchStockBySymbolQuery } from "@/Redux/features/userDashboardServices/UsBasedStockApi";
import { StockTable } from "../stock-detail/_components/StockTable";

export default function StockSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSymbol, setSearchSymbol] = useState<string | null>(null); // Trigger search with this
  const [pageHistory, setPageHistory] = useState<(string | null)[]>([]);
  const [currentToken, setCurrentToken] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Fetch paginated list (skip when searching)
  const { data: listData, isLoading: isLoadingList, error: listError } = useGetUsBasedStockReportsQuery(
    { limit: 30, nextToken: currentToken },
    { skip: !!searchSymbol } // Skip this query when searching
  );

  // Fetch search result (skip when not searching)
  const { data: searchData, isLoading: isLoadingSearch, error: searchError } = useSearchStockBySymbolQuery(
    searchSymbol || "",
    { skip: !searchSymbol } // Only run when searchSymbol is set
  );

  // Determine which data to show
  const isSearchMode = !!searchSymbol;
  const isLoading = isSearchMode ? isLoadingSearch : isLoadingList;
  const error = isSearchMode ? searchError : listError;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 font-bold text-lg">
          Error loading stocks: {JSON.stringify(error)}
        </div>
      </div>
    );
  }

  // Extract stock items based on mode
  let stockItems: import("@/Redux/features/userDashboardServices/UsBasedStockApi").IStockReportItem[] = [];
  let nextToken = null;

  if (isSearchMode && searchData) {
    // Single search result
    const report = searchData?.data?.basicCompliance?.report;
    stockItems = report ? [report] : [];
  } else if (listData) {
    // Paginated list
    const reports = listData?.data?.basicCompliance?.reports;
    stockItems = reports?.items || [];
    nextToken = reports?.nextToken || null;
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchSymbol(searchQuery.trim());
    }
  };

  const handleClearSearch = () => {
    setSearchSymbol(null);
    setSearchQuery("");
  };

  const handleNextPage = () => {
    if (nextToken) {
      setPageHistory((prev) => [...prev, currentToken]);
      setCurrentToken(nextToken);
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageHistory.length > 0) {
      const newHistory = [...pageHistory];
      const prevToken = newHistory.pop();
      setPageHistory(newHistory);
      setCurrentToken(prevToken ?? null);
      setPageNumber((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Stock Search
          </h1>
          <p className="text-slate-500">
            Search and view US-based stock compliance reports.
          </p>
        </header>

        {/* Search Bar */}
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by symbol (e.g., AAPL)..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-primary text-white px-8 py-3 rounded-xl font-semibold transition-colors cursor-pointer hover:opacity-90"
          >
            Search
          </button>
          {isSearchMode && (
            <button
              onClick={handleClearSearch}
              className="bg-slate-200 text-slate-700 px-8 py-3 rounded-xl font-semibold transition-colors cursor-pointer hover:bg-slate-300 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        {/* Stock Table */}
        <StockTable
          data={stockItems}
          isLoading={isLoading}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          hasNextPage={!isSearchMode && !!nextToken}
          hasPrevPage={!isSearchMode && pageHistory.length > 0}
          pageNumber={isSearchMode ? 1 : pageNumber}
        />
      </div>
    </div>
  );
}

