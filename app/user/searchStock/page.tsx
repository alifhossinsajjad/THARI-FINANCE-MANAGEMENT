"use client";

import { useMemo, useState } from "react";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { useGetStockBySymbolQuery } from "@/Redux/features/AdminDashboard/etfsy/etfsyApi";

export default function StockPage() {
  const [symbol, setSymbol] = useState("");
  const [submitted, setSubmitted] = useState("");

  const trimmed = useMemo(() => submitted.trim().toUpperCase(), [submitted]);

  const { data, isFetching, isError, error } = useGetStockBySymbolQuery(
    { symbol: trimmed },
    { skip: !trimmed },
  );

  const stock = data?.data?.basicCompliance?.report;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(symbol);
  };

  const statusTone =
    stock?.status === "COMPLIANT"
      ? "bg-green-50 text-green-700 ring-green-100"
      : stock?.status === "NON_COMPLIANT"
        ? "bg-red-50 text-red-700 ring-red-100"
        : stock?.status === "UNRATED"
          ? "bg-amber-50 text-amber-700 ring-amber-100"
          : "bg-gray-50 text-gray-700 ring-gray-100";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Stock Search</h1>
        <p className="text-sm font-medium text-gray-500">
          Search by symbol (e.g. AMD, AAPL, MSFT)
        </p>
      </div>

      {/* Search bar */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <form onSubmit={onSubmit} className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="Type a symbol and press Enter…"
              className="w-full rounded-2xl border border-gray-100 bg-[#fcfcfc] py-4 pl-12 pr-4 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!symbol.trim() || isFetching}
            className="bg-primary disabled:bg-blue-300 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-sm cursor-pointer"
          >
            {isFetching ? "Searching..." : "Search"}
          </button>
        </form>

        {/* helper row */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
          <span>Tip:</span>
          <button
            type="button"
            onClick={() => {
              setSymbol("AMD");
              setSubmitted("AMD");
            }}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition cursor-pointer"
          >
            AMD
          </button>
          <button
            type="button"
            onClick={() => {
              setSymbol("AAPL");
              setSubmitted("AAPL");
            }}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition cursor-pointer"
          >
            AAPL
          </button>
          <button
            type="button"
            onClick={() => {
              setSymbol("MSFT");
              setSubmitted("MSFT");
            }}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition cursor-pointer"
          >
            MSFT
          </button>
        </div>
      </div>

      {/* Result shown under search */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900 font-black">Result</h2>
          {trimmed ? (
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Symbol: {trimmed}
            </span>
          ) : (
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              No search yet
            </span>
          )}
        </div>

        <div className="mt-5">
          {!trimmed ? (
            <EmptyState />
          ) : isFetching ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState error={error} />
          ) : !stock ? (
            <div className="rounded-2xl border border-gray-100 bg-[#fcfcfc] p-6 text-sm text-gray-600">
              No data found.
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-[#fcfcfc] p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {stock.exchange}
                  </p>
                  <p className="text-2xl font-black text-gray-900">
                    {stock.symbol}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    {stock.name}
                  </p>
                </div>

                <span
                  className={[
                    "inline-flex items-center justify-center",
                    "rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider",
                    "ring-1",
                    statusTone,
                  ].join(" ")}
                >
                  {stock.status}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <InfoPill label="Symbol" value={stock.symbol} />
                <InfoPill label="Exchange" value={stock.exchange} />
                <InfoPill label="Status" value={stock.status} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= UI Bits ================= */

function EmptyState() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-[#fcfcfc] p-6 text-sm text-gray-600">
      Search a stock symbol to see compliance status.
    </div>
  );
}

function LoadingState() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-[#fcfcfc] p-6 flex items-center gap-3 text-sm text-gray-600">
      <Loader2 className="h-4 w-4 animate-spin" />
      Loading…
    </div>
  );
}

function ErrorState({ error }: { error: unknown }) {
  // keep it safe; RTKQ error shapes vary
  const message =
    typeof error === "object" && error && "status" in error
      ? "Request failed. Try another symbol."
      : "Something went wrong.";

  return (
    <div className="rounded-2xl border border-red-100 bg-red-50 p-6 flex items-start gap-3 text-sm text-red-700">
      <AlertCircle className="h-4 w-4 mt-0.5" />
      <div className="space-y-1">
        <p className="font-bold">Error</p>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
        {label}
      </p>
      <p className="mt-1 text-gray-900 font-black">{value}</p>
    </div>
  );
}
