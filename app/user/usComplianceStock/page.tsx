"use client";

import { useState, useEffect } from "react";
import { useGetCompliantStocksQuery } from "@/Redux/features/userDashboardServices/usComplianceStockApi";
import { useSearch } from "@/contexts/SearchContext";
import { CompliantStockTable } from "../stock-detail/_components/CompliantStockTable";

export default function UsComplianceStockPage() {
  const [pageHistory, setPageHistory] = useState<(string | null)[]>([]);
  const [currentToken, setCurrentToken] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { searchQuery } = useSearch();

  const { data, isLoading, error } = useGetCompliantStocksQuery({
    limit: 20,
    nextToken: currentToken,
  });

  // Reset to first page when search query changes
  useEffect(() => {
    if (searchQuery) {
      setCurrentToken(null);
      setPageHistory([]);
      setPageNumber(1);
    }
  }, [searchQuery]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 font-bold text-lg">
          Error loading compliant stocks: {JSON.stringify(error)}
        </div>
      </div>
    );
  }

  const stockItems = data?.items || [];
  const nextToken = data?.nextToken || null;

  // Filter based on search query
  const filteredStockItems = searchQuery
    ? stockItems.filter(
        (item) =>
          item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : stockItems;

  const handleNextPage = () => {
    if (nextToken && !searchQuery) {
      setPageHistory((prev) => [...prev, currentToken]);
      setCurrentToken(nextToken);
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageHistory.length > 0 && !searchQuery) {
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
            US Compliance Stock
          </h1>
          <p className="text-slate-500">
            View all US-based compliant stock reports.
            {searchQuery && ` Filtering by: "${searchQuery}"`}
          </p>
        </header>

        {/* Stock Table */}
        <CompliantStockTable
          data={filteredStockItems}
          isLoading={isLoading}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          hasNextPage={!searchQuery && !!nextToken}
          hasPrevPage={!searchQuery && pageHistory.length > 0}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  );
}
