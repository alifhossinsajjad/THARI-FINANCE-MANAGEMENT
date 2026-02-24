// "use client";

// import { useGetSingleAllMessageQuery } from "@/Redux/features/AdminDashboard/Communications/adminCommunicationsApi";
// import { useParams, useRouter } from "next/navigation";
// import { useState, useRef, useEffect } from "react";
// import { ArrowLeft, Send } from "lucide-react";
// import { useAdminReplayMessageMutation } from "@/Redux/features/AdminDashboard/Communications/adminCommunicationsApi";
// import { toast } from "sonner";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "@/Redux/features/auth/authSlice";

// export default function UserMessagesPage() {
//   const router = useRouter();
//   const params = useParams();
//   const userId = params.id;
//   console.log("iam the params", userId);

//   const currentUser = useSelector(selectCurrentUser);

//   const { data, isLoading, refetch } = useGetSingleAllMessageQuery(userId);
//   console.log("i am the user specific data all message", data);

//   // IMPORTANT: ensure oldest -> newest order (Messenger style)
//   const messages = (data?.data || [])
//     .slice()
//     .sort(
//       (a: any, b: any) =>
//         new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
//     );

//   const [reply, setReply] = useState("");
//   const [sendMessage, { isLoading: isSending }] =
//     useAdminReplayMessageMutation();

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Auto scroll to bottom (instant like Messenger)
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
//   }, [messages]);

//   const handleSendReply = async () => {
//     if (!reply.trim()) return;

//     try {
//       const payload = {
//         receiver_id: userId,
//         message: reply,
//       };

//       const res = await sendMessage(payload).unwrap();

//       if (res.status) {
//         toast.success(res.message || "Message sent");
//         setReply("");
//         refetch();
//       } else {
//         toast.error(res.message || "Failed to send message");
//       }
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Something went wrong");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[60vh]">
//         Loading messages...
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-[80vh] border rounded-2xl bg-gray-50 shadow-md">
//       {/* Header */}
//       <div className="flex items-center gap-3 p-4 border-b bg-white rounded-t-2xl">
//         <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
//         <h2 className="font-semibold text-lg">Conversation</h2>
//       </div>

//       {/* Messages Area (BOTTOM ANCHORED LIKE MESSENGER) */}
//       <div className="flex-1 overflow-y-auto px-4 py-3">
//         <div className="flex flex-col justify-end min-h-full space-y-2">
//           {messages.map((msg: any) => {
//             const isAdmin = msg.sender_id === currentUser?.id;

//             return (
//               <div
//                 key={msg.id}
//                 className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`
//                     px-4 py-2
//                     max-w-[75%]
//                     rounded-2xl
//                     text-sm
//                     shadow-sm
//                     break-words
//                     ${
//                       isAdmin
//                         ? "bg-blue-600 text-white rounded-br-sm"
//                         : "bg-white text-gray-900 border rounded-bl-sm"
//                     }
//                   `}
//                 >
//                   <p className="whitespace-pre-wrap">{msg.message}</p>

//                   <span
//                     className={`text-[10px] mt-1 block ${
//                       isAdmin ? "text-blue-100" : "text-gray-400"
//                     } text-right`}
//                   >
//                     {new Date(msg.created_at).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}

//           {/* Scroll Anchor */}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>

//       {/* Input Area (Sticky Bottom Bar) */}
//       <div className="p-3 border-t bg-white rounded-b-2xl">
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             value={reply}
//             onChange={(e) => setReply(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !isSending) {
//                 e.preventDefault();
//                 handleSendReply();
//               }
//             }}
//             placeholder="Write a message..."
//             className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <button
//             onClick={handleSendReply}
//             disabled={isSending}
//             className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition"
//           >
//             <Send size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useGetSingleAllMessageQuery } from "@/Redux/features/AdminDashboard/Communications/adminCommunicationsApi";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { useAdminReplayMessageMutation } from "@/Redux/features/AdminDashboard/Communications/adminCommunicationsApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";

export default function UserMessagesPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const currentUser = useSelector(selectCurrentUser);

  const { data, isLoading, refetch } = useGetSingleAllMessageQuery(userId);

  // 🔥 FIXED: API returns array directly
  const messages = Array.isArray(data)
    ? data
        .slice()
        .sort(
          (a: any, b: any) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        )
    : [];

  const [reply, setReply] = useState("");
  const [sendMessage, { isLoading: isSending }] =
    useAdminReplayMessageMutation();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const handleSendReply = async () => {
    if (!reply.trim()) return;

    try {
      const payload = {
        receiver_id: userId,
        message: reply,
      };

      const res = await sendMessage(payload).unwrap();

      if (res.status) {
        toast.success(res.message || "Message sent");
        setReply("");
        refetch();
      } else {
        toast.error(res.message || "Failed to send message");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[80vh] border rounded-2xl bg-gray-50 shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-white rounded-t-2xl">
        <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
        <h2 className="font-semibold text-lg">Conversation</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="flex flex-col justify-end min-h-full space-y-2">
          {messages.map((msg: any) => {
            const isAdmin = msg.sender_id === currentUser?.id;

            return (
              <div
                key={msg.id}
                className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    px-4 py-2
                    max-w-[75%]
                    rounded-2xl
                    text-sm
                    shadow-sm
                    break-words
                    ${
                      isAdmin
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white text-gray-900 border rounded-bl-sm"
                    }
                  `}
                >
                  <p className="whitespace-pre-wrap">{msg.message}</p>

                  <span
                    className={`text-[10px] mt-1 block ${
                      isAdmin ? "text-blue-100" : "text-gray-400"
                    } text-right`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 border-t bg-white rounded-b-2xl">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isSending) {
                e.preventDefault();
                handleSendReply();
              }
            }}
            placeholder="Write a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSendReply}
            disabled={isSending}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
