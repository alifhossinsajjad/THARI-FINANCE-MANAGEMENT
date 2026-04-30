"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  LayoutDashboard,
  BrainCircuit,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  useGetFinancialManagerQuery,
  useGetFinancialWealthQuery,
  useCalculateLoanMutation,
} from "@/Redux/features/userDashboardServices/expenseManager/expenseManagerApi";

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

  const { data: managerTotalData } = useGetFinancialManagerQuery(undefined, {
    skip: activeTab !== "manager",
  });

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

  // AI analyze UI state (existing)
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1500);
  };

  /* ===================== LOAN (API) ===================== */

  const [loanAmount, setLoanAmount] = useState(5000);
  const [duration, setDuration] = useState(12);
  const [interestRate, setInterestRate] = useState(5.5);

  const [calculateLoan, { isLoading: loanCalcLoading, error: loanCalcError }] =
    useCalculateLoanMutation();

  const [loanResult, setLoanResult] = useState<{
    emi: number;
    totalRepayment: number;
    interest: number;
  } | null>(null);

  const handleCalculateLoan = async () => {
    // Basic guard
    if (!loanAmount || loanAmount <= 0) return;
    if (!duration || duration <= 0) return;
    if (interestRate < 0) return;

    try {
      const res = await calculateLoan({
        amount: loanAmount,
        interest_rate: interestRate,
        repayment_period: duration,
      }).unwrap();

      setLoanResult(res);
    } catch {
      // handled by loanCalcError
    }
  };

  /* ===================== WEALTH (API) ===================== */

  // wealth date range (separate from manager; you can reuse if you want)
  const [wealthFrom, setWealthFrom] = useState("2026-02-01");
  const [wealthTo, setWealthTo] = useState("2026-03-28");

  const {
    data: wealthData,
    isFetching: wealthLoading,
    isError: wealthError,
    refetch: refetchWealth,
  } = useGetFinancialWealthQuery(
    { from_date: wealthFrom, to_date: wealthTo },
    { skip: activeTab !== "wealth" },
  );

  const tabs = [
    { id: "manager", label: "Financial Manager", icon: BrainCircuit },
    { id: "loan", label: "Loan Calculator", icon: Calculator },
    { id: "wealth", label: "Wealth Dashboard", icon: LayoutDashboard },
  ];

  return (
    <div className="space-y-10">
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
                ? "bg-primary text-white cursor-pointer"
                : "text-gray-700 cursor-pointer"
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
        {/* ===================== MANAGER ===================== */}
        {activeTab === "manager" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* 4 stat cards */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Total income"
                value={managerTotalData?.totalIncome ?? "--"}
                suffix="$"
              />
              <StatCard
                label="Total expense"
                value={managerTotalData?.totalExpense ?? "--"}
                suffix="$"
              />
              <StatCard
                label="Total loan"
                value={managerTotalData?.totalLoan ?? "--"}
                suffix="$"
              />
              <StatCard
                label="Net balance"
                value={
                  typeof managerTotalData?.netBalance === "number"
                    ? String(managerTotalData.netBalance)
                    : "--"
                }
                suffix="$"
                tone={
                  managerTotalData?.balanceStatus === "negative"
                    ? "danger"
                    : "good"
                }
              />
            </div>

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
                    className="bg-primary disabled:bg-blue-300 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm cursor-pointer"
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
              {isAnalyzing ? "Analyzing..." : "Analyze With AI"}
            </button>
          </div>
        )}

        {/* ===================== LOAN ===================== */}
        {activeTab === "loan" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
              <h3 className="text-gray-800 font-bold mb-6">Loan Calculator</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2.5">
                  <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                    Loan Amount
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
                        type="button"
                        onClick={() => setLoanAmount((v) => v + 100)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setLoanAmount((v) => Math.max(0, v - 100))
                        }
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                    Repayment Period (Months)
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
                        type="button"
                        onClick={() => setDuration((v) => v + 1)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDuration((v) => Math.max(1, v - 1))}
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
                        type="button"
                        onClick={() =>
                          setInterestRate((v) => Number((v + 0.1).toFixed(2)))
                        }
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setInterestRate((v) =>
                            Math.max(0, Number((v - 0.1).toFixed(2))),
                          )
                        }
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {loanCalcError && (
                <p className="mt-4 text-sm text-red-600">
                  Failed to calculate loan. Check values and try again.
                </p>
              )}
            </div>

            <button
              onClick={handleCalculateLoan}
              disabled={loanCalcLoading}
              className="bg-primary disabled:bg-blue-300 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm cursor-pointer"
            >
              {loanCalcLoading ? "Calculating..." : "Calculate"}
            </button>
          </div>
        )}

        {/* ===================== WEALTH ===================== */}
        {activeTab === "wealth" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Wealth API summary */}
            <div className="rounded-2xl border border-gray-100 bg-white">
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-gray-800 font-bold mb-1">
                      Wealth Summary
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Based on your financial history for the selected range.
                    </p>
                  </div>

                  <button
                    onClick={() => refetchWealth()}
                    disabled={wealthLoading}
                    className="bg-primary disabled:bg-blue-300 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm cursor-pointer"
                  >
                    {wealthLoading ? "Loading..." : "Refresh"}
                  </button>
                </div>

                <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:max-w-130">
                    <div className="space-y-2">
                      <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                        From date
                      </label>
                      <input
                        type="date"
                        value={wealthFrom}
                        onChange={(e) => setWealthFrom(e.target.value)}
                        className="w-full bg-[#fcfcfc] border border-gray-100 rounded-2xl p-4 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                        To date
                      </label>
                      <input
                        type="date"
                        value={wealthTo}
                        onChange={(e) => setWealthTo(e.target.value)}
                        className="w-full bg-[#fcfcfc] border border-gray-100 rounded-2xl p-4 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {wealthError && (
                  <p className="mt-4 text-sm text-red-600">
                    Failed to load wealth data.
                  </p>
                )}

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
                  <StatCard
                    label="Total income"
                    value={
                      typeof wealthData?.totalIncome === "string"
                        ? String(wealthData.totalIncome)
                        : "--"
                    }
                    suffix="$"
                  />
                  <StatCard
                    label="Total expense"
                    value={
                      typeof wealthData?.totalExpense === "string"
                        ? String(wealthData.totalExpense)
                        : "--"
                    }
                    suffix="$"
                  />
                  <StatCard
                    label="Total loan"
                    value={
                      typeof wealthData?.totalLoan === "string"
                        ? String(wealthData.totalLoan)
                        : "--"
                    }
                    suffix="$"
                  />
                  <StatCard
                    label="Net savings"
                    value={
                      typeof wealthData?.netSavings === "number"
                        ? String(wealthData.netSavings)
                        : "--"
                    }
                    suffix="$"
                    tone={
                      wealthData?.balanceStatus === "negative"
                        ? "danger"
                        : "good"
                    }
                  />
                  <StatCard
                    label="Status"
                    value={wealthData?.balanceStatus ?? "--"}
                  />
                </div>

                {wealthData?.warning ? (
                  <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4">
                    <p className="text-sm font-medium text-amber-900">
                      {wealthData.warning}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Keep your old result box logic as-is */}
      {showResults && activeTab === "manager" && (
        <div className="bg-[#f8f8ff] rounded-3xl p-8 border border-[#e5e7eb] shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
          <h3 className="text-gray-800 font-bold mb-8">Analysis Results</h3>

          {(() => {
            const ai = managerTotalData?.ai_insights;
            console.log(ai);

            // ---------- guards ----------
            if (!ai || typeof ai !== "object") {
              return (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 text-gray-600 text-sm">
                  No insights available.
                </div>
              );
            }

            // ---------- safe parsing ----------
            const scoreRaw = Number(ai.score);
            const score = Number.isFinite(scoreRaw)
              ? Math.max(0, Math.min(100, Math.round(scoreRaw)))
              : 0;

            const savingsRaw = Number(ai.savings);
            const savings = Number.isFinite(savingsRaw) ? savingsRaw : 0;

            const savingsPercentRaw = Number(ai.savingsPercent);
            const savingsPercent = Number.isFinite(savingsPercentRaw)
              ? savingsPercentRaw
              : 0;

            const insights = Array.isArray(ai.insights)
              ? ai.insights.filter(
                  (x: unknown) => typeof x === "string" && x.trim().length,
                )
              : [];

            // ---------- formatting ----------
            const fmtMoney = (n: number) =>
              new Intl.NumberFormat("en-US", {
                maximumFractionDigits: 0,
              }).format(n);

            const fmtPct = (n: number) => {
              const rounded = Math.round(n);
              return `${rounded > 0 ? "+" : ""}${rounded}%`;
            };

            const savingsLabel =
              savings === 0
                ? "Neutral savings"
                : savings > 0
                  ? "Savings"
                  : "Deficit";

            const savingsTone =
              savings === 0
                ? "text-gray-700 bg-gray-50 border-gray-200"
                : savings > 0
                  ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                  : "text-rose-700 bg-rose-50 border-rose-200";

            const scoreTone =
              score >= 70
                ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                : score >= 40
                  ? "text-amber-700 bg-amber-50 border-amber-200"
                  : "text-rose-700 bg-rose-50 border-rose-200";

            const barTone =
              score >= 70
                ? "bg-emerald-500"
                : score >= 40
                  ? "bg-amber-500"
                  : "bg-rose-500";

            // optional: quick status line (helps when score is 0 but data exists)
            const scoreStatus =
              score >= 70 ? "Good" : score >= 40 ? "Fair" : "Needs attention";

            return (
              <div className="space-y-8">
                {/* Score */}
                <div className={`rounded-2xl border p-5 ${scoreTone}`}>
                  <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
                    <div>
                      <div className="text-gray-600 text-sm font-bold">
                        Financial Health
                      </div>
                      <div className="text-xs font-semibold opacity-80">
                        {scoreStatus}
                      </div>
                    </div>
                    <div className="text-gray-900 font-bold">{score}/100</div>
                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barTone} rounded-full transition-all duration-1000`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>

                {/* Savings summary */}
                <div className={`rounded-2xl border p-5 ${savingsTone}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="font-bold">{savingsLabel}</div>
                    <div className="text-sm font-bold">
                      {savings < 0 ? "-" : ""}
                      {fmtMoney(Math.abs(savings))} ({fmtPct(savingsPercent)})
                    </div>
                  </div>
                </div>

                {/* Insights list */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  {insights.length ? (
                    <ul className="space-y-3">
                      {insights.map((text, idx) => (
                        <li
                          key={`${idx}-${text.slice(0, 20)}`}
                          className="flex gap-3"
                        >
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2E3192]" />
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      No insight messages returned.
                    </p>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
      {/* Result box specifically for Loan Calculator (API result) */}
      {loanResult && activeTab === "loan" && (
        <div className="bg-[#f8f8ff] rounded-3xl p-8 border border-[#e5e7eb] shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
          <h3 className="text-gray-800 font-bold mb-6">Loan Calculation</h3>
          <div className="space-y-4">
            <div className="text-4xl font-bold text-gray-900">
              ${loanResult.emi.toFixed(2)}
            </div>
            <p className="text-gray-500 font-medium text-sm">
              Total repayment: ${loanResult.totalRepayment.toFixed(2)}
            </p>
            <p className="text-gray-500 font-medium text-sm">
              Interest: ${loanResult.interest.toFixed(2)}
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
        {suffix ? (
          <span className="text-gray-400 text-base">{suffix}</span>
        ) : null}
        {value}
      </p>
    </div>
  );
}
