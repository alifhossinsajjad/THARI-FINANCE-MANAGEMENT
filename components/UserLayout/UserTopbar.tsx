"use client";

import React from "react";
import { Bell, LogOut, Search } from "lucide-react";

const UserTopbar: React.FC = () => {
  const handleNotificationClick = (): void => {
    console.log("Notification clicked");
  };

  const handleLogout = (): void => {
    console.log("Logout clicked");
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
            className="w-full pl-10 pr-4 py-2 text-sm
              border border-black/10 rounded-md
              text-gray-900 placeholder:text-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button
            onClick={handleNotificationClick}
            type="button"
            aria-label="Notifications"
            className="relative p-2 rounded-full text-gray-700 hover:text-gray-800 transition cursor-pointer"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-primary text-white
              px-5 py-3 rounded-full text-sm font-medium
              cursor-pointer"
          >
            <LogOut size={16} />
            LogOut
          </button>
        </div>
      </div>
    </header>
  );
};

export default UserTopbar;
