import type { Metadata } from "next";
import { requireStoreOwner } from "@/lib/store-auth";
import { db } from "@/db";
import { receipts } from "@/db/schema";
import { eq, sql, and, gte, desc } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TIER_CONFIG } from "@/lib/constants";
import { Receipt, TrendingUp, Heart, Store } from "lucide-react";

export const metadata: Metadata = {
  title: "ダッシュボード | 店主管理",
};

export default async function StoreDashboardPage() {
  const { store } = await requireStoreOwner();

  const tierConfig = store.tier
    ? TIER_CONFIG[store.tier as keyof typeof TIER_CONFIG]
    : null;

  // 今月の開始日
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  // 今月のレシート集計
  const [monthStats] = await db
    .select({
      count: sql<number>`count(*)::int`,
      totalBurden: sql<number>`coalesce(sum(${receipts.storeBurden}), 0)::int`,
      totalDonation: sql<number>`coalesce(sum(${receipts.donationAmount}), 0)::int`,
    })
    .from(receipts)
    .where(
      and(
        eq(receipts.storeId, store.id),
        gte(receipts.uploadedAt, monthStart)
      )
    );

  // 直近5件のレシート
  const recentReceipts = await db
    .select()
    .from(receipts)
    .where(eq(receipts.storeId, store.id))
    .orderBy(desc(receipts.uploadedAt))
    .limit(5);

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            {store.name}
          </h1>
          {tierConfig && (
            <Badge variant="outline">{tierConfig.label}</Badge>
          )}
        </div>

        {/* 今月の実績 */}
        <h2 className="font-bold text-sm text-muted-foreground mb-3">
          今月の実績
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="pt-5 text-center">
              <Receipt size={20} className="mx-auto mb-2 text-indigo" />
              <p className="text-xs text-muted-foreground mb-1">レシート数</p>
              <p className="text-2xl font-bold">{monthStats.count}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-5 text-center">
              <TrendingUp size={20} className="mx-auto mb-2 text-indigo" />
              <p className="text-xs text-muted-foreground mb-1">負担額</p>
              <p className="text-2xl font-bold">
                ¥{monthStats.totalBurden.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border col-span-2 sm:col-span-1">
            <CardContent className="pt-5 text-center">
              <Heart size={20} className="mx-auto mb-2 text-accent" />
              <p className="text-xs text-muted-foreground mb-1">支援額</p>
              <p className="text-2xl font-bold text-accent">
                ¥{monthStats.totalDonation.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 累計 */}
        <Card className="border-border mb-8">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-1">
              <Store size={18} className="text-indigo" />
              <h2 className="font-bold text-sm">累計支援額</h2>
            </div>
            <p className="text-3xl font-bold text-indigo">
              ¥{(store.cumulativeDonation ?? 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* 直近のレシート */}
        <h2 className="font-bold text-sm text-muted-foreground mb-3">
          最近のレシート
        </h2>
        {recentReceipts.length === 0 ? (
          <Card className="border-border">
            <CardContent className="pt-5 text-center text-muted-foreground text-sm py-8">
              まだレシートがありません
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {recentReceipts.map((r) => (
              <Card key={r.id} className="border-border">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        ¥{(r.amount ?? 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {r.uploadedAt
                          ? new Date(r.uploadedAt).toLocaleDateString("ja-JP")
                          : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      <div>
                        <p className="text-xs text-muted-foreground">負担</p>
                        <p className="text-sm">¥{r.storeBurden ?? 0}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">支援</p>
                        <p className="text-sm text-accent">
                          ¥{r.donationAmount ?? 0}
                        </p>
                      </div>
                      <Badge
                        variant={
                          r.status === "verified"
                            ? "default"
                            : r.status === "rejected"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {r.status === "verified"
                          ? "確認済"
                          : r.status === "rejected"
                            ? "却下"
                            : "保留"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
