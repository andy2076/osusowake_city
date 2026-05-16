import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

/**
 * 管理者認証を検証する。
 * - 未認証 → /login
 * - role が admin でない → /admin/unauthorized
 */
export async function requireAdmin(): Promise<{ userId: string }> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const [user] = await db
    .select({ id: users.id, role: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user || user.role !== "admin") {
    redirect("/admin/unauthorized");
  }

  return { userId: session.user.id };
}
