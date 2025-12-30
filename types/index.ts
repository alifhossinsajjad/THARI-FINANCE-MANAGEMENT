import { LucideIcon } from 'lucide-react';

// Navigation Types
export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

// Dashboard Stats Types
export interface StatCard {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconBg: string;
  icon: LucideIcon;
}

export interface QuickLink {
  label: string;
  icon: LucideIcon;
  iconBg: string;
}

export interface Activity {
  label: string;
  time: string;
  color: string;
}

// Component Props Types
export interface AdminLayoutProps {
  children: React.ReactNode;
}