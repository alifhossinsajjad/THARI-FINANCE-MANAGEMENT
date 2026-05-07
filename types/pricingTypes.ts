export interface PricingPlan {
  id: number;
  title: string;
  description: string;
  price: number;
  features: string[];
  duration_type: string;
  duration_value: number;
  is_popular: boolean;
  status: boolean;
  created_at: string;
  updated_at: string;
  discount_label: string | null;
  deleted_at: string | null;
}


export interface Payment {
  id: number;
  transaction_id: string;
  amount: string;
  currency: string;
  status: "paid" | "unpaid";
  created_at: string;
  updated_at: string;
}


export interface PaymentPagination {
  current_page: number;
  data: Payment[];
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}


export interface PaymentResponse {
  success: boolean;
  data: PaymentPagination;
}
 
