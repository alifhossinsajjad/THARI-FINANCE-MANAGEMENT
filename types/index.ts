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

// User Types
export type UserRole = 'Elite' | 'Free';
export type UserStatus = 'Active' | 'Inactive' | 'Suspended' | 'Pending';
export type SubscriptionStatus = 'Active' | 'Inactive' | 'Pending';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  subscription: SubscriptionStatus;
  trackedStocks: number;
  status: UserStatus;
}

// Stock Types
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type ShariaStatus = 'Halal' | 'Doubtful' | 'Haram';
export type FlagType = 'Opportunity' | 'Undervalued';

export interface Stock {
  id: number;
  stockName: string;
  symbol: string;
  riskLevel: RiskLevel;
  shariaStatus: ShariaStatus;
  premium: boolean;
  flags: FlagType[];
}

export interface StockFormData {
  stockName: string;
  symbol: string;
  riskLevel: RiskLevel;
  shariaStatus: ShariaStatus;
  premiumOnly: boolean;
}

// Modal Props
export interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export interface StockModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: Stock | null;
  mode: 'add' | 'edit';
  onSubmit: (data: StockFormData) => void;
}

// Input Props
export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}

export interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}