'use client';

import React from 'react';
import { Bell } from 'lucide-react';

const AdminTopbar: React.FC = () => {
  const handleNotificationClick = (): void => {
    console.log('Notification clicked');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <div className="flex-1 lg:flex-none"></div>

        <div className="flex items-center gap-4">
          <button 
            className="relative p-2 text-gray-600 hover:text-gray-900"
            onClick={handleNotificationClick}
            aria-label="Notifications"
            type="button"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-gray-900">Armand</div>
              <div className="text-xs text-gray-500">Premium</div>
            </div>
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;