import { baseApi } from "@/Redux/api/baseApi";

export interface IAdvancedReport {
  symbol: string;
  rawSymbol: string;
  name: string;
  figi: string;
  exchange: string;
  status: "COMPLIANT" | "NON_COMPLIANT";
  reportDate: string;
  businessScreen: string;
  financialScreen: string;
  compliantRevenue: number;
  nonCompliantRevenue: number;
  questionableRevenue: number;
  securitiesToMarketCapRatio: number;
  debtToMarketCapRatio: number;
}

export interface IAdvancedReportResponse {
  data: {
    advancedCompliance: {
      report: IAdvancedReport;
    };
  };
}

const advancedStockApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdvancedStockReport: builder.query<IAdvancedReport, string>({
      query: (symbol) => ({
        url: `/zoya/advanced-report`,
        params: { symbol },
      }),
      transformResponse: (response: any) => {
        if (response?.errors && response.errors.length > 0) {
          return null;
        }
        return response?.data?.advancedCompliance?.report || null;
      },
    }),
  }),
});

export const { useGetAdvancedStockReportQuery } = advancedStockApi;
