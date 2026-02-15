'use client';

import React, { useState } from 'react';
import { 
  X, 
  LogOut, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Package, 
  
  BarChart3, 

  Menu, 
  Newspaper,
  LayoutDashboard,
  Search
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MenuItem } from '@/types';
import { FaArrowTrendUp } from 'react-icons/fa6';

const UserSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: 'Home', href: '/user' },
    { icon: Search, label: 'Search Stock', href: '/user/searchStock' },
    { icon: CreditCard, label: 'WatchList', href: '/user/watchList' },

    { icon: TrendingUp, label: 'Expense manager', href: '/user/expensiveManager' },
    { icon: Package, label: 'Recommendations', href: '/user/recommendations' },
    { icon: Newspaper, label: 'News', href: '/user/news' },
    
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

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={handleToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
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
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 px-4 py-6">
           <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
      <FaArrowTrendUp className="text-primary " size={24} />
    </div>
            <span className="text-xl font-semibold">Thari Finance</span>
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
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className='mt-12 space-y-3'>
           <div className='flex justify-between items-center'>
            <h1 className='text-xl text-white/70'>AAPL</h1>
            <button className='flex gap-2 items-center rounded-md px-2 py-1 bg-[#1010A2]'>
                        <FaArrowTrendUp/>
                        <p>+1.61%</p>
            </button>
           </div>
           <div className='flex justify-between items-center'>
            <h1 className='text-xl text-white/70'>MSFT</h1>
            <button className='flex gap-2 items-center rounded-md px-2 py-1 bg-[#1010A2]'>
                        <FaArrowTrendUp/>
                        <p>+3.57%</p>
            </button>
           </div>
           <div className='flex justify-between items-center'>
            <h1 className='text-xl text-white/70'>TSLA</h1>
            <button className='flex gap-2 items-center rounded-md px-2 py-1 bg-[#1010A2]'>
                        <FaArrowTrendUp/>
                        <p>+5.28%</p>
            </button>
           </div>
           <div className='flex justify-between items-center'>
            <h1 className='text-xl text-white/70'>NVDA</h1>
            <button className='flex gap-2 items-center rounded-md px-2 py-1 bg-[#1010A2]'>
                        <FaArrowTrendUp/>
                        <p> +17.79%</p>
            </button>
           </div>
           
          </div>
          </nav>


          

          {/* Logout */}
          <div className="px-3 py-6 border-t border-white/10">
            <button 
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => console.log('Logout clicked')}
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