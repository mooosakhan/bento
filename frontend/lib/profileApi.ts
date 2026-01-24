// lib/profileApi.ts
import { api } from "@/lib/api";

export type ProfileDoc = any; // replace with your Profile type later

export function getMyProfile() {
  return api<ProfileDoc>("/api/profiles/me", { method: "GET" });
}

export function updateMyProfile(payload: Partial<ProfileDoc>) {
  return api<ProfileDoc>("/api/profiles/me", { method: "PUT", body: payload });
}

export function getPublicProfile(handle: string) {
  return api<ProfileDoc>(`/api/u/${encodeURIComponent(handle)}`, { method: "GET" });
}
