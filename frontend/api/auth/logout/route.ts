import apiClient from "@/lib/axios";
import { deleteCookie } from "cookies-next";

export async function Logout() {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
    deleteCookie("authToken", { path: "/" });
    deleteCookie("user", { path: "/" });
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}
