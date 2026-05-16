import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users, stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { TierKey } from "./constants";

type StoreData = {
  name: string;
  tier: TierKey;
  cuisine?: string;
  description?: string;
  address?: string;
  phone?: string;
  businessHours?: Record<string, string>;
  features?: string[];
  defaultOrgId?: string;
  founderMember?: boolean;
  monthlyBudgetCap?: number;
};

/**
 * 店主アカウントを登録する。
 * 1. メールでユーザーを検索（既存なら role を更新、なければ作成）
 * 2. 店舗レコードを作成して紐付け
 *
 * 運営画面 (Sprint 6) または将来の /store/signup から呼ばれる想定。
 */
export async function registerStoreOwner(
  email: string,
  password: string,
  storeData: StoreData
): Promise<{ userId: string; storeId: string }> {
  const hashedPassword = await bcrypt.hash(password, 10);

  return await db.transaction(async (tx) => {
    const [existingUser] = await tx
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    let userId: string;

    if (existingUser) {
      userId = existingUser.id;
      await tx
        .update(users)
        .set({ role: "store_owner" })
        .where(eq(users.id, userId));
    } else {
      const [newUser] = await tx
        .insert(users)
        .values({
          email,
          password: hashedPassword,
          role: "store_owner",
        })
        .returning({ id: users.id });
      userId = newUser.id;
    }

    const [newStore] = await tx
      .insert(stores)
      .values({
        name: storeData.name,
        tier: storeData.tier,
        cuisine: storeData.cuisine ?? null,
        description: storeData.description ?? null,
        address: storeData.address ?? null,
        phone: storeData.phone ?? null,
        businessHours: storeData.businessHours ?? null,
        features: storeData.features ?? [],
        defaultOrgId: storeData.defaultOrgId ?? null,
        founderMember: storeData.founderMember ?? false,
        monthlyBudgetCap: storeData.monthlyBudgetCap ?? null,
        status: "active",
        ownerUserId: userId,
      })
      .returning({ id: stores.id });

    return { userId, storeId: newStore.id };
  });
}
