"use client";

import { useState } from "react";
import { Key, Save } from "lucide-react";

export default function SecurityTab() {
  // Local state for password fields
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Local state for two-factor toggle
  const [twoFactor, setTwoFactor] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Example submit handler
  const handleSave = () => {
    // Here you can call your API
    console.log("Password change request:", passwords);
    console.log("Two-factor enabled:", twoFactor);
    alert("Settings saved!");
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

      {/* Two-Factor Authentication Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">
          Two-Factor Authentication
        </h3>
        <div className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div>
            <h4 className="text-base font-semibold text-gray-800">
              Enable Two-Factor Authentication
            </h4>
            <p className="text-sm text-gray-500">
              Add an extra layer of security to your account
            </p>
          </div>
          <button
            onClick={() => setTwoFactor(!twoFactor)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
              twoFactor ? "bg-blue-900" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                twoFactor ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded-lg shadow-md transition-all active:scale-95"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
}
