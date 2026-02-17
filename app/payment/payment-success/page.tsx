import Link from "next/link";
import React from "react";
import { FaCheckCircle, FaHome } from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="card bg-base-100 w-full max-w-md shadow-xl text-center">
          <div className="card-body ">
            <span className="flex justify-center">
              <FaCheckCircle className="text-6xl text-success mb-4 " />
            </span>
            <h2 className="card-title text-2xl font-bold mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order. Your payment has been processed
              successfully.
            </p>

            <div className="bg-gray-100 p-4 rounded-lg w-full mb-6 text-left space-y-2">
              <div>
                <span className="font-semibold text-gray-500 text-sm">
                  Transaction ID
                </span>
                <p className="font-mono text-sm break-all">
                  {/* {paymentInfo?.transactionId || "N/A"} */}
                </p>
              </div>
              {/* {paymentInfo?.trackingId && (
              <div>
                <span className="font-semibold text-gray-500 text-sm">
                  Tracking ID
                </span>
                <p className="font-mono text-sm font-bold text-primary">
                  {paymentInfo.trackingId}
                </p>
              </div>
            )} */}
            </div>

            <div className="card-actionsw-full gap-4">
              <Link
                href="/"
                className="btn btn-primary flex-1 text-primary flex  justify-center items-center gap-2"
              >
                <FaHome /> Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
