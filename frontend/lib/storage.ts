// lib/storage.ts
export function lsGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function lsSet(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
