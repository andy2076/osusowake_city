"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { TierKey } from "@/lib/constants";

export async function updateStoreSettings(data: {
  tier: TierKey;
  defaultOrgId: string | null;
  monthlyBudgetCap: number | null;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("認証が必要です");

  await db
    .update(stores)
    .set({
      tier: data.tier,
      defaultOrgId: data.defaultOrgId,
      monthlyBudgetCap: data.monthlyBudgetCap,
    })
    .where(eq(stores.ownerUserId, session.user.id));

  revalidatePath("/store/settings");
}
