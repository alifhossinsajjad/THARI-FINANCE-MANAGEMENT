import React from 'react';
import { FiAlertTriangle, FiArrowLeft } from 'react-icons/fi';

interface ProfessionalErrorProps {
    error: any;
    onBack: () => void;
    title?: string;
}

export const ProfessionalError: React.FC<ProfessionalErrorProps> = ({
    error,
    onBack,
    title = "Failed to Load Report"
}) => {
    // Extract a clean message
    const getErrorMessage = (err: any) => {
        if (!err) return "No data available for this stock symbol.";

        // If it's a thrown Error from transformResponse, it might be in err.error or err.data
        if (typeof err === 'string') return err;
        if (err.message) return err.message;
        if (err.error) {
            // Check if it's a string with "Error: " prefix
            if (typeof err.error === 'string') {
                return err.error.replace(/^Error:\s*/, '');
            }
            return err.error.message || JSON.stringify(err.error);
        }
        if (err.data?.message) return err.data.message;
        if (err.data?.errors?.[0]?.message) return err.data.errors[0].message;

        return "An unexpected error occurred while loading the report.";
    };

    const message = getErrorMessage(error);
    const isUnauthorized = message.toLowerCase().includes('authorized') || message.toLowerCase().includes('permission');

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 max-w-lg w-full text-center relative overflow-hidden">
                {/* Background accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-red-500" />

                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6 font-bold text-red-500">
                    <FiAlertTriangle size={40} />
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                    {title}
                </h2>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8">
                    <p className="text-slate-600 leading-relaxed italic">
                        &quot;{message}&quot;
                    </p>
                </div>

                {isUnauthorized && (
                    <div className="mb-8 text-sm text-slate-500 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-left">
                        <p className="font-semibold text-blue-800 mb-1">💡 Professional Insight:</p>
                        <p>This message usually means your current subscription plan (e.g., Beginner) needs to be mapped to this data on the server. Please contact support or the administrator to verify your plan permissions.</p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all font-semibold active:scale-95 shadow-lg shadow-slate-200"
                    >
                        <FiArrowLeft />
                        Go Back
                    </button>

                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold active:scale-95"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
};
