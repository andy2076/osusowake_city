"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateStoreProfile(data: {
  name: string;
  cuisine: string;
  address: string;
  phone: string;
  businessHours: Record<string, string>;
  features: string[];
  description: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("認証が必要です");

  await db
    .update(stores)
    .set({
      name: data.name,
      cuisine: data.cuisine || null,
      address: data.address || null,
      phone: data.phone || null,
      businessHours: data.businessHours,
      features: data.features,
      description: data.description || null,
    })
    .where(eq(stores.ownerUserId, session.user.id));

  revalidatePath("/store/profile");
  revalidatePath("/stores");
}
