"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { users, receipts, organizations, monthlyPayouts } from "@/db/schema";
import { eq, and, gte, lt, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

async function verifyAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("認証が必要です");

  const [admin] = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);
  if (!admin || admin.role !== "admin") throw new Error("管理者権限が必要です");
}

export type MonthlySummary = {
  orgId: string;
  orgName: string;
  totalDonation: number;
  receiptCount: number;
  payoutId: string | null;
  payoutStatus: string | null;
};

export async function calculateMonthlyPayouts(
  year: number,
  month: number
): Promise<MonthlySummary[]> {
  await verifyAdmin();

  const monthStart = new Date(year, month - 1, 1);
  const monthEnd = new Date(year, month, 1);

  // 団体ごとの支援額集計
  const summaries = await db
    .select({
      orgId: receipts.recipientOrgId,
      totalDonation: sql<number>`coalesce(sum(${receipts.donationAmount}), 0)::int`,
      receiptCount: sql<number>`count(*)::int`,
    })
    .from(receipts)
    .where(
      and(
        gte(receipts.uploadedAt, monthStart),
        lt(receipts.uploadedAt, monthEnd),
        sql`${receipts.recipientOrgId} IS NOT NULL`
      )
    )
    .groupBy(receipts.recipientOrgId);

  // 団体名を取得
  const allOrgs = await db
    .select({ id: organizations.id, name: organizations.name })
    .from(organizations);
  const orgMap = new Map(allOrgs.map((o) => [o.id, o.name]));

  // 既存の payout レコードを取得
  const period = `${year}-${String(month).padStart(2, "0")}-01`;
  const existingPayouts = await db
    .select()
    .from(monthlyPayouts)
    .where(eq(monthlyPayouts.period, period));
  const payoutMap = new Map(
    existingPayouts.map((p) => [p.orgId, { id: p.id, status: p.status }])
  );

  return summaries
    .filter((s) => s.orgId)
    .map((s) => ({
      orgId: s.orgId!,
      orgName: orgMap.get(s.orgId!) ?? "不明な団体",
      totalDonation: s.totalDonation,
      receiptCount: s.receiptCount,
      payoutId: payoutMap.get(s.orgId!)?.id ?? null,
      payoutStatus: payoutMap.get(s.orgId!)?.status ?? null,
    }));
}

export async function confirmPayout(orgId: string, year: number, month: number) {
  await verifyAdmin();

  const period = `${year}-${String(month).padStart(2, "0")}-01`;
  const monthStart = new Date(year, month - 1, 1);
  const monthEnd = new Date(year, month, 1);

  // 支援額を集計
  const [summary] = await db
    .select({
      totalDonation: sql<number>`coalesce(sum(${receipts.donationAmount}), 0)::int`,
    })
    .from(receipts)
    .where(
      and(
        eq(receipts.recipientOrgId, orgId),
        gte(receipts.uploadedAt, monthStart),
        lt(receipts.uploadedAt, monthEnd)
      )
    );

  await db.insert(monthlyPayouts).values({
    orgId,
    period,
    totalAmount: summary.totalDonation,
    status: "calculated",
  });

  revalidatePath("/admin/payouts");
}

export async function markAsPaid(payoutId: string) {
  await verifyAdmin();

  await db
    .update(monthlyPayouts)
    .set({
      status: "paid",
      paidAt: new Date(),
    })
    .where(eq(monthlyPayouts.id, payoutId));

  revalidatePath("/admin/payouts");
}
