"use client";

import { useRouter } from "next/navigation";
import { IAdvancedComplianceReport } from "@/Redux/features/userDashboardServices/nonUsApi";
import { useAddToWishlistMutation, useGetWishlistQuery } from "@/Redux/features/userDashboardServices/wishlistApi";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

interface NonUsStockTableProps {
    data: IAdvancedComplianceReport[];
    isLoading: boolean;
}

export const NonUsStockTable = ({
    data,
    isLoading,
}: NonUsStockTableProps) => {
    const router = useRouter();
    const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();
    const { data: wishlistRes } = useGetWishlistQuery();
    const wishlist = wishlistRes?.data || [];

    const isInWishlist = (symbol: string) => {
        return Array.isArray(wishlist) && wishlist.some((item: any) => item.stock_symbol === symbol);
    };

    // Navigate to international stock detail page
    const handleRowClick = (symbol: string) => {
        router.push(`/user/international-stocks/${symbol}`);
    };

    const handleAddToWishlist = async (e: React.MouseEvent, symbol: string) => {
        e.stopPropagation(); // Prevent row click
        try {
            await addToWishlist(symbol).unwrap();
            toast.success(`${symbol} added to watchlist`);
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to add to watchlist");
        }
    };

    // Format date to readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "COMPLIANT":
                return "bg-emerald-100 text-emerald-800";
            case "NON_COMPLIANT":
                return "bg-red-100 text-red-800";
            default:
                return "bg-amber-100 text-amber-800";
        }
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
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Business
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Financial
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Report Date
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Watchlist
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {isLoading ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center">
                                    <div className="flex justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                    </div>
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                                    No international stocks found. Try searching for a symbol.
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
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(stock.status)}`}>
                                            {stock.status.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${getStatusColor(stock.businessScreen)}`}>
                                            {stock.businessScreen.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${getStatusColor(stock.financialScreen)}`}>
                                            {stock.financialScreen.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-slate-600 text-sm">{formatDate(stock.reportDate)}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button
                                            onClick={(e) => handleAddToWishlist(e, stock.symbol)}
                                            disabled={isAdding || isInWishlist(stock.symbol)}
                                            className={`p-2 rounded-full transition-all active:scale-95 disabled:opacity-50 ${isInWishlist(stock.symbol)
                                                ? "text-red-500 bg-red-50"
                                                : "text-slate-400 hover:text-red-500 hover:bg-red-50"
                                                }`}
                                            title={isInWishlist(stock.symbol) ? "In Watchlist" : "Add to Watchlist"}
                                        >
                                            <Bookmark
                                                size={18}
                                                fill={isInWishlist(stock.symbol) ? "currentColor" : "none"}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
