import { baseApi } from "@/Redux/api/baseApi";
import { PricingPlan } from "@/types/pricingTypes";

export const pricingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPricingPlans: builder.query<PricingPlan[], void>({
      query: () => "/subscriptions",
      transformResponse: (response: any) => {
        console.log("Pricing API Raw Response:", response);
        return response.data || [];
      },
      providesTags: ["pricing"],
    }),
  }),
});

export const { useGetPricingPlansQuery } = pricingApi;
