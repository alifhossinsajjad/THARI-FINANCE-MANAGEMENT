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
  const user = useSelector(selectCurrentUser);
  console.log(user);
  const params = useParams();
  const userId = params.id;

  const { data, isLoading, refetch } = useGetSingleAllMessageQuery(userId);
  const messages = data?.data || [];

  const [reply, setReply] = useState("");
  const [sendMessage, { isLoading: isSending }] =
    useAdminReplayMessageMutation();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendReply = async () => {
    if (!reply.trim()) return;
    try {
      const payload = { receiver_id: userId, message: reply };
      const res = await sendMessage(payload).unwrap();

      if (res.status) toast.success(res.message);
      else toast.error(res.message || "Failed to send message");

      setReply(""); // clear input
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) return <div>Loading messages...</div>;

  return (
    <div className="flex flex-col h-full max-h-[80vh] border rounded-lg bg-white shadow-md p-4">
      <div className="pb-3">
        <h2>
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => router.back()} // <--- go back
          />
        </h2>
      </div>
      {/* Messages list */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg: any) => {
          const isAdmin = msg.sender_id === 1; // admin messages align right
          return (
            <div
              key={msg.id}
              className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                  isAdmin
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <p>{msg.message}</p>
                <span className="text-xs text-gray-400 mt-1 block text-right">
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

      {/* Reply input */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // optional but recommended
              handleSendReply();
            }
          }}
          placeholder="Write your reply..."
          className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSendReply}
          disabled={isSending}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-[#00006B] disabled:opacity-50 text-white text-sm font-medium rounded-lg"
        >
          <Send size={16} />
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
