"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/Redux/features/userDashboardServices/wishlistApi";
import { toast } from "sonner";

export default function Watchlist() {
  const { data: wishlistRes, isLoading, isError } = useGetWishlistQuery();
  const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();

  const stocks = wishlistRes?.data || [];

  const handleRemove = async (id: number, symbol: string) => {
    try {
      await removeFromWishlist(id).unwrap();
      toast.success(`${symbol} removed from watchlist`);
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to remove ${symbol}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-gray-500 font-medium">Loading your watchlist...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-red-500 font-medium">Error loading watchlist. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className=" mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Watchlist</h1>
        <p className="text-gray-500 font-medium">
          Track your favorite halal stocks
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-5 text-sm font-bold text-gray-600">
                  Stock Symbol
                </th>
                <th className="px-6 py-5 text-sm font-bold text-gray-600">
                  Date Added
                </th>
                <th className="px-6 py-5 text-sm font-bold text-gray-600 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {stocks.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                    Your watchlist is empty.
                  </td>
                </tr>
              ) : (
                stocks.map((stock, index) => (
                  <tr
                    key={stock.id}
                    className={`group hover:bg-gray-50/50 transition-colors ${index !== stocks.length - 1 ? "border-b border-gray-50" : ""
                      }`}
                  >
                    <td className="px-6 py-5">
                      <div className="space-y-0.5">
                        <p className="text-gray-900 font-bold text-sm leading-none">
                          {stock.stock_symbol}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-gray-500 text-sm">
                        {new Date(stock.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => handleRemove(stock.id, stock.stock_symbol)}
                        disabled={isRemoving}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all inline-flex items-center justify-center disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
