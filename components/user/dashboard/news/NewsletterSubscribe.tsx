// components/NewsletterSubscribe.tsx
"use client";

import { useState } from "react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email");
      return;
    }

    setStatus("loading");
    setMessage("");

    // Replace with real API call (Mailchimp, Resend, etc.)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1400)); // simulate
      setStatus("success");
      setMessage("Thanks! Check your inbox to confirm.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <section className="  bg-gray-50">
      <div className="mx-auto px-5 sm:px-8 lg:px-10 max-w-full">
        <div
          className="rounded-[14px] bg-primary overflow-hidden"
          style={{ borderRadius: "14px" }}
        >
          <div className="px-6 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-white mb-3 md:mb-4">
              Stay Updated
            </h2>

            <p className="text-base sm:text-lg md:text-base text-blue-100 mb-8 md:mb-10 max-w-3xl mx-auto">
              Subscribe to our newsletter to receive the latest articles and
              insights directly in your inbox.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col relative sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-md sm:max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                className="flex-1 relative px-5 py-3.5 sm:py-4 bg-white/12 border border-white 
                           rounded-md text-white placeholder-blue-200 
                           focus:outline-none focus:border-blue-300 focus:bg-white/15 
                           transition-all duration-200 text-base"
                required
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="absolute right-0 px-8 py-3.5 sm:py-4 bg-[#FFFFFF] hover:bg-white/90 hover:scale-105 transition-all duration-200
                           text-[#00008B] font-medium rounded-md
                           transition-colors duration-200 disabled:opacity-60 
                           disabled:cursor-not-allowed text-base sm:text-base cursor-pointer"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            {status !== "idle" && (
              <p
                className={`mt-5 text-sm ${status === "success" ? "text-green-300" : "text-red-300"
                  }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
