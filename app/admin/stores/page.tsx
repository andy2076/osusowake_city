import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/db";
import { stores, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TIER_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "店舗管理 | まちのおすそわけ",
};

export default async function AdminStoresPage() {
  await requireAdmin();

  const allStores = await db
    .select({
      id: stores.id,
      name: stores.name,
      tier: stores.tier,
      status: stores.status,
      cuisine: stores.cuisine,
      address: stores.address,
      cumulativeDonation: stores.cumulativeDonation,
      ownerUserId: stores.ownerUserId,
      createdAt: stores.createdAt,
    })
    .from(stores)
    .orderBy(desc(stores.createdAt));

  // 店主メール取得
  const ownerIds = allStores.map((s) => s.ownerUserId).filter(Boolean) as string[];
  const ownerUsers = ownerIds.length > 0
    ? await db.select({ id: users.id, email: users.email }).from(users)
    : [];
  const ownerMap = new Map(ownerUsers.map((u) => [u.id, u.email]));

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">店舗管理</h1>
          <Link
            href="/admin/stores/new"
            className={buttonVariants({ className: "bg-accent hover:bg-accent-dark text-white" })}
          >
            <Plus size={16} className="mr-1" />
            店舗追加
          </Link>
        </div>

        {allStores.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-12 text-center text-muted-foreground text-sm">
              登録された店舗はありません
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {allStores.map((s) => {
              const tierLabel = s.tier
                ? TIER_CONFIG[s.tier as keyof typeof TIER_CONFIG]?.label
                : null;
              return (
                <Card key={s.id} className="border-border">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-sm truncate">{s.name}</p>
                          {tierLabel && (
                            <Badge variant="outline" className="shrink-0">
                              {tierLabel}
                            </Badge>
                          )}
                          <Badge
                            variant={s.status === "active" ? "default" : "outline"}
                            className="shrink-0"
                          >
                            {s.status === "active" ? "稼働中" : s.status === "pending" ? "審査中" : "停止中"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {s.cuisine && `${s.cuisine} · `}
                          {s.address ?? "住所未設定"}
                          {s.ownerUserId && ` · 店主: ${ownerMap.get(s.ownerUserId) ?? "不明"}`}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-accent shrink-0">
                        ¥{(s.cumulativeDonation ?? 0).toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
