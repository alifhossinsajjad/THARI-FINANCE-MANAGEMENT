"use client";

import { IEtfReportItem } from "@/Redux/features/userDashboardServices/etfApi";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
} from "@/Redux/features/userDashboardServices/wishlistApi";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

import { useAppSelector } from "@/Redux/hooks";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";

interface EtfTableProps {
  data: IEtfReportItem[];
  isLoading: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pageNumber: number;
}

export const EtfTable = ({
  data,
  isLoading,
  onNextPage,
  onPrevPage,
  hasNextPage,
  hasPrevPage,
  pageNumber,
}: EtfTableProps) => {
  const user = useAppSelector(selectCurrentUser);
  const isUserRole = user?.role === "user";

  const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();

  // ✅ Skip unless role=user
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Report Date
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
                  No ETF reports found.
                </td>
              </tr>
            ) : (
              data.map((etf, index) => (
                <tr
                  key={`${etf.symbol}-${index}`}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-slate-700">
                      {etf.symbol}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-slate-600 line-clamp-1">
                      {etf.name}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        etf.status === "COMPLIANT"
                          ? "bg-emerald-100 text-emerald-800"
                          : etf.status === "UNRATED"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {etf.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-slate-600 text-sm">
                      {formatDate(etf.reportDate)}
                    </span>
                  </td>

                  {/* ✅ Only render button for role=user */}
                  {isUserRole && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={(e) => handleAddToWishlist(e, etf.symbol)}
                        disabled={isAdding || isInWishlist(etf.symbol)}
                        className={`p-2 rounded-full transition-all active:scale-95 disabled:opacity-50 ${
                          isInWishlist(etf.symbol)
                            ? "text-red-500 bg-red-50"
                            : "text-slate-400 hover:text-red-500 hover:bg-red-50"
                        }`}
                        title={
                          isInWishlist(etf.symbol)
                            ? "In Watchlist"
                            : "Add to Watchlist"
                        }
                      >
                        <Bookmark
                          size={18}
                          fill={
                            isInWishlist(etf.symbol) ? "currentColor" : "none"
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
        <div className="text-sm text-slate-600 font-medium">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {data.length > 0 ? (pageNumber - 1) * 20 + 1 : 0}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-slate-900">
            {(pageNumber - 1) * 20 + data.length}
          </span>{" "}
          entries
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">Page {pageNumber}</span>
          <div className="flex gap-2">
            <button
              onClick={onPrevPage}
              disabled={!hasPrevPage || isLoading}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={onNextPage}
              disabled={!hasNextPage || isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary border border-primary rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
