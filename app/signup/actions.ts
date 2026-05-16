"use server";

import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function signUp(data: {
  email: string;
  password: string;
}) {
  // メール重複チェック
  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, data.email))
    .limit(1);

  if (existing) {
    return { error: "このメールアドレスは既に登録されています。" };
  }

  // パスワードバリデーション
  if (data.password.length < 6) {
    return { error: "パスワードは6文字以上で入力してください。" };
  }

  // ハッシュ化して保存
  const hashedPassword = await bcrypt.hash(data.password, 10);
  await db.insert(users).values({
    email: data.email,
    password: hashedPassword,
    role: "customer",
  });

  redirect("/login?registered=1");
}
