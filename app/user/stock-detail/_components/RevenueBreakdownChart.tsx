"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { IAdvancedReport } from "@/Redux/features/userDashboardServices/advancedStockApi";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

interface RevenueBreakdownChartProps {
  report: IAdvancedReport;
}

export function RevenueBreakdownChart({ report }: RevenueBreakdownChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Compliant Revenue",
          "Non-Compliant Revenue",
          "Questionable Revenue",
        ],
        datasets: [
          {
            data: [
              report.compliantRevenue,
              report.nonCompliantRevenue,
              report.questionableRevenue,
            ],
            backgroundColor: [
              "rgba(34, 197, 94, 0.8)", // Green
              "rgba(239, 68, 68, 0.8)", // Red
              "rgba(251, 191, 36, 0.8)", // Amber
            ],
            borderColor: [
              "rgba(34, 197, 94, 1)",
              "rgba(239, 68, 68, 1)",
              "rgba(251, 191, 36, 1)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 20,
              font: {
                size: 12,
                family: "Inter, system-ui, sans-serif",
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.parsed || 0;
                return `${label}: ${value}%`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [report]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Revenue Breakdown
      </h2>
      <div
        className="flex justify-center items-center"
        style={{ height: "300px" }}
      >
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
