"use client";

import { LogOut, Menu, Settings, TrendingUp, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CommonButton from "../reusable/CommonButton";
import GetStartedButton from "../reusable/GetStartedButton";

interface User {
  name: string;
  image: string;
  role: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

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
  // const [user, setUser] = useState<User | null>({
  //   name: "Sourav",
  //   image: "/images/user/profileImage.png",
  //   role: "user",
  // });

  const [user, setUser] = useState<User | null>(null);

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setProfileDropdownOpen(false);
    // Add actual logout logic here (e.g., clear tokens, redirect)
  };

  // Navigation items for user
  const userNavItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="absolute top-0 left-0 z-50 py-6 w-full  backdrop-blur-lg bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="h-9 w-30">
          <Link
            href="/"
            className="h-9 w-72 flex gap-4 items-center cursor-pointer"
          >
            <div className="bg-[#00008B] p-2 rounded-2xl">
              <TrendingUp className="h-10 w-10 text-white " />
            </div>
            <h1 className="text-2xl font-bold text-[#00008B]">Thari Finance</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          {userNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-lg font-medium transition-colors 
                  ${
                    isActive
                      ? "text-[#00008B]"
                      : "text-black hover:text-blue-500"
                  }
                  after:content-[''] after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-full after:bg-[#00008B]
                  after:scale-x-0 after:origin-left
                  after:transition-transform after:duration-300
                  ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}
                  `}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left transform bg-white transition-transform duration-300 ease-out ${
                    isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Section (Dynamic) */}
        {user ? (
          <div className="relative hidden items-center space-x-4 md:flex">
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
                    href={`/userDashboard/profile`}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <User className="mr-3 h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href={`/userDashboard/settings`}
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
              href="/auth/login"
              showArrow={false}
              // bgClass="bg-white  hover:bg-gray-100"
              // borderClass="border-[#0051C3]"
            />
            <GetStartedButton
              text="Sign Up"
              href="/auth/register"
              showArrow={false}
              borderClass="border-[#0051C3]"
              bgClass="bg-white  hover:bg-gray-100"
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
            {userNavItems.map((item) => {
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
            })}
          </nav>

          {/* Mobile Buttons (Dynamic) */}
          <div className="mt-6 flex flex-col gap-3">
            {user ? (
              <>
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
                      <p className="text-xs text-gray-400">user</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link
                      href={`/userDashboard/profile`}
                      className="flex items-center rounded px-2 py-2 text-sm text-gray-300 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      href={`/userDashboard/settings`}
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
                <Link href="/auth/login">
                  <CommonButton title="Login" width="w-full" />
                </Link>
                <Link href="/auth/register">
                  <CommonButton
                    title="Sign Up"
                    width="w-full"
                    bgColor="bg-[#00008B] hover:bg-[#245cc1]"
                    textColor="text-white"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
