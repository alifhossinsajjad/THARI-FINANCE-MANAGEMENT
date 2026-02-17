"use client";

import { useState, useEffect } from "react";
import { useGetEtfReportsQuery } from "@/Redux/features/userDashboardServices/etfApi";
import { useSearch } from "@/contexts/SearchContext";
import { EtfTable } from "../stock-detail/_components/EtfTable";

export default function EtfReportsPage() {
    const [pageNumber, setPageNumber] = useState(1);
    const { searchQuery } = useSearch();
    const itemsPerPage = 20;

    const { data, isLoading, error } = useGetEtfReportsQuery();

    // Reset to first page when search query changes
    useEffect(() => {
        setPageNumber(1);
    }, [searchQuery]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500 font-bold text-lg">
                    Error loading ETF reports: {JSON.stringify(error)}
                </div>
            </div>
        );
    }

    const etfItems = data?.items || [];

    // Filter based on search query
    const filteredEtfItems = searchQuery
        ? etfItems.filter(
            (item) =>
                item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : etfItems;

    // Client-side pagination logic
    const totalItems = filteredEtfItems.length;
    const hasNextPage = pageNumber * itemsPerPage < totalItems;
    const hasPrevPage = pageNumber > 1;

    const paginatedItems = filteredEtfItems.slice(
        (pageNumber - 1) * itemsPerPage,
        pageNumber * itemsPerPage
    );

    const handleNextPage = () => {
        if (hasNextPage) {
            setPageNumber((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (hasPrevPage) {
            setPageNumber((prev) => prev - 1);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="mx-auto space-y-8">
                {/* Header */}
                <header className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                        ETF Reports
                    </h1>
                    <p className="text-slate-500">
                        View all ETF-based compliance reports.{searchQuery && ` Filtering by: "${searchQuery}"`}
                    </p>
                </header>

                {/* ETF Table */}
                <EtfTable
                    data={paginatedItems}
                    isLoading={isLoading}
                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}
                    hasNextPage={hasNextPage}
                    hasPrevPage={hasPrevPage}
                    pageNumber={pageNumber}
                />
            </div>
        </div>
    );
}
