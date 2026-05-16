import { auth } from "@/auth";
import { db } from "@/db";
import { users, stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export type StoreOwnerContext = {
  userId: string;
  store: typeof stores.$inferSelect;
};

/**
 * 店主認証を検証し、所有する店舗情報を返す。
 * - 未認証 → /store/login
 * - role が store_owner でない → /store/unauthorized
 * - 店舗が未登録 → /store/no-store
 */
export async function requireStoreOwner(): Promise<StoreOwnerContext> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/store/login");
  }

  const [user] = await db
    .select({ id: users.id, role: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user || user.role !== "store_owner") {
    redirect("/store/unauthorized");
  }

  const [store] = await db
    .select()
    .from(stores)
    .where(eq(stores.ownerUserId, session.user.id))
    .limit(1);

  if (!store) {
    redirect("/store/no-store");
  }

  return { userId: session.user.id, store };
}
