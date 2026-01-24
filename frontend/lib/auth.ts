// lib/auth.ts
export type AuthUser = { id: string; name: string; email: string };

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("bb:token");
}

export function setAuthToken(token: string) {
  localStorage.setItem("bb:token", token);
}

export function clearAuthToken() {
  localStorage.removeItem("bb:token");
}

export function isLoggedIn() {
  return !!getAuthToken();
}
