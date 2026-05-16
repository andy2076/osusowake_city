"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Menu, X, User, LogOut } from "lucide-react";

const navLinks = [
  { href: "/stores", label: "お店をさがす" },
  { href: "/orgs", label: "応援先をみる" },
];

export function HeaderClient({
  user,
}: {
  user: { name?: string | null; email?: string | null } | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-semibold tracking-wide text-accent">
            まちのおすそわけ
          </span>
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href="/me"
                className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
              >
                <User size={15} />
                <span>{user.name || user.email?.split("@")[0]}</span>
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut size={15} />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-full bg-accent text-white text-xs font-medium hover:bg-accent-dark transition-colors"
            >
              ログイン
            </Link>
          )}
        </nav>

        {/* モバイルメニューボタン */}
        <button
          type="button"
          className="sm:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="メニューを開く"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* モバイルナビ */}
      {open && (
        <nav className="sm:hidden border-t border-border px-4 py-3 flex flex-col gap-3 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href="/me"
                className="inline-flex items-center gap-1.5 text-foreground py-1"
                onClick={() => setOpen(false)}
              >
                <User size={15} />
                マイページ
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors py-1 text-left"
              >
                <LogOut size={15} />
                ログアウト
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-accent font-medium py-1"
              onClick={() => setOpen(false)}
            >
              ログイン
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
