"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppDispatch } from "@/Redux/hooks";
import { setUser } from "@/Redux/features/auth/authSlice";
import { useLoginMutation } from "@/Redux/features/auth/authApi";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/reusable/Logo";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const animate = true;

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const particles = useMemo(() => {
    // Pre-generated random values to avoid impure function calls during render
    const positions = [
      { left: 23.4, top: 67.8, delay: 1.2, duration: 3.5 },
      { left: 78.1, top: 12.3, delay: 0.8, duration: 4.2 },
      { left: 45.6, top: 89.1, delay: 2.3, duration: 2.8 },
      { left: 12.9, top: 34.5, delay: 0.5, duration: 3.1 },
      { left: 67.2, top: 56.7, delay: 1.8, duration: 4.7 },
      { left: 91.5, top: 23.4, delay: 2.1, duration: 2.9 },
      { left: 34.8, top: 78.9, delay: 0.9, duration: 3.6 },
      { left: 56.3, top: 4.2, delay: 2.5, duration: 4.1 },
      { left: 8.7, top: 91.6, delay: 1.4, duration: 2.4 },
      { left: 82.4, top: 65.3, delay: 0.6, duration: 3.8 },
      { left: 15.9, top: 42.7, delay: 2.7, duration: 4.5 },
      { left: 73.2, top: 18.9, delay: 1.1, duration: 2.3 },
      { left: 29.5, top: 84.1, delay: 0.3, duration: 3.9 },
      { left: 96.8, top: 51.4, delay: 1.9, duration: 4.3 },
      { left: 41.1, top: 7.8, delay: 2.2, duration: 2.7 },
      { left: 64.7, top: 72.5, delay: 0.7, duration: 3.4 },
      { left: 18.3, top: 39.2, delay: 1.6, duration: 4.8 },
      { left: 85.6, top: 96.7, delay: 2.4, duration: 2.1 },
      { left: 52.9, top: 27.3, delay: 0.4, duration: 3.2 },
      { left: 7.4, top: 61.8, delay: 1.3, duration: 4.6 },
    ];

    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      ...positions[i],
    }));
  }, []);

  const handleLogin = async () => {
    try {
      const userInfo = { email, password };
      const res = await login(userInfo).unwrap();

      if (res.success) {
        dispatch(
          setUser({
            user: res.data.user,
            token: res.data.token,
          }),
        );
        toast.success("Login successful!");
        router.push(redirectPath);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Left Section - Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 sm:px-12 lg:px-20">
        <div
          className={`w-full max-w-md mx-auto transition-all duration-1000 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <Link href={"/"}>
              {" "}
              <Logo />
            </Link>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Access your dashboard and manage your investments
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-900 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-900 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:bg-gray-400"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don&#39;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-900 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-linear-to-br from-teal-400 via-emerald-500 to-cyan-600">
          {/* Animated Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>

          {/* Floating Particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Chart Illustration */}
        <div className="relative z-10 flex items-center justify-center w-full p-12">
          <div className="relative w-full max-w-lg">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(10)].map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute w-full border-t border-white/30"
                  style={{ top: `${i * 10}%` }}
                ></div>
              ))}
              {[...Array(10)].map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute h-full border-l border-white/30"
                  style={{ left: `${i * 10}%` }}
                ></div>
              ))}
            </div>

            {/* Animated Chart Bars */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-48 px-8">
              {[40, 60, 45, 75, 55, 85, 70, 95].map((height, i) => (
                <div
                  key={i}
                  className="w-8 bg-linear-to-t from-cyan-300 to-teal-200 rounded-t-lg opacity-60 transition-all duration-1000"
                  style={{
                    height: animate ? `${height}%` : "0%",
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>

            {/* Growth Arrow */}
            <svg
              className={`relative z-20 w-full h-64 transition-all duration-2000 ${
                animate ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              viewBox="0 0 400 300"
              fill="none"
            >
              {/* Arrow Path with Glow */}
              <defs>
                <linearGradient
                  id="arrowGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#FCD34D" />
                  <stop offset="100%" stopColor="#FBBF24" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Chart Line */}
              <path
                d="M 50 250 Q 100 220, 150 200 T 250 120 T 350 50"
                stroke="url(#arrowGradient)"
                strokeWidth="6"
                fill="none"
                filter="url(#glow)"
                strokeLinecap="round"
                className={animate ? "animate-dash" : ""}
              />

              {/* Arrow Head */}
              <path
                d="M 350 50 L 330 60 L 340 70 L 360 50 L 340 30 L 330 40 Z"
                fill="url(#arrowGradient)"
                filter="url(#glow)"
              />

              {/* Data Points */}
              {[
                [50, 250],
                [150, 200],
                [250, 120],
                [350, 50],
              ].map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="6"
                  fill="#FFF"
                  className={`${animate ? "animate-pulse" : ""}`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </svg>

            {/* Floating Stats */}
            <div
              className={`absolute top-20 right-8 bg-white/10 backdrop-blur-md rounded-lg p-4 transition-all duration-1000 ${
                animate
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="text-white text-2xl font-bold">+24.5%</div>
              <div className="text-white/70 text-sm">Growth Rate</div>
            </div>

            <div
              className={`absolute bottom-32 left-8 bg-white/10 backdrop-blur-md rounded-lg p-4 transition-all duration-1000 delay-300 ${
                animate
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="text-white text-2xl font-bold">$125K</div>
              <div className="text-white/70 text-sm">Portfolio Value</div>
            </div>
          </div>
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
