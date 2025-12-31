"use client";

import React, { useState } from "react";
import {
    LayoutDashboard,
    Users,
    Crown,
    TrendingUp,
    Download,
    ChartColumnDecreasing
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

// Static Data for Overview
const userGrowthData = [
    { name: "Jan", users: 280 },
    { name: "Feb", users: 275 },
    { name: "Mar", users: 310 },
    { name: "Apr", users: 330 },
    { name: "May", users: 360 },
    { name: "Jun", users: 380 },
];

const subscriptionOverviewData = [
    { name: "Monthly", value: 450, color: "#3B82F6" },
    { name: "6 Months", value: 280, color: "#8B5CF6" },
    { name: "12 Months", value: 370, color: "#000080" },
];

// Static Data for User Activity (image_7625cc.png)
const userActivityData = [
    { name: "Jan", active: 400, inactive: 240 },
    { name: "Feb", active: 395, inactive: 220 },
    { name: "Mar", active: 450, inactive: 230 },
    { name: "Apr", active: 470, inactive: 200 },
    { name: "May", active: 520, inactive: 215 },
    { name: "Jun", active: 550, inactive: 250 },
];

// Static Data for Subscription Statistics (image_768366.png)
const subscriptionStatsData = [
    { name: "Monthly", value: 450, color: "#3B82F6" },
    { name: "6 Months", value: 280, color: "#8B5CF6" },
    { name: "12 Months", value: 370, color: "#000080" },
];

// Static Data for Stock Popularity (image_7687e7.png)
const stockPopularityData = [
    { name: "AAPL", tracks: 485 },
    { name: "MSFT", tracks: 410 },
    { name: "TSLA", tracks: 350 },
    { name: "AMZN", tracks: 315 },
    { name: "GOOGL", tracks: 270 },
];

export default function Reports() {
    const [activeTab, setActiveTab] = useState("Overview");

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans w-full">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
                <p className="text-gray-500">View detailed reports and performance data.</p>
            </div>

            {/* Select Report Type Section */}
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Report Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { label: "Overview", icon: <ChartColumnDecreasing size={20} /> },
                        { label: "User Activity", icon: <Users className="text-green-500" size={20} /> },
                        { label: "Subscriptions", icon: <Crown className="text-purple-500" size={20} /> },
                        { label: "Stock Popularity", icon: <TrendingUp className="text-green-500" size={20} /> },
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveTab(item.label)}
                            className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${activeTab === item.label
                                ? "border-blue-700 bg-white text-blue-700 shadow-sm"
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                }`}
                        >
                            <span className="mb-2">{item.icon}</span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Export Options */}
            <div className="flex justify-end gap-3 mb-6">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-semibold hover:bg-blue-950 transition-colors">
                    <Download size={16} /> Export CSV
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                    <Download size={16} /> Export PDF
                </button>
            </div>

            {/* Content Logic based on Active Tab */}
            {activeTab === "Overview" ? (
                <>
                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                        {[
                            { label: "Total Users", value: "12,543", trend: "+12.5% vs last month" },
                            { label: "Elite Users", value: "2,847", trend: "+8.2% vs last month" },
                            { label: "Active Subscriptions", value: "3,124", trend: "+5.4% vs last month" },
                            { label: "Total Revenue", value: "$45,892", trend: "+15.3% vs last month" },
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                                <p className="text-sm text-blue-700 font-medium">{stat.trend}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-8">User Growth</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={userGrowthData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                        <Tooltip cursor={{ fill: 'transparent' }} />
                                        <Bar dataKey="users" fill="#000080" radius={[4, 4, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-8">Subscription Distribution</h3>
                            <div className="h-[300px] w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={subscriptionOverviewData} innerRadius={0} outerRadius={100} dataKey="value" stroke="#fff" strokeWidth={2} label={({ value }) => `${value}`}>
                                            {subscriptionOverviewData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </>
            ) : activeTab === "User Activity" ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-8">User Activity Report</h3>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={userActivityData} barGap={8}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: '#F9FAFB' }} />
                                <Legend verticalAlign="bottom" height={36} iconType="rect" />
                                <Bar name="Active Users" dataKey="active" fill="#000080" radius={[2, 2, 0, 0]} barSize={35} />
                                <Bar name="Inactive Users" dataKey="inactive" fill="#94A3B8" radius={[2, 2, 0, 0]} barSize={35} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            ) : activeTab === "Subscriptions" ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-8">Subscription Statistics</h3>
                    <div className="h-[450px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={subscriptionStatsData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={160}
                                    dataKey="value"
                                    stroke="#fff"
                                    strokeWidth={2}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    labelLine={true}
                                >
                                    {subscriptionStatsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            ) : activeTab === "Stock Popularity" ? (
                /* Stock Popularity Section (Matches image_7687e7.png) */
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-8">Tracked Stock Popularity</h3>
                    <div className="h-[450px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={stockPopularityData}
                                layout="vertical"
                                margin={{ left: 30, right: 30 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} domain={[0, 600]} ticks={[0, 150, 300, 450, 600]} />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 500 }} />
                                <Tooltip cursor={{ fill: '#F9FAFB' }} />
                                <Legend verticalAlign="bottom" height={36} iconType="rect" />
                                <Bar name="Number of Tracks" dataKey="tracks" fill="#000080" barSize={45} radius={[0, 2, 2, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-20 rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center">
                    <p className="text-gray-400 font-medium">{activeTab} details coming soon...</p>
                </div>
            )}
        </div>
    );
}