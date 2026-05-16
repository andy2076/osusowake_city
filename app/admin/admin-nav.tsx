"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Store, Heart, Banknote, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin", label: "ダッシュボード", icon: LayoutDashboard, exact: true },
  { href: "/admin/stores", label: "店舗管理", icon: Store, exact: false },
  { href: "/admin/orgs", label: "団体管理", icon: Heart, exact: false },
  { href: "/admin/payouts", label: "送金管理", icon: Banknote, exact: false },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="text-xs font-bold text-accent mr-2 py-3">ADMIN</span>
            {navItems.map(({ href, label, icon: Icon, exact }) => {
              const isActive = exact
                ? pathname === href
                : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                    isActive
                      ? "border-accent text-accent font-medium"
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
