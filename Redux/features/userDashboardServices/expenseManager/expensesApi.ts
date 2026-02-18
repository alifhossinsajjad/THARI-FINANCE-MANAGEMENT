/* ================= Types ================= */

import { baseApi } from "@/Redux/api/baseApi";

export type Expense = {
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

export type ExpenseListResponse = {
  success: boolean;
  data: Expense[];
  pagination: Pagination;
};

export type CreateExpenseBody = {
  title: string;
  amount: number;
  date: string;
};

export type CreateExpenseResponse = {
  message: string;
  expense: Omit<Expense, "amount"> & { amount: number };
};

export type UpdateExpenseBody = CreateExpenseBody;

export type DeleteExpenseResponse = {
  message: string;
};

/* ================= API ================= */

export const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET: /financial/expenses
    getAllExpenses: builder.query<
      ExpenseListResponse,
      { page?: number; per_page?: number } | void
    >({
      query: (params) => ({
        url: "/financial/expenses",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Expense" as const, id: "LIST" },
              ...result.data.map((e) => ({
                type: "Expense" as const,
                id: e.id,
              })),
            ]
          : [{ type: "Expense" as const, id: "LIST" }],
    }),

    // GET: /financial/expenses/:id
    getExpenseById: builder.query<Expense, number>({
      query: (id) => ({
        url: `/financial/expenses/${id}`,
        method: "GET",
      }),
      providesTags: (_res, _err, id) => [{ type: "Expense" as const, id }],
    }),

    // POST: /financial/expenses
    addExpense: builder.mutation<CreateExpenseResponse, CreateExpenseBody>({
      query: (body) => ({
        url: "/financial/expenses",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Expense" as const, id: "LIST" }],
    }),

    // PUT: /financial/expenses/:id
    updateExpense: builder.mutation<
      CreateExpenseResponse,
      { id: number; body: UpdateExpenseBody }
    >({
      query: ({ id, body }) => ({
        url: `/financial/expenses/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: "Expense" as const, id },
        { type: "Expense" as const, id: "LIST" },
      ],
    }),

    // DELETE: /financial/expenses/:id
    deleteExpense: builder.mutation<DeleteExpenseResponse, number>({
      query: (id) => ({
        url: `/financial/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Expense" as const, id },
        { type: "Expense" as const, id: "LIST" },
      ],
    }),
  }),

  overrideExisting: false,
});

/* ================= Hooks ================= */

export const {
  useGetAllExpensesQuery,
  useGetExpenseByIdQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
