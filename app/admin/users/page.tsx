"use client";

import { useMemo, useState } from "react";
import {
  Eye,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import FilterSelect from "@/components/admin/FilterSelect";
import UserDetailModal from "@/components/admin/modals/UserDetailModal";

import {
  useGetAllUserByAdminQuery,
  useToggleUserBySupperAdminMutation,
} from "@/Redux/features/AdminDashboard/Users/userManagementApi";

import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

export default function UsersPage(): React.JSX.Element {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [togglingUserId, setTogglingUserId] = useState<number | null>(null);

  // data for pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const queryParams = useMemo(() => {
    return {
      status: statusFilter === "All" ? "" : statusFilter.toLowerCase(),
      page,
      per_page: pageSize,
    };
  }, [statusFilter, page, pageSize]);
  const { data, isLoading, isFetching, refetch } =
    useGetAllUserByAdminQuery(queryParams);

  const allUser = data?.data || [];
  const totalPages = data?.meta?.last_page || 1;

  const [toggleUserStatus] = useToggleUserBySupperAdminMutation();

  const handleStatusChange = (value: string) => {
    setPage(1); // reset page when filter changes
    setStatusFilter(value);
  };

  const handleViewUser = (user: any): void => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleToggleStatus = async (user: any) => {
    try {
      setTogglingUserId(user.id);

      await toggleUserStatus({
        id: user.id,
        block: !user.status,
      }).unwrap();

      // Refetch to get updated data
      await refetch();

      // Show success toast
      toast.success(
        `User ${!user.status ? "blocked" : "unblocked"} successfully!`,
      );
    } catch (err) {
      console.error("Failed to toggle user", err);

      // Show error toast
      toast.error("Failed to toggle user status. Please try again.");
    } finally {
      setTogglingUserId(null);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Users
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view all registered users.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row justify-end gap-4">
          <div className="flex justify-end">
            <div className="w-full lg:w-48">
              <FilterSelect
                value={statusFilter}
                // onChange={setStatusFilter}
                onChange={handleStatusChange}
                options={["All", "Active", "Inactive"]}
                placeholder="All"
              />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
            <div className="xl:col-span-4 w-full">
              <div className="overflow-x-auto bg-white shadow-sm rounded-t-xl">
                <table className="min-w-200 w-full text-sm ">
                  <thead>
                    <tr className="bg-[FFFFFF]">
                      <th className="px-6 py-5 text-left font-semibold text-gray-900 text-base">
                        Email
                      </th>
                      <th className="px-6 py-5 text-left font-semibold text-gray-900 text-base">
                        Role
                      </th>
                      <th className="px-6 py-5 text-left font-semibold text-gray-900 text-base">
                        status
                      </th>
                      <th className="px-6 py-5 text-left font-semibold text-gray-900 text-base">
                        Phone
                      </th>
                      <th className="px-6 py-5 text-center font-semibold text-gray-900 text-base">
                        Action
                      </th>
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
                    ) : allUser?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-8 text-gray-500"
                        >
                          No log data found
                        </td>
                      </tr>
                    ) : (
                      allUser?.map((user: any) => (
                        <tr
                          key={user?.id}
                          className="transition-all bg-[#F9FAFB] border-b border-[#EDEEF0]"
                        >
                          <td className="px-6 py-4 font-semibold text-gray-800 whitespace-nowrap">
                            {user?.email}
                          </td>

                          <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                            {user?.role}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                user?.status
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {user?.status ? "Active" : "Inactive"}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                            {user?.phone || "---"}
                          </td>

                          <td className="px-6 py-4 text-gray-700 whitespace-nowrap font-semibold text-center align-middle">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => handleViewUser(user)}
                                className="text-[#484D9B] hover:bg-[#484D9B] p-2 rounded-full hover:text-white cursor-pointer transition"
                                disabled={togglingUserId === user.id}
                              >
                                <Eye className="w-5 h-5" />
                              </button>

                              {/* <label className="relative inline-flex items-center cursor-pointer">
//                                 <input
//                                   type="checkbox"
//                                   checked={user?.isActive}
//                                   className="sr-only peer"
//                                 />
//                                 <div className="w-16 h-7 bg-gray-300 rounded-full peer-checked:bg-[#484D9B] transition-all duration-200"></div>
//                                 <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all duration-200 peer-checked:translate-x-9 shadow"></div>
//                               </label> */}

                              {togglingUserId === user.id ? (
                                <div className="w-16 flex justify-center">
                                  <BeatLoader size={6} color="#484D9B" />
                                </div>
                              ) : (
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={user?.status}
                                    onChange={() => handleToggleStatus(user)}
                                    className="sr-only peer"
                                  />
                                  <div className="w-16 h-7 bg-gray-300 rounded-full peer-checked:bg-[#484D9B] transition-all duration-200"></div>
                                  <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all duration-200 peer-checked:translate-x-9 shadow"></div>
                                </label>
                              )}
                            </div>
                          </td>
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

      {/* User Detail Modal */}
      <UserDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
      />
    </>
  );
}
