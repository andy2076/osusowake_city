import type { NextAuthConfig } from "next-auth";

/**
 * Edge Runtime (middleware) でも動く軽量な Auth 設定。
 * DB アダプターやプロバイダーの詳細は auth.ts で追加する。
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // 認証不要の公開ページ
      const publicPaths = [
        "/store/login", "/store/unauthorized", "/store/no-store",
        "/admin/unauthorized", "/signup",
      ];
      if (publicPaths.some((p) => nextUrl.pathname.startsWith(p))) {
        return true;
      }

      const protectedPaths = ["/me", "/upload", "/donate-select", "/donate-complete", "/store", "/org", "/admin"];
      const isProtected = protectedPaths.some((p) =>
        nextUrl.pathname.startsWith(p)
      );

      if (isProtected && !isLoggedIn) {
        // /store/* は店主ログインへリダイレクト
        if (nextUrl.pathname.startsWith("/store")) {
          return Response.redirect(new URL("/store/login", nextUrl));
        }
        return false; // → /login にリダイレクト
      }
      return true;
    },
  },
  providers: [], // auth.ts で上書き
};
