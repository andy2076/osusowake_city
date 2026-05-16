import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: [
    "/me/:path*",
    "/upload/:path*",
    "/donate-select/:path*",
    "/donate-complete/:path*",
    "/store/:path*",
    "/org/:path*",
    "/admin/:path*",
  ],
};
