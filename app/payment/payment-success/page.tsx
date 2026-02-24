"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGetAllPaymentsQuery } from "@/Redux/features/payment/paymentApi";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading } = useGetAllPaymentsQuery();

  // Find the payment that matches this session ID from payment_history
  const payment = data?.payment_history?.find(
    (item) => item.transaction_id === sessionId
  ) ?? data?.latest_payment;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-2">
          Payment Successful!
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Thank you for your payment. Your subscription is now active.
        </p>

        {/* Invoice Details - Card Style */}
        {isLoading ? (
          <div className="text-center py-4 text-gray-600">
            Loading payment details...
          </div>
        ) : payment ? (
          <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Transection ID</span>
              <span className="text-gray-900 font-mono text-sm break-all text-right max-w-[60%]">
                {payment.transaction_id}
              </span>
            </div>

            {payment.plan && (
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Plan</span>
                <span className="text-gray-900 font-medium">
                  {payment.plan.title}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Amount Paid</span>
              <span className="text-gray-900 font-medium">
                ${payment.amount} {payment.currency?.toUpperCase() ?? "USD"}
              </span>
            </div>

            {/* <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Status</span>
              <span className="text-emerald-600 font-medium capitalize">
                {payment.status}
              </span>
            </div> */}

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment ID</span>
              <span className="text-gray-900">#{payment.id}</span>
            </div>

            {payment.created_at && (
              <div className="flex justify-between items-center pt-2 text-sm text-gray-500 border-t border-gray-200">
                <span>Date</span>
                <span>{new Date(payment.created_at).toLocaleString()}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-600">
            No payment found.
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/user"
            className="block w-full bg-[#1a4c6e] hover:bg-[#0f3a54] text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/"
            className="block w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg text-center border border-gray-300 transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
