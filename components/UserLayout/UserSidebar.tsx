"use client";

import { useState } from "react";
import {
  X,
  LogOut,
  CreditCard,
  TrendingUp,
  Package,
  Menu,
  LayoutDashboard,
  Globe,
  Settings,
  Briefcase,
  Languages,
  ChevronDown,
  ArrowDownLeft,
  ArrowUpRight,
  Landmark,
  CheckCircle,
  LineChart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MenuItem } from "@/types";
import { useAppDispatch } from "@/Redux/hooks";
import { logout } from "@/Redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Image from "next/image";

const UserSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const expenseBase = "/user/expensiveManager";
  const isExpenseRoute =
    pathname === expenseBase || pathname.startsWith(expenseBase + "/");

  const [expenseOpen, setExpenseOpen] = useState<boolean>(isExpenseRoute);

  const expenseChildren: MenuItem[] = [
    {
      icon: ArrowDownLeft,
      label: "Income",
      href: "/user/expensiveManager/income",
    },
    {
      icon: ArrowUpRight,
      label: "Expense",
      href: "/user/expensiveManager/expense",
    },
    {
      icon: Landmark,
      label: "Loan",
      href: "/user/expensiveManager/loan",
    },
  ];

  const menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: "Home", href: "/user" },
    { icon: Globe, label: "Search Stock", href: "/user/searchStock" },
    {
      icon: LineChart,
      label: "Rating US Market",
      href: "/user/ratingUsMarket",
    },
    {
      icon: CheckCircle,
      label: "US Compliance Stock",
      href: "/user/usComplianceStock",
    },

    { icon: Briefcase, label: "ETF Reports", href: "/user/etf-reports" },
    {
      icon: Languages,
      label: "International Stocks",
      href: "/user/international-stocks",
    },

    { icon: CreditCard, label: "Watch List", href: "/user/watchList" },

    {
      icon: TrendingUp,
      label: "Financial Manager",
      href: "/user/expensiveManager",
    },
    {
      icon: Package,
      label: "Our Analysis",
      href: "/user/ourAnalysis",
    },
    // { icon: Package, label: "Our Analysis", href: "/user/recommendations" },
    // { icon: Newspaper, label: "News", href: "/user/news" },
    { icon: Settings, label: "Settings", href: "/user/settings" },
  ];

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };
  const handleExpenseToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent Link navigation
    e.stopPropagation();
    setExpenseOpen((p) => !p);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleOverlayClick = (): void => {
    setIsOpen(false);
  };

  const handleLogout = (): void => {
    dispatch(logout());
    handleClose();
    toast.success("Logged out successfully");
    router.push("/auth/login");
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={handleToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X size={24} className="text-gray-900" />
        ) : (
          <Menu size={24} className="text-gray-900" />
        )}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={handleOverlayClick}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-58.75 bg-primary text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className=" mx-auto py-4">
            <Link href="/" className="flex items-center gap-2 pr-6">
              <Image
                src="/images/FooterLogo.png"
                alt="THARI Logo"
                width={40}
                height={40}
                priority
              />
              <h1 className="font-semibold text-2xl tracking-tight">THARI</h1>
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item: MenuItem, index: number) => {
              // Expense manager special group
              if (item.href === "/user/expensiveManager") {
                const Icon = item.icon;

                return (
                  <div key={`${item.href}-${index}`} className="space-y-1">
                    {/* Parent row: label navigates, chevron toggles */}
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isExpenseRoute
                          ? "bg-white/10 text-white"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </span>

                      <button
                        type="button"
                        onClick={handleExpenseToggle}
                        aria-label={
                          expenseOpen
                            ? "Collapse Expense manager"
                            : "Expand Expense manager"
                        }
                        className="p-1 rounded-md hover:bg-white/10"
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${expenseOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </Link>

                    {/* Children */}
                    {expenseOpen && (
                      <div className="ml-3 pl-3 border-l border-white/10 space-y-1">
                        {expenseChildren.map((child) => {
                          const ChildIcon = child.icon;
                          const childActive =
                            pathname === child.href ||
                            pathname.startsWith(child.href + "/");

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={handleClose}
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                                childActive
                                  ? "bg-white/10 text-white"
                                  : "text-white/70 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              <ChildIcon size={18} />
                              <span>{child.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // Default items
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={`${item.href}-${index}`}
                  href={item.href}
                  onClick={handleClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* <div className="mt-12 space-y-3">
              <div className="flex justify-between items-center">
                <h1 className="text-xl text-white/70">AAPL</h1>
                <button className="flex gap-2 items-center rounded-md px-2 py-1 bg-[#1010A2]">
                  <FaArrowTrendUp />
                  <p>+1.61%</p>
                </button>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xl text-white/70">MSFT</h1>
                <button className="flex gap-2 items-center rounded-md px-2 py-1 bg-[#1010A2]">
                  <FaArrowTrendUp />
                  <p>+3.57%</p>
                </button>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xl text-white/70">TSLA</h1>
                <button className="flex gap-2 items-center rounded-md px-2 py-1 bg-[#1010A2]">
                  <FaArrowTrendUp />
                  <p>+5.28%</p>
                </button>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xl text-white/70">NVDA</h1>
                <button className="flex gap-2 items-center rounded-md px-2 py-1 bg-[#1010A2]">
                  <FaArrowTrendUp />
                  <p> +17.79%</p>
                </button>
              </div>
            </div> */}
          </nav>

          {/* Logout */}
          <div className="px-3 py-6 border-t border-white/10">
            <button
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
              onClick={handleLogout}
              type="button"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 lg:hidden text-white/70 hover:text-white"
          aria-label="Close sidebar"
          type="button"
        >
          <X size={24} />
        </button>
      </aside>
    </>
  );
};

export default UserSidebar;
