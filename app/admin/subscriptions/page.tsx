// app/subscriptions/page.tsx (or any component file)
import { Search, MoreVertical, CheckCircle, XCircle, Clock, AlertCircle, Users, Clock8 } from "lucide-react";
import { FiArrowUpCircle } from "react-icons/fi";

type Subscription = {
  id: number;
  user: string;
  plan: string;
  startDate: string;
  expiryDate: string;
  status: "Active" | "Pending" | "Expired";
};

const subscriptions: Subscription[] = [
  { id: 1, user: "Ahmed Hassan", plan: "12 Months", startDate: "2024-01-15", expiryDate: "2025-01-15", status: "Active" },
  { id: 2, user: "Ahmed Hassan", plan: "06 Months", startDate: "2024-01-15", expiryDate: "2025-01-15", status: "Active" },
  { id: 3, user: "Ahmed Hassan", plan: "12 Months", startDate: "2024-01-15", expiryDate: "2025-01-15", status: "Active" },
  { id: 4, user: "Ahmed Hassan", plan: "06 Months", startDate: "2024-01-15", expiryDate: "2025-01-15", status: "Pending" },
  { id: 5, user: "Ahmed Hassan", plan: "12 Months", startDate: "2024-01-15", expiryDate: "2025-01-15", status: "Active" },
  { id: 6, user: "Ahmed Hassan", plan: "06 Months", startDate: "2024-01-15", expiryDate: "2025-01-15", status: "Expired" },
  { id: 7, user: "Ahmed Hassan", plan: "12 Months", startDate: "2024-01-15", expiryDate: "2025-01-15", status: "Active" },
];

export default function SubscriptionsPage() {
  const activeCount = subscriptions.filter((s) => s.status === "Active").length;
  const pendingCount = subscriptions.filter((s) => s.status === "Pending").length;
  const expiredCount = subscriptions.filter((s) => s.status === "Expired").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
            Active
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            Pending
          </span>
        );
      case "Expired":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
            Expired
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="mx-auto  space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all your active subscription plans.</p>
        </div>

        {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
  {/* Search - 3/5 */}
  <div className="relative w-full sm:flex-[4]">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      type="text"
      placeholder="Search By User Name..."
      className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
    />
  </div>

  {/* Dropdown - 2/5 */}
  <select className="w-full sm:flex-[2] px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100">
    <option>All</option>
    <option>Active</option>
    <option>Pending</option>
    <option>Expired</option>
  </select>
</div>


        {/* Statistic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Active Subscriptions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
            <div className="">
              <div className="w-10 h-10 bg-[#2B7FFF] rounded-lg flex items-center justify-center text-white text-2xl">
                <Users/>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Subscriptions</p>
              <p className="text-2xl font-bold text-gray-900">{String(activeCount).padStart(2, "0")}</p>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
            <div className="">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Clock8 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900">{String(pendingCount).padStart(2, "0")}</p>
            </div>
          </div>

          {/* Expired Subscriptions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
            <div className="">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Expired Subscriptions</p>
              <p className="text-2xl font-bold text-gray-900">{String(expiredCount).padStart(2, "0")}</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">User</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Plan</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Start Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Expiry Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{sub.user}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {sub.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sub.startDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sub.expiryDate}</td>
                    <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition-colors">
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors">
                          <XCircle className="w-5 h-5" />
                        </button>
                        <button className="text-purple-600 hover:bg-purple-50 p-2 rounded-lg transition-colors">
                          <FiArrowUpCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}