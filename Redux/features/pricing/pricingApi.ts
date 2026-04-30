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
    getSubscribtionShow: builder.query<SubscriptionResponse, number>({
      query: (id) => `/subscriptions/${id}`,
      providesTags: ["Pricing"],
    }),

    //Delete

    deleteSubscription: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/subscriptions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pricing"],
    }),

    //update

    updateSubscription: builder.mutation<
      { message: string; plan: PricingPlan },
      { id: number; data: Partial<PricingPlan> }
    >({
      query: ({ id, data }) => ({
        url: `/subscriptions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Pricing"],
    }),
  }),
});

export const {
  useGetPricingPlansQuery,
  useDeleteSubscriptionMutation,
  useUpdateSubscriptionMutation,
} = pricingApi;
