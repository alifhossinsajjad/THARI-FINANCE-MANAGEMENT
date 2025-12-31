"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BellDot, LogOut, Menu, Settings, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import GetStartedButton from "../reusable/GetStartedButton";

interface User {
  name: string;
  image: string;
  role: string;
}

interface Notification {
  id: number;
  type: "new" | "completed";
  title: string;
  pickup?: string;
  message?: string;
  actions?: boolean;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null); // Ref for mobile menu
  const profileDropdownRef = useRef<HTMLDivElement>(null); // Ref for profile dropdown

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

  // Simulate authentication
  const [user, setUser] = useState<User | null>({
    name: "Sourav",
    image: "/images/userDashboard/userNavbar/profileImage.png",
    role: "user",
  });

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setProfileDropdownOpen(false);
    // Add actual logout logic here (e.g., clear tokens, redirect)
  };

  // Example navigation items based on role
  const userNavItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/servicesLanding" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ];

  const driverNavItems = [
    { label: "Dashboard", href: "/driverDashboard" },
    { label: "Delivery History", href: "/driverDashboard/delivery-history" },
    { label: "Support", href: "/driverDashboard/support" },
  ];

  // Example notification data
  const notifications: Notification[] = [
    {
      id: 1,
      type: "new",
      title: "New Delivery Assignment!",
      pickup: "123 Main St, New York",
      actions: true,
    },
    {
      id: 2,
      type: "completed",
      title: "Delivered completed",
      message: "Your package has safely reached its destination.",
    },
    {
      id: 3,
      type: "new",
      title: "New Delivery Assignment!",
      pickup: "456 Oak St, Los Angeles",
      actions: true,
    },
  ];

  return (
    <header className="absolute top-0 left-0 z-50 w-full py-6 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="h-9 w-30">
          <Image
            className="h-full w-full"
            width={120}
            height={36}
            src="/images/icon.jpg"
            alt="logo"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          {(user?.role === "user" ? userNavItems : driverNavItems).map(
            (item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-lg font-medium transition-colors ${
                    isActive ? "text-white" : "text-white hover:text-blue-500"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left transform bg-white transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            }
          )}
        </nav>

        {/* Right Section (Dynamic) */}
        {user ? (
          <div className="relative hidden items-center space-x-4 md:flex">
            {/* Notification Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="relative">
                  <BellDot className="cursor-pointer fill-[#2563EB] text-blue-900" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-600"></span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto rounded-xl p-4 sm:p-6">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-800">
                    Notifications
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      {n.type === "new" ? (
                        <>
                          <p className="font-semibold text-blue-700">
                            {n.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            Pickup: {n.pickup}
                          </p>
                          <div className="mt-3 flex gap-2">
                            <Button
                              variant="accept"
                              className="bg-blue-700 px-6 text-white uppercase hover:bg-blue-800"
                            >
                              ✓ Accept
                            </Button>
                            <Button
                              variant="destructive"
                              className="bg-red-600 px-6 text-white hover:bg-red-700"
                            >
                              ✕ Reject
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="font-semibold text-green-700">
                            {n.title}
                          </p>
                          <p className="text-sm text-gray-600">{n.message}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="focus:outline-none"
              >
                <Image
                  height={40}
                  width={40}
                  src={user.image || "/placeholder.svg"}
                  quality={100}
                  alt={`${user.name} profile Image`}
                  className="cursor-pointer rounded-full border object-cover"
                />
              </button>
              {profileDropdownOpen && (
                <div
                  ref={profileDropdownRef}
                  className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg"
                >
                  <Link
                    href={`/${
                      user.role === "user" ? "userDashboard" : "driverDashboard"
                    }/profile`}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <User className="mr-3 h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href={`/${
                      user.role === "user" ? "userDashboard" : "driverDashboard"
                    }/settings`}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden items-center space-x-4 md:flex">
            <GetStartedButton
              text="Login"
              href="/login"
              showArrow={false}
              borderClass="border-[#0051C3]"
              bgClass="hover:bg-[#245cc1]"
            />
            <GetStartedButton
              text="Contact"
              href="/contact"
              showArrow={false}
              borderClass="border-[#0051C3]"
              bgClass="bg-[#0051C3] hover:bg-[#245cc1]"
            />
          </div>
        )}

        {/* Mobile Hamburger */}
        <button
          className="cursor-pointer text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-full left-0 w-full bg-black/90 px-6 py-4 md:hidden"
        >
          <nav className="flex flex-col space-y-4">
            {(user?.role === "user" ? userNavItems : driverNavItems).map(
              (item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium ${
                      isActive
                        ? "text-[#2d6ef0]"
                        : "text-gray-300 hover:text-blue-500"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }
            )}
          </nav>

          {/* Mobile Buttons (Dynamic) */}
          <div className="mt-6 flex flex-col gap-3">
            {user ? (
              <>
                {/* Notifications Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="accept"
                      className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    >
                      🔔 Notifications
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-y-auto rounded-xl p-4 sm:p-6">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold text-gray-800">
                        Notifications
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                        >
                          {n.type === "new" ? (
                            <>
                              <p className="font-semibold text-blue-700">
                                {n.title}
                              </p>
                              <p className="text-sm text-gray-600">
                                Pickup: {n.pickup}
                              </p>
                              <div className="mt-3 flex gap-2">
                                <Button
                                  variant="accept"
                                  className="bg-blue-700 px-6 text-white uppercase hover:bg-blue-800"
                                >
                                  ✓ Accept
                                </Button>
                                <Button
                                  variant="destructive"
                                  className="bg-red-600 px-6 text-white hover:bg-red-700"
                                >
                                  ✕ Reject
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="font-semibold text-green-700">
                                {n.title}
                              </p>
                              <p className="text-sm text-gray-600">
                                {n.message}
                              </p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Profile Section */}
                <div className="mt-4 border-t border-gray-700 pt-4">
                  <div className="mb-4 flex items-center space-x-3">
                    <Image
                      height={40}
                      width={40}
                      src={user.image || "/placeholder.svg"}
                      quality={100}
                      alt={`${user.name} profile Image`}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400">{user.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link
                      href={`/${
                        user.role === "user"
                          ? "userDashboard"
                          : "driverDashboard"
                      }/profile`}
                      className="flex items-center rounded px-2 py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      href={`/${
                        user.role === "user"
                          ? "userDashboard"
                          : "driverDashboard"
                      }/settings`}
                      className="flex items-center rounded px-2 py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center rounded px-2 py-2 text-left text-sm text-gray-300 hover:text-white"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <GetStartedButton
                  text="Login"
                  href="/login"
                  showArrow={false}
                  borderClass="border-[#0051C3]"
                  bgClass="hover:bg-[#245cc1]"
                  className="w-full"
                />
                <GetStartedButton
                  text="Contact"
                  href="/contact"
                  showArrow={false}
                  borderClass="border-[#0051C3]"
                  bgClass="bg-[#0051C3] hover:bg-[#245cc1]"
                  className="w-full"
                />
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
