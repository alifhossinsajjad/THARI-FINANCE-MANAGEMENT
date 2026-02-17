"use client";

import Link from "next/link";

import { FaCheckCircle, FaHome } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useGetAllPaymentsQuery } from "@/Redux/features/payment/paymentApi";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading } = useGetAllPaymentsQuery();

  // Find the payment that matches this session ID
  const payment = data?.data?.data?.find(
    (item) => item.transaction_id === sessionId
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl text-center">
        <div className="card-body">
          <span className="flex justify-center">
            <FaCheckCircle className="text-6xl text-success mb-4" />
          </span>

          <h2 className="card-title text-2xl font-bold mb-2">
            Payment Successful!
          </h2>

          <p className="text-gray-600 mb-6">
            Thank you for your order.
          </p>

          {isLoading ? (
            <p>Loading payment details...</p>
          ) : payment ? (
            <div className="bg-gray-100 p-4 rounded-lg w-full mb-6 text-left space-y-3">
              <div>
                <span className="font-semibold text-gray-500 text-sm">
                  Transaction ID
                </span>
                <p className="font-mono text-sm break-all">
                  {payment.transaction_id}
                </p>
              </div>

              <div>
                <span className="font-semibold text-gray-500 text-sm">
                  Amount
                </span>
                <p>${payment.amount}</p>
              </div>

              <div>
                <span className="font-semibold text-gray-500 text-sm">
                  Status
                </span>
                <p className="capitalize">{payment.status}</p>
              </div>

              <div>
                <span className="font-semibold text-gray-500 text-sm">
                  Created At
                </span>
                <p>
                  {new Date(payment.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <p>No payment found.</p>
          )}

          <Link
            href="/"
            className="btn btn-primary flex justify-center items-center gap-2"
          >
            <FaHome /> Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
