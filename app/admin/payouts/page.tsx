import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import { PayoutManager } from "./payout-manager";

export const metadata: Metadata = {
  title: "送金管理 | まちのおすそわけ",
};

export default async function AdminPayoutsPage() {
  await requireAdmin();

  const now = new Date();

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          月次送金管理
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          団体ごとの支援額を集計し、振込ステータスを管理します
        </p>
        <PayoutManager
          defaultYear={now.getFullYear()}
          defaultMonth={now.getMonth() + 1}
        />
      </div>
    </section>
  );
}
