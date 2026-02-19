"use client";

import { useState } from "react";
import {
  X,
  LogOut,
  Users,
  CreditCard,
  MessageSquare,
  BarChart3,
  Boxes,
  User,
  Menu,
  MessageCircle,

} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MenuItem } from "@/types";
import { useDispatch } from "react-redux";
import { logout } from "@/Redux/features/auth/authSlice";
import Image from "next/image";

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { icon: BarChart3, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },

    // { icon: TrendingUp, label: "Stocks", href: "/admin/stocks" },
    // { icon: Package, label: "Commodities", href: "/admin/commodities" },
    // { icon: Bitcoin, label: "Crypto", href: "/admin/crypto" },
    // { icon: Newspaper, label: "News", href: "/admin/news" },
    // { icon: Shield, label: "Sharia Compliance", href: "/admin/compliance" },
    // { icon: Bell, label: "Notifications", href: "/admin/notifications" },
    {
      icon: MessageSquare,
      label: "Communications",
      href: "/admin/communications",
    },
    {
      icon: MessageCircle,
      label: "Contact",
      href: "/admin/contact",
    },
   
    // { icon: BarChart3, label: "Reports", href: "/admin/reports" },
    { icon: Boxes, label: "About", href: "/admin/adminAbout" },
    // { icon: Settings, label: "Settings", href: "/admin/settings" },
    { icon: User, label: "Profile", href: "/admin/profile" },
  ];

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleOverlayClick = (): void => {
    setIsOpen(false);
  };

  // handel log out
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // 1. Clear redux auth state
    dispatch(logout());

    // 2. Optional: clear any localStorage/sessionStorage if you store token there
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    // 3. Redirect to login page
    router.replace("/auth/login");
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
        className={`fixed top-0 left-0 h-full w-[235px] bg-primary text-white z-50 transform transition-transform duration-300 ease-in-out ${
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
                width={24}
                height={24}
                priority
              />
              <h1 className="font-semibold text-xl tracking-tight">THARI</h1>
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item: MenuItem, index: number) => {
              const Icon = item.icon;
              const isActive: boolean = pathname === item.href;
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
          </nav>

          {/* Logout */}
          <div className="px-3 py-6 border-t border-white/10">
            <button
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
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

export default AdminSidebar;
