"use client";

import { useState } from "react";
import { Eye, Edit2, Ban, Crown } from "lucide-react";
import SearchInput from "@/components/admin/SearchInput";
import FilterSelect from "@/components/admin/FilterSelect";
import UserDetailModal from "@/components/admin/modals/UserDetailModal";
import type { User } from "@/types";
import { useGetAllUserByAdminQuery } from "@/Redux/features/AdminDashboard/Users/userManagementApi";

export default function UsersPage(): React.JSX.Element {
  const { data } = useGetAllUserByAdminQuery({});
  console.log("iam the data for all user", data);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const users = data?.data;
  console.log("hh", users);

  const getRoleColor = (role: string): string => {
    return role === "Elite" ? "#9333EA" : "#6B7280";
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Active":
        return "#10B981";
      case "Suspended":
        return "#EF4444";
      case "Pending":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  const getSubscriptionColor = (subscription: string): string => {
    switch (subscription) {
      case "Active":
        return "#10B981";
      case "Inactive":
        return "#6B7280";
      case "Pending":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  const handleViewUser = (user: User): void => {
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
            Users
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
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Subscription
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users?.map((user: any) => (
                  <tr
                    key={`user-${user?.id}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || "..."}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${getRoleColor(user?.role)}20`,
                          color: getRoleColor(user?.role),
                        }}
                      >
                        {user?.role === "Elite" && <Crown size={12} />}
                        {user?.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${getSubscriptionColor(
                            user?.subscription,
                          )}20`,
                          color: getSubscriptionColor(user?.subscription),
                        }}
                      >
                        {user?.subscription}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          user?.status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user?.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleViewUser(user)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label="View user"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          type="button"
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          aria-label="Edit user"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          type="button"
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Ban user"
                        >
                          <Ban size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-200">
            {users?.map((user: any) => (
              <div key={`user-mobile-${user?.id}`} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">
                      {user?.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{user?.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleViewUser(user)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    aria-label="View user"
                  >
                    <Eye size={18} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${getRoleColor(user?.role)}20`,
                      color: getRoleColor(user?.role),
                    }}
                  >
                    {user?.role === "Elite" && <Crown size={12} />}
                    {user?.role}
                  </span>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${getSubscriptionColor(
                        user?.subscription,
                      )}20`,
                      color: getSubscriptionColor(user?.subscription),
                    }}
                  >
                    {user?.subscription}
                  </span>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${getStatusColor(user?.status)}20`,
                      color: getStatusColor(user?.status),
                    }}
                  >
                    {user?.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tracked Stocks:</span>
                  <span className="font-medium text-gray-900">
                    {user?.trackedStocks}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Ban
                  </button>
                </div>
              </div>
            ))}
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
