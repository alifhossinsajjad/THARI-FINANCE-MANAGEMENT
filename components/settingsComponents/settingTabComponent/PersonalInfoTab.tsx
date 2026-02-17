"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, Briefcase, Save } from "lucide-react";
import {
  useGetAdminProfileInfoQuery,
  useUpdateAdminProfileMutation,
} from "@/Redux/features/AdminDashboard/adminProfile/adminProfileApi";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

export default function PersonalInfoTab() {
  const [updateAdminProfile, { isLoading }] = useUpdateAdminProfileMutation();

  const { data } = useGetAdminProfileInfoQuery({});
  const user = data?.data;

  // Initialize state after fetching user data
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const res: any = await updateAdminProfile(profileData).unwrap();
      console.log("Updated response:", res);

      if (res.success) {
        toast.success(res.message || "Profile updated successfully");

        // Using any to avoid type errors
        setProfileData((prev: any) => ({
          ...prev,
          name: res.data.name,
          phone: res.data.phone,
        }));
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch (err: any) {
      console.error("Failed to update profile:", err);
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Name</label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Email (read-only) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Email Address
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              name="email"
              value={profileData.email}
              readOnly
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <div className="relative">
            <Phone
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Role (read-only) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Role</label>
          <div className="relative">
            <Briefcase
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              name="role"
              value={profileData.role}
              readOnly
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleUpdateProfile}
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
