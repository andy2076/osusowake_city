import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/db";
import { stores, organizations, users, receipts } from "@/db/schema";
import { eq, sql, and, gte } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Store, Heart, Users, Receipt, TrendingUp, Banknote } from "lucide-react";

export const metadata: Metadata = {
  title: "管理ダッシュボード | まちのおすそわけ",
};

export default async function AdminDashboardPage() {
  await requireAdmin();

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  // KPI クエリを並列実行
  const [
    [storeCount],
    [orgCount],
    [userCount],
    [monthlyStats],
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(stores).where(eq(stores.status, "active")),
    db.select({ count: sql<number>`count(*)::int` }).from(organizations).where(eq(organizations.status, "active")),
    db.select({ count: sql<number>`count(*)::int` }).from(users),
    db.select({
      receiptCount: sql<number>`count(*)::int`,
      totalDonation: sql<number>`coalesce(sum(${receipts.donationAmount}), 0)::int`,
      totalOperator: sql<number>`coalesce(sum(${receipts.operatorFee}), 0)::int`,
    }).from(receipts).where(gte(receipts.uploadedAt, monthStart)),
  ]);

  const kpis = [
    { label: "加盟店数", value: storeCount.count, icon: Store, color: "text-indigo" },
    { label: "加盟団体数", value: orgCount.count, icon: Heart, color: "text-accent" },
    { label: "登録ユーザー数", value: userCount.count, icon: Users, color: "text-indigo" },
    { label: "今月の総支援額", value: `¥${monthlyStats.totalDonation.toLocaleString()}`, icon: TrendingUp, color: "text-accent" },
    { label: "今月のレシート数", value: monthlyStats.receiptCount, icon: Receipt, color: "text-indigo" },
    { label: "今月の運営収入", value: `¥${monthlyStats.totalOperator.toLocaleString()}`, icon: Banknote, color: "text-accent" },
  ];

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-8">
          管理ダッシュボード
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="border-border">
              <CardContent className="pt-5 text-center">
                <kpi.icon size={20} className={`mx-auto mb-2 ${kpi.color}`} />
                <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                <p className={`text-2xl font-bold ${kpi.color}`}>
                  {kpi.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
