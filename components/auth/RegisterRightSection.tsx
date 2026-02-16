import { useMemo } from "react";

export default function RegisterRightSection() {
  const animate = true;

  const particles = useMemo(() => {
    // Pre-generated random values to avoid impure function calls during render
    const positions = [
      { left: 12.5, top: 23.7, delay: 0.8, duration: 3.2 },
      { left: 34.2, top: 56.1, delay: 1.3, duration: 4.5 },
      { left: 67.8, top: 12.9, delay: 0.5, duration: 2.8 },
      { left: 89.1, top: 78.3, delay: 1.9, duration: 3.7 },
      { left: 45.6, top: 34.5, delay: 2.1, duration: 4.1 },
      { left: 23.4, top: 91.2, delay: 0.7, duration: 3.3 },
      { left: 78.9, top: 45.6, delay: 1.4, duration: 2.9 },
      { left: 15.3, top: 67.8, delay: 2.2, duration: 4.6 },
      { left: 56.7, top: 8.4, delay: 0.9, duration: 3.1 },
      { left: 92.5, top: 51.7, delay: 1.6, duration: 3.9 },
      { left: 8.7, top: 72.3, delay: 2.4, duration: 4.2 },
      { left: 63.2, top: 28.9, delay: 0.6, duration: 2.7 },
      { left: 37.5, top: 84.1, delay: 1.8, duration: 3.5 },
      { left: 71.8, top: 16.4, delay: 2.5, duration: 4.8 },
      { left: 4.2, top: 63.7, delay: 1.1, duration: 3.0 },
      { left: 85.4, top: 39.5, delay: 0.4, duration: 2.6 },
      { left: 27.9, top: 96.8, delay: 1.7, duration: 4.3 },
      { left: 52.1, top: 7.2, delay: 2.3, duration: 3.4 },
      { left: 76.3, top: 54.9, delay: 0.8, duration: 2.5 },
      { left: 19.6, top: 82.4, delay: 1.5, duration: 4.0 },
      { left: 48.7, top: 13.6, delay: 2.0, duration: 3.6 },
      { left: 91.2, top: 67.3, delay: 0.3, duration: 2.9 },
      { left: 31.5, top: 42.8, delay: 1.2, duration: 4.4 },
      { left: 64.9, top: 85.1, delay: 1.9, duration: 3.8 },
      { left: 11.4, top: 29.7, delay: 0.7, duration: 3.2 },
      { left: 73.8, top: 71.5, delay: 2.1, duration: 4.7 },
      { left: 43.2, top: 5.9, delay: 0.9, duration: 2.4 },
      { left: 86.7, top: 58.3, delay: 1.6, duration: 3.5 },
      { left: 25.1, top: 94.6, delay: 2.3, duration: 4.1 },
      { left: 59.5, top: 37.2, delay: 1.0, duration: 3.3 },
    ];

    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      ...positions[i],
    }));
  }, []);
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-blue-950 via-blue-900 to-blue-950">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-t border-blue-400/30"
            style={{ top: `${i * 5}%` }}
          ></div>
        ))}
        {[...Array(20)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-blue-400/30"
            style={{ left: `${i * 5}%` }}
          ></div>
        ))}
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-300/40 rounded-full animate-pulse"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        ></div>
      ))}

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
        {/* Animated Bar Chart */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-64 px-12">
          {[55, 48, 62, 45, 58, 70, 52, 65, 58, 72, 48, 68, 55, 75, 62, 70].map(
            (height, i) => (
              <div
                key={i}
                className="flex-1 max-w-8 mx-1 bg-linear-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-1000 opacity-60"
                style={{
                  height: animate ? `${height}%` : "0%",
                  animationDelay: `${i * 0.05}s`,
                }}
              ></div>
            ),
          )}
        </div>

        {/* Chart Lines and Labels */}
        <svg
          className={`relative z-20 w-full max-w-2xl h-80 transition-all duration-1500 ${
            animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          viewBox="0 0 600 300"
          fill="none"
        >
          <defs>
            <linearGradient
              id="lineGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient
              id="lineGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Blue Wave Line */}
          <path
            d="M 50 180 Q 120 150, 180 160 T 300 140 T 420 130 T 550 120"
            stroke="url(#lineGradient1)"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
            strokeLinecap="round"
            className={animate ? "animate-dash" : ""}
          />

          {/* Green Wave Line */}
          <path
            d="M 50 220 Q 120 200, 180 190 T 300 160 T 420 140 T 550 110"
            stroke="url(#lineGradient2)"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
            strokeLinecap="round"
            className={animate ? "animate-dash" : ""}
            style={{ animationDelay: "0.3s" }}
          />

          {/* Data Points on Blue Line */}
          {[
            [50, 180],
            [180, 160],
            [300, 140],
            [420, 130],
            [550, 120],
          ].map(([x, y], i) => (
            <circle
              key={`blue-${i}`}
              cx={x}
              cy={y}
              r="4"
              fill="#60A5FA"
              className={`${animate ? "animate-pulse" : ""}`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}

          {/* Data Points on Green Line */}
          {[
            [50, 220],
            [180, 190],
            [300, 160],
            [420, 140],
            [550, 110],
          ].map(([x, y], i) => (
            <circle
              key={`green-${i}`}
              cx={x}
              cy={y}
              r="4"
              fill="#34D399"
              className={`${animate ? "animate-pulse" : ""}`}
              style={{ animationDelay: `${0.3 + i * 0.2}s` }}
            />
          ))}
        </svg>

        {/* Floating Metric Labels */}
        <div
          className={`absolute top-24 left-16 transition-all duration-1000 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold shadow-lg">
            2330.82
          </div>
        </div>

        <div
          className={`absolute top-32 right-32 transition-all duration-1000 delay-200 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="bg-emerald-500 text-white px-3 py-1 rounded text-xs font-semibold shadow-lg">
            3158.84
          </div>
        </div>

        {/* Percentage Labels */}
        <div
          className={`absolute top-44 right-24 transition-all duration-1000 delay-300 ${
            animate ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-emerald-400 text-sm font-semibold">+12%</div>
        </div>

        <div
          className={`absolute top-52 left-32 transition-all duration-1000 delay-400 ${
            animate ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-blue-400 text-sm font-semibold">+7.1%</div>
        </div>

        <div
          className={`absolute bottom-32 left-24 transition-all duration-1000 delay-500 ${
            animate ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-gray-400 text-sm font-semibold">-3.4%</div>
        </div>

        <div
          className={`absolute bottom-36 right-16 transition-all duration-1000 delay-600 ${
            animate ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-gray-400 text-sm font-semibold">+5.2%</div>
        </div>

        <div
          className={`absolute top-36 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${
            animate ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-gray-500 text-sm font-semibold">-3.9%</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-dash {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
