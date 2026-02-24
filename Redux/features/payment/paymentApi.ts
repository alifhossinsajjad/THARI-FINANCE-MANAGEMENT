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
  transaction_id: string;
}

interface Plan {
  id: number;
  title: string;
  price: number;
}

export interface Payment {
  id: number;
  transaction_id: string;
  amount: string;
  currency: string;
  status: string;
  platform: string;
  created_at: string;
  updated_at: string;
  plan?: Plan;
}

interface GetPaymentsResponse {
  success: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  };
  latest_payment: Payment;
  payment_history: Payment[];
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
        url: "/payment/show",
        method: "GET",
      }),
    }),
  }),
});

export const { useProcessPaymentMutation, useGetAllPaymentsQuery } = paymentApi;
