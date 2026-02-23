// app/admin/communications/page.tsx
"use client";

import { Search, User, ChevronRight, MessageSquare } from "lucide-react";
import { useGetAdminAllMessageQuery } from "@/Redux/features/AdminDashboard/Communications/adminCommunicationsApi";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

function MessageSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-gray-100 rounded" />
          <div className="h-3 w-48 bg-gray-100 rounded" />
        </div>
        <div className="w-16 h-3 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

export default function CommunicationsPage() {
  const user = useSelector(selectCurrentUser);
  console.log("iam the user from message page", user);
  const router = useRouter();
  const { data, isLoading, isError } = useGetAdminAllMessageQuery({});

  const messages = data || [];

  const handleGoToMessages = (id: number | string) => {
    router.push(`/admin/communications/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Messages
          </h1>
          <p className="text-gray-500 mt-1">
            Manage support requests and user inquiries
          </p>
        </div>

        <div className="relative group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search conversations..."
            className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary/50 outline-none transition-all w-full md:w-64"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="grid gap-3">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <MessageSkeleton key={i} />)
        ) : isError ? (
          <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100">
            <p className="font-semibold">Failed to load conversations</p>
            <p className="text-sm opacity-80">
              Please refresh the page or try again later.
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-gray-50 p-12 rounded-3xl text-center border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No messages yet</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
              When users reach out for support, their conversations will appear
              here.
            </p>
          </div>
        ) : (
          messages.map((msg: any) => (
            <div
              key={msg.id}
              onClick={() => handleGoToMessages(msg.sender_id === 1 ? msg.receiver_id : msg.sender_id)}
              className="group bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all cursor-pointer"
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <User size={24} />
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-base font-bold text-gray-900 truncate">
                    {msg.sender_id === 1 ? (msg.receiver?.name || `User #${msg.receiver_id}`) : (msg.sender?.name || `User #${msg.sender_id}`)}
                  </h3>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    {msg.created_at
                      ? format(new Date(msg.created_at), "MMM d")
                      : ""}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-gray-500 truncate leading-relaxed">
                    {msg.message}
                  </p>
                  <ChevronRight
                    size={16}
                    className="text-gray-300 group-hover:text-primary transition-colors transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
