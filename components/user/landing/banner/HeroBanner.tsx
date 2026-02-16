"use client";

import GetStartedButton from "@/components/reusable/GetStartedButton";
import { WiStars } from "react-icons/wi";

import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";

import { useState } from "react";
import { useAppDispatch } from "@/Redux/hooks";
import { useLoginMutation } from "@/Redux/features/auth/authApi";
import { setUser } from "@/Redux/features/auth/authSlice";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function HeroBanner() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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
        router.push("/");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative bg-primary min-h-screen">
      <div className="container mx-auto px-4 sm:px-10 lg:px-8 py-8 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 xl:gap-58">
          {/* LEFT SECTION - Content */}
          <div className="w-full lg:w-1/2 space-y-8 lg:space-y-8">
            {/* Powered by badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full w-fit">
              <WiStars size={30} className="text-primary" />
              <span className="text-primary text-sm sm:text-base font-medium">
                Powered by: halarain.com
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              #1 Platform for Sharia-compliant stock insights
            </h1>

            {/* Description */}
            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed">
              Thari (powered by halarain.com) helps Muslims quickly check
              whether a stock is Sharia-compliant (Halal) or non-compliant
              (Haram). Get clear compliance insights, practical analysis, and
              simple financial tools—plus community discussions on investing and
              crypto.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <GetStartedButton />
            </div>
          </div>

          {/* RIGHT SECTION - Login Card */}
          <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-xl">
              {/* Welcome Header */}
              <div className=" mb-6">
                <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2">
                  Welcome
                </h2>
                <p className="text-white text-sm ">
                  Access your dashboard and manage your investments
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-lg" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-white/30 rounded-lg py-3 pl-10 pr-4 text-gray-700 placeholder:text-[#9CA3AF] focus:outline-none focus:border-white/60 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-[#9CA3AF] text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-lg" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Type your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-white/30 rounded-lg py-3 pl-10 pr-10 text-gray-700 placeholder:text-[#9CA3AF] focus:outline-none focus:border-white/60 transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-gray-700 focus:outline-none"
                    >
                      {showPassword ? (
                        <RiEyeOffLine className="text-lg" />
                      ) : (
                        <RiEyeLine className="text-lg" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-white/80">
                    <input
                      type="checkbox"
                      className="rounded border-white/30 bg-white/10"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-primary font-semibold py-3 rounded-lg hover:bg-white/90 transition-colors mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </button>
              </form>

              {/* Divider */}
              {/* <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white/60">or</span>
                </div>
              </div> */}

              {/* Sign up link */}
              <p className=" text-white/80 text-sm mt-6">
                Don't have an account?{" "}
                <a
                  href="/auth/register"
                  className="text-white font-semibold hover:underline"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
