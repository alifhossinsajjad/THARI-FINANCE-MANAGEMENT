"use client";

import { useState } from "react";
import { Calendar, Clock, Send, Users, Crown } from "lucide-react";

type Notification = {
  id: number;
  title: string;
  message: string;
  target: string;
  scheduledFor: string;
  status: "Sent" | "Scheduled";
};

const initialHistory: Notification[] = [
  {
    id: 1,
    title: "Market Update",
    message: "Big changes in the market today!",
    target: "All",
    scheduledFor: "2024-12-15 09:00",
    status: "Sent",
  },
  {
    id: 2,
    title: "Bank of America",
    message: "New features available for premium users",
    target: "Elite",
    scheduledFor: "2024-12-15 09:00",
    status: "Scheduled",
  },
];

export default function PushNotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetAudience, setTargetAudience] = useState("All");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("09:00 AM");

  const handleSendNow = () => {
    console.log("Send Now:", { title, message, targetAudience });
  };

  const handleSchedule = () => {
    console.log("Schedule:", {
      title,
      message,
      targetAudience,
      scheduleDate,
      scheduleTime,
    });
  };

  return (
    <div className="min-h-screen ">
      <div className=" mx-auto  space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create Push Notification
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage push notifications for your users.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Notification title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Notification message"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
            />
          </div>

          {/* Target Audience, Schedule Date, Schedule Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 appearance-none bg-white"
              >
                <option>All</option>
                <option>Elite</option>
                <option>Premium</option>
                <option>Basic</option>
              </select>
            </div>

            {/* Schedule Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schedule Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  placeholder="mm/dd/yyyy"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Schedule Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schedule Time
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  placeholder="09:00 AM"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSendNow}
              className="bg-blue-600 text-white font-medium rounded-lg px-6 py-3 flex items-center gap-2 hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Send Now
            </button>
            <button
              onClick={handleSchedule}
              className="bg-neutral-400 text-gray-800 font-medium rounded-lg px-6 py-3 flex items-center gap-2  transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              Schedule
            </button>
            <button className="text-gray-600 font-medium rounded-lg px-6 py-3 bg-gray-200  transition-colors cursor-pointer">
              Cancel
            </button>
          </div>
        </div>

        {/* Notification History */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Notification History
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Title
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Message
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Target
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Scheduled For
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {initialHistory.map((notif) => (
                    <tr
                      key={notif.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {notif.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {notif.message}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {notif.target === "All" ? (
                            <>
                              <Users className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-gray-700">All</span>
                            </>
                          ) : (
                            <>
                              <Crown className="w-4 h-4 text-purple-600" />
                              <span className="text-sm text-purple-700 font-medium">
                                {notif.target}
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {notif.scheduledFor}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                            notif.status === "Sent"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {notif.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
