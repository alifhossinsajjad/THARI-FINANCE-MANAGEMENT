/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
import Logo from "@/components/reusable/Logo";
import RegisterRightSection from "@/components/auth/RegisterRightSection";
import TermsModal from "@/components/common/TermsModal";

// ✅ add
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"register" | "otp">("register");

  // ✅ add
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [verifyOtp, { isLoading: isVerifyLoading }] = useVerifyOtpMutation();
  const router = useRouter();

  const [showTermsModal, setShowTermsModal] = useState(false);

  const animate = true;

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
      toast.success(
        "Registration successful! Please check your email for OTP.",
      );
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
    <div className="flex h-screen w-full overflow-hidden bg-[#E5E7EB]">
      {/* Left Section - Signup/OTP Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 sm:px-12 lg:px-20 bg-[#E5E7EB]">
        <div
          className={`w-full max-w-md mx-auto transition-all duration-1000 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-4 pb-8">
            <div className="p-1.5 rounded-2xl">
              <Logo />
            </div>
          </Link>

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
                    className="w-full px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-900 focus:border-transparent transition-all text-sm"
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
                    className="w-full px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-900 focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                {/* Password Input (with toggle) */}
                <div>
                  <Label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </Label>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-900 focus:border-transparent transition-all text-sm"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      aria-pressed={showPassword}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input (with toggle) */}
                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </Label>

                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-900 focus:border-transparent transition-all text-sm"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      aria-pressed={showConfirmPassword}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTermsModal(true);
                      }}
                      className="text-blue-900 hover:underline font-medium cursor-pointer"
                    >
                      Terms & Conditions
                    </button>{" "}
                    and{" "}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTermsModal(true);
                      }}
                      className="text-blue-900 hover:underline cursor-pointer"
                      type="button"
                    >
                      Privacy Policy
                    </button>
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
                  We&apos;ve sent a code to{" "}
                  <span className="font-bold">{email}</span>
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
                    className="w-full px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-900 focus:border-transparent transition-all text-sm"
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
                    type="button"
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
      <RegisterRightSection />
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAgree={() => {
          setAgreedToTerms(true);
          setShowTermsModal(false);
          toast.success("Terms accepted");
        }}
      />
    </div>
  );
}
