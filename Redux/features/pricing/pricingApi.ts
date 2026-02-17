import { baseApi } from "@/Redux/api/baseApi";
import { PricingPlan } from "@/types/pricingTypes";

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPricingPlans: builder.query<PricingPlan[], void>({
      query: () => "/subscriptions/show-all",
      providesTags: ["Pricing"],
    }),
  }),
});

export const { useGetPricingPlansQuery } = pricingApi;