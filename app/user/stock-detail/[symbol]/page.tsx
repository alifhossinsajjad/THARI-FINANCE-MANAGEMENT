"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useSearchStockBySymbolQuery } from "@/Redux/features/userDashboardServices/UsBasedStockApi";
import { StockDetailHeader } from "../_components/StockDetailHeader";
import { FiArrowLeft } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { IAdvancedReport } from "@/Redux/features/userDashboardServices/advancedStockApi";

interface PageProps {
  params: Promise<{ symbol: string }>;
}

export default function StockDetailPage({ params }: PageProps) {
  const { symbol } = use(params);
  const router = useRouter();
  const {
    data: searchData,
    isLoading,
    error,
  } = useSearchStockBySymbolQuery(symbol);

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

  const basicReport = searchData?.data?.basicCompliance?.report;

  if (error || !basicReport) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Stock Info Unavailable
          </h2>
          <p className="text-slate-500 mb-6">
            We couldn&apos;t load the basic compliance info for <strong>{symbol}</strong>.
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Adapt basic report to header's expected interface
  const adaptedReport: IAdvancedReport = {
    symbol: basicReport.symbol,
    name: basicReport.name,
    exchange: basicReport.exchange,
    status: basicReport.status,
    figi: "N/A",
    reportDate: new Date().toISOString(),
    rawSymbol: basicReport.symbol,
    businessScreen: "Basic",
    financialScreen: "Basic",
    compliantRevenue: 0,
    nonCompliantRevenue: 0,
    questionableRevenue: 0,
    securitiesToMarketCapRatio: 0,
    debtToMarketCapRatio: 0,
  };

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
        <StockDetailHeader report={adaptedReport} />

        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center">
          <p className="text-slate-500 bg-slate-50 p-4 rounded-xl inline-block italic">
            Detailed business and financial screening data is currently in review.
          </p>
        </div>
      </div>
    </div>
  );
}
