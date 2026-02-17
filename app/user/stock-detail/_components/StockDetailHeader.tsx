"use client";

import { IAdvancedReport } from "@/Redux/features/userDashboardServices/advancedStockApi";

interface StockDetailHeaderProps {
    report: IAdvancedReport;
}

export function StockDetailHeader({ report }: StockDetailHeaderProps) {
    const isCompliant = report.status === "COMPLIANT";

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        {report.name}
                    </h1>
                    <div className="flex items-center gap-3">
                        <p className="text-2xl font-semibold text-slate-600">
                            {report.symbol}
                        </p>
                        <span
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${isCompliant
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {isCompliant ? "✓ Halal (Shariah Compliant)" : "✗ Haram (Non-Compliant)"}
                        </span>
                    </div>
                </div>
                <div className="text-right text-sm text-slate-500">
                    <p>
                        <span className="font-medium">Exchange:</span> {report.exchange}
                    </p>
                    <p>
                        <span className="font-medium">FIGI:</span> {report.figi}
                    </p>
                    <p>
                        <span className="font-medium">Report Date:</span>{" "}
                        {new Date(report.reportDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
}
