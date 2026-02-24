import Link from "next/link";


function PaymentCencel() {
  return (
  <div className="min-h-screen bg-white flex items-center justify-center p-4">
  <div className="w-full max-w-md">
    {/* Cancelled Icon */}
    <div className="flex justify-center mb-6">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
        <svg 
          className="w-8 h-8 text-red-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </div>
    </div>

    {/* Header */}
    <h1 className="text-2xl font-semibold text-center text-gray-900 mb-2">
      Payment Cancelled
    </h1>
    
    <p className="text-center text-gray-600 mb-8">
      The payment process was cancelled or failed. No charges were made.
    </p>

    {/* Action Buttons */}
    <div className="space-y-3">
      <Link
        href="/pricing"
        className="block w-full bg-[#1a4c6e] hover:bg-[#0f3a54] text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200"
      >
        Return to My Orders
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
}

export default PaymentCencel;
