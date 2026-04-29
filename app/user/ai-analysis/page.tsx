"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  FiTrendingUp,
  FiTrendingDown,

  FiSearch,
  FiFilter,
  FiCalendar,
  FiRefreshCw,
  FiBarChart2,
  FiFileText,
  FiShield,
  FiZap
} from "react-icons/fi";

import { Loader2, AlertCircle, ChevronLeft } from "lucide-react";
import {
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
import { useAppSelector } from "@/Redux/hooks";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";

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
  const [language, setLanguage] = useState("english");
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(
    null,
  );
  const [currentAnalysis, setCurrentAnalysis] =
    useState<AnalysisResponse | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  // Get user from auth state
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.id?.toString() || "";

  // Fetch history
  const { data: history = [], refetch: refetchHistory } =
    useGetHistoryQuery(userId);

  // API hooks
  const [analyzeCompany, { isLoading: isSearching }] =
    useAnalyzeCompanyMutation();
  const [getAnalysisResult] =
    useLazyGetAnalysisResultQuery();

  // Filtered companies for autocomplete
  const filtered = popularCompanies.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase()),
  );

  // Handle search
  const handleSearch = async () => {
    if (!query.trim()) return;
    if (!userId) {
      alert("Please login to use AI Analysis.");
      return;
    }

    setIsLoadingAnalysis(true);
    setSelectedHistoryId(null);

    try {
      console.log("Starting analysis for:", query, "User ID:", userId);
      const result = await analyzeCompany({
        user_id: userId,
        company_name: query,
        language: language,
      }).unwrap();

      console.log("Analysis result received:", result);
      setCurrentAnalysis(result);
      refetchHistory(); // Refresh history after new search
    } catch (error: any) {
      console.error("Analysis failed:", error);
      const errorMsg = error?.data?.message || error?.message || "Unknown error";
      alert(`Analysis failed: ${errorMsg}\nStatus: ${error?.status}`);
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

  // Handle history item click
  const handleHistoryClick = async (id: string) => {
    setIsLoadingAnalysis(true);
    setSelectedHistoryId(id);

    // Sync language state with the history item's language
    const historyItem = history.find((h) => h.id === id);
    if (historyItem && historyItem.language) {
      setLanguage(historyItem.language.toLowerCase());
    }

    try {
      const result = await getAnalysisResult(id).unwrap();
      setCurrentAnalysis(result);
    } catch (error) {
      console.error("Failed to fetch analysis result:", error);
    } finally {
      setIsLoadingAnalysis(false);
    }
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

  // Render empty state
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center px-4">
      <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mb-8">
        <FiZap className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
        Institutional Intelligence
      </h1>
      <p className="text-lg text-gray-500 leading-relaxed mb-10">
        Unlock deep financial insights and Shariah compliance status for any company worldwide.
        Search for a company to begin your institutional-grade analysis.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
        {[
          { icon: <FiBarChart2 />, title: "Market Data", desc: "Real-time stock snapshots and price trends." },
          { icon: <FiShield />, title: "Shariah Status", desc: "Verified compliance with Islamic finance principles." },
          { icon: <FiFileText />, title: "Deep Analysis", desc: "Detailed breakdown of business models and risks." }
        ].map((feat, i) => (
          <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-primary">
              {feat.icon}
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{feat.title}</h3>
            <p className="text-sm text-gray-500">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Render loading state
  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-gray-600 font-medium">Analyzing company data...</p>
    </div>
  );



  // Render analysis content
  const renderAnalysis = (data: AnalysisResponse) => {
    if (!data || !data.stock_snapshot) {
      return (
        <div className="p-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-100">
          <p className="font-bold">Invalid Analysis Data</p>
          <p className="text-sm mt-1">The server returned an incomplete response.</p>
        </div>
      );
    }

    const chartData = formatChartData(data.stock_snapshot.chart_30d || []);
    const isPositiveChange = (data.stock_snapshot.percent_change || 0) >= 0;

    return (
      <div className="space-y-6 w-full max-w-5xl mx-auto pb-12">
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
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 shadow-sm border border-primary/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-gray-600 text-sm mb-1">Current Price</p>
              <p className="text-4xl font-bold text-gray-900">
                ${data.stock_snapshot.current_price?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Change</p>
              <div className="flex items-center gap-2">
                {isPositiveChange ? (
                  <FiTrendingUp className="text-green-600 w-6 h-6" />
                ) : (
                  <FiTrendingDown className="text-red-600 w-6 h-6" />
                )}
                <p
                  className={`text-2xl font-bold ${
                    isPositiveChange ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {data.stock_snapshot.percent_change?.toFixed(2)}%
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                ${Math.abs(data.stock_snapshot.absolute_change || 0).toFixed(2)}{" "}
                absolute
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-sm mb-1">Last Updated</p>
              <p className="text-sm text-gray-500 font-medium">
                {data.stock_snapshot.last_updated_utc
                  ? new Date(
                      data.stock_snapshot.last_updated_utc,
                    ).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Price Chart */}
        {chartData.length > 0 && (
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="font-semibold mb-6 text-gray-800 text-lg">30-Day Price Chart</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                    dy={10}
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${value}`}
                    dx={-10}
                  />
                  <Tooltip
                    formatter={(value: any) => [
                      `$${Number(value).toFixed(2)}`,
                      "Price",
                    ]}
                    labelFormatter={(label) => `Date: ${label}`}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="var(--color-primary)"
                    strokeWidth={3}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Analysis Sections */}
        <div className="space-y-6" dir={language === "arabic" ? "rtl" : "ltr"}>
          {data.sections?.map((section, idx) => (
            <div key={idx} className="bg-white rounded-xl border p-8 shadow-sm">
              <h3 className={`text-xl font-bold mb-6 text-gray-900 border-b pb-4 ${language === "arabic" ? "text-right" : ""}`}>
                {section.title}
              </h3>
              <div className={`prose prose-slate max-w-none text-gray-600 ${language === "arabic" ? "text-right" : ""}`}>
                {section.content.split("\n").map((paragraph, pIdx) => (
                  <p key={pIdx} className={`mb-4 leading-relaxed text-[15px] ${language === "arabic" ? "text-right" : ""}`}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Render tables if present */}
              {section.tables && section.tables.length > 0 && (
                <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200">
                  {section.tables.map((table, tIdx) => (
                    <table key={tIdx} className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {table.columns.map((col, cIdx) => (
                            <th
                              key={cIdx}
                              className="px-6 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wider"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-gray-50 transition-colors">
                            {table.columns.map((col, cIdx) => (
                              <td
                                key={cIdx}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
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
    <div className="flex flex-col h-full bg-white border-l border-gray-100 shadow-sm">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-[13px] font-bold text-gray-800 tracking-widest uppercase">
          History
        </h3>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <FiFilter className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No search history yet</p>
            <p className="text-sm mt-1">Search for a company to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {history.map((item) => {
              const isCompleted = item.shariah_status?.toLowerCase() !== "unknown";

              return (
                <div
                  key={item.id}
                  onClick={() => handleHistoryClick(item.id)}
                  className={`px-6 py-5 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedHistoryId === item.id ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <p className="font-bold text-gray-900 text-sm">
                      {item.ticker || item.company_name.toUpperCase() + ".US"}
                    </p>
                  </div>
                  <p className="text-[13px] text-gray-500 mb-4 font-medium">{item.company_name}</p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <FiCalendar className="w-3.5 h-3.5" />
                      {new Date(item.searched_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    {isCompleted ? (
                      <span className="flex items-center text-gray-400 hover:text-gray-700 transition-colors">
                        View <span className="ml-1 text-base leading-none">›</span>
                      </span>
                    ) : (
                      <span className="flex items-center text-red-400 hover:text-red-500 transition-colors">
                        Retry <FiRefreshCw className="ml-1 w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
     
    </div>
  );

  // Render search interface (Top Bar)
  const renderSearchInterface = () => (
    <div className="flex items-center justify-between w-full pb-6 border-b border-gray-100 mb-8">
      <div className="flex-1 max-w-3xl flex gap-3 items-center">
        {/* Company Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
             <FiSearch className="text-gray-400" />
          </div>
          <Input
            placeholder="Search company name"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            className="w-full pl-10 bg-gray-50/50 border-gray-200 focus-visible:ring-primary h-10 text-[15px]"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />

          {open && filtered.length > 0 && (
            <div className="absolute mt-1 w-full rounded-lg border bg-white shadow-lg z-50 max-h-60 overflow-y-auto">
              {filtered.map((item) => (
                <div
                  key={item}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors text-sm"
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="border border-gray-200 rounded-md px-4 py-2 bg-white flex items-center justify-center gap-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap h-10">
              <span className="text-gray-400 text-base leading-none mr-1">🌐</span>
              <span>{language === "english" ? "English / Arabic" : "Arabic / English"}</span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-[140px]">
            <DropdownMenuItem onClick={() => setLanguage("english")}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("arabic")}>
              Arabic
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isSearching || !query.trim()}
          className="bg-primary hover:opacity-90 disabled:bg-primary/50 text-white px-8 py-2 rounded-md transition-colors font-bold text-sm whitespace-nowrap h-10"
        >
          {isSearching ? (
            <Loader2 className="h-4 w-4 animate-spin mx-auto" />
          ) : (
            "Analysis"
          )}
        </button>
      </div>

    
    </div>
  );

  return (
    <div className="h-[calc(100vh-4rem)] lg:h-screen bg-white flex overflow-hidden w-full font-sans">
      {/* Left Side - Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        <div className="px-10 pt-8 flex-shrink-0">
          {renderSearchInterface()}
        </div>
        
        <div className="flex-1 overflow-y-auto px-10 pb-10">
          {isLoadingAnalysis ?
            renderLoading()
          : currentAnalysis ? (
            renderAnalysis(currentAnalysis)
          ) : renderEmptyState()}
          
          {/* Info message when history is selected but no analysis */}
          {selectedHistoryId && !currentAnalysis && !isLoadingAnalysis && (
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg flex items-center gap-3 max-w-4xl mx-auto">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-700">
                Unable to load analysis. Please try searching again.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - History Sidebar */}
      <div className="w-[320px] bg-white flex-shrink-0 z-10 shadow-[rgba(0,0,0,0.02)_0px_0px_0px_1px,rgba(0,0,0,0.04)_-4px_0px_24px_0px]">
        {renderHistory()}
      </div>
    </div>
  );
};

export default AiAnalysis;
