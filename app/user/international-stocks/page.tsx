"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useSearchNonUsStockQuery } from "@/Redux/features/userDashboardServices/nonUsApi";
import { NonUsStockTable } from "../stock-detail/_components/NonUsStockTable";

export default function InternationalStockSearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchSymbol, setSearchSymbol] = useState<string | null>(null);

    const { data, isLoading, error } = useSearchNonUsStockQuery(
        { symbol: searchSymbol || "" },
        { skip: !searchSymbol }
    );

    const handleSearch = () => {
        if (searchQuery.trim()) {
            setSearchSymbol(searchQuery.trim());
        }
    };

    const handleClearSearch = () => {
        setSearchSymbol(null);
        setSearchQuery("");
    };

    const report = data?.data?.advancedCompliance?.report;
    const stockItems = report ? [report] : [];

    return (
        <div className="min-h-screen">
            <div className="mx-auto space-y-8">
                {/* Header */}
                <header className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                        International Stock Search
                    </h1>
                    <p className="text-slate-500">
                        Search and view advanced compliance reports for Non-US stocks.
                    </p>
                </header>

                {/* Search Bar */}
                <div className="relative flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Enter symbol (e.g., 0R0K-LN)..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-primary text-white px-8 py-3 rounded-xl font-semibold transition-colors cursor-pointer hover:opacity-90"
                    >
                        Search
                    </button>
                    {searchSymbol && (
                        <button
                            onClick={handleClearSearch}
                            className="bg-slate-200 text-slate-700 px-8 py-3 rounded-xl font-semibold transition-colors cursor-pointer hover:bg-slate-300 flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Clear
                        </button>
                    )}
                </div>

                {/* Error State */}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 font-medium">
                        Error loading international stock: {JSON.stringify(error)}
                    </div>
                )}

                {/* Results Table */}
                <NonUsStockTable
                    data={stockItems}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
