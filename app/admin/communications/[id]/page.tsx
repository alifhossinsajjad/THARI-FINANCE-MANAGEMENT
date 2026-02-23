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

"use client";

import { useGetSingleAllMessageQuery, useAdminReplayMessageMutation } from "@/Redux/features/AdminDashboard/Communications/adminCommunicationsApi";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Send, ChevronLeft, User, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function UserMessagesPage() {
  const router = useRouter();
  const user = useSelector(selectCurrentUser);
  console.log(user);
  const params = useParams();
  const router = useRouter();
  const userId = params.id;

  const { data, isLoading } = useGetSingleAllMessageQuery(userId, {
    pollingInterval: 3000,
  });
  const messages = data || [];

  const [reply, setReply] = useState("");
  const [sendMessage, { isLoading: isSending }] = useAdminReplayMessageMutation();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendReply = async () => {
    if (!reply.trim() || isSending) return;
    try {
      const payload = { receiver_id: userId, message: reply };
      const res = await sendMessage(payload).unwrap();

      if (res.status) {
        toast.success(res.message);
        setReply("");
      } else {
        toast.error(res.message || "Failed to send message");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">User #{userId}</h2>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-500 font-medium">Active now</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 bg-[#f8f9fa] scrollbar-thin scrollbar-thumb-gray-200">
        {isLoading && messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400 font-medium">Loading conversation...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <User size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-900 font-semibold">No messages with this user</p>
          </div>
        ) : (
          messages.map((msg: any, index: number) => {
            const isAdmin = msg.sender_id === 1; // Assuming 1 is admin ID
            const showTime = index === 0 || 
              new Date(msg.created_at).getTime() - new Date(messages[index-1].created_at).getTime() > 300000;

            return (
              <div key={msg.id} className="space-y-1">
                {showTime && (
                  <div className="flex justify-center my-4">
                    <span className="text-[10px] uppercase font-bold text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                      {format(new Date(msg.created_at), "MMM d, h:mm a")}
                    </span>
                  </div>
                )}
                <div className={`flex ${isAdmin ? "justify-end" : "justify-start"} items-end gap-2 group`}>
                  {isAdmin && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mb-1">
                      <ShieldCheck size={14} />
                    </div>
                  )}
                  <div className="flex flex-col max-w-[75%]">
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm transition-all duration-200 ${
                        isAdmin
                          ? "bg-primary text-white rounded-br-none hover:bg-primary/95"
                          : "bg-white text-gray-800 border border-gray-100 rounded-bl-none hover:bg-gray-50"
                      }`}
                    >
                      <p>{msg.message}</p>
                    </div>
                    <span className={`text-[10px] text-gray-400 mt-1 ${isAdmin ? "text-right" : "text-left"}`}>
                      {format(new Date(msg.created_at), "h:mm a")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendReply()}
            placeholder="Write your reply..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-3 text-gray-800 placeholder:text-gray-400"
          />
          <button
            onClick={handleSendReply}
            disabled={!reply.trim() || isSending}
            className="bg-primary text-white p-2.5 rounded-lg hover:bg-primary/95 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center shrink-0"
          >
            <Send size={18} className={isSending ? "animate-pulse" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}
