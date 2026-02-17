"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useSearchNonUsStockQuery } from "@/Redux/features/userDashboardServices/nonUsApi";
import { StockDetailHeader } from "../../stock-detail/_components/StockDetailHeader";
import { ScreeningStatusCards } from "../../stock-detail/_components/ScreeningStatusCards";
import { FinancialRatiosChart } from "../../stock-detail/_components/FinancialRatiosChart";
import { ReportMetadata } from "../../stock-detail/_components/ReportMetadata";
import { FiArrowLeft } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { IAdvancedReport } from "@/Redux/features/userDashboardServices/advancedStockApi";

interface PageProps {
    params: Promise<{ symbol: string }>;
}

export default function InternationalStockDetailPage({ params }: PageProps) {
    const { symbol } = use(params);
    const router = useRouter();

    const { data: response, isLoading, error } = useSearchNonUsStockQuery({ symbol });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <ClipLoader color="#3b82f6" size={50} />
                    <p className="mt-4 text-slate-600 font-medium">
                        Loading international stock report...
                    </p>
                </div>
            </div>
        );
    }

    const reportData = response?.data?.advancedCompliance?.report;

    if (error || !reportData) {
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
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Adapt INonUsStockReport to IAdvancedReport for reuse
    // Some fields like revenue might be missing in international reports
    const adaptedReport: IAdvancedReport = {
        ...reportData,
        compliantRevenue: 0,
        nonCompliantRevenue: 0,
        questionableRevenue: 0,
        status: reportData.status as "COMPLIANT" | "NON_COMPLIANT"
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors cursor-pointer"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back to Result</span>
                </button>

                {/* Header Section */}
                <StockDetailHeader report={adaptedReport} />

                {/* Charts Grid - Only showing financial ratios as revenue breakdown depends on missing fields */}
                <div className="grid grid-cols-1 gap-6 mb-6">
                    <FinancialRatiosChart report={adaptedReport} />
                </div>

                {/* Screening Status Cards */}
                <ScreeningStatusCards report={adaptedReport} />

                {/* Report Metadata */}
                <ReportMetadata report={adaptedReport} />
            </div>
        </div>
    );
}
