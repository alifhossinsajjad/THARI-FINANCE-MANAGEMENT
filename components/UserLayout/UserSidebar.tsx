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
  Briefcase,
  ChevronDown,
  ArrowDownLeft,
  ArrowUpRight,
  Landmark,
  MessageSquare,
  LineChart,
  CheckCircle,
  User,
  Brain,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MenuItem } from "@/types";
import { useAppDispatch } from "@/Redux/hooks";
import { logout } from "@/Redux/features/auth/authSlice";
import { toast } from "sonner";
import Image from "next/image";
import { usePremiumStatus } from "@/hooks/usePremiumStatus";
import { FeatureKey } from "@/lib/subscription-plans";
import { Lock } from "lucide-react";

/** ===== route helpers (fix "Home always active") ===== */
const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

const isActiveRoute = (pathname: string, href?: string) => {
  if (!href) return false;

  const p = normalize(pathname);
  const h = normalize(href);

  // Home should be exact only
  if (h === "/user") return p === "/user";

  // Others: exact or nested
  return p === h || p.startsWith(h + "/");
};

const UserSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { hasFeature } = usePremiumStatus();

  const expenseBase = "/user/expensiveManager";
  const isExpenseRoute = isActiveRoute(pathname, expenseBase);

  // keep dropdown open when inside expense routes
  const [expenseOpen, setExpenseOpen] = useState<boolean>(isExpenseRoute);
  const [prevIsExpenseRoute, setPrevIsExpenseRoute] = useState(isExpenseRoute);

  if (isExpenseRoute !== prevIsExpenseRoute) {
    setPrevIsExpenseRoute(isExpenseRoute);
    if (isExpenseRoute) {
      setExpenseOpen(true);
    }
  }

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
    {
      icon: Globe,
      label: "Search Stock",
      href: "/user/searchStock",
      feature: "Specific Stock Shariah Report" as FeatureKey,
    },
    {
      icon: Brain,
      label: "Ai Analysis",
      href: "/user/ai-analysis",
      feature: "US Market Shariah Reports" as FeatureKey,
    },
    {
      icon: LineChart,
      label: "Rating US Market",
      href: "/user/ratingUsMarket",
      feature: "US Market Shariah Reports" as FeatureKey,
    },
    {
      icon: CheckCircle,
      label: "US Compliance Stocks",
      href: "/user/usComplianceStock",
      feature: "US Market Shariah Reports" as FeatureKey,
    },
    {
      icon: Briefcase,
      label: "ETF Reports",
      href: "/user/etf-reports",
      feature: "US Market Shariah Reports" as FeatureKey,
    },
    {
      icon: TrendingUp,
      label: "Financial Management",
      href: "/user/expensiveManager",
      feature: "Financial Management" as FeatureKey,
    },
    { icon: CreditCard, label: "Watch List", href: "/user/watchList" },
    {
      icon: Package,
      label: "Recommendation",
      href: "/user/recomendetion",
      feature: "Wealth Dashboard" as FeatureKey,
    },
    {
      icon: MessageSquare,
      label: "Communications",
      href: "/user/communication",
    },
    { icon: User, label: "Profile Settings", href: "/user/settings" },
  ];

  const handleToggle = (): void => setIsOpen((p) => !p);

  const handleExpenseToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent Link navigation
    e.stopPropagation();
    setExpenseOpen((p) => !p);
  };

  const handleClose = (): void => setIsOpen(false);
  const handleOverlayClick = (): void => setIsOpen(false);

  const handleLogout = (): void => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
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
        type="button"
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
          <div className="mx-auto py-4">
            <Link href="/" className="flex items-center gap-2 pr-6">
              <Image
                src="/images/FooterLogo.png"
                alt="THARI Logo"
                width={40}
                height={40}
                priority
              />
              <h1 className="font-semibold text-2xl tracking-tight">THARI</h1>
              <div className="text-white text-sm font-bold ml-1 mt-6">FINANCE</div>
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item: MenuItem, index: number) => {
              // Expense manager special group
              if (item.href === expenseBase) {
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
                          className={`transition-transform ${
                            expenseOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </Link>

                    {/* Children */}
                    {expenseOpen && (
                      <div className="ml-3 pl-3 border-l border-white/10 space-y-1">
                        {expenseChildren.map((child) => {
                          const ChildIcon = child.icon;
                          const childActive = isActiveRoute(
                            pathname,
                            child.href,
                          );

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

              const Icon = item.icon;
              const isActive = isActiveRoute(pathname, item.href);
              const hasAccess = item.feature ? hasFeature(item.feature as FeatureKey) : true;

              return (
                <Link
                  key={`${item.href}-${index}`}
                  href={hasAccess ? item.href : "/pricing"}
                  onClick={handleClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  } ${!hasAccess ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </div>
                  {!hasAccess && <Lock size={14} className="text-white/40" />}
                </Link>
              );
            })}
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
