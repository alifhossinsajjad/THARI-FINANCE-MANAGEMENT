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
  deleted_at: string | null;

}


