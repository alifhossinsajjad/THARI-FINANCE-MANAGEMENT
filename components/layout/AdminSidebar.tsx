"use client";

import { useEffect, useMemo, useState } from "react";
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
  LucideIcon,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  Landmark,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/Redux/features/auth/authSlice";
import Image from "next/image";

export type MenuItem = {
  label: string;
  href?: string; // ✅ optional now (parents can be toggle-only)
  icon: LucideIcon;
  children?: MenuItem[];
};

const isRouteActive = (pathname: string, href?: string) => {
  if (!href) return false;
  return pathname === href || pathname.startsWith(href + "/");
};

const isAnyChildActive = (pathname: string, children?: MenuItem[]) => {
  if (!children?.length) return false;
  return children.some((c) => isRouteActive(pathname, c.href));
};

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { icon: BarChart3, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },

    // ✅ parent has NO href (toggle only)
    {
      icon: TrendingUp,
      label: "ETFSY",
      children: [
        { icon: ArrowDownLeft, label: "Stock", href: "/admin/etfsy/stock" },
        {
          icon: ArrowUpRight,
          label: "Rating US Market",
          href: "/admin/etfsy/ratingUsMarket",
        },
        {
          icon: Landmark,
          label: "Compliant US Market",
          href: "/admin/etfsy/compliantUsMarket",
        },
        {
          icon: Landmark,
          label: "ETFSY Report",
          href: "/admin/etfsy/etfsyReport",
        },
      ],
    },

    {
      icon: MessageSquare,
      label: "Communications",
      href: "/admin/communications",
    },
    { icon: MessageCircle, label: "Contact", href: "/admin/contact" },
    { icon: Boxes, label: "About", href: "/admin/adminAbout" },
    { icon: User, label: "Profile", href: "/admin/profile" },
  ];

  // ✅ stable key for groups even without href
  const groupKey = (item: MenuItem, index: number) =>
    item.href ?? `group-${index}`;

  // Build initial open state for groups: open if any child is active
  const initialOpenGroups = useMemo(() => {
    const entries = menuItems
      .map((i, idx) => {
        if (!i.children?.length) return null;
        const key = groupKey(i, idx);
        const open = isAnyChildActive(pathname, i.children);
        return [key, open] as const;
      })
      .filter(Boolean) as Array<readonly [string, boolean]>;

    return Object.fromEntries(entries) as Record<string, boolean>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initial only

  const [openGroups, setOpenGroups] =
    useState<Record<string, boolean>>(initialOpenGroups);

  // Keep the matching group open when route changes
  useEffect(() => {
    setOpenGroups((prev) => {
      const next = { ...prev };
      menuItems.forEach((item, idx) => {
        if (!item.children?.length) return;
        if (isAnyChildActive(pathname, item.children)) {
          next[groupKey(item, idx)] = true;
        }
      });
      return next;
    });
  }, [pathname]);

  const handleToggle = (): void => setIsOpen((p) => !p);
  const handleClose = (): void => setIsOpen(false);
  const handleOverlayClick = (): void => setIsOpen(false);

  const toggleGroup = (key: string) =>
    setOpenGroups((p) => ({ ...p, [key]: !p[key] }));

  // logout
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    router.replace("/auth/login");
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
                width={24}
                height={24}
                priority
              />
              <h1 className="font-semibold text-xl tracking-tight">THARI</h1>
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const hasChildren = !!item.children?.length;

              // leaf item (normal link)
              if (!hasChildren) {
                const active = isRouteActive(pathname, item.href);
                return (
                  <Link
                    key={item.href ?? `leaf-${index}`}
                    href={item.href!}
                    onClick={handleClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              }

              // group (toggle-only parent)
              const key = groupKey(item, index);
              const groupActive = isAnyChildActive(pathname, item.children);
              const open = !!openGroups[key];

              return (
                <div key={key} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => toggleGroup(key)}
                    aria-expanded={open}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      groupActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </span>

                    <ChevronDown
                      size={18}
                      className={`transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>

                  {open && (
                    <div className="ml-3 pl-3 border-l border-white/10 space-y-1">
                      {item.children!.map((child) => {
                        const ChildIcon = child.icon;
                        const childActive = isRouteActive(pathname, child.href);

                        return (
                          <Link
                            key={child.href}
                            href={child.href!}
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
