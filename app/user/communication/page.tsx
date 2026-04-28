"use client";


import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { useState, useEffect, useRef } from "react";
import { useGetConversationQuery, useSendMessageMutation } from "@/Redux/features/userDashboardServices/communication/communicationApi";

export default function UserChatPage() {
 const currentUser = useSelector(selectCurrentUser);

if (!currentUser) {
  return <div>Loading...</div>; // or redirect to login
}

  const adminId = 1; // 🔥 change if dynamic

const { data: messages = [], isLoading } =
  useGetConversationQuery(currentUser.id, {
    pollingInterval: 3000,
  });


  
  const [sendMessage] = useSendMessageMutation();
  const [text, setText] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;

    await sendMessage({
      sender_id: currentUser.id,
      receiver_id: adminId,
      message: text,
    });

    setText("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">Support Chat</h1>

      {/* Messages Box */}
      <div className="h-[450px] overflow-y-auto border rounded-lg p-4 bg-gray-50 space-y-3">

        {isLoading && <p>Loading...</p>}

        {messages.map((msg) => {
          const isMe = msg.sender_id === currentUser.id;

          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs text-sm ${
                  isMe
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.message}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          onClick={handleSend}
          className="bg-primary text-white px-6 py-2 rounded-lg"
        >
          Send
        </button>
      </div>

    </div>
  );
}
