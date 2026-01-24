"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setAuthToken } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const res = await api<{
        token: string;
        user: { id: string; name: string; email: string };
        handle: string | null;
      }>("/api/auth/login", { method: "POST", body: { email, password } });

      setAuthToken(res.token);
      router.push("/builder");
    } catch (e: any) {
      setErr(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-neutral-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200/70 dark:border-neutral-800 p-6">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Login</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Sign in to sync your portfolio to the cloud.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {err ? (
            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-3">
              {err}
            </div>
          ) : null}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </Button>

          <button
            type="button"
            onClick={() => router.push("/register")}
            className="w-full text-sm text-neutral-700 dark:text-neutral-300 hover:underline"
          >
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
}
