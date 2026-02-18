"use client";

import { useState } from "react";
import {
  useGetPricingPlansQuery,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} from "@/Redux/features/pricing/pricingApi";

import { PricingPlan } from "@/types/pricingTypes";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  Edit3,
  Sparkles,
  Calendar,
  DollarSign,
  AlertCircle,
} from "lucide-react";

const SubscriptionTable = () => {
  const { data, isLoading, isError } = useGetPricingPlansQuery();

  const [updateSubscription, { isLoading: isUpdating }] =
    useUpdateSubscriptionMutation();

  const [deleteSubscription] = useDeleteSubscriptionMutation();

  const [viewPlan, setViewPlan] = useState<PricingPlan | null>(null);
  const [editPlan, setEditPlan] = useState<PricingPlan | null>(null);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  // Derived Data
  const activeCount = data?.filter((p) => p.status).length || 0;
  const inactiveCount = data?.filter((p) => !p.status).length || 0;

  const filteredData = data?.filter((plan) => {
    const matchesSearch = plan.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "All"
        ? true
        : filterStatus === "Active"
          ? plan.status
          : !plan.status; // status is boolean
    return matchesSearch && matchesStatus;
  });

  // ================= UPDATE =================
  const handleUpdate = async () => {
    if (!editPlan) return;

    try {
      await updateSubscription({
        id: editPlan.id,
        data: {
          title: editPlan.title,
          price: editPlan.price,
          description: editPlan.description,
          status: editPlan.status,
          duration_type: editPlan.duration_type,
          duration_value: editPlan.duration_value,
          is_popular: editPlan.is_popular,
        },
      }).unwrap();

      alert("Plan updated successfully");
      setEditPlan(null);
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      await deleteSubscription(id).unwrap();
      alert("Plan deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] text-red-500 space-y-2">
        <AlertCircle className="w-10 h-10" />
        <p className="font-medium">Failed to load subscription data.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Subscriptions
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your pricing plans and subscription tiers.
          </p>
        </div>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-transform hover:scale-[1.02]">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Active Plans
            </p>
            <h3 className="text-3xl font-extrabold text-gray-900">
              {activeCount}
            </h3>
          </div>
          <div className="bg-green-100 p-3 rounded-xl">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-transform hover:scale-[1.02]">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Inactive Plans
            </p>
            <h3 className="text-3xl font-extrabold text-gray-900">
              {inactiveCount}
            </h3>
          </div>
          <div className="bg-red-100 p-3 rounded-xl">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-transform hover:scale-[1.02]">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Total Plans
            </p>
            <h3 className="text-3xl font-extrabold text-gray-900">
              {data?.length || 0}
            </h3>
          </div>
          <div className="bg-blue-100 p-3 rounded-xl">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* ================= ACTIONS BAR ================= */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search plans by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as "All" | "Active" | "Inactive")
              }
              className="w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white appearance-none cursor-pointer transition-all text-sm font-medium text-gray-700"
            >
              <option value="All">All Status</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-gray-50/50 text-gray-500 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="p-5">Title</th>
                <th className="p-5">Duration</th>
                <th className="p-5">Price</th>
                <th className="p-5">Highlights</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredData?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Search className="w-12 h-12 mb-3 opacity-20" />
                      <p className="text-lg font-medium text-gray-500">
                        No plans found
                      </p>
                      <p className="text-sm">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData?.map((plan) => (
                  <tr
                    key={plan.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="p-5">
                      <div className="font-semibold text-gray-900">
                        {plan.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-[200px]">
                        {plan.description}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>
                          {plan.duration_value} {plan.duration_type}
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="font-bold text-gray-900">
                        ${plan.price}
                      </span>
                    </td>
                    <td className="p-5">
                      {plan.is_popular && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          <Sparkles className="w-3 h-3" /> Popular
                        </span>
                      )}
                    </td>
                    <td className="p-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                          plan.status
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                      >
                        {plan.status ? (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Active
                          </>
                        ) : (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                            Inactive
                          </>
                        )}
                      </span>
                    </td>

                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2 ">
                        <button
                          onClick={() => setViewPlan(plan)}
                          className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setEditPlan(plan)}
                          className="p-2 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          title="Edit Plan"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(plan.id)}
                          className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Plan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= VIEW MODAL ================= */}
      {viewPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Plan Details</h2>
              <button
                onClick={() => setViewPlan(null)}
                className="text-gray-400 hover:text-gray-700 transform transition-transform hover:rotate-90"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Title
                  </span>
                  <p className="text-lg font-bold text-gray-900">
                    {viewPlan.title}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Price
                  </span>
                  <p className="text-xl font-bold text-blue-600">
                    ${viewPlan.price}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Duration
                  </span>
                  <div className="flex items-center gap-2 font-medium text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {viewPlan.duration_value} {viewPlan.duration_type}
                  </div>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Status
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      viewPlan.status
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
                  >
                    {viewPlan.status ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {viewPlan.is_popular && (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg border border-amber-100">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">This is a popular plan</span>
                </div>
              )}

              <div>
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Features
                </span>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <ul className="space-y-2">
                    {viewPlan.features?.map(
                      (feature: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Description
                </span>
                <p className="text-gray-600 leading-relaxed bg-white p-3 border rounded-xl">
                  {viewPlan.description}
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end">
              <button
                onClick={() => setViewPlan(null)}
                className="px-6 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= UPDATE MODAL ================= */}
      {editPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-gray-100 overflow-hidden scale-100 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">Update Plan</h2>
              <button
                onClick={() => setEditPlan(null)}
                className="text-gray-400 hover:text-gray-700 transform transition-transform hover:rotate-90"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar space-y-5">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Plan Title
                </label>
                <input
                  type="text"
                  value={editPlan.title}
                  onChange={(e) =>
                    setEditPlan({ ...editPlan, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                  placeholder="e.g. Pro Plan"
                />
              </div>

              {/* Price & Popularity Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Price ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      value={editPlan.price}
                      onChange={(e) =>
                        setEditPlan({
                          ...editPlan,
                          price: Number(e.target.value),
                        })
                      }
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Badge
                  </label>
                  <select
                    value={editPlan.is_popular ? "true" : "false"}
                    onChange={(e) =>
                      setEditPlan({
                        ...editPlan,
                        is_popular: e.target.value === "true",
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white cursor-pointer"
                  >
                    <option value="false">Standard</option>
                    <option value="true">Most Popular ⭐</option>
                  </select>
                </div>
              </div>

              {/* Duration Info */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Duration Value
                  </label>
                  <input
                    type="number"
                    value={editPlan.duration_value}
                    onChange={(e) =>
                      setEditPlan({
                        ...editPlan,
                        duration_value: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                    placeholder="e.g. 30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Duration Type
                  </label>
                  <select
                    value={editPlan.duration_type}
                    onChange={(e) =>
                      setEditPlan({
                        ...editPlan,
                        duration_type: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="Days">Days</option>
                    <option value="Months">Months</option>
                    <option value="Years">Years</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Status
                </label>
                <select
                  value={editPlan.status ? "true" : "false"}
                  onChange={(e) =>
                    setEditPlan({
                      ...editPlan,
                      status: e.target.value === "true",
                    })
                  }
                  className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:border-transparent transition-all outline-none cursor-pointer ${
                    editPlan.status
                      ? "bg-green-50 border-green-200 text-green-700 focus:ring-green-500/20"
                      : "bg-red-50 border-red-200 text-red-700 focus:ring-red-500/20"
                  }`}
                >
                  <option value="true">Active (Visible to users)</option>
                  <option value="false">Inactive (Hidden)</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  value={editPlan.description}
                  onChange={(e) =>
                    setEditPlan({ ...editPlan, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none"
                  placeholder="Describe the plan features and benefits..."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
              <button
                onClick={() => setEditPlan(null)}
                className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-white hover:text-gray-800 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="px-8 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionTable;
