"use client";

import { useEffect, useRef } from "react";
import {
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { IAdvancedReport } from "@/Redux/features/userDashboardServices/advancedStockApi";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface FinancialRatiosChartProps {
    report: IAdvancedReport;
}

export function FinancialRatiosChart({ report }: FinancialRatiosChartProps) {
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
            type: "bar",
            data: {
                labels: ["Securities to Market Cap", "Debt to Market Cap"],
                datasets: [
                    {
                        label: "Ratio",
                        data: [
                            report.securitiesToMarketCapRatio,
                            report.debtToMarketCapRatio,
                        ],
                        backgroundColor: [
                            "rgba(59, 130, 246, 0.8)", // Blue
                            "rgba(168, 85, 247, 0.8)", // Purple
                        ],
                        borderColor: ["rgba(59, 130, 246, 1)", "rgba(168, 85, 247, 1)"],
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const value = context.parsed.x || 0;
                                return `Ratio: ${(value * 100).toFixed(2)}%`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: Math.max(
                            report.securitiesToMarketCapRatio,
                            report.debtToMarketCapRatio,
                            0.1
                        ) * 1.2,
                        ticks: {
                            callback: function (value) {
                                return `${(Number(value) * 100).toFixed(1)}%`;
                            },
                        },
                        grid: {
                            color: "rgba(0, 0, 0, 0.05)",
                        },
                    },
                    y: {
                        grid: {
                            display: false,
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
                Financial Ratios
            </h2>
            <div style={{ height: "300px" }}>
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    );
}
