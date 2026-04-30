// "use client";

// import { Mail, Send } from "lucide-react";
// import { useGetAdminAllMessageQuery } from "@/Redux/features/AdminDashboard/Communications/adminCommunicationsApi";
// import { useRouter } from "next/navigation";

// function MessageSkeleton() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
//       <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 animate-pulse">
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-3 mb-3">
//             <div className="h-5 w-5 rounded bg-gray-200" />
//             <div className="space-y-2">
//               <div className="h-4 w-32 bg-gray-200 rounded" />
//               <div className="h-4 w-64 bg-gray-200 rounded" />
//             </div>
//           </div>

//           <div className="h-4 w-5/6 bg-gray-200 rounded" />
//           <div className="h-4 w-2/3 bg-gray-200 rounded mt-2" />

//           <div className="h-3 w-24 bg-gray-200 rounded mt-4" />
//         </div>

//         <div className="shrink-0">
//           <div className="h-10 w-40 bg-gray-200 rounded-lg" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function CommunicationsPage() {
//   // const user = useSelector(selectCurrentUser);
//   const router = useRouter();

//   const { data, isLoading, isFetching, isError } = useGetAdminAllMessageQuery(
//     {},
//   );

//   console.log("iam the message", data);

//   // 🔥 FIXED HERE (MAIN BUG)
//   const messages = Array.isArray(data) ? data : [];

//   const handleGoToMessages = (id: number | string) => {
//     router.push(`/admin/communications/${id}`);
//   };

//   const loading = isLoading || isFetching;

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//           Communications
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage messages, announcements, and updates.
//         </p>
//       </div>

//       <div className="space-y-4">
//         {loading ? (
//           <>
//             <MessageSkeleton />
//             <MessageSkeleton />
//             <MessageSkeleton />
//           </>
//         ) : isError ? (
//           <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-200">
//             Failed to load messages. Please try again.
//           </div>
//         ) : messages.length === 0 ? (
//           <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-200">
//             No messages found matching your filters.
//           </div>
//         ) : (
//           messages.map((msg: any) => {
//             const lastMessage =
//               msg?.messages?.length > 0
//                 ? msg.messages[msg.messages.length - 1]
//                 : null;

//             // Uses REAL receiver_id from your shown data
//             // const receiverId = lastMessage?.receiver_id;
//             const receiverId = lastMessage?.sender_id;

//             return (
//               <div
//                 key={msg.id}
//                 className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
//               >
//                 <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-3 mb-2">
//                       <Mail size={18} className="text-gray-500 shrink-0" />
//                       <div>
//                         <h3 className="text-base font-semibold text-gray-900">
//                           <span className="text-sm text-gray-500">
//                             {msg?.name || `User #${msg.id}`}
//                           </span>
//                         </h3>

//                         <p className="text-sm font-medium text-gray-800 mt-0.5">
//                           {lastMessage?.message || "No messages yet"}
//                         </p>
//                       </div>
//                     </div>

//                     <p className="text-sm text-gray-600">
//                       Total Messages: {msg?.messages?.length || 0}
//                     </p>

//                     {lastMessage?.created_at && (
//                       <p className="text-xs text-gray-500 mt-3">
//                         {lastMessage.created_at}
//                       </p>
//                     )}
//                   </div>

//                   <div className="flex flex-row sm:flex-col gap-3 sm:gap-2 shrink-0">
//                     <button
//                       onClick={() =>
//                         receiverId && handleGoToMessages(receiverId)
//                       }
//                       className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-[#00006B] text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
//                     >
//                       <Send size={16} /> Read all message
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import {
  Mail,
  Send,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useGetAdminAllMessageQuery } from "@/Redux/features/AdminDashboard/Communications/adminCommunicationsApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [page, setPage] = useState(1);
  const itemsPerPage = 5; // Number of conversations per page

  const messages = Array.isArray(data) ? data : [];
  const filteredMessages = messages.filter((msg) => msg.messages?.length > 0);

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedMessages = filteredMessages.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

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
        ) : paginatedMessages.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-200">
            No messages found matching your filters.
          </div>
        ) : (
          paginatedMessages.map((msg: any) => {
            const lastMessage = msg.messages[msg.messages.length - 1];
            const receiverId = lastMessage?.sender_id;

            return (
              <div
                key={msg.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  {/* Left: User + Last Message */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail size={18} className="text-gray-500 shrink-0" />
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          <span className="text-sm text-gray-500">
                            {msg?.name || `User #${msg.id}`}
                          </span>
                        </h3>

                        <p className="text-sm font-medium text-gray-800 mt-0.5">
                          {lastMessage?.message || "No messages yet"}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">
                      Total Messages: {msg?.messages?.length || 0}
                    </p>

                    {lastMessage?.created_at && (
                      <p className="text-xs text-gray-500 mt-3">
                        {lastMessage.created_at}
                      </p>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-row sm:flex-col gap-3 sm:gap-2 shrink-0">
                    <button
                      onClick={() =>
                        receiverId && handleGoToMessages(receiverId)
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-[#00006B] text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
                    >
                      <Send size={16} /> Read all message
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="w-full py-4 rounded-b-lg flex justify-center items-center gap-2">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1 || isFetching}
            className="text-gray-500 cursor-pointer hover:text-[#484D9B] p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsLeft size={20} />
          </button>

          <button
            onClick={() => page > 1 && setPage(page - 1)}
            disabled={page === 1 || isFetching}
            className="text-gray-500 cursor-pointer hover:text-[#484D9B] p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              disabled={isFetching}
              className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center text-lg font-semibold transition ${
                page === p
                  ? "bg-[#484D9B] text-white shadow-md"
                  : "text-gray-700 bg-gray-100 hover:bg-gray-200"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => page < totalPages && setPage(page + 1)}
            disabled={page === totalPages || isFetching}
            className="text-gray-500 cursor-pointer hover:text-[#484D9B] p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>

          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages || isFetching}
            className="text-gray-500 cursor-pointer hover:text-[#484D9B] p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
