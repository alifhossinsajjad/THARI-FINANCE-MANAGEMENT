// src/redux/features/loan/loanApi.ts

import { baseApi } from "@/Redux/api/baseApi";

/* ================= Types ================= */

export type Loan = {
  id: number;
  user_id: number;
  title: string;
  amount: string | number;
  interest_rate: string | number;
  repayment_period: number;
  start_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type Pagination = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
};

export type LoanListResponse = {
  success: boolean;
  data: Loan[];
  pagination: Pagination;
};

export type CreateLoanBody = {
  title: string;
  amount: number;
  interest_rate: number;
  repayment_period: number;
  start_date: string;
};

export type CreateLoanResponse = {
  message: string;
  loan: Omit<Loan, "amount" | "interest_rate"> & {
    amount: number;
    interest_rate: number;
  };
};

export type UpdateLoanBody = CreateLoanBody;

export type DeleteLoanResponse = {
  message: string;
};

/* ================= API ================= */

export const loanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET: /financial/loans
    getAllLoans: builder.query<
      LoanListResponse,
      { page?: number; per_page?: number } | void
    >({
      query: (params) => ({
        url: "/financial/loans",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Loan" as const, id: "LIST" },
              ...result.data.map((l) => ({ type: "Loan" as const, id: l.id })),
            ]
          : [{ type: "Loan" as const, id: "LIST" }],
    }),

    // GET: /financial/loans/:id
    getLoanById: builder.query<Loan, number>({
      query: (id) => ({
        url: `/financial/loans/${id}`,
        method: "GET",
      }),
      providesTags: (_res, _err, id) => [{ type: "Loan" as const, id }],
    }),

    // POST: /financial/loans
    addLoan: builder.mutation<CreateLoanResponse, CreateLoanBody>({
      query: (body) => ({
        url: "/financial/loans",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Loan" as const, id: "LIST" }],
    }),

    // PUT: /financial/loans/:id
    updateLoan: builder.mutation<
      CreateLoanResponse,
      { id: number; body: UpdateLoanBody }
    >({
      query: ({ id, body }) => ({
        url: `/financial/loans/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: "Loan" as const, id },
        { type: "Loan" as const, id: "LIST" },
      ],
    }),

    // DELETE: /financial/loans/:id
    deleteLoan: builder.mutation<DeleteLoanResponse, number>({
      query: (id) => ({
        url: `/financial/loans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Loan" as const, id },
        { type: "Loan" as const, id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllLoansQuery,
  useGetLoanByIdQuery,
  useAddLoanMutation,
  useUpdateLoanMutation,
  useDeleteLoanMutation,
} = loanApi;
