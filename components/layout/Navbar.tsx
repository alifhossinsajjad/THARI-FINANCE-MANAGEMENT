"use client";

import {
  LogOut,
  Menu,
  User as UserIcon,
  X,
  LayoutDashboard,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "../reusable/Logo";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { logout, selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { toast } from "sonner";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  // Handle clicks outside mobile menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        event.target instanceof Node &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle clicks outside profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileDropdownRef.current &&
        event.target instanceof Node &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    }

    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    setProfileDropdownOpen(false);
    setIsOpen(false);
    toast.success("Logged out successfully");
    router.push("/auth/login");
  };

  // Navigation items for user
  const userNavItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-4">
            <div className="p-1.5 sm:p-2 rounded-2xl">
              <Logo />
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 absolute left-1/2 -translate-x-1/2">
            {userNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm lg:text-base font-medium transition-colors py-2
                    ${
                      isActive
                        ? "text-primary"
                        : "text-gray-700 hover:text-primary"
                    }
                    after:content-[''] after:absolute after:left-0 after:-bottom-1
                    after:h-0.5 after:w-full after:bg-primary
                    after:scale-x-0 after:origin-left
                    after:transition-transform after:duration-300
                    ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Profile Section - Only shows when logged in */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {user ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none hover:opacity-80 transition-opacity"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold border border-blue-200">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden lg:block max-w-25 truncate">
                    {user.email?.split("@")[0]}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 transform origin-top-right transition-all duration-200 ease-out">
                    <div className="px-4 py-3 border-b border-gray-100 mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </p>
                    </div>

                    <Link
                      href={user.role?.toLowerCase() === "admin" ? "/admin" : "/user"}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <LayoutDashboard className="mr-3 h-4 w-4 text-gray-500" />
                      Dashboard
                    </Link>

                    <Link
                      href="/user/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <UserIcon className="mr-3 h-4 w-4 text-gray-500" />
                      Profile
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg animate-slideDown"
        >
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-2">
              {userNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2.5 text-base font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Profile Section */}
            {user ? (
              <div className="border-t border-gray-200 pt-4">
                {/* User Info */}
                <div className="px-4 py-3 bg-gray-50 rounded-lg mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold border border-blue-200">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.email?.split("@")[0]}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Menu Actions */}
                <div className="space-y-1">
                  <Link
                    href={
                      user.role?.toLowerCase() === "admin"
                        ? "/admin"
                        : "/user"
                    }
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="mr-3 h-5 w-5 text-gray-500" />
                    Dashboard
                  </Link>

                  <Link
                    href="/user/settings"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserIcon className="mr-3 h-5 w-5 text-gray-500" />
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}
