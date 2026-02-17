"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useGetAdvancedStockReportQuery } from "@/Redux/features/userDashboardServices/advancedStockApi";
import { StockDetailHeader } from "../_components/StockDetailHeader";
import { RevenueBreakdownChart } from "../_components/RevenueBreakdownChart";
import { ScreeningStatusCards } from "../_components/ScreeningStatusCards";
import { FinancialRatiosChart } from "../_components/FinancialRatiosChart";
import { ReportMetadata } from "../_components/ReportMetadata";
import { FiArrowLeft } from "react-icons/fi";
import { ClipLoader } from "react-spinners";

interface PageProps {
  params: Promise<{ symbol: string }>;
}

export default function StockDetailPage({ params }: PageProps) {
  const { symbol } = use(params);
  const router = useRouter();
  const {
    data: report,
    isLoading,
    error,
  } = useGetAdvancedStockReportQuery(symbol);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ClipLoader color="#3b82f6" size={50} />
          <p className="mt-4 text-slate-600 font-medium">
            Loading stock report...
          </p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Failed to Load Report
          </h2>
          <p className="text-slate-600 mb-6">
            {error
              ? `Error: ${JSON.stringify(error)}`
              : "No data available for this stock symbol."}
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Stock List</span>
        </button>

        {/* Header Section */}
        <StockDetailHeader report={report} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RevenueBreakdownChart report={report} />
          <FinancialRatiosChart report={report} />
        </div>

        {/* Screening Status Cards */}
        <ScreeningStatusCards report={report} />

        {/* Report Metadata */}
        <ReportMetadata report={report} />
      </div>
    </div>
  );
}
