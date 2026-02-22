import { baseApi } from "@/Redux/api/baseApi";

export interface IRegionalReportItem {
    symbol: string;
    rawSymbol: string;
    name: string;
    figi: string;
    exchange: string;
    status: "COMPLIANT" | "NON_COMPLIANT";
    reportDate: string;
    businessScreen: string;
    financialScreen: string;
    debtToMarketCapRatio: number;
    securitiesToMarketCapRatio: number;
}

export interface IRegionalReportsResponse {
    data: {
        advancedCompliance: {
            reports: {
                items: IRegionalReportItem[];
                nextToken: string | null;
            };
        };
    };
}

export interface IRegionsResponse {
    data: {
        advancedCompliance: {
            regions: string[];
        };
    };
}

export interface IRegionalReportsParams {
    region: string;
    methodology?: string;
    limit?: number;
    nextToken?: string | null;
}

const regionBaseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRegions: builder.query<IRegionsResponse, void>({
            query: () => ({
                url: "/zoya/regions",
                method: "GET",
            }),
        }),
        getRegionalReports: builder.query<IRegionalReportsResponse, IRegionalReportsParams>({
            query: ({ region, methodology = "AAOIFI", limit, nextToken }) => {
                const queryParams = new URLSearchParams();
                queryParams.append("region", region);
                queryParams.append("methodology", methodology);
                if (limit) queryParams.append("limit", limit.toString());
                if (nextToken) queryParams.append("nextToken", nextToken);

                return {
                    url: `/zoya/regional-reports?${queryParams.toString()}`,
                    method: "GET",
                };
            },
        }),
    }),
});

export const { useGetRegionsQuery, useGetRegionalReportsQuery } = regionBaseApi;
