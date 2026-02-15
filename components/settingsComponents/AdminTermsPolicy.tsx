"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";

export default function AdminTermsPolicy() {
    // State for testing purposes to keep data workable
    const [policyData, setPolicyData] = useState({
        termsOfService: "Terms of Service content...",
        privacyPolicy: "Privacy Policy content...",
    });

    // Handler to update state
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPolicyData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Temporary Save Function for testing
    const handleUpdate = () => {
        console.log("Saving Terms & Privacy to state:", policyData);
        alert("Terms & Privacy updated locally! Check console for data.");
    };

    return (
        <div className=" bg-gray-50  font-sans w-full">
            {/* Main Card Container - Full Width */}
            <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-8">

                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800">Terms & Privacy Policy</h2>
                </div>

                <div className="space-y-8">
                    {/* Terms of Service Section */}
                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-gray-600">Terms of Service</label>
                        <textarea
                            name="termsOfService"
                            value={policyData.termsOfService}
                            onChange={handleChange}
                            rows={8}
                            placeholder="Terms of Service content..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800 resize-none text-sm placeholder:text-gray-400"
                        />
                    </div>

                    {/* Privacy Policy Section */}
                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-gray-600">Privacy Policy</label>
                        <textarea
                            name="privacyPolicy"
                            value={policyData.privacyPolicy}
                            onChange={handleChange}
                            rows={8}
                            placeholder="Privacy Policy content..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800 resize-none text-sm placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* Update Button */}
                <div className="mt-10">
                    <button
                        onClick={handleUpdate}
                        className="flex items-center gap-2 px-6 py-3 bg-[#00008B] cursor-pointer hover:bg-blue-900 text-white font-semibold rounded-lg transition-all shadow-md active:scale-95"
                    >
                        <Save size={18} />
                        Update Terms & Privacy
                    </button>
                </div>

            </div>
        </div>
    );
}