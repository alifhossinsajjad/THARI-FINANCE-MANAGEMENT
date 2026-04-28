import { baseApi } from "@/Redux/api/baseApi";

export interface AnalysisItem {
  id: number;
  symbol: string;
  name: string;
  status: string;
  note: string;
  created_at: string;
  updated_at: string;
}

export interface AnalysisResponse {
  data: AnalysisItem[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}


// Modal Component for Add/Edit
export interface ModalProps {
  title: string;
  formData: Partial<AnalysisItem>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<AnalysisItem>>>;
  onSubmit: () => void;
  onClose: () => void;
}

export const ourAnalysisApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalyses: builder.query<AnalysisResponse, number | void>({
      query: (page = 1) => ({
        url: `/analyses?page=${page}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Analyses" as const, id })),
              { type: "Analyses", id: "LIST" },
            ]
          : [{ type: "Analyses", id: "LIST" }],
    }),

    postAnalysis: builder.mutation<AnalysisItem, Partial<AnalysisItem>>({
      query: (body) => ({
        url: "/analyses",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Analyses", id: "LIST" }],
    }),

 updateAnalysis: builder.mutation<AnalysisItem, { id: number; data: Partial<AnalysisItem> }>({
  query: ({ id, data }) => ({
    url: `/analyses/${id}`,
    method: "POST",
    body: data,
  }),
  invalidatesTags: (_result, _error, { id }) => [{ type: "Analyses", id }],
}),

    deleteAnalysis: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/analyses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Analyses", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAnalysesQuery,
  usePostAnalysisMutation,
  useUpdateAnalysisMutation,
  useDeleteAnalysisMutation,
} = ourAnalysisApi;
