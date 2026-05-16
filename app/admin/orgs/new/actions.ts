"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { users, organizations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createOrg(data: {
  name: string;
  type: "kodomo_shokudo" | "shounen_dan" | "club" | "other";
  description: string;
  representativeName: string;
  representativeContact: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("認証が必要です");

  const [admin] = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);
  if (!admin || admin.role !== "admin") throw new Error("管理者権限が必要です");

  await db.insert(organizations).values({
    name: data.name,
    type: data.type,
    description: data.description || null,
    representativeName: data.representativeName || null,
    representativeContact: data.representativeContact || null,
    status: "active",
  });

  redirect("/admin/orgs");
}
