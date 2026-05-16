"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateDonationMode(
  mode: "self" | "donate" | "ask"
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("認証が必要です");

  await db
    .update(users)
    .set({ defaultDonationMode: mode })
    .where(eq(users.id, session.user.id));

  revalidatePath("/me");
}

export async function updatePreferredOrg(orgId: string | null) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("認証が必要です");

  await db
    .update(users)
    .set({ preferredOrgId: orgId })
    .where(eq(users.id, session.user.id));

  revalidatePath("/me");
}

export async function updateDisplayName(name: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("認証が必要です");

  const trimmed = name.trim();
  if (!trimmed) throw new Error("表示名を入力してください");

  await db
    .update(users)
    .set({ displayName: trimmed })
    .where(eq(users.id, session.user.id));

  revalidatePath("/me");
}
