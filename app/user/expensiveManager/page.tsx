"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  LayoutDashboard,
  BrainCircuit,
  ChevronUp,
  ChevronDown,
  Trash2,
  Plus,
} from "lucide-react";
import { useGetFinancialManagerQuery } from "@/Redux/features/userDashboardServices/expenseManager/expenseManagerApi";

export default function AIFinancialTools() {
  const [activeTab, setActiveTab] = useState("manager");

  // manager (date range)
  const [fromDate, setFromDate] = useState("2026-01-08");
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  const {
    data: managerData,
    isFetching: managerLoading,
    isError: managerError,
    refetch: refetchManager,
  } = useGetFinancialManagerQuery(
    { from_date: fromDate, to_date: toDate },
    { skip: activeTab !== "manager" },
  );

  const managerRows = useMemo(() => {
    const incomes = managerData?.incomes ?? [];
    const expenses = managerData?.expenses ?? [];
    const loans = managerData?.loans ?? [];
    const maxLen = Math.max(incomes.length, expenses.length, loans.length);

    return Array.from({ length: maxLen }, (_, i) => ({
      income: incomes[i],
      expense: expenses[i],
      loan: loans[i],
    }));
  }, [managerData]);

  // existing states (loan + wealth)
  const [isAnalyzing, setIsAnalyzing] = useState(false); // kept (unused in manager now)
  const [showResults, setShowResults] = useState(false); // kept (unused in manager now)

  const [loanAmount, setLoanAmount] = useState(5000);
  const [duration, setDuration] = useState(4);
  const [interestRate, setInterestRate] = useState(0);
  const [loanResult, setLoanResult] = useState<{
    monthly: string;
    total: string;
    months: number;
  } | null>(null);

  const [assets, setAssets] = useState([
    { id: "1", type: "Property", name: "Main Residence", value: 500000 },
    { id: "2", type: "Investments", name: "Stock Portfolio", value: 500000 },
    { id: "3", type: "Cash", name: "Savings Account", value: 500000 },
  ]);
  const [isAddingAsset, setIsAddingAsset] = useState(false);
  const [newAssetType, setNewAssetType] = useState("property");
  const [newAssetName, setNewAssetName] = useState("");
  const [newAssetValue, setNewAssetValue] = useState(500);

  const tabs = [
    { id: "manager", label: "Financial Manager", icon: BrainCircuit },
    { id: "loan", label: "Loan Calculator", icon: Calculator },
    { id: "wealth", label: "Wealth Dashboard", icon: LayoutDashboard },
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1500);
  };

  const handleCalculateLoan = () => {
    const P = loanAmount;
    const r = interestRate / 100 / 12;
    const n = duration;

    let emi = 0;
    if (r === 0) emi = P / n;
    else emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    setLoanResult({
      monthly: emi.toFixed(2),
      total: (emi * n).toFixed(2),
      months: n,
    });
  };

  const handleAddAsset = () => {
    if (!newAssetName) return;
    const newAsset = {
      id: Math.random().toString(36).substr(2, 9),
      type: newAssetType.charAt(0).toUpperCase() + newAssetType.slice(1),
      name: newAssetName,
      value: newAssetValue,
    };
    setAssets([...assets, newAsset]);
    setIsAddingAsset(false);
    setNewAssetName("");
    setNewAssetValue(500);
  };

  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter((a) => a.id !== id));
  };

  const totalNetWorth = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className=" space-y-10">
      {/* Page Header */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Financial Tools
        </h1>
        <p className="text-gray-400 font-medium text-sm">
          Smart financial planning powered by AI
        </p>
      </section>

      {/* Custom Tab Bar */}
      <div className="flex flex-wrap gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all border shadow-sm border-gray-200 ${
              activeTab === tab.id
                ? "bg-primary text-white  cursor-pointer"
                : " text-gray-700 cursor-pointer"
            }`}
          >
            <tab.icon
              className={`w-4 h-4 ${
                activeTab === tab.id ? "text-white" : "text-gray-400"
              }`}
            />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tool Content Container */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-100">
        {/* ===================== MANAGER (REPLACED) ===================== */}
        {activeTab === "manager" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Date range inputs */}
            <div className="rounded-2xl border border-gray-100 bg-white">
              <div className="p-5">
                <h3 className="text-gray-800 font-bold mb-4">
                  Financial Manager
                </h3>

                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:max-w-130">
                    <div className="space-y-2">
                      <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                        From date
                      </label>
                      <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full bg-[#fcfcfc] border border-gray-100 rounded-2xl p-4 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                        To date
                      </label>
                      <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full bg-[#fcfcfc] border border-gray-100 rounded-2xl p-4 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => refetchManager()}
                    disabled={managerLoading}
                    className="bg-primary  disabled:bg-blue-300 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm cursor-pointer"
                  >
                    {managerLoading ? "Loading..." : "Fetch"}
                  </button>
                </div>

                {managerError && (
                  <p className="mt-4 text-sm text-red-600">
                    Failed to load manager data.
                  </p>
                )}
              </div>
            </div>

            {/* 4 stat cards */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Total income"
                value={managerData?.totalIncome ?? "--"}
                suffix="$"
              />
              <StatCard
                label="Total expense"
                value={managerData?.totalExpense ?? "--"}
                suffix="$"
              />
              <StatCard
                label="Total loan"
                value={managerData?.totalLoan ?? "--"}
                suffix="$"
              />
              <StatCard
                label="Net balance"
                value={
                  typeof managerData?.netBalance === "number"
                    ? String(managerData.netBalance)
                    : "--"
                }
                suffix="$"
                tone={
                  managerData?.balanceStatus === "negative" ? "danger" : "good"
                }
              />
            </div>

            {/* 3-column table (Income / Expense / Loan) */}
            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 className="text-gray-800 font-bold">
                  Income / Expense / Loan
                </h3>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Range: {fromDate} → {toDate}
                </span>
              </div>

              <div className="w-full overflow-auto">
                <table className="w-full min-w-230 text-left">
                  <thead className="bg-[#fcfcfc]">
                    {/* Group headers */}
                    <tr className="text-sm font-bold uppercase tracking-wider">
                      <th
                        className="px-5 py-3 border-b border-gray-100"
                        colSpan={2}
                      >
                        Income
                      </th>
                      <th
                        className="px-5 py-3 border-b border-gray-100"
                        colSpan={2}
                      >
                        Expense
                      </th>
                      <th
                        className="px-5 py-3 border-b border-gray-100"
                        colSpan={2}
                      >
                        Loan
                      </th>
                    </tr>

                    {/* Sub headers */}
                    <tr className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      <th className="px-5 py-3 border-b border-gray-100">
                        Amount
                      </th>
                      <th className="px-5 py-3 border-b border-gray-100">
                        Date
                      </th>

                      <th className="px-5 py-3 border-b border-gray-100">
                        Amount
                      </th>
                      <th className="px-5 py-3 border-b border-gray-100">
                        Date
                      </th>

                      <th className="px-5 py-3 border-b border-gray-100">
                        Amount
                      </th>
                      <th className="px-5 py-3 border-b border-gray-100">
                        Start date
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {managerRows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-5 py-8 text-center text-sm text-gray-500"
                        >
                          {managerLoading
                            ? "Loading..."
                            : "No data found for this range."}
                        </td>
                      </tr>
                    ) : (
                      managerRows.map((r, idx) => (
                        <tr
                          key={idx}
                          className="text-sm text-gray-700 border-b border-gray-100 last:border-b-0"
                        >
                          <td className="px-5 py-3 font-semibold">
                            {r.income?.amount ?? "--"}
                          </td>
                          <td className="px-5 py-3 text-gray-500">
                            {r.income?.date ?? "--"}
                          </td>

                          <td className="px-5 py-3 font-semibold">
                            {r.expense?.amount ?? "--"}
                          </td>
                          <td className="px-5 py-3 text-gray-500">
                            {r.expense?.date ?? "--"}
                          </td>

                          <td className="px-5 py-3 font-semibold">
                            {r.loan?.amount ?? "--"}
                          </td>
                          <td className="px-5 py-3 text-gray-500">
                            {r.loan?.start_date ?? "--"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Insights */}
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-primary disabled:bg-blue-300 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm cursor-pointer"
            >
              {" "}
              {isAnalyzing ? "Analyzing..." : "Analyze With AI"}{" "}
            </button>
          </div>
        )}
        {/* =================== /MANAGER (REPLACED) =================== */}

        {activeTab === "loan" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
              <h3 className="text-gray-800 font-bold mb-6">Loan Calculator</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2.5">
                  <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                    Loan Amount ($)
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full bg-[#fcfcfc] border border-gray-100 rounded-2xl p-4 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                      <button
                        onClick={() => setLoanAmount((v) => v + 100)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setLoanAmount((v) => v - 100)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                    Duration (Months)
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full bg-[#fcfcfc] border border-gray-100 rounded-2xl p-4 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                      <button
                        onClick={() => setDuration((v) => v + 1)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDuration((v) => v - 1)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                    Interest Rate (%)
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full bg-[#fcfcfc] border border-gray-100 rounded-2xl p-4 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                      <button
                        onClick={() => setInterestRate((v) => v + 0.1)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setInterestRate((v) => v - 0.1)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleCalculateLoan}
              className="bg-primary  text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm cursor-pointer"
            >
              Calculate
            </button>
          </div>
        )}

        {activeTab === "wealth" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Net Worth Header */}
            <div className="bg-[#f8f8ff] border-2 border-[#000080]/20 rounded-2xl p-8">
              <h3 className="text-primary font-bold mb-2">Total Net Worth</h3>
              <p className="text-3xl font-bold text-gray-900">
                ${totalNetWorth.toLocaleString()}
              </p>
            </div>

            {/* Add Asset Button */}
            <div className="flex justify-end">
              {!isAddingAsset && (
                <button
                  onClick={() => setIsAddingAsset(true)}
                  className="bg-primary  text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-900/10 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Add Asset
                </button>
              )}
            </div>

            {/* Add New Asset Form */}
            {isAddingAsset && (
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
                <h3 className="text-gray-800 font-bold">Add New Asset</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2.5">
                    <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                      Type
                    </label>
                    <select
                      value={newAssetType}
                      onChange={(e) => setNewAssetType(e.target.value)}
                      className="w-full bg-[#fcfcfc] border border-gray-100 rounded-2xl p-4 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 appearance-none cursor-pointer"
                    >
                      <option value="property">Property</option>
                      <option value="investments">Investments</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g.Rental Property"
                        value={newAssetName}
                        onChange={(e) => setNewAssetName(e.target.value)}
                        className="w-full bg-[#fcfcfc] border border-gray-100 rounded-2xl p-4 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 pointer-events-none">
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                      Value ($)
                    </label>
                    <div className="relative group">
                      <input
                        type="number"
                        value={newAssetValue}
                        onChange={(e) =>
                          setNewAssetValue(Number(e.target.value))
                        }
                        className="w-full bg-[#fcfcfc] border border-gray-100 rounded-2xl p-4 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                        <button
                          onClick={() => setNewAssetValue((v) => v + 500)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setNewAssetValue((v) => v - 500)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleAddAsset}
                    className="bg-primary  text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setIsAddingAsset(false)}
                    className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 font-bold py-3 px-8 rounded-xl transition-all active:scale-95 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Asset Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <span className="bg-[#e6f0ff] text-[#0066ff] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                      {asset.type}
                    </span>
                    <button
                      onClick={() => handleDeleteAsset(asset.id)}
                      className="text-red-500 hover:text-red-700 p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-900 font-bold">{asset.name}</p>
                    <p className="text-gray-800 font-medium text-lg">
                      ${asset.value.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Keep your old result box logic as-is */}
      {showResults && activeTab === "manager" && (
        <div className="bg-[#f8f8ff] rounded-3xl p-8 border border-[#e5e7eb] shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
          <h3 className="text-gray-800 font-bold mb-8">Analysis Results</h3>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-end mb-3">
                <span className="text-gray-600 text-sm font-bold">
                  Financial Health Score
                </span>
                <span className="text-gray-900 font-bold">50/100</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: "50%" }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-600 text-sm leading-relaxed">
                Your debt-to-income ratio is high. Consider reducing monthly
                debt payments. Aim to save at least 10-20% of your income.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Result box specifically for Loan Calculator */}
      {loanResult && activeTab === "loan" && (
        <div className="bg-[#f8f8ff] rounded-3xl p-8 border border-[#e5e7eb] shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
          <h3 className="text-gray-800 font-bold mb-6">Monthly Payment</h3>
          <div className="space-y-4">
            <div className="text-4xl font-bold text-gray-900">
              ${loanResult.monthly}
            </div>
            <p className="text-gray-500 font-medium text-sm">
              Total payment: ${loanResult.total} over {loanResult.months} months
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= Helpers ================= */

function StatCard({
  label,
  value,
  suffix,
  tone = "default",
}: {
  label: string;
  value: string;
  suffix?: string;
  tone?: "default" | "good" | "danger";
}) {
  const toneClass =
    tone === "danger"
      ? "ring-1 ring-red-100"
      : tone === "good"
        ? "ring-1 ring-green-100"
        : "ring-1 ring-gray-100";

  return (
    <div className={`rounded-2xl bg-white p-5 ${toneClass} text-center`}>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black text-gray-800 flex items-center justify-center gap-1">
        {value}
        {suffix ? (
          <span className="text-gray-400 text-base"> {suffix}</span>
        ) : null}
      </p>
    </div>
  );
}
