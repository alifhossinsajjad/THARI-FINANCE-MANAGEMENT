"use client";

import React from "react";
import {
  Users,
  CreditCard,
  MessageSquare,
  TrendingUp,
  Package,
  Bitcoin,
  Newspaper,
  Bell,
} from "lucide-react";
import type { StatCard, QuickLink, Activity } from "@/types";
import { useGetShowAllTotalActiveUserMetaDataQuery } from "@/Redux/features/AdminDashboard/userDashboardMetaData/userDashboardMetaDataApi";

export default function DashboardPage(): React.JSX.Element {
  const { data } = useGetShowAllTotalActiveUserMetaDataQuery({});
  console.log("iam the meta data for admin dashboard", data);

  const stats: StatCard[] = [
    {
      label: "Total Users",
      value: "12,543",
      change: "+12.5%",
      isPositive: true,
      iconBg: "#2B7FFF",
      icon: Users,
    },
    {
      label: "Elite Users",
      value: "2,847",
      change: "+8.2%",
      isPositive: true,
      iconBg: "#AD46FF",
      icon: Users,
    },
    {
      label: "Active Subscriptions",
      value: "3,124",
      change: "+5.4%",
      isPositive: true,
      iconBg: "#00C950",
      icon: CreditCard,
    },
    {
      label: "New Messages",
      value: "147",
      change: "-3.1%",
      isPositive: false,
      iconBg: "#F54900",
      icon: MessageSquare,
    },
  ];

  const quickLinks: QuickLink[] = [
    { label: "Manage Users", icon: Users, iconBg: "#2B7FFF" },
    { label: "Manage Stocks", icon: TrendingUp, iconBg: "#00C950" },
    { label: "Manage Crypto", icon: Bitcoin, iconBg: "#F0B100" },
    { label: "Manage Commodities", icon: Package, iconBg: "#AD46FF" },
    { label: "Publish News", icon: Newspaper, iconBg: "#615FFF" },
    { label: "Send Notifications", icon: Bell, iconBg: "#FB2C36" },
  ];

  const activities: Activity[] = [
    {
      label: "New Elite user registered",
      time: "5 minutes ago",
      color: "#00C950",
    },
    {
      label: "Stock marked as opportunity",
      time: "12 minutes ago",
      color: "#2B7FFF",
    },
    {
      label: "Subscription approved",
      time: "23 minutes ago",
      color: "#00C950",
    },
    { label: "New message received", time: "1 hour ago", color: "#F0B100" },
    { label: "News article published", time: "2 hours ago", color: "#2B7FFF" },
  ];

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat: StatCard, index: number) => {
          const Icon = stat.icon;
          return (
            <div
              key={`stat-${index}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">
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
                  {stat.value}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span
                    className={
                      stat.isPositive ? "text-green-600" : "text-red-600"
                    }
                  >
                    {stat.isPositive ? "↗" : "↘"} {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link: QuickLink, index: number) => {
            const Icon = link.icon;
            return (
              <button
                key={`link-${index}`}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left flex items-center gap-4"
                type="button"
                onClick={() => console.log(`Clicked: ${link.label}`)}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: link.iconBg }}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-base font-semibold text-gray-900">
                  {link.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">
              Latest Updates
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {activities.map((activity: Activity, index: number) => (
              <div
                key={`activity-${index}`}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: activity.color }}
                  />
                  <span className="text-sm text-gray-900">
                    {activity.label}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
