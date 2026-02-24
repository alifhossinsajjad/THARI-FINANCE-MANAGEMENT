"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, LogOut, Search, User as UserIcon } from "lucide-react";
import { useSearch } from "@/contexts/SearchContext";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { logout, selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const UserTopbar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();


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

  const handleNotificationClick = (): void => {
    console.log("Notification clicked");
  };

  const handleLogout = (): void => {
    dispatch(logout());
    setProfileDropdownOpen(false);
    toast.success("Logged out successfully");
    router.push("/auth/login");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-black/10">
      <div className="flex items-center justify-between px-4 lg:px-8 py-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Stock"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 text-sm
              border border-black/10 rounded-md
              text-gray-900 placeholder:text-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          {/* <button
            onClick={handleNotificationClick}
            type="button"
            aria-label="Notifications"
            className="relative p-2 rounded-full text-gray-700 hover:text-gray-800 transition cursor-pointer"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </button> */}

          {/* Profile Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold border border-blue-200">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-gray-700 truncate max-w-25">
                  {user?.email?.split("@")[0]}
                </p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 transform origin-top-right transition-all">
                <div className="px-4 py-3 border-b border-gray-100 mb-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role}
                  </p>
                </div>

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
                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserTopbar;