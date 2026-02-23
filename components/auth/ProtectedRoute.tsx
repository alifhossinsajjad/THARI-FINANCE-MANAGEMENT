"use client";

import { useAppSelector } from "@/Redux/hooks";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Role = "admin" | "user"; // adjust to your backend roles
type Props = {
  children: React.ReactNode;
  allowedRoles?: Role[]; // if omitted => just auth protection
  redirectTo?: string; // optional override
};

const ProtectedRoute = ({ children, allowedRoles, redirectTo }: Props) => {
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const userRole = user?.role as Role | undefined;

  const isRoleAllowed = useMemo(() => {
    if (!allowedRoles || allowedRoles.length === 0) return true;
    if (!userRole) return false;
    return allowedRoles.includes(userRole);
  }, [allowedRoles, userRole]);

  useEffect(() => {
    if (!isMounted) return;

    // Not logged in -> login with redirect
    if (!user) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // Logged in but wrong role -> go somewhere safe
    if (!isRoleAllowed) {
      router.replace(redirectTo ?? (userRole === "admin" ? "/admin" : "/user"));
    }
  }, [isMounted, user, isRoleAllowed, router, pathname, redirectTo, userRole]);

  if (!isMounted) return null;
  if (!user) return null;
  if (!isRoleAllowed) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
