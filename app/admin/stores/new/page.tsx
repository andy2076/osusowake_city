import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import { StoreForm } from "./store-form";

export const metadata: Metadata = {
  title: "店舗追加 | まちのおすそわけ",
};

export default async function NewStorePage() {
  await requireAdmin();

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          店舗追加
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          新しい店舗と店主アカウントを作成します
        </p>
        <StoreForm />
      </div>
    </section>
  );
}
