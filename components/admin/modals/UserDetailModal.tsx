"use client";

import { X } from "lucide-react";
import type { UserDetailModalProps } from "@/types";

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  if (!isOpen || !user) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">User Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Name
            </label>
            <div className="text-sm text-gray-600">{user?.name || "..."}</div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email
            </label>
            <div className="text-sm text-gray-600">{user?.email}</div>
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Role
            </label>
            <div className="text-sm text-gray-600">{user?.role}</div>
          </div>

          {/* Subscription Status Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Subscription Status
            </label>
            <div className="text-sm text-gray-600">{user?.subscription}</div>
          </div>

          {/* Account Status Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Account Status
            </label>
            <div className="text-sm text-gray-600">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user?.status
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {user?.status ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
