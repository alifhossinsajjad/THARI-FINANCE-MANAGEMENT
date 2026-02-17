import {
  Calendar,
  ArrowUpRight,
  Star,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function UserDashboardPage() {
  return (
    <div className="mx-auto space-y-10">
      {/* Header Section */}
      <section>
        <h1 className="text-3xl font-bold text-zinc-800 mb-2">Welcome back!</h1>
        <h2 className="text-xl font-medium  mb-2 text-neutral-500">
          Hi, MD! <span className="">👋</span>
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
              <span className="bg-[#fff1f1] text-[#ff5a5a] text-[10px] font-bold px-3 py-1 rounded-full border border-red-50 uppercase tracking-wider">
                Inactive
              </span>
            </div>
            <div className="bg-[#eefcf5] p-2.5 rounded-xl border border-green-100">
              <Calendar className="w-5 h-5 text-[#22c55e]" />
            </div>
          </div>
          <div className="bg-[#fff5f5] rounded-xl p-4 mb-8 border border-red-50">
            <p className="text-gray-600 text-[13px]">
              You dont have an active subscription. Choose a plan to get
              started.
            </p>
          </div>
          <button className="mt-auto bg-primary  text-white rounded-xl py-4 px-6 font-semibold flex items-center justify-center gap-2 transition-all group w-fit text-sm shadow-sm shadow-blue-900/20 cursor-pointer">
            View Plans
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
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
        <h3 className="text-gray-900 font-bold text-lg mb-6">Quick Links</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Search Stock",
              href: "/user/searchStock",
              icon: Search,
              bg: "bg-primary",
              text: "text-white",
              iconBg: "bg-blue-400/30",
              iconColor: "text-white",
            },
            {
              title: "Watchlist",
              href: "/user/watchList",
              icon: Star,
              bg: "bg-white",
              text: "text-gray-800",
              iconBg: "bg-[#f59e0b]",
              iconColor: "text-white",
            },
            {
              title: "AI Finance Tools",
              href: "/user/expensiveManager",
              icon: Zap,
              bg: "bg-white",
              text: "text-gray-800",
              iconBg: "bg-[#9333ea]",
              iconColor: "text-white",
            },
            {
              title: "Recommendations",
              href: "/user/recommendations",
              icon: TrendingUp,
              bg: "bg-white",
              text: "text-gray-800",
              iconBg: "bg-[#10b981]",
              iconColor: "text-white",
            },
          ].map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`group block p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md ${link.bg}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`${link.iconBg} p-3 rounded-xl`}>
                    <link.icon className={`w-5 h-5 ${link.iconColor}`} />
                  </div>
                  <span className={`font-semibold text-sm ${link.text}`}>
                    {link.title}
                  </span>
                </div>

                <ArrowUpRight
                  className={`w-4 h-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${link.text}`}
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
