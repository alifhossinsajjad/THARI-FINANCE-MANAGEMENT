"use client";

import { useState, useRef } from "react";
import {
  User,
  ShieldCheck,
  Bell,
  Mail,
  Phone,
  Briefcase,
  Building2,
  Calendar,
  Camera,
  Save,
  Key,
} from "lucide-react";

export default function ProfileSettings() {
  // 1. Tab System State
  const [activeTab, setActiveTab] = useState("Personal Info");

  // 2. Form Data State
  const [profileData, setProfileData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@investtrack.com",
    phone: "+1 234 567 8900",
    position: "System Administrator",
    department: "IT & Operations",
    joinDate: "2025-01-15",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 3. Configuration & Security States
  const [securityConfig, setSecurityConfig] = useState({
    twoFactor: false,
  });

  // Updated Notification State to match the UI in image_744136.png
  const [notifConfig, setNotifConfig] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newUserRegistrations: true,
    securityAlerts: false,
    newUserRegistrationsAlt: false,
    systemUpdates: true,
    weeklyReports: false,
  });

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const toggleNotif = (key: keyof typeof notifConfig) => {
    setNotifConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { name: "Personal Info", icon: <User size={18} /> },
    { name: "Security", icon: <ShieldCheck size={18} /> },
    { name: "Notifications", icon: <Bell size={18} /> },
  ];

  // Reusable Toggle Component for the Notifications Tab
  const ToggleRow = ({
    label,
    sub,
    active,
    onClick,
  }: {
    label: string;
    sub: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm mb-3">
      <div>
        <h4 className="text-sm font-semibold text-gray-800">{label}</h4>
        <p className="text-xs text-gray-500">{sub}</p>
      </div>
      <button
        onClick={onClick}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          active ? "bg-blue-900" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            active ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-500">
          View and update your personal information.
        </p>
      </div>

      {/* 1. Top Profile Card */}
      <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6 flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden border-4 border-white shadow-sm">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              "AU"
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Camera size={16} className="text-gray-600" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-900">
            {profileData.firstName} {profileData.lastName}
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            {profileData.position}
          </p>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Mail size={14} /> {profileData.email}
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Phone size={14} /> {profileData.phone}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Tab Navigation */}
      <div className="flex items-center border-b border-gray-200 mb-8 gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 pb-4 text-sm font-medium transition-all relative ${
              activeTab === tab.name
                ? "text-blue-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.icon}
            {tab.name}
            {activeTab === tab.name && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-900 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* 3. Main Content Container */}
      <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        {/* PERSONAL INFO TAB */}
        {activeTab === "Personal Info" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  First Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
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
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Position
                </label>
                <div className="relative">
                  <Briefcase
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="position"
                    value={profileData.position}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Department
                </label>
                <div className="relative">
                  <Building2
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="department"
                    value={profileData.department}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Join Date
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="date"
                  name="joinDate"
                  value={profileData.joinDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded-lg shadow-md transition-all active:scale-95">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === "Security" && (
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">
                Change Password
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">
                    Current Password
                  </label>
                  <div className="relative">
                    <Key
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="password"
                      placeholder="Enter current password"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">
                    New Password
                  </label>
                  <div className="relative">
                    <Key
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="password"
                      placeholder="New password"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Key
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="password"
                      placeholder="Confirm New password"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

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
                  onClick={() =>
                    setSecurityConfig({ twoFactor: !securityConfig.twoFactor })
                  }
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                    securityConfig.twoFactor ? "bg-blue-900" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      securityConfig.twoFactor
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded-lg shadow-md transition-all active:scale-95">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB - Updated to match Image_744136.png */}
        {activeTab === "Notifications" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* General Notifications Section */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">
                General Notifications
              </h3>
              <ToggleRow
                label="Email Notifications"
                sub="Receive notifications via email"
                active={notifConfig.emailNotifications}
                onClick={() => toggleNotif("emailNotifications")}
              />
              <ToggleRow
                label="Push Notifications"
                sub="Receive push notifications in browser"
                active={notifConfig.pushNotifications}
                onClick={() => toggleNotif("pushNotifications")}
              />
            </section>

            {/* Activity Alerts Section */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">
                Activity Alerts
              </h3>
              <ToggleRow
                label="New User Registrations"
                sub="Get notified when new users register"
                active={notifConfig.newUserRegistrations}
                onClick={() => toggleNotif("newUserRegistrations")}
              />
              <ToggleRow
                label="Security Alerts"
                sub="Important security notifications"
                active={notifConfig.securityAlerts}
                onClick={() => toggleNotif("securityAlerts")}
              />
              <ToggleRow
                label="New User Registrations"
                sub="Get notified when new users register"
                active={notifConfig.newUserRegistrationsAlt}
                onClick={() => toggleNotif("newUserRegistrationsAlt")}
              />
              <ToggleRow
                label="System Updates"
                sub="Platform maintenance and updates"
                active={notifConfig.systemUpdates}
                onClick={() => toggleNotif("systemUpdates")}
              />
              <ToggleRow
                label="Weekly Reports"
                sub="Summary of platform activity"
                active={notifConfig.weeklyReports}
                onClick={() => toggleNotif("weeklyReports")}
              />
            </section>

            {/* Save Button for Preferences */}
            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded-lg shadow-md transition-all active:scale-95">
                <Save size={18} /> Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
