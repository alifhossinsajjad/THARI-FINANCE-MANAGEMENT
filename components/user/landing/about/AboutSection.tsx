"use client";

import React, { useState, useEffect } from "react";

export default function AboutSection() {
  const [animate, setAnimate] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const missions = [
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Our Mission",
      description:
        "We're committed to democratizing halal investing by combining cutting-edge technology with Islamic financial principles. We strive to make halal investment accessible, transparent, and straightforward for everyone—from beginners to experienced investors.",
      points: [
        "Provide accurate Sharia compliance screening",
        "Deliver professional-grade financial analysis",
        "Empower informed investment decisions",
      ],
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      title: "Our Vision",
      description:
        "To become the most trusted global platform for halal investing and financial planning. We envision a future where ethical investing is the standard, not the exception.",
      points: [
        "Global leader in Islamic finance technology",
        "Comprehensive halal investment ecosystem",
        "Trusted by millions of ethical investors worldwide",
      ],
    },
  ];

  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Video/Image Panel */}
          <div className={` ${animate ? "opacity-100" : "opacity-0"}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-full">
              {/* Chart Background Image */}
              <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 h-full">
                {/* Animated Chart Background */}
                <div className="absolute inset-0">
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={`h-${i}`}
                        className="absolute w-full border-t border-blue-400/30"
                        style={{ top: `${i * 10}%` }}
                      ></div>
                    ))}
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={`v-${i}`}
                        className="absolute h-full border-l border-blue-400/30"
                        style={{ left: `${i * 10}%` }}
                      ></div>
                    ))}
                  </div>

                  {/* Stock Prices Floating */}
                  <div className="absolute top-6 left-6 space-y-2">
                    <div className="text-green-400 text-sm font-mono">
                      AAPL 234.25 +2.3%
                    </div>
                    <div className="text-red-400 text-sm font-mono">
                      TSLA 187.30 -1.5%
                    </div>
                    <div className="text-green-400 text-sm font-mono">
                      MSFT 421.43 +0.8%
                    </div>
                  </div>

                  {/* Animated Chart Lines */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 600 400"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="chartGradient1"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#10B981"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="#10B981"
                          stopOpacity="0"
                        />
                      </linearGradient>
                      <linearGradient
                        id="chartGradient2"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#EF4444"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="#EF4444"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    {/* Green Line (Uptrend) */}
                    <path
                      d="M 0 300 L 100 280 L 200 250 L 300 220 L 400 200 L 500 180 L 600 150"
                      stroke="#10B981"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M 0 300 L 100 280 L 200 250 L 300 220 L 400 200 L 500 180 L 600 150 L 600 400 L 0 400 Z"
                      fill="url(#chartGradient1)"
                    />

                    {/* Red Line (Downtrend) */}
                    <path
                      d="M 0 200 L 100 220 L 200 240 L 300 260 L 400 250 L 500 270 L 600 280"
                      stroke="#EF4444"
                      strokeWidth="3"
                      fill="none"
                    />

                    {/* Candlesticks */}
                    {[100, 200, 300, 400, 500].map((x, i) => (
                      <g key={i}>
                        <rect
                          x={x - 10}
                          y={200 - i * 10}
                          width="20"
                          height={40 + i * 5}
                          fill={i % 2 === 0 ? "#10B981" : "#EF4444"}
                          opacity="0.6"
                        />
                      </g>
                    ))}
                  </svg>

                  {/* Price Labels */}
                  <div className="absolute bottom-6 right-6 space-y-2">
                    <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded font-mono">
                      $43.25
                    </div>
                    <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded font-mono">
                      $21.43
                    </div>
                  </div>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setVideoPlaying(true)}
                    className="w-20 h-20 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 group-hover:scale-110"
                  >
                    <svg
                      className="w-10 h-10 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Mission & Vision Content */}
          <div className={` ${animate ? "opacity-100" : "opacity-0"}`}>
            {/* Header Text */}
            <div className="mb-8">
              <p className="text-gray-600 leading-relaxed">
                We are a financial Halal platform focused on ethical and
                Sharia-compliant investing. Our mission is to empower investors
                with transparent, research-driven data to make informed
                financial decisions.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                With a team of financial analysts and Islamic finance experts,
                Halal Finance bridges the gap between modern investment
                opportunities and Islamic principles. We believe that ethical
                investing shouldn&#39;t be complicated, and that every Muslim
                investor deserves access to quality financial insights.
              </p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="space-y-6">
              {missions.map((mission, index) => (
                <div
                  key={index}
                  className=" rounded-xl p-6 hover:shadow-lg   transition-all duration-300"
                >
                  {/* Icon & Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      {mission.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {mission.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {mission.description}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-2">
                    {mission.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2">
                        <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span className="text-xs text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{``}</style>
    </section>
  );
}
