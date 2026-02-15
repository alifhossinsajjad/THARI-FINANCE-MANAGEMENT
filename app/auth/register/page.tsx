"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useRegisterMutation,
  useVerifyOtpMutation,
} from "@/Redux/features/auth/authApi";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"register" | "otp">("register");

  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [verifyOtp, { isLoading: isVerifyLoading }] = useVerifyOtpMutation();
  const router = useRouter();

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

  const handleSignup = async () => {
    if (!agreedToTerms) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const userInfo = {
        email,
        password,
        password_confirmation: confirmPassword,
        role: "user",
        terms_accepted: true,
      };

      await register(userInfo).unwrap();
      toast.success("Registration successful! Please check your email for OTP.");
      setStep("otp");
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtp({ email, otp }).unwrap();
      toast.success("Email verified successfully! Please login.");
      router.push("/auth/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "OTP Verification failed");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      {/* Left Section - Signup/OTP Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 sm:px-12 lg:px-20 bg-white">
        <div
          className={`w-full max-w-md mx-auto transition-all duration-1000 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">
              THARI FINANCE
            </span>
          </div>

          {step === "register" ? (
            <>
              {/* Heading */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Create Your Account
                </h1>
                <p className="text-gray-600 text-sm">
                  Start tracking stocks and exploring halal investment
                  opportunities
                </p>
              </div>

              {/* Signup Form */}
              <div className="space-y-4">
                {/* Full Name Input - Not pushed to backend but kept for UI */}
                <div>
                  <Label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <Label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                {/* Confirm Password Input */}
                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-blue-900 border-gray-300 rounded focus:ring-blue-900 cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm text-gray-700 cursor-pointer"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-blue-900 hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-900 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Create Account Button */}
                <Button
                  onClick={handleSignup}
                  disabled={isRegisterLoading}
                  className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-2 disabled:bg-gray-400"
                >
                  {isRegisterLoading ? "Creating Account..." : "Create Account"}
                </Button>

                {/* Login Link */}
                <p className=" text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-blue-900 font-semibold hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* OTP Verification Step */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Verify Your Email
                </h1>
                <p className="text-gray-600 text-sm">
                  We've sent a code to <span className="font-bold">{email}</span>
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Enter Verification Code
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                <Button
                  onClick={handleVerifyOtp}
                  disabled={isVerifyLoading}
                  className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-2 disabled:bg-gray-400"
                >
                  {isVerifyLoading ? "Verifying..." : "Verify Email"}
                </Button>

                <p className="text-sm text-gray-600">
                  Wrong email?{" "}
                  <button
                    onClick={() => setStep("register")}
                    className="text-blue-900 font-semibold hover:underline"
                  >
                    Change email
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Section - Financial Chart Visualization */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
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
            {[
              55, 48, 62, 45, 58, 70, 52, 65, 58, 72, 48, 68, 55, 75, 62, 70,
            ].map((height, i) => (
              <div
                key={i}
                className="flex-1 max-w-8 mx-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-1000 opacity-60"
                style={{
                  height: animate ? `${height}%` : "0%",
                  animationDelay: `${i * 0.05}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Chart Lines and Labels */}
          <svg
            className={`relative z-20 w-full max-w-2xl h-80 transition-all duration-1500 ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
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
            className={`absolute top-24 left-16 transition-all duration-1000 ${animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
          >
            <div className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold shadow-lg">
              2330.82
            </div>
          </div>

          <div
            className={`absolute top-32 right-32 transition-all duration-1000 delay-200 ${animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
          >
            <div className="bg-emerald-500 text-white px-3 py-1 rounded text-xs font-semibold shadow-lg">
              3158.84
            </div>
          </div>

          {/* Percentage Labels */}
          <div
            className={`absolute top-44 right-24 transition-all duration-1000 delay-300 ${animate ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="text-emerald-400 text-sm font-semibold">+12%</div>
          </div>

          <div
            className={`absolute top-52 left-32 transition-all duration-1000 delay-400 ${animate ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="text-blue-400 text-sm font-semibold">+7.1%</div>
          </div>

          <div
            className={`absolute bottom-32 left-24 transition-all duration-1000 delay-500 ${animate ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="text-gray-400 text-sm font-semibold">-3.4%</div>
          </div>

          <div
            className={`absolute bottom-36 right-16 transition-all duration-1000 delay-600 ${animate ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="text-gray-400 text-sm font-semibold">+5.2%</div>
          </div>

          <div
            className={`absolute top-36 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${animate ? "opacity-100" : "opacity-0"
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
    </div>
  );
}
