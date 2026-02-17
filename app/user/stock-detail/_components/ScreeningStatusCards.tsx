"use client";

import { IAdvancedReport } from "@/Redux/features/userDashboardServices/advancedStockApi";
import { FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";

interface ScreeningStatusCardsProps {
  report: IAdvancedReport;
}

export function ScreeningStatusCards({ report }: ScreeningStatusCardsProps) {
  const getStatusInfo = (status: string) => {
    if (status === "COMPLIANT") {
      return {
        icon: <FiCheckCircle className="w-8 h-8" />,
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        iconColor: "text-green-500",
        badgeColor: "bg-green-100 text-green-700",
      };
    } else if (status === "NON_COMPLIANT") {
      return {
        icon: <FiXCircle className="w-8 h-8" />,
        bgColor: "bg-red-50",
        textColor: "text-red-700",
        iconColor: "text-red-500",
        badgeColor: "bg-red-100 text-red-700",
      };
    } else {
      return {
        icon: <FiAlertCircle className="w-8 h-8" />,
        bgColor: "bg-amber-50",
        textColor: "text-amber-700",
        iconColor: "text-amber-500",
        badgeColor: "bg-amber-100 text-amber-700",
      };
    }
  };

  const businessScreenInfo = getStatusInfo(report.businessScreen);
  const financialScreenInfo = getStatusInfo(report.financialScreen);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Business Screen Card */}
      <div
        className={`${businessScreenInfo.bgColor} rounded-lg shadow-md p-6 border-2 border-transparent hover:border-slate-200 transition-all`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Business Activities Screen
            </h3>
            <p className={`text-sm ${businessScreenInfo.textColor} mb-3`}>
              Evaluates if business activities are Shariah compliant
            </p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${businessScreenInfo.badgeColor}`}
            >
              {report.businessScreen === "COMPLIANT" ? "✓ Halal" : "✗ Haram"}
            </span>
          </div>
          <div className={businessScreenInfo.iconColor}>
            {businessScreenInfo.icon}
          </div>
        </div>
      </div>

      {/* Financial Screen Card */}
      <div
        className={`${financialScreenInfo.bgColor} rounded-lg shadow-md p-6 border-2 border-transparent hover:border-slate-200 transition-all`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Financial Ratios Screen
            </h3>
            <p className={`text-sm ${financialScreenInfo.textColor} mb-3`}>
              Analyzes debt and interest-based financial ratios per AAOIFI
              standards
            </p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${financialScreenInfo.badgeColor}`}
            >
              {report.financialScreen === "COMPLIANT" ? "✓ Halal" : "✗ Haram"}
            </span>
          </div>
          <div className={financialScreenInfo.iconColor}>
            {financialScreenInfo.icon}
          </div>
        </div>
      </div>
    </div>
  );
}
