// src/redux/features/expenseManager/expenseManagerApi.ts

import { baseApi } from "@/Redux/api/baseApi";

/* ================= Types ================= */

export type AmountByDate = {
  amount: string;
  date: string;
};

export type LoanAmountByDate = {
  amount: string;
  start_date: string;
};

export type AiInsights = {
  score: number;
  savings: number;
  savingsPercent: number;
  insights: string[];
};

export type ManagerResponse = {
  success: boolean;
  totalIncome: string;
  totalExpense: string;
  totalLoan: string;
  netBalance: number;
  balanceStatus: "positive" | "negative" | "neutral" | string;
  incomes: AmountByDate[];
  expenses: AmountByDate[];
  loans: LoanAmountByDate[];
  ai_insights: AiInsights;
};

export type ManagerQuery = {
  from_date: string;
  to_date: string;
};

/* ================= API ================= */

export const expenseManagerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET: /financial/manager?from_date=...&to_date=...
    getFinancialManager: builder.query<ManagerResponse, ManagerQuery>({
      query: (params) => ({
        url: "/financial/manager",
        method: "GET",
        params,
      }),

      providesTags: (_res, _err, params) => [
        {
          type: "Manager" as const,
          id: `${params.from_date}_${params.to_date}`,
        },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetFinancialManagerQuery } = expenseManagerApi;
