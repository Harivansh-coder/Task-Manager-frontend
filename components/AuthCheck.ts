"use client";
import { authStore } from "@/lib/stores/authStore";
import { useEffect } from "react";

export default function AuthCheck() {
  const setToken = authStore((state) => state.setToken);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [setToken]);

  return null;
}
