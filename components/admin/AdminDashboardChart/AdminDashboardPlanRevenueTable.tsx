"use client";
import { useGetShowAllTotalActiveUserMetaDataQuery } from "@/Redux/features/AdminDashboard/userDashboardMetaData/userDashboardMetaDataApi";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useMemo, useState } from "react";
import { BeatLoader } from "react-spinners";

export default function AdminDashboardPlanRevenueTable() {
  // const { data, isLoading, isFetching } =
  //     useGetShowAllTotalActiveUserMetaDataQuery({});
  // data for pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const queryParams = useMemo(() => {
    return {
      page,
      per_page: pageSize,
    };
  }, [page, pageSize]);
  const { data, isLoading, isFetching } =
    useGetShowAllTotalActiveUserMetaDataQuery(queryParams);
  console.log("i am the review ", data);

  const planRevenue = data?.data?.revenue?.plan_revenue || [];
  const totalPages = data?.meta?.last_page || 1;
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
          <div className="xl:col-span-4 w-full">
            <div className="overflow-x-auto bg-white shadow-sm rounded-t-xl">
              <table className="min-w-[800px] w-full text-sm  ">
                <thead>
                  <tr className="bg-[FFFFFF]">
                    <th className="px-6 py-5 text-left font-semibold text-gray-900 text-base">
                      Title
                    </th>
                    <th className="px-6 py-5 text-left font-semibold text-gray-900 text-base">
                      Total Users
                    </th>
                    <th className="px-6 py-5 text-center font-semibold text-gray-900 text-base">
                      Total Revenue
                    </th>

                    {/* <th className="px-6 py-5 text-center font-semibold text-gray-900 text-base">
                      Action
                    </th> */}
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-gray-500"
                      >
                        <div className="flex justify-center">
                          <BeatLoader color="#484D9B" />
                        </div>
                      </td>
                    </tr>
                  ) : planRevenue?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-gray-500"
                      >
                        No log data found
                      </td>
                    </tr>
                  ) : (
                    planRevenue?.map((item: any) => (
                      <tr
                        key={item?.id}
                        className="transition-all bg-[#F9FAFB] border-b border-[#EDEEF0]"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-800 whitespace-nowrap">
                          {item?.title}
                        </td>

                        <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                          {item?.total_users}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          $ {item?.total_revenue}
                        </td>

                        {/* <td className="px-6 py-4 text-gray-700 whitespace-nowrap font-semibold text-center align-middle">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              //   onClick={() => handleViewUser(item)}
                              className="text-[#484D9B] hover:bg-[#484D9B] p-2 rounded-full hover:text-white cursor-pointer transition"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          </div>
                        </td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="w-full py-4 rounded-b-lg flex justify-center items-center gap-2">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1 || isFetching}
            className="text-gray-500 cursor-pointer hover:text-[#484D9B] p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsLeft size={20} />
          </button>

          <button
            onClick={() => page > 1 && setPage(page - 1)}
            disabled={page === 1 || isFetching}
            className="text-gray-500 cursor-pointer hover:text-[#484D9B] p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              disabled={isFetching}
              className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center text-lg font-semibold transition ${
                page === p
                  ? "bg-[#484D9B] text-white shadow-md"
                  : "text-gray-700 bg-gray-100 hover:bg-gray-200"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => page < totalPages && setPage(page + 1)}
            disabled={page === totalPages || isFetching}
            className="text-gray-500 cursor-pointer hover:text-[#484D9B] p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>

          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages || isFetching}
            className="text-gray-500 cursor-pointer hover:text-[#484D9B] p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
