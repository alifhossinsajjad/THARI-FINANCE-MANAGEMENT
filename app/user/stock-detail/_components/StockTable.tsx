"use client";

import { useRouter } from "next/navigation";
import { IStockReportItem } from "@/Redux/features/userDashboardServices/UsBasedStockApi";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StockTableProps {
    data: IStockReportItem[];
    isLoading: boolean;
    onNextPage: () => void;
    onPrevPage: () => void;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    pageNumber: number;
}

export const StockTable = ({
    data,
    isLoading,
    onNextPage,
    onPrevPage,
    hasNextPage,
    hasPrevPage,
    pageNumber,
}: StockTableProps) => {
    const router = useRouter();

    const handleRowClick = (symbol: string) => {
        router.push(`/user/stock-detail/${symbol}`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Symbol
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Exchange
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Shariah Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {isLoading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center">
                                    <div className="flex justify-center">
                                        <p>Loading</p>
                                    </div>
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                    No stocks found.
                                </td>
                            </tr>
                        ) : (
                            data.map((stock) => (
                                <tr
                                    key={stock.symbol}
                                    onClick={() => handleRowClick(stock.symbol)}
                                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-bold text-slate-700">{stock.symbol}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-slate-600 line-clamp-1">{stock.name}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-slate-500 text-sm">{stock.exchange}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${stock.status === "COMPLIANT"
                                                ? "bg-emerald-100 text-emerald-800"
                                                : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {stock.status === "COMPLIANT" ? "✓ Halal (Compliant)" : "✗ Haram (Non-Compliant)"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                <div className="text-sm text-slate-500">
                    Page {pageNumber}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={onPrevPage}
                        disabled={!hasPrevPage || isLoading}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <button
                        onClick={onNextPage}
                        disabled={!hasNextPage || isLoading}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-5 h-5 text-slate-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};
