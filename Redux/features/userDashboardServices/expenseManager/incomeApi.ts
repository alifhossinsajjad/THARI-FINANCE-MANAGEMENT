// src/redux/features/income/incomeApi.ts

import { baseApi } from "@/Redux/api/baseApi";

/** ===== Types ===== */
export type Income = {
  id: number;
  user_id: number;
  title: string;
  amount: string | number;
  date: string;
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

export type IncomeListResponse = {
  success: boolean;
  data: Income[];
  pagination: Pagination;
};

export type CreateIncomeBody = {
  title: string;
  amount: number;
  date: string;
};

export type CreateIncomeResponse = {
  message: string;
  income: Omit<Income, "amount"> & { amount: number };
};

export type UpdateIncomeBody = CreateIncomeBody;

export type DeleteIncomeResponse = {
  message: string;
};

/** ===== API ===== */
export const incomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET: /financial/incomes
    getAllIncomes: builder.query<
      IncomeListResponse,
      { page?: number; per_page?: number } | void
    >({
      query: (params) => ({
        url: "/financial/incomes",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Income" as const, id: "LIST" },
              ...result.data.map((i) => ({
                type: "Income" as const,
                id: i.id,
              })),
            ]
          : [{ type: "Income" as const, id: "LIST" }],
    }),

    // GET: /financial/incomes/:id
    getIncomeById: builder.query<Income, number>({
      query: (id) => ({
        url: `/financial/incomes/${id}`,
        method: "GET",
      }),
      providesTags: (_res, _err, id) => [{ type: "Income" as const, id }],
    }),

    // POST: /financial/incomes
    addIncome: builder.mutation<CreateIncomeResponse, CreateIncomeBody>({
      query: (body) => ({
        url: "/financial/incomes",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Income" as const, id: "LIST" }],
    }),

    // PUT: /financial/incomes/:id
    updateIncome: builder.mutation<
      CreateIncomeResponse,
      { id: number; body: UpdateIncomeBody }
    >({
      query: ({ id, body }) => ({
        url: `/financial/incomes/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: "Income" as const, id },
        { type: "Income" as const, id: "LIST" },
      ],
    }),

    // DELETE: /financial/incomes/:id
    deleteIncome: builder.mutation<DeleteIncomeResponse, number>({
      query: (id) => ({
        url: `/financial/incomes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Income" as const, id },
        { type: "Income" as const, id: "LIST" },
      ],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetAllIncomesQuery,
  useGetIncomeByIdQuery,
  useAddIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
} = incomeApi;
