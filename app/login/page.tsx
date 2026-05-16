import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "ログイン | まちのおすそわけ",
};

export default function LoginPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-sm px-4">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-bold mb-2">ログイン</h1>
          <p className="text-sm text-muted-foreground">
            メールアドレスとパスワードでログインしてください
          </p>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
