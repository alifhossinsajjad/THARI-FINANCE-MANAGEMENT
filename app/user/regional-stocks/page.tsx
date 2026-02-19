"use client";

import { useState, useEffect } from "react";
import { useGetRegionsQuery, useGetRegionalReportsQuery } from "@/Redux/features/userDashboardServices/regionBaseApi";
import { useSearch } from "@/contexts/SearchContext";
import { RegionalStockTable } from "../stock-detail/_components/RegionalStockTable";
import { ChevronDown } from "lucide-react";

export default function RegionalStocksPage() {
    const [selectedRegion, setSelectedRegion] = useState<string>("GB");
    const [selectedMethodology, setSelectedMethodology] = useState<string>("AAOIFI");
    const [pageHistory, setPageHistory] = useState<(string | null)[]>([]);
    const [currentToken, setCurrentToken] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const { searchQuery } = useSearch();

    const { data: regionsData, isLoading: isLoadingRegions } = useGetRegionsQuery();

    const { data: reportsData, isLoading: isLoadingReports, error } = useGetRegionalReportsQuery({
        region: selectedRegion,
        methodology: selectedMethodology,
        limit: 20,
        nextToken: currentToken,
    }, {
        skip: !selectedRegion,
    });

    const regions = regionsData?.data?.advancedCompliance?.regions || [];
    const stockItems = reportsData?.data?.advancedCompliance?.reports?.items || [];
    const nextToken = reportsData?.data?.advancedCompliance?.reports?.nextToken || null;

    // Reset pagination when region or search query changes
    useEffect(() => {
        setCurrentToken(null);
        setPageHistory([]);
        setPageNumber(1);
    }, [selectedRegion, selectedMethodology, searchQuery]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500 font-bold text-lg">
                    Error loading regional stocks: {JSON.stringify(error)}
                </div>
            </div>
        );
    }

    // Filter based on search query
    const filteredStockItems = searchQuery
        ? stockItems.filter(
            (item) =>
                item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : stockItems;

    const handleNextPage = () => {
        if (nextToken && !searchQuery) {
            setPageHistory((prev) => [...prev, currentToken]);
            setCurrentToken(nextToken);
            setPageNumber((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (pageHistory.length > 0 && !searchQuery) {
            const newHistory = [...pageHistory];
            const prevToken = newHistory.pop();
            setPageHistory(newHistory);
            setCurrentToken(prevToken ?? null);
            setPageNumber((prev) => prev - 1);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="mx-auto space-y-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                            Regional Stocks Info
                        </h1>
                        <p className="text-slate-500">
                            View and filter stocks by region and methodology.
                            {searchQuery && ` Filtering by: "${searchQuery}"`}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {/* Region Selector */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                                Region
                            </label>
                            <div className="relative min-w-[120px]">
                                <select
                                    value={selectedRegion}
                                    onChange={(e) => setSelectedRegion(e.target.value)}
                                    className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer text-sm font-medium"
                                    disabled={isLoadingRegions}
                                >
                                    {isLoadingRegions ? (
                                        <option>Loading...</option>
                                    ) : (
                                        regions.map((region) => (
                                            <option key={region} value={region}>
                                                {region}
                                            </option>
                                        ))
                                    )}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                                    <ChevronDown size={16} />
                                </div>
                            </div>
                        </div>

                        {/* Methodology Selector */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                                Methodology
                            </label>
                            <div className="relative min-w-[140px]">
                                <select
                                    value={selectedMethodology}
                                    onChange={(e) => setSelectedMethodology(e.target.value)}
                                    className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer text-sm font-medium"
                                >
                                    <option value="AAOIFI">AAOIFI</option>
                                    <option value="DJIM">DJIM</option>
                                    <option value="FTSE">FTSE</option>
                                    <option value="MSCI">MSCI</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                                    <ChevronDown size={16} />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Stock Table */}
                <RegionalStockTable
                    data={filteredStockItems}
                    isLoading={isLoadingReports}
                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}
                    hasNextPage={!searchQuery && !!nextToken}
                    hasPrevPage={!searchQuery && pageHistory.length > 0}
                    pageNumber={pageNumber}
                />
            </div>
        </div>
    );
}
