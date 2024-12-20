"use client";
import { authStore } from "@/lib/stores/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCheck() {
  const setToken = authStore((state) => state.setToken);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }

    if (
      (!pathName.startsWith("/signin") || !pathName.startsWith("/signup")) &&
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
