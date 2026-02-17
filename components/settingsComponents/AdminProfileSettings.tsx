"use client";

import { useState, useRef, useEffect } from "react";
import { User, ShieldCheck, Bell, Mail, Phone, Camera } from "lucide-react";
import PersonalInfoTab from "./settingTabComponent/PersonalInfoTab";
import SecurityTab from "./settingTabComponent/SecurityTab";
import AdminNotificationsTab from "./settingTabComponent/AdminNotificationsTab";
import gsap from "gsap";

export default function ProfileSettings() {
  // 1. Tab System State
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Ref to the tab content container
  const tabContentRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { name: "Personal Info", icon: <User size={18} /> },
    { name: "Security", icon: <ShieldCheck size={18} /> },
    { name: "Notifications", icon: <Bell size={18} /> },
  ];

  // Animate tab content on tab change
  // Animate tab content sliding in from right
  useEffect(() => {
    if (tabContentRef.current) {
      gsap.fromTo(
        tabContentRef.current,
        { opacity: 0, x: 250 }, // start 50px right
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, // animate to position
      );
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans w-full  overflow-x-hidden">
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
          <h2 className="text-xl font-bold text-gray-900">First name</h2>
          <p className="text-gray-500 text-sm font-medium">position here</p>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Mail size={14} /> x@gmail.com
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Phone size={14} /> 10177777777777
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
            className={`flex items-center gap-2 pb-4 cursor-pointer text-sm font-medium transition-all relative ${
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
      <div
        ref={tabContentRef}
        className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-8 overflow-x-hidden"
      >
        {/* PERSONAL INFO TAB */}
        {activeTab === "Personal Info" && <PersonalInfoTab />}

        {/* SECURITY TAB */}
        {activeTab === "Security" && <SecurityTab />}

        {/* NOTIFICATIONS TAB - Updated to match Image_744136.png */}
        {activeTab === "Notifications" && <AdminNotificationsTab />}
      </div>
    </div>
  );
}
