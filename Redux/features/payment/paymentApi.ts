import { baseApi } from "@/Redux/api/baseApi";

interface PaymentRequest {
  plan_id: number;
  platform: "web" | "app";
  callback_url?: string;
}

interface PaymentResponse {
  success: boolean;
  checkout_url: string;
  session_id: string;
  amount: number;
  transaction_id : string
}




interface Payment {
  id: number;
  transaction_id: string;
  amount: string;
  currency: string;
  status: string;
  platform: string;
  created_at: string;
  updated_at: string;
}

interface GetPaymentsResponse {
  data: {
    data: Payment[];
  };
}



export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    processPayment: builder.mutation<PaymentResponse, PaymentRequest>({
      query: (body) => ({
        url: "/payment/process",
        method: "POST",
        body,
      }),
    }),
     getAllPayments: builder.query<GetPaymentsResponse, void>({
      query: () => ({
        url: "/all-payments",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useProcessPaymentMutation,
  useGetAllPaymentsQuery,
} = paymentApi
