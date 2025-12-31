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

// Commodity Types
export interface Commodity {
  id: number;
  name: string;
  price: number;
  premiumAccess: boolean;
}

export interface CommodityFormData {
  name: string;
  price: number;
  premiumAccessOnly: boolean;
}

// Crypto Types
export interface Crypto {
  id: number;
  name: string;
  symbol: string;
  riskLevel: RiskLevel;
  premiumAccess: boolean;
}

export interface CryptoFormData {
  name: string;
  symbol: string;
  riskLevel: RiskLevel;
  premiumAccessOnly: boolean;
}

// News Types
export type NewsCategory = 'Stock' | 'Crypto' | 'Economy' | 'Commodity';
export type NewsStatus = 'Draft' | 'Published' | 'Archived';

export interface News {
  id: number;
  title: string;
  category: NewsCategory;
  publishDate: string;
  status: NewsStatus;
  featured: boolean;
  content: string;
}

export interface NewsFormData {
  title: string;
  category: NewsCategory;
  publishDate: string;
  content: string;
  status: NewsStatus;
  markAsFeatured: boolean;
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

export interface CommodityModalProps {
  isOpen: boolean;
  onClose: () => void;
  commodity: Commodity | null;
  mode: 'add' | 'edit';
  onSubmit: (data: CommodityFormData) => void;
}

export interface CryptoModalProps {
  isOpen: boolean;
  onClose: () => void;
  crypto: Crypto | null;
  mode: 'add' | 'edit';
  onSubmit: (data: CryptoFormData) => void;
}

export interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: News | null;
  mode: 'add' | 'edit';
  onSubmit: (data: NewsFormData) => void;
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

export interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  step?: number;
}

export interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}