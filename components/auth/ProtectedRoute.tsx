"use client";

import { useAppSelector } from "@/Redux/hooks";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

useEffect(() => {
  if (isMounted && !user) {
    const currentPath = window.location.pathname;
    router.push(`/auth/login?redirect=${currentPath}`);
  }
}, [user, router, isMounted]);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  if (!user) {
    return null; // Prevent flashing content before redirect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
