// app/admin/communications/page.tsx
"use client";

import { useState } from "react";
import { Mail, CheckCircle, Circle, Send } from "lucide-react";

type Message = {
  id: number;
  sender: string;
  email: string;
  subject: string;
  preview: string;
  date: string;
  replied: boolean;
  read: boolean;
};

export default function CommunicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Unread" | "Read">(
    "All"
  );

  const messages: Message[] = [
    {
      id: 1,
      sender: "Ahmed Hassan",
      email: "ahmed@example.com",
      subject: "Question about Elite Features",
      preview: "I would like to know more about the Elite features...",
      date: "2024-12-15",
      replied: false,
      read: false,
    },
    {
      id: 2,
      sender: "Fatima Ali",
      email: "fatima@example.com",
      subject: "Account Issue",
      preview: "I am having trouble accessing my account...",
      date: "2024-12-14",
      replied: true,
      read: true,
    },
    {
      id: 3,
      sender: "Fatima Ali",
      email: "fatima@example.com",
      subject: "Account Issue",
      preview: "I am having trouble accessing my account...",
      date: "2024-12-14",
      replied: true,
      read: true,
    },
    // Add more dummy messages as needed
  ];

  const unreadCount = messages.filter((m) => !m.read).length;

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.preview.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStatus = true;
    if (statusFilter === "Unread") matchesStatus = !msg.read;
    if (statusFilter === "Read") matchesStatus = msg.read;

    return matchesSearch && matchesStatus;
  });

  const handleMarkRead = (id: number) => {
    // In real app: update state / API
    alert(
      `Marked message ${id} as ${messages.find((m) => m.id === id)?.read ? "Unread" : "Read"
      }`
    );
  };

  const handleReply = (id: number) => {
    // Open reply modal / editor
    alert(`Reply to message ${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Communications
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage messages, announcements, and updates.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setStatusFilter("All")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${statusFilter === "All"
                ? "bg-primary text-white cursor-pointer"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
              }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("Unread")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${statusFilter === "Unread"
                ? "bg-primary text-white cursor-pointer"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
              }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setStatusFilter("Read")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${statusFilter === "Read"
                ? "bg-primary text-white cursor-pointer"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
              }`}
          >
            Read
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-200">
            No messages found matching your filters.
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-xl shadow-sm border ${!msg.read ? "border-blue-200 bg-blue-50/30" : "border-gray-200"
                } overflow-hidden hover:shadow-md transition-shadow`}
            >
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {/* Left: Sender + Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={18} className="text-gray-500 shrink-0" />
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {msg.sender}{" "}
                        <span className="text-sm text-gray-500">
                          ({msg.email})
                        </span>
                      </h3>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">
                        {msg.subject}
                      </p>
                    </div>
                    {msg.replied && (
                      <span className="ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={14} /> Replied
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {msg.preview}
                  </p>

                  <p className="text-xs text-gray-500 mt-3">{msg.date}</p>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-row sm:flex-col gap-3 sm:gap-2 shrink-0">
                  <button
                    onClick={() => handleReply(msg.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-[#00006B] text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    <Send size={16} /> Reply
                  </button>
                  <button
                    onClick={() => handleMarkRead(msg.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    {msg.read ? (
                      <>
                        <Circle size={16} /> Mark Unread
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} /> Mark Read
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
