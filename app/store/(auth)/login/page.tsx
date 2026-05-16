import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { StoreLoginForm } from "./store-login-form";

export const metadata: Metadata = {
  title: "店主ログイン | まちのおすそわけ",
};

export default async function StoreLoginPage() {
  const session = await auth();
  if (session?.user?.id) {
    redirect("/store/dashboard");
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-sm px-4">
        <div className="text-center mb-8">
          <p className="text-sm text-indigo font-medium mb-2">店主専用</p>
          <h1 className="font-serif text-2xl font-bold mb-2">店主ログイン</h1>
          <p className="text-sm text-muted-foreground">
            登録済みのメールアドレスとパスワードでログインしてください
          </p>
        </div>
        <StoreLoginForm />
      </div>
    </section>
  );
}
