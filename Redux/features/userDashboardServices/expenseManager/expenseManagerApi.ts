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

/* ================= Wealth ================= */

export type WealthResponse = {
  success: boolean;
  totalIncome: number;
  totalExpense: number;
  totalLoan: number;
  netSavings: number;
  balanceStatus: string;
  warning: string | null;
};

export type WealthQuery = {
  from_date: string;
  to_date: string;
};

/* ================= Loan Calculator ================= */

export type LoanCalcRequest = {
  amount: number;
  interest_rate: number;
  repayment_period: number;
};

export type LoanCalcResponse = {
  emi: number;
  totalRepayment: number;
  interest: number;
};

export type LoanCalcQuery = LoanCalcRequest;

/* ================= API ================= */

export const expenseManagerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ===== Financial Manager ===== */

    // GET: /financial/manager
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

    /* ===== Wealth ===== */

    // GET: /financial/wealth
    getFinancialWealth: builder.query<WealthResponse, WealthQuery>({
      query: (params) => ({
        url: "/financial/wealth",
        method: "GET",
        params,
      }),

      providesTags: (_res, _err, params) => [
        {
          type: "Wealth" as const,
          id: `${params.from_date}_${params.to_date}`,
        },
      ],
    }),

    /* ===== Loan Calculator (POST) ===== */

    // POST: /financial/loan/calc
    calculateLoan: builder.mutation<LoanCalcResponse, LoanCalcRequest>({
      query: (body) => ({
        url: "/financial/loan/calc",
        method: "POST",
        body,
      }),
    }),

    /* ===== Loan Calculator (GET) ===== */

    // GET: /financial/loan/calc
    getLoanCalculation: builder.query<LoanCalcResponse, LoanCalcQuery>({
      query: (params) => ({
        url: "/financial/loan/calc",
        method: "GET",
        params,
      }),
    }),
  }),

  overrideExisting: false,
});

/* ================= Hooks ================= */

export const {
  useGetFinancialManagerQuery,
  useGetFinancialWealthQuery,
  useCalculateLoanMutation,
  useGetLoanCalculationQuery,
} = expenseManagerApi;
