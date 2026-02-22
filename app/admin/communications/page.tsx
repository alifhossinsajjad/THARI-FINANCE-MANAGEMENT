// app/admin/communications/page.tsx
"use client";

import { Mail, Send } from "lucide-react";
import { useGetAdminAllMessageQuery } from "@/Redux/features/AdminDashboard/Communications/adminCommunicationsApi";

import { useRouter } from "next/navigation";

function MessageSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 animate-pulse">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-5 w-5 rounded bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-64 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded mt-2" />

          <div className="h-3 w-24 bg-gray-200 rounded mt-4" />
        </div>

        <div className="shrink-0">
          <div className="h-10 w-40 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function CommunicationsPage() {
  const router = useRouter();
  const { data, isLoading, isFetching, isError } = useGetAdminAllMessageQuery(
    {},
  );
  console.log("here is message", data);

  const messages = data?.data || [];
  console.log("here is singelmessage", messages);

  //  Modal State
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedReceiverId, setSelectedReceiverId] = useState<
  //   string | number | null
  // >(null);
  // const handleReply = (id: string | number) => {
  //   setSelectedReceiverId(id);
  //   setIsModalOpen(true);
  // };

  const handleGoToMessages = (id: number | string) => {
    router.push(`/admin/communications/${id}`);
  };
  const loading = isLoading || isFetching;

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

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <>
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
          </>
        ) : isError ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-200">
            Failed to load messages. Please try again.
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-200">
            No messages found matching your filters.
          </div>
        ) : (
          messages.map((msg: any) => (
            <div
              key={msg.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {/* Left: Sender + Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={18} className="text-gray-500 shrink-0" />
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        <span className="text-sm text-gray-500">
                          {msg.sender?.name}
                        </span>
                      </h3>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">
                        {msg?.message}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {msg.preview}
                  </p>

                  <p className="text-xs text-gray-500 mt-3">{msg.date}</p>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-row sm:flex-col gap-3 sm:gap-2 shrink-0">
                  <button
                    onClick={() => handleGoToMessages(msg?.receiver_id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-[#00006B] text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    <Send size={16} /> Read all message
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* <ReplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        receiver={selectedReceiverId}
      /> */}
    </div>
  );
}
