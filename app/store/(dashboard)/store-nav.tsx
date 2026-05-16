"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Store, Settings, Receipt, LogOut } from "lucide-react";

const navItems = [
  { href: "/store/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/store/profile", label: "店舗情報", icon: Store },
  { href: "/store/settings", label: "設定", icon: Settings },
  { href: "/store/receipts", label: "レシート", icon: Receipt },
];

export function StoreNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                    isActive
                      ? "border-indigo text-indigo font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-1.5 px-3 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">ログアウト</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
