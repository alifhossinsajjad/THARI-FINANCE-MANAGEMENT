"use client";

import React from "react";
import { Users, CreditCard } from "lucide-react";
import type { StatCard } from "@/types";
import { useGetShowAllTotalActiveUserMetaDataQuery } from "@/Redux/features/AdminDashboard/userDashboardMetaData/userDashboardMetaDataApi";
import AdminDashboardChart from "@/components/admin/AdminDashboardChart/AdminDashboardChart";
import AdminDashboardPlanRevenueTable from "@/components/admin/AdminDashboardChart/AdminDashboardPlanRevenueTable";
// import { useGetShowAllTotalActiveUserMetaDataQuery } from "@/Redux/features/AdminDashboard/userMetaData/userMetaDataApi";

export default function DashboardPage(): React.JSX.Element {
  const { data, isLoading, isFetching } =
    useGetShowAllTotalActiveUserMetaDataQuery({});
  console.log("iam the meta data for admin dashboard", data);

  const stats = [
    {
      label: "Total Users",
      value: data?.data?.users?.total_users,
      change: data?.data?.users?.active_users,
      isPositive: true,
      iconBg: "#2B7FFF",
      icon: Users,
    },
    {
      label: "Active Users",
      value: data?.data?.users?.active_users,
      change: "+8.2%",
      isPositive: true,
      iconBg: "#AD46FF",
      icon: Users,
    },
    {
      label: "Inactive Users",
      value: data?.data?.users?.inactive_users,
      change: "+8.2%",
      isPositive: true,
      iconBg: "#00008b",
      icon: Users,
    },
    {
      label: "Total Plans",
      value: data?.data?.plans?.total_plans,
      change: "+5.4%",
      isPositive: true,
      iconBg: "#00C950",
      icon: CreditCard,
    },
    {
      label: "Active Plans",
      value: data?.data?.plans?.active_plans,
      change: "-3.1%",
      isPositive: false,
      iconBg: "#F54900",
      icon: CreditCard,
    },
    {
      label: " popular plans",
      value: data?.data?.plans?.popular_plans,
      change: "-3.1%",
      isPositive: false,
      iconBg: "#AD46FF",
      icon: CreditCard,
    },
  ];

  const StatCardSkeleton = () => {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="w-10 h-10 rounded-xl bg-gray-200" />
        </div>

        <div className="space-y-2">
          <div className="h-8 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-100 rounded" />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back, here&apos;s what&apos;s happening today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {isLoading || isFetching
          ? Array.from({ length: 4 }).map((_, index) => (
              <StatCardSkeleton key={`skeleton-${index}`} />
            ))
          : stats?.map((stat: StatCard, index: number) => {
              const Icon = stat.icon;
              return (
                <div
                  key={`stat-${index}`}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600 uppercase">
                      {stat.label}
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: stat.iconBg }}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-gray-900">
                      0{stat.value ?? 0}
                    </div>
                    <div className="flex items-center gap-1 text-sm"></div>
                  </div>
                </div>
              );
            })}
      </div>

      {/* Revenue Chart */}
      <div>
        <AdminDashboardChart
          totalRevenue={data?.data?.revenue?.total_revenue ?? 0}
          monthlyRevenue={data?.data?.revenue?.monthly_revenue ?? 0}
        />
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Plan Revenue</h2>
        <AdminDashboardPlanRevenueTable />
      </div>
    </div>
  );
}
