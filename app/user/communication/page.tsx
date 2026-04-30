// app/user/communications/page.tsx

"use client";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { useState, useEffect, useRef } from "react";
import { Send, User, ShieldCheck, RefreshCw, Bot } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  useGetConversationQuery,
  useSendMessageMutation,
} from "@/Redux/features/userDashboardServices/communication/communicationApi";

export default function UserChatPage() {
  const currentUser = useSelector(selectCurrentUser);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const adminId = 1;

  // Fetch messages - Passing adminId to get the conversation with admin
  const {
    data: messages = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetConversationQuery(adminId, {
    pollingInterval: 3000,
    skip: !currentUser,
    refetchOnMountOrArgChange: true,
  });

  console.log("Messages from API:", messages);

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle sending message
  const handleSend = async () => {
    if (!text.trim() || !currentUser) return;

    try {
      const payload = {
        sender_id: currentUser.id,
        receiver_id: adminId,
        message: text,
      };

      const result = await sendMessage(payload).unwrap();
      console.log("Send message result:", result);

      setText("");
      toast.success("Message sent successfully");

      // Immediately refetch to show the new message
      refetch();
    } catch (error: any) {

      toast.error(error?.data?.message || "Failed to send message");
    }
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // If no user is logged in
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)]">
        <div className="text-center">
          <User size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">
            Please log in to start chatting
          </p>
        </div>
      </div>
    );
  }

  // Sort messages by date (oldest first)
  const sortedMessages = [...messages].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              Support Team
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-500 font-medium">
                Admin is online
              </span>
            </div>
          </div>
        </div>

        {/* Refresh button */}
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Refresh messages"
        >
          <RefreshCw
            size={18}
            className={
              isFetching ? "animate-spin text-primary" : "text-gray-500"
            }
          />
        </button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 bg-[#f8f9fa] scrollbar-thin scrollbar-thumb-gray-200">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400 font-medium">
              Loading messages...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <ShieldCheck size={32} className="text-red-400" />
            </div>
            <div>
              <p className="text-gray-900 font-semibold">
                Failed to load messages
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Please try again later
              </p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : sortedMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Bot size={32} className="text-gray-400" />
            </div>
            <div>
              <p className="text-gray-900 font-semibold">No messages yet</p>
              <p className="text-sm text-gray-500">
                Start the conversation with our support team.
              </p>
            </div>
          </div>
        ) : (
          <>
            {sortedMessages.map((msg, index) => {
              const isMe = msg.sender_id === currentUser.id;
              const isAdmin = msg.sender_id === adminId;
              const prevMsg = index > 0 ? sortedMessages[index - 1] : null;

              // Show date separator if it's a new day
              const showDateSeparator =
                !prevMsg ||
                format(new Date(msg.created_at), "yyyy-MM-dd") !==
                  format(new Date(prevMsg.created_at), "yyyy-MM-dd");

              return (
                <div key={msg.id} className="space-y-2">
                  {/* Date separator */}
                  {showDateSeparator && (
                    <div className="flex justify-center my-4">
                      <span className="text-[10px] uppercase font-bold text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                        {format(new Date(msg.created_at), "MMMM d, yyyy")}
                      </span>
                    </div>
                  )}

                  {/* Message bubble */}
                  <div
                    className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2 group`}
                  >
                    {/* Avatar for admin/bot messages */}
                    {!isMe && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mb-1">
                        {isAdmin ? (
                          <ShieldCheck size={14} />
                        ) : (
                          <Bot size={14} />
                        )}
                      </div>
                    )}

                    {/* Message content */}
                    <div
                      className={`flex flex-col max-w-[75%] ${isMe ? "items-end" : "items-start"}`}
                    >
                      {/* Sender name for non-user messages */}
                      {!isMe && (
                        <span className="text-xs text-gray-500 mb-1 ml-1">
                          {msg.sender?.name || "Support Team"}
                        </span>
                      )}

                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm transition-all duration-200 ${
                          isMe
                            ? "bg-primary text-white rounded-br-none hover:bg-primary/95"
                            : "bg-white text-gray-800 border border-gray-100 rounded-bl-none hover:bg-gray-50"
                        }`}
                      >
                        {msg.message}
                      </div>
                      <span
                        className={`text-[10px] text-gray-400 mt-1 ${
                          isMe ? "text-right" : "text-left"
                        }`}
                      >
                        {format(new Date(msg.created_at), "h:mm a")}
                      </span>
                    </div>

                    {/* Avatar for user messages */}
                    {isMe && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mb-1 order-last">
                        <User size={14} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-3 text-gray-800 placeholder:text-gray-400 outline-none"
            disabled={isSending}
          />
          <button
            onClick={handleSend}
            disabled={!text.trim() || isSending}
            className="bg-primary text-white p-2.5 rounded-lg hover:bg-primary/95 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center shrink-0"
          >
            <Send size={18} className={isSending ? "animate-pulse" : ""} />
          </button>
        </div>

        {/* Typing indicator */}
        {isSending && (
          <p className="text-xs text-gray-400 mt-2 text-right">
            Sending message...
          </p>
        )}
      </div>
    </div>
  );
}
