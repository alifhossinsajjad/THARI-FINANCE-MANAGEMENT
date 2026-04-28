"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  FiChevronDown,
  FiClock,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";

import { Loader2, AlertCircle, ChevronLeft } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  AnalysisResponse,
  useAnalyzeCompanyMutation,
  useGetHistoryQuery,
  useLazyGetAnalysisResultQuery,
} from "@/Redux/features/Ai-Analysis/Ai-Analysis";

const popularCompanies = [
  "Adobe",
  "Microsoft",
  "Apple",
  "Google",
  "Amazon",
  "Meta",
];

const AiAnalysis = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("english");
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(
    null,
  );
  const [currentAnalysis, setCurrentAnalysis] =
    useState<AnalysisResponse | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  // User ID (in a real app, this would come from auth)
  const userId = "1";

  // Fetch history
  const { data: history = [], refetch: refetchHistory } =
    useGetHistoryQuery(userId);

  // API hooks
  const [analyzeCompany, { isLoading: isSearching }] =
    useAnalyzeCompanyMutation();
  const [getAnalysisResult, { isLoading: isLoadingResult }] =
    useLazyGetAnalysisResultQuery();

  // Filtered companies for autocomplete
  const filtered = popularCompanies.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase()),
  );

  // Handle search
  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoadingAnalysis(true);
    setSelectedHistoryId(null);

    try {
      const result = await analyzeCompany({
        user_id: userId,
        company_name: query,
        language: language,
      }).unwrap();

      setCurrentAnalysis(result);
      refetchHistory(); // Refresh history after new search
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  // Handle history item click
  const handleHistoryClick = async (id: string) => {
    setIsLoadingAnalysis(true);
    setSelectedHistoryId(id);

    try {
      const result = await getAnalysisResult(id).unwrap();
      setCurrentAnalysis(result);
    } catch (error) {
      console.error("Failed to fetch analysis result:", error);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  // Clear current analysis
  const handleBackToSearch = () => {
    setCurrentAnalysis(null);
    setSelectedHistoryId(null);
    setQuery("");
  };

  // Format chart data
  const formatChartData = (
    chartData: { timestamp_utc: string; close: number }[],
  ) => {
    return chartData.map((point) => ({
      date: new Date(point.timestamp_utc).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      price: point.close,
      fullDate: point.timestamp_utc,
    }));
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "halal":
        return "bg-green-100 text-green-700";
      case "haram":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Render loading state
  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      <p className="mt-4 text-gray-600">Analyzing company data...</p>
    </div>
  );

  // Render analysis content
  const renderAnalysis = (data: AnalysisResponse) => {
    const chartData = formatChartData(data.stock_snapshot.chart_30d || []);
    const isPositiveChange = (data.stock_snapshot.percent_change || 0) >= 0;

    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToSearch}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back to Search</span>
            </button>
            <div>
              <h2 className="text-2xl font-bold">{data.company_name}</h2>
              {data.ticker && (
                <p className="text-gray-500">
                  {data.ticker} • {data.stock_snapshot.symbol}
                </p>
              )}
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              data.shariah_status,
            )}`}
          >
            {data.shariah_status?.toUpperCase() || "UNKNOWN"}
          </div>
        </div>

        {/* Stock Snapshot */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-gray-600 text-sm">Current Price</p>
              <p className="text-4xl font-bold">
                ${data.stock_snapshot.current_price?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Change</p>
              <div className="flex items-center gap-1">
                {isPositiveChange ? (
                  <FiTrendingUp className="text-green-600" />
                ) : (
                  <FiTrendingDown className="text-red-600" />
                )}
                <p
                  className={`text-2xl font-semibold ${
                    isPositiveChange ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {data.stock_snapshot.percent_change?.toFixed(2)}%
                </p>
              </div>
              <p className="text-sm text-gray-500">
                ${Math.abs(data.stock_snapshot.absolute_change || 0).toFixed(2)}{" "}
                absolute
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-sm">Last Updated</p>
              <p className="text-sm text-gray-500">
                {new Date(
                  data.stock_snapshot.last_updated_utc,
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Price Chart */}
        {chartData.length > 0 && (
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-semibold mb-4">30-Day Price Chart</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toFixed(2)}`,
                      "Price",
                    ]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Analysis Sections */}
        <div className="space-y-6">
          {data.sections?.map((section, idx) => (
            <div key={idx} className="bg-white rounded-xl border p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {section.title}
              </h3>
              <div className="prose prose-sm max-w-none text-gray-700">
                {section.content.split("\n").map((paragraph, pIdx) => (
                  <p key={pIdx} className="mb-3 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Render tables if present */}
              {section.tables && section.tables.length > 0 && (
                <div className="mt-6 overflow-x-auto">
                  {section.tables.map((table, tIdx) => (
                    <table key={tIdx} className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          {table.columns.map((col, cIdx) => (
                            <th
                              key={cIdx}
                              className="border px-4 py-2 text-left text-sm font-semibold text-gray-700"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-gray-50">
                            {table.columns.map((col, cIdx) => (
                              <td
                                key={cIdx}
                                className="border px-4 py-2 text-sm text-gray-600"
                              >
                                {row[col] || "-"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render history list
  const renderHistory = () => (
    <div className="bg-white rounded-xl border">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-semibold flex items-center gap-2">
          <FiClock className="h-4 w-4" />
          Search History
        </h3>
      </div>
      <div className="divide-y max-h-[500px] overflow-y-auto">
        {history.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No search history yet</p>
            <p className="text-sm mt-1">Search for a company to get started</p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              onClick={() => handleHistoryClick(item.id)}
              className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedHistoryId === item.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {item.company_name}
                  </p>
                  {item.ticker && (
                    <p className="text-xs text-gray-500">{item.ticker}</p>
                  )}
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(
                      item.shariah_status,
                    )}`}
                  >
                    {item.shariah_status}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.searched_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // Render search interface
  const renderSearchInterface = () => (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        {/* Company Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Input
            placeholder="Enter company name (e.g., Adobe, Microsoft)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            className="w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />

          {open && filtered.length > 0 && (
            <div className="absolute mt-1 w-full rounded-lg border bg-white shadow-md z-50 max-h-60 overflow-y-auto">
              {filtered.map((item) => (
                <div
                  key={item}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    setQuery(item);
                    setOpen(false);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Language Dropdown */}
        <DropdownMenu onOpenChange={setLangOpen}>
          <DropdownMenuTrigger asChild>
            <button className="border rounded-lg px-4 py-2 bg-white flex items-center justify-between gap-2 min-w-[140px]">
              <span>{language === "english" ? "🇬🇧 English" : "🇸🇦 Arabic"}</span>
              <FiChevronDown
                className={`transition-transform duration-200 ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-[140px]">
            <DropdownMenuItem onClick={() => setLanguage("english")}>
              🇬🇧 English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("arabic")}>
              🇸🇦 Arabic
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isSearching || !query.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors font-medium"
        >
          {isSearching ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Analyze"
          )}
        </button>
      </div>

      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-2">
        <p className="text-sm text-gray-500">Popular:</p>
        {popularCompanies.map((company) => (
          <button
            key={company}
            onClick={() => {
              setQuery(company);
              handleSearch();
            }}
            className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            {company}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Side - History */}
          <div className="lg:col-span-3">{renderHistory()}</div>

          {/* Right Side - Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {!currentAnalysis && !isLoadingAnalysis ? (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      AI Company Analysis
                    </h1>
                    <p className="text-gray-600">
                      Get comprehensive investment analysis powered by AI
                    </p>
                  </div>
                  {renderSearchInterface()}

                  {/* Info message when history is selected but no analysis */}
                  {selectedHistoryId &&
                    !currentAnalysis &&
                    !isLoadingAnalysis && (
                      <div className="mt-8 p-4 bg-yellow-50 rounded-lg flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                        <p className="text-yellow-700">
                          Unable to load analysis. Please try searching again.
                        </p>
                      </div>
                    )}
                </>
              ) : isLoadingAnalysis ? (
                renderLoading()
              ) : currentAnalysis ? (
                renderAnalysis(currentAnalysis)
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAnalysis;
