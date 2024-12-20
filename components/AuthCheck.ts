"use client";
import { authStore } from "@/lib/stores/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function isTokenValid(token: string) {
  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) {
      return false;
    }

    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp > currentTime;
  } catch (err) {
    console.error("Failed to decode token", err);
    return false;
  }
}

export default function AuthCheck() {
  const setToken = authStore((state) => state.setToken);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      if (isTokenValid(token)) {
        setToken(token);
      } else {
        localStorage.removeItem("token"); // Clear expired token
        router.push("/signin");
        return;
      }
    }

    if (
      !pathName.startsWith("/signin") &&
      !pathName.startsWith("/signup") &&
      !token
    ) {
      router.push("/signin");
    }

    if (
      (pathName.startsWith("/signin") || pathName.startsWith("/signup")) &&
      token
    ) {
      router.push("/");
    }
  }, [setToken, pathName, router]);

  return null;
}
