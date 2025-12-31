"use client";

import { useState, useRef } from "react";
import { Upload, Save } from "lucide-react";

export default function PlatformSettings() {
  // 1. States for text and logo
  const [formData, setFormData] = useState({
    platformName: "InvestTrack Pro....",
    contactEmail: "admin@investtrack.com",
    supportEmail: "support@investtrack.com",
  });

  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a temporary URL for testing/previewing the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    console.log("Current State Data:", { ...formData, logo });
    alert("Data and Image saved to state! Check console.");
  };

  return (
    <div className=" bg-gray-50  font-sans w-full">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-[#968C8C] text-base mt-1">
          Control how things work for you
        </p>
      </div>

      {/* Main Card Container - Full Width */}
      <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        {/* Platform Information Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Platform Information
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Platform Name
              </label>
              <input
                type="text"
                name="platformName"
                value={formData.platformName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Support Email
              </label>
              <input
                type="email"
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Platform Logo Section */}
        <div className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Platform Logo</h2>

          <div className="flex items-center gap-4">
            {/* Logo Preview Area */}
            <div className="w-20 h-20 border-2 border-blue-800 rounded-xl flex items-center justify-center bg-white overflow-hidden">
              {logo ? (
                <img
                  src={logo}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-blue-800 font-medium text-sm">Logo</span>
              )}
            </div>

            {/* Hidden Native Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoUpload}
              accept="image/*"
              className="hidden"
            />

            {/* Upload Button */}
            <button
              type="button"
              onClick={triggerFileInput}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors border border-gray-200 shadow-sm"
            >
              <Upload size={18} />
              Upload Logo
            </button>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="mt-10">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-[#00008B] cursor-pointer hover:bg-blue-900 text-white font-semibold rounded-xl transition-all shadow-md active:scale-95"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
