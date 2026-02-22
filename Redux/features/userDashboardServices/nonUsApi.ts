import { baseApi } from "@/Redux/api/baseApi";

export interface IAdvancedComplianceReport {
    symbol: string;
    rawSymbol: string;
    name: string;
    figi: string;
    exchange: string;
    status: string;
    reportDate: string;
    businessScreen: string;
    financialScreen: string;
    debtToMarketCapRatio: number;
    securitiesToMarketCapRatio: number;
}

export interface INonUsStockResponse {
    data: {
        advancedCompliance: {
            report: IAdvancedComplianceReport;
        };
    };
}

export interface ISearchNonUsStockParams {
    symbol: string;
    methodology?: string;
}

const nonUsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        searchNonUsStock: builder.query<IAdvancedComplianceReport, ISearchNonUsStockParams>({
            query: ({ symbol, methodology = "AAOIFI" }) => ({
                url: `/zoya/international-report?symbol=${symbol.toUpperCase()}&methodology=${methodology}`,
                method: "GET",
            }),
            transformResponse: (response: any) => {
                if (response?.errors && response.errors.length > 0) {
                    return null;
                }
                return response?.data?.advancedCompliance?.report || null;
            }
        }),
    }),
});

export const { useSearchNonUsStockQuery } = nonUsApi;
