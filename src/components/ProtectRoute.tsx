"use client";
import { useAuth } from "@/utils/Auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth() as any;
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Define all routes that don't require authentication
  const publicRoutes = useMemo(
    () => [
      "/",
      "/login",
      "/signup",
      "/register",
      "/otp",
      "/forget-password",
      "/new-password",
    ],
    []
  );


  // useEffect(() => {
  //   if (isLoading) return;

    // ✅ CASE 1: User is logged in and currently on a public route
    // if (user?.token && publicRoutes.includes(pathname)) {
    //   if (user.role === "USER") {
    //     if (user.hasShippingDetails && user.isVerifiedPhone) {
    //       // User has address → redirect to user dashboard (if not already there)
    //       if (pathname !== "/user") router.push("/user");
    //     } else if (!user.hasShippingDetails) {
    //       // User doesn't have address → redirect to /address (if not already there)
    //       if (pathname !== "/address") router.push("/address");
    //     } else if (!user.isVerifiedPhone) {
    //       if (pathname !== "/otp-phone") router.push("/otp-phone");
    //     }
    //   } else {
    //     // Admin user
    //     if (pathname !== "/admin") router.push("/admin");
    //   }
    //   return;
    // }

  //   // ✅ CASE 2: User is not logged in and tries to access a protected route
  //   if (!user?.token && !publicRoutes.includes(pathname)) {
  //     router.push(`/?redirect=${encodeURIComponent(pathname)}`);
  //     return;
  //   }

  //   // ✅ CASE 3: User logged in but no address, and on protected routes other than /address
  //   if (
  //     user?.token &&
  //     user.role === "USER" &&
  //     !user.hasShippingDetails &&
  //     pathname !== "/address"
  //   ) {
  //     router.push("/address");
  //     return;
  //   }
  // }, [user, isLoading, pathname, router, publicRoutes]);

  // ✅ While checking authentication, show nothing (or you could add a loader)
  if (isLoading) return null;

  // ✅ Render children if:
  // 1. User is logged in and on a protected route, or
  // 2. User is logged out and on a public route
  // if (
  //   (user?.token && !publicRoutes.includes(pathname)) ||
  //   (!user?.token && publicRoutes.includes(pathname))
  // ) {
    return <>{children}</>;
  // }

  // return null;
}
