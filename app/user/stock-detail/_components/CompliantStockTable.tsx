"use client";

import { useRouter } from "next/navigation";
import { ICompliantStockItem } from "@/Redux/features/userDashboardServices/usComplianceStockApi";


interface CompliantStockTableProps {
    data: ICompliantStockItem[];
    isLoading: boolean;
    onNextPage: () => void;
    onPrevPage: () => void;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    pageNumber: number;
}

export const CompliantStockTable = ({
    data,
    isLoading,
    onNextPage,
    onPrevPage,
    hasNextPage,
    hasPrevPage,
    pageNumber,
}: CompliantStockTableProps) => {
    const router = useRouter();

    // Format date to readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Navigate to stock detail page
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
                                Report Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {isLoading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center">
                                    <div className="flex justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                    </div>
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                    No compliant stocks found.
                                </td>
                            </tr>
                        ) : (
                            data.map((stock, index) => (
                                <tr
                                    key={`${stock.symbol}-${index}`}
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
                                        <span className="text-slate-600 text-sm">{formatDate(stock.reportDate)}</span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                <div className="text-sm text-slate-600 font-medium">
                    Showing <span className="font-semibold text-slate-900">{data.length > 0 ? ((pageNumber - 1) * 20) + 1 : 0}</span> to <span className="font-semibold text-slate-900">{(pageNumber - 1) * 20 + data.length}</span> entries
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">Page {pageNumber}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={onPrevPage}
                            disabled={!hasPrevPage || isLoading}
                            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        <button
                            onClick={onNextPage}
                            disabled={!hasNextPage || isLoading}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary border border-primary rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
