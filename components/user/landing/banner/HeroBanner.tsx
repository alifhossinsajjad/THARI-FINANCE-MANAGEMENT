"use client";

import GetStartedButton from "@/components/reusable/GetStartedButton";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroBanner() {
  const [animate, setAnimate] = useState(false);
  const [particlePositions, setParticlePositions] = useState<
    Array<{ left: number; top: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Generate random positions for particles
      const positions = [];
      for (let i = 0; i < 40; i++) {
        positions.push({
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 2 + Math.random() * 4,
        });
      }
      setParticlePositions(positions);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex items-center  justify-center  md:max-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 py-20 lg:py-32">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full border-t border-blue-400/30"
            style={{ top: `${i * 7}%` }}
          ></div>
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full border-l border-blue-400/30"
            style={{ left: `${i * 7}%` }}
          ></div>
        ))}
      </div>

      {/* Floating Particles */}
      {particlePositions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-300/30 rounded-full animate-pulse"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            animationDelay: `${pos.delay}s`,
            animationDuration: `${pos.duration}s`,
          }}
        ></div>
      ))}

      {/* Decorative Glowing Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl pt-48 justify-center px-6 lg:px-8 flex flex-col items-center">
        <div
          className={`text-center transition-all duration-1000 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Invest Smarter. Invest Halal.
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Sharia-compliant stock, crypto, and commodity insights to help you
            grow your wealth with confidence.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <GetStartedButton
              text="Get Started"
              href="/auth/register"
              showArrow={true}
              borderClass="border-[#0051C3]"
              bgClass="bg-white  hover:bg-gray-100"
            />

            <GetStartedButton
              text="View Pricing"
              href="/pricing"
              showArrow={false}
              bgClass="group flex items-center gap-2 cursor-pointer bg-transparent text-white border-2 border-white px-6 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            />
          </div>

          {/* Social Proof */}
          <div
            className={`flex  justify-center items-center gap-3 transition-all duration-1000 delay-500 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* User Avatars */}
            <div className="flex -space-x-3">
              <Image
                src="/images/user/onlineUsers.png"
                width={180}
                height={180}
                alt="online Users"
              />
            </div>

            {/* User Count */}
            <div className="text-white">
              <div className="text-2xl font-bold">20M+</div>
              <div className="text-sm text-gray-300">Active Users</div>
            </div>
          </div>
        </div>

        {/* Decorative Divider Line */}
        <div
          className={`mt-16 w-px h-24 bg-gradient-to-b from-blue-400 to-transparent transition-all duration-1000 delay-700 ${
            animate ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      </div>

      {/* Animated Chart Elements at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#34D399" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q150,30 300,50 T600,50 T900,50 T1200,50 L1200,100 L0,100 Z"
            fill="url(#waveGradient)"
            className={animate ? "animate-wave" : ""}
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,50 Q150,30 300,50 T600,50 T900,50 T1200,50 L1200,100 L0,100 Z;
                M0,50 Q150,70 300,50 T600,50 T900,50 T1200,50 L1200,100 L0,100 Z;
                M0,50 Q150,30 300,50 T600,50 T900,50 T1200,50 L1200,100 L0,100 Z
              "
            />
          </path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}
