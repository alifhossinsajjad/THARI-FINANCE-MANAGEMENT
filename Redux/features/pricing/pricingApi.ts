import { baseApi } from "@/Redux/api/baseApi";
import { PricingPlan } from "@/types/pricingTypes";

interface SubscriptionResponse {
  message: string;
  plan: PricingPlan;
}

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPricingPlans: builder.query<PricingPlan[], void>({
      query: () => "/subscriptions/show-all",
      providesTags: ["Pricing"],
    }),

    // ✅ Fix typing here
    getSubscriptionShow: builder.query<SubscriptionResponse, number>({
      query: (id) => `/subscriptions/show/${id}`,
      providesTags: ["Pricing"],
    }),
  }),
});

export const { useGetPricingPlansQuery, useGetSubscriptionShowQuery } =
  pricingApi;
