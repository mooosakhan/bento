import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * If your app is hosted under a sub-path, set it like "/app".
 * Otherwise keep "".
 */
const BASE_PATH = "";

/** roles you support */
type Role = "admin" | "user";

type JwtPayload = {
  exp?: number;
  role?: string;
  userRole?: string;
  [k: string]: unknown;
};

function p(path: string): string {
  if (!BASE_PATH) return path;
  if (path === "/") return BASE_PATH || "/";
  return `${BASE_PATH}${path}`;
}

const LOGIN_PATH = p("/login");
const REGISTER_PATH = p("/register");

const PUBLIC_PREFIXES: string[] = [
  p("/"),
  p("/u/*"),
  LOGIN_PATH,
  REGISTER_PATH,
];
const PROTECTED_PREFIXES: string[] = [p("/builder")];

const ROLE_HOME: Record<Role, string> = {
  admin: p("/dashboard/admin"),
  user: p("/builder"),
};

const ROLE_ALLOWED_PREFIXES: Record<Role, string[]> = {
  admin: [p("/dashboard/admin")],
  user: [p("/builder")],
};

const normalize = (s: unknown): string =>
  (s ?? "").toString().trim().toLowerCase();

function stripBasePath(pathname: string): string {
  if (!BASE_PATH) return pathname;
  return pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length) || "/"
    : pathname;
}

function startsWithAny(path: string, prefixes: string[]): boolean {
  return prefixes.some((pref) => {
    // support "/u/*"
    if (pref.includes("*")) {
      const base = pref.replace(/\*+$/, "").replace(/\/$/, "");
      return path === base || path.startsWith(base + "/");
    }
    return (
      path === pref ||
      path.startsWith(pref + "/") ||
      (pref !== "/" && path.startsWith(pref))
    );
  });
}

function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  if (parts.length > 1) {
    const first = parts[1]?.toLowerCase();
    if (first === "en" || first === "ur") {
      const rest = "/" + parts.slice(2).join("/");
      return rest === "/" ? "/" : rest || "/";
    }
  }
  return pathname;
}

const isPublicPath = (path: string) => startsWithAny(path, PUBLIC_PREFIXES);
const isProtectedPath = (path: string) =>
  startsWithAny(path, PROTECTED_PREFIXES);

/** Edge-safe base64url decode */
function base64UrlDecode(input: string): string {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padLen = (4 - (normalized.length % 4)) % 4;
  const padded = normalized + "=".repeat(padLen);
  return atob(padded);
}

function parseJwt(token: string | null): JwtPayload | null {
  try {
    if (!token) return null;
    const t = token.startsWith("Bearer ") ? token.slice(7) : token;
    const part = t.split(".")[1];
    if (!part) return null;

    const json = base64UrlDecode(part);

    // UTF-8 safe decode
    const decoded = decodeURIComponent(
      Array.from(json)
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join(""),
    );

    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

function isAuthenticated(token: string | null): boolean {
  if (!token) return false;
  const payload = parseJwt(token);

  // opaque token => treat as logged in
  if (!payload) return true;

  if (!payload.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
}

function getRoleFromTokenOrCookie(
  token: string | null,
  cookieRole: string | null,
): Role | "" {
  const payload = parseJwt(token);
  const claim = payload?.role ?? payload?.userRole ?? cookieRole;
  const r = normalize(claim);
  return r === "admin" || r === "user" ? (r as Role) : "";
}

export function proxy(req: NextRequest) {
  const rawPath = req.nextUrl.pathname;

  const withoutBase = stripBasePath(rawPath);
  const pathname = stripLocale(withoutBase);

  // skip next/static/assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/favicon") ||
    pathname.includes("/sw.js") ||
    pathname.includes("/manifest.json") ||
    /\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|map|txt|woff|woff2|ttf|eot)$/.test(
      pathname,
    )
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("authToken")?.value ?? null;
  const cookieUser = req.cookies.get("user")?.value ?? null;

  let userRole = null;

  if (cookieUser) {
    try {
      const userObj = JSON.parse(cookieUser);
      userRole = userObj.role;
    } catch (err) {
      console.error("Invalid user cookie JSON", err);
    }
  }

  console.log(userRole, "ROLE");

  const authed = isAuthenticated(token);
  const role = getRoleFromTokenOrCookie(token, userRole);
  const roleHome = role ? ROLE_HOME[role] : p("/");

  const proceed = NextResponse.next();
  proceed.headers.set("x-proxy-active", "1");

  // logged in + going to login => redirect home
  if (authed && pathname === LOGIN_PATH) {
    const url = req.nextUrl.clone();
    url.pathname = roleHome;
    return NextResponse.redirect(url);
  }

  // logged in + public pages (except login) => allow
  if (authed && isPublicPath(pathname) && pathname !== LOGIN_PATH) {
    return proceed;
  }

  // protected pages
  if (isProtectedPath(pathname)) {
    if (!authed) {
      const url = req.nextUrl.clone();
      url.pathname = LOGIN_PATH;
      return NextResponse.redirect(url);
    }

    // role-based allow list (only if role recognized)
    if (role) {
      const allowed = ROLE_ALLOWED_PREFIXES[role] ?? [];
      if (!startsWithAny(pathname, allowed)) {
        const url = req.nextUrl.clone();
        url.pathname = roleHome;
        return NextResponse.redirect(url);
      }
    }

    return proceed;
  }

  return proceed;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|sw.js|manifest.json).*)",
  ],
};
