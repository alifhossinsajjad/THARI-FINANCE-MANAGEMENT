import { baseApi } from "@/Redux/api/baseApi";
import { PricingPlan } from "@/types/pricingTypes";

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPricingPlans: builder.query<PricingPlan[], void>({
      query: () => "/subscriptions" ,
      providesTags: ["pricing"],
    }),
  }),
});

export const { useGetPricingPlansQuery } = pricingApi;
