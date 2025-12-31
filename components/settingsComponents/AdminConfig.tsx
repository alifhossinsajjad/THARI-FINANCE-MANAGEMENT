"use client";

import { useState } from "react";

export default function AdminConfig() {
    // State to manage toggle switches for testing
    const [config, setConfig] = useState({
        emailNotif1: true,
        emailNotif2: true,
        emailNotif3: false,
    });

    const toggleSwitch = (key: keyof typeof config) => {
        setConfig((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className=" py-6 bg-gray-50  font-sans w-full">
            {/* Main Card Container - Full Width */}
            <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-8">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800">System Configuration</h2>
                </div>

                {/* Configuration Items */}
                <div className="space-y-4">

                    {/* Row 1 */}
                    <div className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <div>
                            <h3 className="text-base font-semibold text-gray-800">Email Notifications</h3>
                            <p className="text-sm text-gray-500">Send email notifications to users</p>
                        </div>
                        <button
                            onClick={() => toggleSwitch("emailNotif1")}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${config.emailNotif1 ? "bg-[#000080]" : "bg-gray-300"
                                }`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${config.emailNotif1 ? "translate-x-6" : "translate-x-1"
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Row 2 */}
                    <div className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <div>
                            <h3 className="text-base font-semibold text-gray-800">Email Notifications</h3>
                            <p className="text-sm text-gray-500">Send email notifications to users</p>
                        </div>
                        <button
                            onClick={() => toggleSwitch("emailNotif2")}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${config.emailNotif2 ? "bg-[#000080]" : "bg-gray-300"
                                }`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${config.emailNotif2 ? "translate-x-6" : "translate-x-1"
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Row 3 */}
                    <div className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <div>
                            <h3 className="text-base font-semibold text-gray-800">Email Notifications</h3>
                            <p className="text-sm text-gray-500">Send email notifications to users</p>
                        </div>
                        <button
                            onClick={() => toggleSwitch("emailNotif3")}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${config.emailNotif3 ? "bg-[#000080]" : "bg-gray-300"
                                }`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${config.emailNotif3 ? "translate-x-6" : "translate-x-1"
                                    }`}
                            />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}