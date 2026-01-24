// lib/api.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class ApiError extends Error {
  status: number;
  data: any;
  constructor(message: string, status: number, data: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("bb:token");
}

export async function api<T>(
  path: string,
  options: {
    method?: HttpMethod;
    body?: any;
    token?: string | null;
    headers?: Record<string, string>;
    cache?: RequestCache;
  } = {}
): Promise<T> {
  const method = options.method ?? "GET";
  const token = options.token ?? getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: options.cache ?? "no-store"
  });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await res.json() : await res.text();

  if (!res.ok) {
    throw new ApiError(data?.message || "Request failed", res.status, data);
  }

  return data as T;
}
