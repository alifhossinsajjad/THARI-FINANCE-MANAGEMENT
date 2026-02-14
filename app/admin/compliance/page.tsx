// app/admin/sharia-compliance/page.tsx
"use client";

import { useState } from "react";
import { Search, Edit2, Trash2, Clock, Users, TrendingUp } from "lucide-react";

type ComplianceItem = {
  id: number;
  item: string;
  type: "Stock" | "Crypto" | string;
  status: "Halal" | "Haram" | "Doubtful";
  explanation: string;
  source: string;
};

export default function ShariaCompliancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activityFilter, setActivityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const items: ComplianceItem[] = [
    {
      id: 1,
      item: "Apple Inc.",
      type: "Stock",
      status: "Doubtful",
      explanation: "Compliant business model with minimal interest income",
      source: "AAOIFI Standards",
    },
    {
      id: 2,
      item: "Bank of America",
      type: "Stock",
      status: "Haram",
      explanation: "Primary business is interest-based banking",
      source: "Islamic Finance Guidelines",
    },
    {
      id: 3,
      item: "Bitcoin",
      type: "Crypto",
      status: "Doubtful",
      explanation: "Debated among scholars due to volatility and speculation",
      source: "AAOIFI Standards",
    },
    {
      id: 4,
      item: "Tesla Inc.",
      type: "Stock",
      status: "Halal",
      explanation: "High debt ratio and some non-compliant revenue streams",
      source: "Sharia Board Review",
    },
  ];

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.item
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesActivity = activityFilter === "All" || true; // extend if more types
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesActivity && matchesStatus;
  });

  const halalCount = items.filter((i) => i.status === "Halal").length;
  const haramCount = items.filter((i) => i.status === "Haram").length;
  const doubtfulCount = items.filter((i) => i.status === "Doubtful").length;

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Halal":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          dot: "bg-green-500",
        };
      case "Haram":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          dot: "bg-red-500",
        };
      case "Doubtful":
        return {
          bg: "bg-orange-100",
          text: "text-orange-800",
          dot: "bg-orange-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          dot: "bg-gray-500",
        };
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Sharia Compliance
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">
          Ensure all activities follow Sharia principles.
        </p>
      </div>

      {/* Search + Filters + Add Button */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Items..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex gap-4">
            <select
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
            >
              <option>All</option>
              <option>Stocks</option>
              <option>Crypto</option>
              <option>Funds</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
            >
              <option>All</option>
              <option>Halal</option>
              <option>Haram</option>
              <option>Doubtful</option>
            </select>
          </div>
        </div>

        {/* Add Button */}
        <button className="bg-primary hover:bg-[#00006B] text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
          + Add Item
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white  justify-between border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2B7FFF] rounded-lg flex items-center justify-center text-white">
              <Users className="w-6 h-6" /> {/* or custom icon */}
            </div>
            <p className="text-md text-gray-600">Halal Items</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {String(halalCount).padStart(2, "0")}
          </p>
        </div>

        <div className="bg-white  justify-between border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-[#00C950] rounded-lg flex items-center justify-center text-white">
              <TrendingUp className="w-6 h-6" /> {/* arrow-up in screenshot? */}
            </div>

            <p className="text-sm text-gray-600">Haram Items</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {String(haramCount).padStart(2, "0")}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
            <Clock className="w-6 h-6" /> {/* B icon placeholder */}
          </div>
          <div>
            <p className="text-sm text-gray-600">Doubtful Items</p>
            <p className="text-2xl font-bold text-gray-900">
              {String(doubtfulCount).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Item
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Explanation
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Source
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => {
                const styles = getStatusStyles(item.status);
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.item}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${styles.bg} ${styles.text}`}
                      >
                        <span className={`w-2 h-2 rounded-full  `} />
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-md line-clamp-2">
                      {item.explanation}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.source}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
