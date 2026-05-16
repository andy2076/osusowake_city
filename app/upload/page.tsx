import type { Metadata } from "next";
import { UploadForm } from "./upload-form";
import { dummyStores } from "@/lib/dummy-data";

export const metadata: Metadata = {
  title: "レシート登録 | まちのおすそわけ",
};

export default function UploadPage() {
  const activeStores = dummyStores
    .filter((s) => s.status === "active")
    .map((s) => ({
      id: s.id,
      name: s.name,
      tier: s.tier,
    }));

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-lg px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          レシート登録
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          お食事のレシートを登録して、おすそわけを届けましょう
        </p>
        <UploadForm stores={activeStores} />
      </div>
    </section>
  );
}
