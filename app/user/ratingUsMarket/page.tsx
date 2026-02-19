"use client";

import { useState } from "react";

import { useGetUsBasedStockReportsQuery } from "@/Redux/features/userDashboardServices/UsBasedStockApi";
import { StockTable } from "../stock-detail/_components/StockTable";

export default function RatingUsMarket() {
  const [pageHistory, setPageHistory] = useState<(string | null)[]>([]);
  const [currentToken, setCurrentToken] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Fetch paginated list
  const {
    data: listData,
    isLoading,
    error,
  } = useGetUsBasedStockReportsQuery({
    limit: 30,
    nextToken: currentToken,
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 font-bold text-lg">
          Error loading stocks: {JSON.stringify(error)}
        </div>
      </div>
    );
  }

  // Extract stock items
  let stockItems: import("@/Redux/features/userDashboardServices/UsBasedStockApi").IStockReportItem[] =
    [];

  let nextToken: string | null = null;

  if (listData) {
    const reports = listData?.data?.basicCompliance?.reports;

    stockItems = reports?.items || [];
    nextToken = reports?.nextToken || null;
  }

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
            Stock Reports
          </h1>

          <p className="text-slate-500">
            View US-based stock compliance reports.
          </p>
        </header>

        {/* Stock Table */}
        <StockTable
          data={stockItems}
          isLoading={isLoading}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          hasNextPage={!!nextToken}
          hasPrevPage={pageHistory.length > 0}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  );
}
