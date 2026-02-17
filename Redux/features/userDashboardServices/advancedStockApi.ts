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
      transformResponse: (response: IAdvancedReportResponse) =>
        response.data.advancedCompliance.report,
    }),
  }),
});

export const { useGetAdvancedStockReportQuery } = advancedStockApi;
