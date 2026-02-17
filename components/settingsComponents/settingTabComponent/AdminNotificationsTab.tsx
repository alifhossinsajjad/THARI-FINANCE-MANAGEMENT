"use client";

import { useState } from "react";
import { Save } from "lucide-react";

// Simple toggle row component
function ToggleRow({
  label,
  sub,
  active,
  onClick,
}: {
  label: string;
  sub: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div>
        <h4 className="text-base font-semibold text-gray-800">{label}</h4>
        <p className="text-sm text-gray-500">{sub}</p>
      </div>
      <button
        onClick={onClick}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
          active ? "bg-blue-900" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            active ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function AdminNotificationsTab() {
  // Local state for notification toggles
  const [notifConfig, setNotifConfig] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newUserRegistrations: true,
    newUserRegistrationsAlt: false,
    securityAlerts: true,
    systemUpdates: false,
    weeklyReports: true,
  });

  // Toggle handler
  const toggleNotif = (key: keyof typeof notifConfig) => {
    setNotifConfig((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Save handler
  const handleSave = () => {
    console.log("Notification settings saved:", notifConfig);
    alert("Notification preferences saved!");
  };

  return (
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
        <h3 className="text-lg font-bold text-gray-800">Activity Alerts</h3>
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

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded-lg shadow-md transition-all active:scale-95"
        >
          <Save size={18} /> Save Preferences
        </button>
      </div>
    </div>
  );
}
