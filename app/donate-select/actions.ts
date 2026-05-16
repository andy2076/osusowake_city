"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { receipts, users, stores, organizations } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { calculateDonation, type DonationMode } from "@/lib/donation";
import type { TierKey } from "@/lib/constants";

type SubmitDonationInput = {
  storeId: string;
  storeName: string;
  tier: TierKey;
  amount: number;
  photoUrl: string;
  mode: DonationMode;
  orgId: string;
  orgName: string;
};

export type DonationResult = {
  donationAmount: number;
  selfPoints: number;
  orgName: string;
  mode: DonationMode;
};

export async function submitDonation(
  input: SubmitDonationInput
): Promise<DonationResult> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("認証が必要です");

  const userId = session.user.id;
  const breakdown = calculateDonation(input.tier, input.mode);

  // ダミーデータ ID (store-1 等) は UUID 形式ではないので判定
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const isRealStoreId = uuidRegex.test(input.storeId);
  const isRealOrgId = uuidRegex.test(input.orgId);

  // 全て1トランザクションで実行
  await db.transaction(async (tx) => {
    // レシート INSERT
    await tx.insert(receipts).values({
      userId,
      storeId: isRealStoreId ? input.storeId : null,
      photoUrl: input.photoUrl,
      amount: input.amount,
      status: "pending",
      storeBurden: breakdown.storeBurden,
      selfPoints: breakdown.selfPoints,
      donationAmount: breakdown.donationAmount,
      operatorFee: breakdown.operatorFee,
      donationMode: input.mode,
      recipientOrgId: isRealOrgId ? input.orgId : null,
    });

    // ユーザー累計更新
    await tx
      .update(users)
      .set({
        totalDonatedAmount: sql`${users.totalDonatedAmount} + ${breakdown.donationAmount}`,
        totalSelfPoints: sql`${users.totalSelfPoints} + ${breakdown.selfPoints}`,
      })
      .where(eq(users.id, userId));

    // 店舗の累計更新（DB に実レコードがある場合のみ）
    if (isRealStoreId) {
      await tx
        .update(stores)
        .set({
          cumulativeDonation: sql`${stores.cumulativeDonation} + ${breakdown.storeBurden}`,
        })
        .where(eq(stores.id, input.storeId));
    }

    // 団体の累計更新（DB に実レコードがある場合のみ）
    if (isRealOrgId) {
      await tx
        .update(organizations)
        .set({
          cumulativeReceived: sql`${organizations.cumulativeReceived} + ${breakdown.donationAmount}`,
        })
        .where(eq(organizations.id, input.orgId));
    }
  });

  return {
    donationAmount: breakdown.donationAmount,
    selfPoints: breakdown.selfPoints,
    orgName: input.orgName,
    mode: input.mode,
  };
}
