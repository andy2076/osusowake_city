"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { registerStoreOwner } from "@/lib/store-owner";
import { redirect } from "next/navigation";
import type { TierKey } from "@/lib/constants";

export async function createStore(data: {
  ownerEmail: string;
  ownerPassword: string;
  name: string;
  tier: TierKey;
  cuisine: string;
  address: string;
  phone: string;
  description: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("認証が必要です");

  // 管理者チェック
  const [admin] = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);
  if (!admin || admin.role !== "admin") throw new Error("管理者権限が必要です");

  // 店舗 + 店主アカウント作成
  const result = await registerStoreOwner(data.ownerEmail, data.ownerPassword, {
    name: data.name,
    tier: data.tier,
    cuisine: data.cuisine || undefined,
    address: data.address || undefined,
    phone: data.phone || undefined,
    description: data.description || undefined,
  });

  console.log("\n========================================");
  console.log("  店主アカウント作成完了");
  console.log(`  メール: ${data.ownerEmail}`);
  console.log(`  店舗: ${data.name}`);
  console.log(`  ユーザーID: ${result.userId}`);
  console.log(`  店舗ID: ${result.storeId}`);
  console.log("========================================\n");

  redirect("/admin/stores");
}
