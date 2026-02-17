// app/user/settings/page.tsx
"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useChangePasswordMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/Redux/features/userDashboardServices/userApi";
import { Eye, EyeOff } from "lucide-react";

export default function SettingPage() {
  // Password visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ✅ Fetch profile
  const { data, isLoading, isError, refetch } = useGetMyProfileQuery(undefined);

  // ✅ Mutations
  const [updateMyProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();
  const [changePassword, { isLoading: isChangingPass }] =
    useChangePasswordMutation();

  // Local form state (profile)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Local form state (password)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  // Populate form when profile loads
  useEffect(() => {
    const profile = (data as any)?.data ?? data; // supports both {data:{...}} and direct {...}
    if (!profile) return;

    setName(profile?.name ?? "");
    setEmail(profile?.email ?? "");
    setPhone(profile?.phone ?? "");
  }, [data]);

  const handleSaveProfile = async () => {
    try {
      // backend accepts only: { name, phone }
      const payload = { name, phone };
      await updateMyProfile(payload as any).unwrap();
      toast.success("Profile updated");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !newPasswordConfirmation) {
      toast.error("Fill all password fields");
      return;
    }

    if (newPassword !== newPasswordConfirmation) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const payload = {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      };

      await changePassword(payload as any).unwrap();
      toast.success("Password updated");

      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirmation("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to change password");
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-8">
        {/* header */}
        <div className="space-y-2">
          <div className="h-8 w-56 rounded-lg bg-gray-100" />
          <div className="h-4 w-80 max-w-full rounded-lg bg-gray-100" />
        </div>

        <div className="grid gap-6">
          {/* Profile card */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="h-5 w-28 rounded bg-gray-100" />
            <div className="mt-2 h-4 w-64 max-w-full rounded bg-gray-100" />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <div className="h-3 w-20 rounded bg-gray-100" />
                <div className="h-12 rounded-2xl bg-gray-100" />
              </div>

              <div className="space-y-2.5">
                <div className="h-3 w-20 rounded bg-gray-100" />
                <div className="h-12 rounded-2xl bg-gray-100" />
              </div>

              <div className="space-y-2.5 md:col-span-2">
                <div className="h-3 w-20 rounded bg-gray-100" />
                <div className="h-12 rounded-2xl bg-gray-100" />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <div className="h-12 w-44 rounded-2xl bg-gray-100" />
            </div>
          </div>

          {/* Password card */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="h-5 w-32 rounded bg-gray-100" />
            <div className="mt-2 h-4 w-80 max-w-full rounded bg-gray-100" />

            <div className="mt-6 grid gap-6">
              <div className="space-y-2.5">
                <div className="h-3 w-36 rounded bg-gray-100" />
                <div className="h-12 rounded-2xl bg-gray-100" />
              </div>
              <div className="space-y-2.5">
                <div className="h-3 w-28 rounded bg-gray-100" />
                <div className="h-12 rounded-2xl bg-gray-100" />
              </div>
              <div className="space-y-2.5">
                <div className="h-3 w-48 rounded bg-gray-100" />
                <div className="h-12 rounded-2xl bg-gray-100" />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-100 bg-[#f8f8ff] p-4">
              <div className="h-4 w-[70%] max-w-full rounded bg-gray-100" />
            </div>

            <div className="mt-6 flex justify-end">
              <div className="h-12 w-52 rounded-2xl bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 max-w-3xl space-y-4">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm font-medium text-gray-400">
            Manage your profile and security settings
          </p>

          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              Failed to load profile.
            </p>
            <p className="mt-1 text-sm text-red-600/90">Please try again.</p>
          </div>

          <Button
            onClick={() => refetch()}
            className="mt-6 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-blue-900/20 active:scale-95"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const fieldLabel = "text-gray-500 text-xs font-bold uppercase tracking-wider";
  const inputBase =
    "bg-[#fcfcfc] border border-gray-100 rounded-2xl px-4 py-3 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all";
  const primaryBtn =
    "bg-primary text-white font-bold rounded-2xl shadow-lg shadow-blue-900/20 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-400 font-medium text-sm">
          Manage your profile and security settings
        </p>
      </section>

      {/* Main content */}
      <div className="grid gap-6">
        {/* Profile */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
          <div>
            <h2 className="text-gray-800 font-bold">Profile</h2>
            <p className="mt-1 text-sm font-medium text-gray-400">
              Update your personal information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <Label htmlFor="name" className={fieldLabel}>
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={inputBase}
              />
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="email" className={fieldLabel}>
                Email
              </Label>
              <Input
                id="email"
                value={email}
                readOnly
                tabIndex={-1}
                className={`${inputBase} bg-gray-50 text-gray-500 cursor-not-allowed`}
              />
            </div>

            <div className="space-y-2.5 md:col-span-2">
              <Label htmlFor="phone" className={fieldLabel}>
                Phone
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880..."
                className={inputBase}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSaveProfile}
              disabled={isUpdating}
              className={`${primaryBtn} px-10 py-4 text-sm`}
            >
              {isUpdating ? "Saving..." : "Save profile"}
            </Button>
          </div>
        </section>

        {/* Password */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
          <div>
            <h2 className="text-gray-800 font-bold">Password</h2>
            <p className="mt-1 text-sm font-medium text-gray-400">
              Keep your account secure by using a strong password
            </p>
          </div>

          <div className="grid gap-6">
            {/* Current */}
            <div className="space-y-2.5">
              <Label htmlFor="currentPassword" className={fieldLabel}>
                Current password
              </Label>

              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password"
                  className={`${inputBase} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowCurrent((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showCurrent ? "Hide password" : "Show password"}
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New */}
            <div className="space-y-2.5">
              <Label htmlFor="newPassword" className={fieldLabel}>
                New password
              </Label>

              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className={`${inputBase} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showNew ? "Hide password" : "Show password"}
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm */}
            <div className="space-y-2.5">
              <Label htmlFor="passwordConfirmation" className={fieldLabel}>
                Confirm new password
              </Label>

              <div className="relative">
                <Input
                  id="passwordConfirmation"
                  type={showConfirm ? "text" : "password"}
                  value={newPasswordConfirmation}
                  onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                  placeholder="Confirm new password"
                  className={`${inputBase} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-[#f8f8ff] p-4">
            <p className="text-sm text-gray-600">
              Tip: Use 10+ characters with a mix of letters, numbers, and
              symbols.
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleChangePassword}
              disabled={isChangingPass}
              className={`${primaryBtn} px-10 py-4 text-sm`}
            >
              {isChangingPass ? "Updating..." : "Update password"}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
