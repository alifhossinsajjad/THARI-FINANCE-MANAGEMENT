"use client";

import { IAdvancedReport } from "@/Redux/features/userDashboardServices/advancedStockApi";
import { FiGlobe, FiHash, FiCalendar } from "react-icons/fi";

interface ReportMetadataProps {
    report: IAdvancedReport;
}

export function ReportMetadata({ report }: ReportMetadataProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
                Report Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Exchange */}
                <div className="flex items-start gap-3">
                    <div className="mt-1 text-blue-500">
                        <FiGlobe className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                            Exchange
                        </p>
                        <p className="text-lg font-semibold text-slate-800">
                            {report.exchange}
                        </p>
                    </div>
                </div>

                {/* FIGI */}
                <div className="flex items-start gap-3">
                    <div className="mt-1 text-purple-500">
                        <FiHash className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                            FIGI
                        </p>
                        <p className="text-lg font-semibold text-slate-800 break-all">
                            {report.figi}
                        </p>
                    </div>
                </div>

                {/* Report Date */}
                <div className="flex items-start gap-3">
                    <div className="mt-1 text-green-500">
                        <FiCalendar className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                            Report Date
                        </p>
                        <p className="text-lg font-semibold text-slate-800">
                            {new Date(report.reportDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {report.rawSymbol !== report.symbol && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600">
                        <span className="font-medium">Raw Symbol:</span> {report.rawSymbol}
                    </p>
                </div>
            )}
        </div>
    );
}
