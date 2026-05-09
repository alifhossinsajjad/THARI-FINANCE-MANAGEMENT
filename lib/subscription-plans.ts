export type FeatureKey =
  | "Specific Stock Shariah Report"
  | "US Market Shariah Reports"
  | "Financial Management"
  | "Wealth Dashboard"
  | "Profile Access";

export interface PlanDetails {
  id: number;
  name: string;
  analysisLimit: number;
  features: FeatureKey[];
}

export const PLANS: Record<number, PlanDetails> = {
  1: {
    id: 1,
    name: "Beginner",
    analysisLimit: 5,
    features: [
      "Specific Stock Shariah Report",
      "US Market Shariah Reports",
      "Financial Management",
      "Profile Access",
    ],
  },
  2: {
    id: 2,
    name: "Elite",
    analysisLimit: 15,
    features: [
      "Specific Stock Shariah Report",
      "US Market Shariah Reports",
      "Financial Management",
      "Wealth Dashboard",
      "Profile Access",
    ],
  },
  3: {
    id: 3,
    name: "Elite Pro",
    analysisLimit: 25,
    features: [
      "Specific Stock Shariah Report",
      "US Market Shariah Reports",
      "Financial Management",
      "Wealth Dashboard",
      "Profile Access",
    ],
  },
};

export const DEFAULT_PLAN: PlanDetails = {
  id: 0,
  name: "Free",
  analysisLimit: 0,
  features: [],
};

export const getPlanById = (id: number | null | string): PlanDetails => {
  if (id === null || id === undefined) return DEFAULT_PLAN;
  const numericId = typeof id === "string" ? parseInt(id) : id;
  return PLANS[numericId] || DEFAULT_PLAN;
};
