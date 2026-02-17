"use client";

import { useState } from "react";
import { Key, Save } from "lucide-react";
import { useUpdateAdminPasswordMutation } from "@/Redux/features/AdminDashboard/adminProfile/adminProfileApi";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

export default function SecurityTab() {
  const [updatePassword, { isLoading }] = useUpdateAdminPasswordMutation();

  // Local state for password fields
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSave = async () => {
    try {
      const res: any = await updatePassword({
        current_password: passwords.current,
        new_password: passwords.new,
        new_password_confirmation: passwords.confirm,
      }).unwrap();

      if (res.success) {
        toast.success(res.message || "Password updated successfully!");
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        toast.error(res.message || "Failed to update password");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="space-y-8">
      {/* Change Password Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800">Change Password</h3>
        <div className="space-y-4">
          {["current", "new", "confirm"].map((field) => (
            <div key={field} className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                {field === "current"
                  ? "Current Password"
                  : field === "new"
                    ? "New Password"
                    : "Confirm New Password"}
              </label>
              <div className="relative">
                <Key
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  name={field}
                  placeholder={
                    field === "current"
                      ? "Enter current password"
                      : field === "new"
                        ? "New password"
                        : "Confirm new password"
                  }
                  value={passwords[field as keyof typeof passwords]}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-1">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <BeatLoader size={8} color="#fff" /> Saving...
            </div>
          ) : (
            <>
              <Save size={18} /> Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}
