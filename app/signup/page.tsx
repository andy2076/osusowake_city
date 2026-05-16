import type { Metadata } from "next";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "新規登録 | まちのおすそわけ",
};

export default function SignupPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-sm px-4">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-bold mb-2">新規登録</h1>
          <p className="text-sm text-muted-foreground">
            アカウントを作成してサービスを利用しましょう
          </p>
        </div>
        <SignupForm />
      </div>
    </section>
  );
}
