"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/Redux/hooks";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";

type Role = "admin" | "user";

export default function PublicOnlyRoute({
  children,
  redirectTo,
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted) return;

    // If logged in -> kick out from auth pages
    if (user) {
      const role = (user.role as string | undefined)?.toLowerCase() as Role | undefined;

      const redirect = searchParams.get("redirect");

      const fallback = redirectTo ?? (role === "admin" ? "/admin" : "/user");
      
      const target = (redirect && redirect !== "/") ? redirect : fallback;

      router.replace(target);
    }
  }, [isMounted, user, router, redirectTo, searchParams]);

  if (!isMounted) return null;

  return <>{children}</>;
}
