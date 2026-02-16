"use client";

import { useState } from "react";
import {
  Eye,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import SearchInput from "@/components/admin/SearchInput";
import FilterSelect from "@/components/admin/FilterSelect";
import UserDetailModal from "@/components/admin/modals/UserDetailModal";

import { useGetAllUserByAdminQuery } from "@/Redux/features/AdminDashboard/Users/userManagementApi";
import { BeatLoader } from "react-spinners";

export default function UsersPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // data for pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isFetching } = useGetAllUserByAdminQuery({
    page,
    per_page: pageSize, // must match backend key
  });
  console.log("iam the all data", data);
  const allUser = data?.data || [];
  const totalPages = data?.meta?.last_page || 1;
  const users = data?.data;
  console.log("hh", users);

  const handleViewUser = (user: any): void => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Users t
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view all registered users.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name or email..."
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full lg:w-48">
              <FilterSelect
                value={roleFilter}
                onChange={setRoleFilter}
                options={["All", "Elite", "Free"]}
                placeholder="All"
              />
            </div>
            <div className="w-full lg:w-48">
              <FilterSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={["All", "Active", "Suspended", "Pending"]}
                placeholder="All"
              />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table */}
          {/* Table */}
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
            <div className="xl:col-span-4 w-full">
              <div className="overflow-x-auto bg-white shadow-sm rounded-t-xl">
                <table className="min-w-[800px] w-full text-sm">
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

                      <th className="px-6 py-5 text-left font-semibold text-gray-900 text-base">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {isLoading || isFetching ? (
                      <tr>
                        <td className="text-center py-8 text-gray-500">
                          <div className="flex justify-center">
                            <BeatLoader color="#484D9B" />
                          </div>
                        </td>
                      </tr>
                    ) : allUser?.length === 0 ? (
                      <tr>
                        <td className="text-center py-8 text-gray-500">
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
                            Phone here
                          </td>

                          <td className="px-6 py-4 text-gray-700 whitespace-nowrap font-semibold">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleViewUser(user)}
                                className="text-[#484D9B] hover:bg-[#484D9B] p-2 rounded-full hover:text-white cursor-pointer transition"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={user?.isActive}
                                  // onChange={() => {
                                  //   const block = user?.isActive ? true : false;
                                  //   toggleStatus(user?.id, block);
                                  // }}
                                  className="sr-only peer"
                                  // disabled={isToggling}
                                />
                                <div className="w-16 h-7 bg-gray-300 rounded-full peer peer-checked:bg-[#484D9B] transition-all duration-200"></div>
                                <div className="absolute  left-1 top-1 w-5 h-5 bg-white rounded-full transition-all duration-200 peer-checked:translate-x-9 shadow"></div>
                              </label>
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

          {/* here is the Pagination */}
          <div className="w-full bg- py-4 rounded-b-lg flex justify-center items-center gap-2 ">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="text-gray-500 cursor-pointer hover:text-[#484D9B] p-2"
            >
              <ChevronsLeft size={20} />
            </button>

            <button
              onClick={() => page > 1 && setPage(page - 1)}
              disabled={page === 1}
              className="text-gray-500 cursor-pointer hover:text-[#484D9B] p-2"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center text-lg font-semibold transition ${
                  page === p
                    ? "bg-[#484D9B] text-white shadow-md"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => page < totalPages && setPage(page + 1)}
              disabled={page === totalPages}
              className="text-gray-500 cursor-pointer hover:text-[#484D9B] p-2"
            >
              <ChevronRight size={20} />
            </button>

            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="text-gray-500 cursor-pointer hover:text-[#484D9B] p-2"
            >
              <ChevronsRight size={20} />
            </button>
          </div>

          {/* here is the panination table  */}
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
