"use client";

import Link from "next/link";
import {
  Calendar,
  ArrowUpRight,
  Star,
  Search,
  TrendingUp,
  Zap,
  X,
} from "lucide-react";

import {
  useGetMyProfileQuery,
  // ✅ use your actual hook name for: GET /subscriptions/show/:id
} from "@/Redux/features/userDashboardServices/userApi";
import { useGetSubscriptionShowQuery } from "@/Redux/features/pricing/pricingApi";
import { useState } from "react";

export default function UserDashboardPage() {
  const [openSubInfo, setOpenSubInfo] = useState(false);
  // 1) profile
  const { data: profileRes, isLoading: isProfileLoading } =
    useGetMyProfileQuery(undefined);

  const profile = (profileRes as any)?.data ?? profileRes;

  const userName = profile?.name ?? "User";
  const planId: number | null = profile?.subscription_plan_id ?? null;

  // According to you: this "status" indicates subscription status
  const isSubscriptionActive = Boolean(profile?.status && planId);

  // 2) subscription plan (depends on profile)
  const {
    data: planRes,
    isLoading: isPlanLoading,
    isError: isPlanError,
  } = useGetSubscriptionShowQuery(planId as any, {
    skip: !planId, // don't call until we have an id
  });

  const plan = (planRes as any)?.plan ?? planRes?.plan;

  const showSubscriptionSkeleton =
    isProfileLoading || (Boolean(planId) && isPlanLoading);

  const durationLabel =
    plan?.duration_value && plan?.duration_type
      ? `${plan.duration_value} ${plan.duration_type}${
          plan.duration_value > 1 ? "s" : ""
        }`
      : "—";
  return (
    <div className="mx-auto space-y-10">
      {/* Header Section */}
      <section>
        <h1 className="text-3xl font-bold text-zinc-800 mb-2">Welcome back!</h1>
        <h2 className="text-xl font-medium mb-2 text-neutral-500">
          Hi, {userName}! <span>👋</span>
        </h2>
        <p className="text-gray-400 max-w-2xl leading-relaxed text-sm">
          Your financial insights at a glance. Track your halal investments and
          discover new opportunities.
        </p>
      </section>

      {/* Subscription & Quick Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Subscription Status */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-gray-800 font-semibold mb-2">
                Subscription Status
              </h3>

              {showSubscriptionSkeleton ? (
                <span className="inline-block h-5 w-20 rounded-full bg-gray-100" />
              ) : isSubscriptionActive ? (
                <span className="bg-[#eefcf5] text-[#16a34a] text-[10px] font-bold px-3 py-1 rounded-full border border-green-100 uppercase tracking-wider">
                  Active
                </span>
              ) : (
                <span className="bg-[#fff1f1] text-[#ff5a5a] text-[10px] font-bold px-3 py-1 rounded-full border border-red-50 uppercase tracking-wider">
                  Inactive
                </span>
              )}
            </div>

            <div
              className={`p-1 rounded-xl border ${
                isSubscriptionActive
                  ? "bg-[#eefcf5] border-green-100"
                  : "bg-[#fff5f5] border-red-100"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenSubInfo(true)}
                disabled={showSubscriptionSkeleton}
                className={`p-2 rounded-xl border transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
                  isSubscriptionActive
                    ? "bg-[#eefcf5] border-green-100 hover:bg-[#e7fbf2]"
                    : "bg-[#fff5f5] border-red-100 hover:bg-[#ffefef]"
                }`}
                aria-label="View subscription info"
              >
                <Calendar
                  className={`w-5 h-5 ${
                    isSubscriptionActive ? "text-[#22c55e]" : "text-[#ff5a5a]"
                  }`}
                />
              </button>
            </div>
          </div>

          {openSubInfo && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              onMouseDown={() => setOpenSubInfo(false)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Panel */}
              <div
                className="relative w-full max-w-md rounded-2xl bg-white border border-gray-100 shadow-xl p-6"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-gray-900 font-bold text-base">
                      Subscription Details
                    </h4>
                    <p className="text-xs text-gray-400 font-medium mt-1">
                      Plan info based on your current subscription plan.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenSubInfo(false)}
                    className="rounded-xl p-2 hover:bg-gray-50 active:scale-95 transition"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Status
                    </span>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isSubscriptionActive
                          ? "text-[#16a34a]"
                          : "text-[#ff5a5a]"
                      }`}
                    >
                      {isSubscriptionActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Plan
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {plan?.title ?? "—"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Duration
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {durationLabel}
                    </span>
                  </div>

                  {typeof plan?.price !== "undefined" && (
                    <div className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Price
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {plan.price}
                      </span>
                    </div>
                  )}

                  {Array.isArray(plan?.features) &&
                    plan.features.length > 0 && (
                      <div className="rounded-xl border border-gray-100 px-4 py-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                          Features
                        </p>
                        <ul className="space-y-1">
                          {plan.features.slice(0, 6).map((f: string) => (
                            <li key={f} className="text-[12px] text-gray-600">
                              • {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpenSubInfo(false)}
                    className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 border border-gray-100"
                  >
                    Close
                  </button>

                  <Link
                    href="/pricing"
                    className="rounded-xl px-4 py-2 text-sm font-semibold bg-primary text-white shadow-sm shadow-blue-900/20"
                    onClick={() => setOpenSubInfo(false)}
                  >
                    View Plans
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Body */}
          {showSubscriptionSkeleton ? (
            <div className="space-y-3">
              <div className="h-10 rounded-xl bg-gray-100" />
              <div className="h-24 rounded-xl bg-gray-100" />
              <div className="h-12 w-40 rounded-xl bg-gray-100 mt-auto" />
            </div>
          ) : isSubscriptionActive ? (
            <>
              <div className="rounded-xl p-4 mb-6 border border-green-100 bg-[#f0fdf4]">
                <p className="text-gray-700 text-[13px]">
                  You are on{" "}
                  <span className="font-bold text-gray-900">
                    {plan?.title ?? "your plan"}
                  </span>
                  .
                </p>

                {planId && isPlanError ? (
                  <p className="mt-1 text-[12px] text-gray-500">
                    Plan details couldn’t be loaded right now.
                  </p>
                ) : (
                  <>
                    {typeof plan?.price !== "undefined" && (
                      <p className="mt-2 text-[12px] text-gray-600">
                        Price:{" "}
                        <span className="font-semibold text-gray-900">
                          {plan.price}
                        </span>{" "}
                        / {plan?.duration_value} {plan?.duration_type}
                      </p>
                    )}

                    {Array.isArray(plan?.features) &&
                      plan.features.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {plan.features.map((f: string) => (
                            <li key={f} className="text-[12px] text-gray-600">
                              • {f}
                            </li>
                          ))}
                        </ul>
                      )}
                  </>
                )}
              </div>

              <Link href="/pricing" className="mt-auto w-fit">
                <button className="bg-primary text-white rounded-xl py-4 px-6 font-semibold flex items-center justify-center gap-2 transition-all group text-sm shadow-sm shadow-blue-900/20 cursor-pointer">
                  Manage Plan
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Link>
            </>
          ) : (
            <>
              <div className="bg-[#fff5f5] rounded-xl p-4 mb-8 border border-red-50">
                <p className="text-gray-600 text-[13px]">
                  You don&apos;t have an active subscription. Choose a plan to
                  get started.
                </p>
              </div>

              <Link href="/pricing" className="mt-auto w-fit">
                <button className="bg-primary text-white rounded-xl py-4 px-6 font-semibold flex items-center justify-center gap-2 transition-all group text-sm shadow-sm shadow-blue-900/20 cursor-pointer">
                  View Plans
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-800 font-semibold mb-6">Quick Stats</h3>
          <div className="space-y-4">
            {[
              {
                label: "Watchlist Items",
                value: 12,
                icon: Star,
                color: "text-[#f59e0b]",
                bg: "bg-[#fffbeb]",
                border: "border-yellow-100",
              },
              {
                label: "Searches This Month",
                value: 45,
                icon: Search,
                color: "text-[#3b82f6]",
                bg: "bg-[#eff6ff]",
                border: "border-blue-100",
              },
              {
                label: "Recommendations",
                value: 8,
                icon: TrendingUp,
                color: "text-[#10b981]",
                bg: "bg-[#f0fdf4]",
                border: "border-green-100",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`${stat.bg} ${stat.border} border p-2 rounded-xl`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-gray-500 font-medium text-sm">
                    {stat.label}
                  </span>
                </div>
                <span className="text-gray-800 font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <section>
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h3 className="text-gray-900 font-bold text-lg">Quick Links</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Search Stock",
              href: "/user/searchStock",
              icon: Search,
              iconBg: "bg-blue-400/30",
              iconColor: "text-white",
            },
            {
              title: "Watchlist",
              href: "/user/watchList",
              icon: Star,
              iconBg: "bg-[#f59e0b]",
              iconColor: "text-white",
            },
            {
              title: "AI Finance Tools",
              href: "/user/expensiveManager",
              icon: Zap,
              iconBg: "bg-[#9333ea]",
              iconColor: "text-white",
            },
            {
              title: "Recommendations",
              href: "/user/recommendations",
              icon: TrendingUp,
              iconBg: "bg-[#10b981]",
              iconColor: "text-white",
            },
          ].map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="
          group relative block rounded-2xl border border-gray-100 bg-white px-3 py-2
          shadow-sm transition-all duration-200
          hover:-translate-y-0.5 hover:bg-primary hover:shadow-md
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2
          overflow-hidden
        "
            >
              {/* subtle hover sheen */}
              <div
                className="
            pointer-events-none absolute inset-0 opacity-0
            bg-[radial-gradient(600px_140px_at_0%_0%,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_60%)]
            transition-opacity duration-200 group-hover:opacity-100
          "
              />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className="
                rounded-xl p-3 ring-1 ring-black/5
                transition-transform duration-200 group-hover:scale-[1.03]
              "
                  >
                    <div className={`${link.iconBg} rounded-xl p-3`}>
                      <link.icon className={`h-5 w-5 ${link.iconColor}`} />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <p
                      className="
                  truncate text-sm font-semibold text-gray-800
                  transition-colors duration-200 group-hover:text-white
                "
                    >
                      {link.title}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  className="
              h-4 w-4 text-gray-500 opacity-60
              transition-all duration-200
              group-hover:text-white group-hover:opacity-90
              group-hover:translate-x-0.5 group-hover:-translate-y-0.5
            "
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Activity & Performers Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-800 font-semibold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
              {
                label: "Searched:",
                val: "AAPL",
                time: "2 hours ago",
                icon: Search,
                bg: "bg-blue-50",
                color: "text-blue-500",
              },
              {
                label: "Added to watchlist:",
                val: "TSLA",
                time: "5 hours ago",
                icon: Star,
                bg: "bg-yellow-50",
                color: "text-yellow-500",
              },
              {
                label: "Viewed recommendation:",
                val: "MSFT",
                time: "1 day ago",
                icon: TrendingUp,
                bg: "bg-green-50",
                color: "text-green-500",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`${item.bg} p-3 rounded-2xl`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-medium">
                    {item.label}{" "}
                    <span className="text-[#10b981] font-bold">{item.val}</span>
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-800 font-semibold mb-6">
            Top Halal Performers
          </h3>
          <div className="space-y-6">
            {[
              {
                sym: "NVDA",
                name: "NVIDIA",
                price: "$612.50",
                chg: "+8.4%",
                char: "N",
                bg: "bg-[#060661]",
              },
              {
                sym: "MSFT",
                name: "Microsoft",
                price: "$398.75",
                chg: "+3.2%",
                char: "M",
                bg: "bg-primary",
              },
              {
                sym: "AAPL",
                name: "Apple",
                price: "$178.32",
                chg: "+2.1%",
                char: "A",
                bg: "bg-[#00004d]",
              },
            ].map((stock, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`${stock.bg} w-10 h-10 flex items-center justify-center rounded-xl text-white font-bold text-sm shadow-sm`}
                  >
                    {stock.char}
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-sm leading-none mb-1">
                      {stock.sym}
                    </p>
                    <p className="text-gray-400 text-[10px] font-medium">
                      {stock.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-bold text-sm leading-none mb-1">
                    {stock.price}
                  </p>
                  <p className="text-blue-600 text-[10px] font-bold">
                    {stock.chg}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
