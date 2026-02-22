"use client";

import {
  AnalysisItem,

  useGetAnalysesQuery,

} from "@/Redux/features/userDashboardServices/ourAnalysis/ourAnalysis";

import { useState } from "react";
import { FiEye } from "react-icons/fi";


export default function AnalysisPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchSymbol, setSearchSymbol] = useState("");
  


  const [showViewModal, setShowViewModal] = useState<AnalysisItem | null>(null);

  // RTK Query hooks
  const { data, isLoading } = useGetAnalysesQuery(currentPage);


  // Filtered data by search
  const filteredData = data?.data.filter((item) =>
    item.symbol.toUpperCase().includes(searchSymbol.toUpperCase()),
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-black bg-clip-text ">
            Our Analysis
          </h1>
          <p className="text-gray-400">
            Expert stock picks curated for halal investors
          </p>
        </div>
      
      </div>

      {/* Search Field */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by stock"
          value={searchSymbol}
          onChange={(e) => setSearchSymbol(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && (!filteredData || filteredData.length === 0) && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No analysis data found.</p>
        </div>
      )}

      {/* Table */}
      {!isLoading && filteredData && filteredData.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recomendetion Note
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.symbol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.note.slice(0, 20)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        item.status === "COMPLIANT"
                          ? " bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {item.status === "NON-CMPLAINT"
                        ? "COMPLIANT"
                        : item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2024-12-15 09:00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-3">
                      <FiEye
                        className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors"
                        onClick={() => setShowViewModal(item)}
                      />
                  
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {data?.meta && (
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled={currentPage === data.meta.last_page}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <span className="text-sm text-gray-700">
            Page {data.meta.current_page} of {data.meta.last_page}
          </span>
        </div>
      )}

    

      {/* View Modal */}
      {showViewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl w-[400px] shadow-xl overflow-hidden">
            {/* Simple header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                View Analysis
              </h2>
            </div>

            {/* Content with better spacing */}
            <div className="p-6">
              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm font-medium text-gray-500 col-span-1">
                    Symbol
                  </span>
                  <span className="text-sm text-gray-900 col-span-2 font-medium">
                    {showViewModal.symbol}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm font-medium text-gray-500 col-span-1">
                    Name
                  </span>
                  <span className="text-sm text-gray-900 col-span-2">
                    {showViewModal.name}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm font-medium text-gray-500 col-span-1">
                    Status
                  </span>
                  <div className="col-span-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        showViewModal.status === "COMPLIANT"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {showViewModal.status === "COMPLIANT"
                        ? "✓ Compliant (12 Month)"
                        : "✗ Non-Compliant"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <span className="text-sm font-medium text-gray-500 block mb-2">
                    Note
                  </span>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {showViewModal.note}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                className="px-5 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium border border-gray-200 shadow-sm"
                onClick={() => setShowViewModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
}


