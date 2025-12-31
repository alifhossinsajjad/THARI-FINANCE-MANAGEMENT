"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function AccountSetting() {
  // State for testing purposes
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@investtrack.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    console.log("Updating Profile with state:", profileData);
    alert("Profile changes saved locally! Check console for data.");
  };

  return (
    <div className=" bg-gray-50  font-sans w-full py-6">
      {/* Container - Full Width */}
      <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        {/* Admin Profile Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800">Admin Profile</h2>

          <div className="space-y-4">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-10 border-gray-100" />

        {/* Change Password Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800">Change Password</h2>

          <div className="space-y-4">
            {/* Current Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                placeholder="••••••••"
                value={profileData.currentPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
              />
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="••••••••"
                value={profileData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
              />
            </div>

            {/* Confirm New Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={profileData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Update Profile Button */}
        <div className="mt-10">
          <button
            onClick={handleUpdate}
            className="flex items-center gap-2 px-6 py-3 bg-[#00008B] cursor-pointer hover:bg-blue-900 text-white font-semibold rounded-lg transition-all shadow-md active:scale-95"
          >
            <Save size={18} />
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
