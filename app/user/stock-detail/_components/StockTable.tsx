"use client";

import { useRouter } from "next/navigation";
import { IStockReportItem } from "@/Redux/features/userDashboardServices/UsBasedStockApi";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
} from "@/Redux/features/userDashboardServices/wishlistApi";
import { toast } from "sonner";
import { useAppSelector } from "@/Redux/hooks";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";

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

  const user = useAppSelector(selectCurrentUser);
  const isUserRole = user?.role === "user";

  const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();

  // ✅ Skip query unless user role is 'user'
  const { data: wishlistRes } = useGetWishlistQuery(undefined, {
    skip: !isUserRole,
  });

  const wishlist = wishlistRes?.data || [];

  const isInWishlist = (symbol: string) => {
    if (!isUserRole) return false;
    return (
      Array.isArray(wishlist) &&
      wishlist.some((item: any) => item.stock_symbol === symbol)
    );
  };

  const handleRowClick = (symbol: string) => {
    router.push(`/user/stock-detail/${symbol}`);
  };

  const handleAddToWishlist = async (e: React.MouseEvent, symbol: string) => {
    e.stopPropagation();

    // ✅ Guard: non-user cannot interact
    if (!isUserRole) {
      toast.error("Watchlist is only available for users.");
      return;
    }

    try {
      await addToWishlist(symbol).unwrap();
      toast.success(`${symbol} added to watchlist`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add to watchlist");
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
                Shariah Status
              </th>

              {/* ✅ Only show for role=user */}
              {isUserRole && (
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Watchlist
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {isLoading ? (
              <tr>
                <td
                  colSpan={isUserRole ? 5 : 4}
                  className="px-6 py-8 text-center"
                >
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={isUserRole ? 5 : 4}
                  className="px-6 py-8 text-center text-slate-500"
                >
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
                    <span className="font-bold text-slate-700">
                      {stock.symbol}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-slate-600 line-clamp-1">
                      {stock.name}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-slate-500 text-sm">
                      {stock.exchange}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        stock.status === "COMPLIANT"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {stock.status === "COMPLIANT"
                        ? "✓ Halal (Compliant)"
                        : "✗ Haram (Non-Compliant)"}
                    </span>
                  </td>

                  {/* ✅ Only render button for role=user */}
                  {isUserRole && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={(e) => handleAddToWishlist(e, stock.symbol)}
                        disabled={isAdding || isInWishlist(stock.symbol)}
                        className={`p-2 rounded-full transition-all active:scale-95 disabled:opacity-50 ${
                          isInWishlist(stock.symbol)
                            ? "text-red-500 bg-red-50"
                            : "text-slate-400 hover:text-red-500 hover:bg-red-50"
                        }`}
                        title={
                          isInWishlist(stock.symbol)
                            ? "In Watchlist"
                            : "Add to Watchlist"
                        }
                      >
                        <Bookmark
                          size={18}
                          fill={
                            isInWishlist(stock.symbol) ? "currentColor" : "none"
                          }
                        />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
        <div className="text-sm text-slate-500">Page {pageNumber}</div>
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
