"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import SearchInput from "@/components/admin/SearchInput";
import FilterSelect from "@/components/admin/FilterSelect";
import StockModal from "@/components/admin/modals/StockModal";
import PrimaryButton from "@/components/admin/buttons/PrimaryButton";
import type { Stock, StockFormData } from "@/types";

export default function StocksPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [riskFilter, setRiskFilter] = useState<string>("All");
  const [shariaFilter, setShariaFilter] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const stocks: Stock[] = [
    {
      id: 1,
      stockName: "Apple Inc.",
      symbol: "AAPL",
      riskLevel: "Low",
      shariaStatus: "Halal",
      premium: false,
      flags: ["Opportunity"],
    },
    {
      id: 2,
      stockName: "Apple Inc.",
      symbol: "TSLA",
      riskLevel: "Low",
      shariaStatus: "Halal",
      premium: true,
      flags: ["Opportunity"],
    },
    {
      id: 3,
      stockName: "Apple Inc.",
      symbol: "AAPL",
      riskLevel: "Low",
      shariaStatus: "Doubtful",
      premium: false,
      flags: ["Opportunity", "Undervalued"],
    },
    {
      id: 4,
      stockName: "Apple Inc.",
      symbol: "MSFT",
      riskLevel: "High",
      shariaStatus: "Halal",
      premium: true,
      flags: [],
    },
    {
      id: 5,
      stockName: "Apple Inc.",
      symbol: "AAPL",
      riskLevel: "Low",
      shariaStatus: "Haram",
      premium: false,
      flags: ["Opportunity"],
    },
    {
      id: 6,
      stockName: "Apple Inc.",
      symbol: "AAPL",
      riskLevel: "Medium",
      shariaStatus: "Halal",
      premium: true,
      flags: ["Undervalued"],
    },
    {
      id: 7,
      stockName: "Apple Inc.",
      symbol: "MSFT",
      riskLevel: "Low",
      shariaStatus: "Halal",
      premium: false,
      flags: [],
    },
  ];

  const filteredStocks = stocks.filter((stock: Stock) => {
    const matchesSearch =
      stock.stockName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === "All" || stock.riskLevel === riskFilter;
    const matchesSharia =
      shariaFilter === "All" || stock.shariaStatus === shariaFilter;
    return matchesSearch && matchesRisk && matchesSharia;
  });

  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case "Low":
        return "#10B981";
      case "Medium":
        return "#F59E0B";
      case "High":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getShariaColor = (status: string): string => {
    switch (status) {
      case "Halal":
        return "#10B981";
      case "Doubtful":
        return "#F59E0B";
      case "Haram":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getFlagColor = (flag: string): string => {
    return flag === "Opportunity" ? "#3B82F6" : "#F59E0B";
  };

  const handleAddStock = (): void => {
    setModalMode("add");
    setSelectedStock(null);
    setIsModalOpen(true);
  };

  const handleEditStock = (stock: Stock): void => {
    setModalMode("edit");
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: StockFormData): void => {
    console.log("Stock data:", data);
    // Handle form submission
  };

  const handleDeleteStock = (stockId: number): void => {
    console.log("Delete stock:", stockId);
    // Handle delete
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Stocks
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track stock prices and market trends.
          </p>
        </div>

        {/* Search, Filters, and Add Button */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search Stocks..."
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full lg:w-48">
              <FilterSelect
                value={riskFilter}
                onChange={setRiskFilter}
                options={["All", "Low", "Medium", "High"]}
                placeholder="All"
              />
            </div>
            <div className="w-full lg:w-48">
              <FilterSelect
                value={shariaFilter}
                onChange={setShariaFilter}
                options={["All", "Halal", "Doubtful", "Haram"]}
                placeholder="All"
              />
            </div>
            <PrimaryButton
              onClick={handleAddStock}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Plus size={18} />
              Add Stock
            </PrimaryButton>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock Name
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sharia Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Premium
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Flags
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStocks.map((stock: Stock) => (
                  <tr
                    key={`stock-${stock.id}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {stock.stockName}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{stock.symbol}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${getRiskColor(stock.riskLevel)}20`,
                          color: getRiskColor(stock.riskLevel),
                        }}
                      >
                        {stock.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${getShariaColor(
                            stock.shariaStatus
                          )}20`,
                          color: getShariaColor(stock.shariaStatus),
                        }}
                      >
                        {stock.shariaStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {stock.premium ? "Yes" : "No"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {stock.flags.map((flag: string, index: number) => (
                          <span
                            key={`flag-${index}`}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                            style={{
                              backgroundColor: `${getFlagColor(flag)}20`,
                              color: getFlagColor(flag),
                            }}
                          >
                            {flag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditStock(stock)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label="Edit stock"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteStock(stock.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Delete stock"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-200">
            {filteredStocks.map((stock: Stock) => (
              <div key={`stock-mobile-${stock.id}`} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">
                      {stock.stockName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{stock.symbol}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${getRiskColor(stock.riskLevel)}20`,
                      color: getRiskColor(stock.riskLevel),
                    }}
                  >
                    {stock.riskLevel}
                  </span>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${getShariaColor(
                        stock.shariaStatus
                      )}20`,
                      color: getShariaColor(stock.shariaStatus),
                    }}
                  >
                    {stock.shariaStatus}
                  </span>
                  {stock.flags.map((flag: string, index: number) => (
                    <span
                      key={`mobile-flag-${index}`}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${getFlagColor(flag)}20`,
                        color: getFlagColor(flag),
                      }}
                    >
                      {flag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Premium:</span>
                  <span className="font-medium text-gray-900">
                    {stock.premium ? "Yes" : "No"}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleEditStock(stock)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteStock(stock.id)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stock Modal */}
      <StockModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stock={selectedStock}
        mode={modalMode}
        onSubmit={handleSubmit}
      />
    </>
  );
}
