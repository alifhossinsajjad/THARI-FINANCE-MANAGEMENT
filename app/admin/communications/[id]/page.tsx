// "use client";

// import { useGetSingleAllMessageQuery } from "@/Redux/features/AdminDashboard/Communications/adminCommunicationsApi";
// import { useParams } from "next/navigation";

// export default function page() {
//   const params = useParams();
//   const id = params.id;

//   const { data } = useGetSingleAllMessageQuery(id);
//   console.log("iam the user spacipic all message", data);
//   const messages = data?.data || [];
//   console.log("here is singelmessage", messages);

//   return <div>page for user {id}</div>;
// }

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
//   const user = useSelector(selectCurrentUser);
//   console.log(user);
//   const params = useParams();
//   const userId = params.id;

//   const { data, isLoading, refetch } = useGetSingleAllMessageQuery(userId);
//   const messages = data?.data || [];
//   console.log("here is the", messages);

//   const [reply, setReply] = useState("");
//   const [sendMessage, { isLoading: isSending }] =
//     useAdminReplayMessageMutation();

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Auto scroll to bottom whenever messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendReply = async () => {
//     if (!reply.trim()) return;
//     try {
//       const payload = { receiver_id: userId, message: reply };
//       const res = await sendMessage(payload).unwrap();

//       if (res.status) toast.success(res.message);
//       else toast.error(res.message || "Failed to send message");

//       setReply(""); // clear input
//       refetch();
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Something went wrong");
//     }
//   };

//   if (isLoading) return <div>Loading messages...</div>;

//   return (
//     <div className="flex flex-col h-full max-h-[80vh] border rounded-lg bg-white shadow-md p-4">
//       <div className="pb-3">
//         <h2>
//           <ArrowLeft
//             className="cursor-pointer"
//             onClick={() => router.back()} // <--- go back
//           />
//         </h2>
//       </div>
//       {/* Messages list */}
//       <div className="flex-1 overflow-y-auto mb-4 space-y-2">
//         {messages.map((msg: any) => {
//           const isAdmin = msg.sender_id === 1; // admin messages align right
//           return (
//             <div
//               key={msg.id}
//               className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-lg max-w-xs break-words ${
//                   isAdmin
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200 text-gray-900"
//                 }`}
//               >
//                 <p>{msg.message}</p>
//                 <span className="text-xs text-gray-400 mt-1 block text-right">
//                   {new Date(msg.created_at).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Reply input */}
//       <div className="flex gap-2 items-center">
//         <input
//           type="text"
//           value={reply}
//           onChange={(e) => setReply(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault(); // optional but recommended
//               handleSendReply();
//             }
//           }}
//           placeholder="Write your reply..."
//           className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//         <button
//           onClick={handleSendReply}
//           disabled={isSending}
//           className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-[#00006B] disabled:opacity-50 text-white text-sm font-medium rounded-lg"
//         >
//           <Send size={16} />
//           {isSending ? "Sending..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// }

// updated code

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

  // IMPORTANT: ensure oldest -> newest order (Messenger style)
  const messages = (data?.data || [])
    .slice()
    .sort(
      (a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

  const [reply, setReply] = useState("");
  const [sendMessage, { isLoading: isSending }] =
    useAdminReplayMessageMutation();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom (instant like Messenger)
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

      {/* Messages Area (BOTTOM ANCHORED LIKE MESSENGER) */}
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

          {/* Scroll Anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area (Sticky Bottom Bar) */}
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
