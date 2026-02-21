"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import { useAdminReplayMessageMutation } from "@/Redux/features/AdminDashboard/Communications/adminCommunicationsApi";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  receiver: string | number | null;
};

export default function ReplyModal({ isOpen, onClose, receiver }: Props) {
  const [sendMessage] = useAdminReplayMessageMutation();
  const [reply, setReply] = useState("");

  if (!isOpen) return null;
  const handleSubmit = async () => {
    if (!reply.trim() || !receiver) return;

    try {
      // Payload must match your API
      const payload = {
        receiver_id: receiver,
        message: reply,
      };

      console.log("Sending payload:", payload);

      // RTK Query mutation call
      const res = await sendMessage(payload).unwrap(); // unwrap to get success/error directly

      console.log("Response:", res);

      // Show toast based on backend response
      if (res.status) {
        toast.success(res.message || "Message sent successfully!");
      } else {
        toast.error(res.message || "Failed to send message.");
      }

      // Reset and close modal
      setReply("");
      onClose();
    } catch (err: any) {
      console.error("Failed to send message:", err);

      // If RTK throws error
      toast.error(err?.data?.message || "Failed to send message");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Reply Message {receiver}
        </h2>

        {/* Textarea */}
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Write your reply..."
          className="w-full h-32 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Actions */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-[#00006B] text-white text-sm font-medium rounded-lg"
          >
            <Send size={16} />
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
}
