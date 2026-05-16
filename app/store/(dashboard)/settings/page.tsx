import type { Metadata } from "next";
import { requireStoreOwner } from "@/lib/store-auth";
import { dummyOrganizations } from "@/lib/dummy-data";
import type { TierKey } from "@/lib/constants";
import { SettingsForm } from "./settings-form";

export const metadata: Metadata = {
  title: "設定 | 店主管理",
};

export default async function StoreSettingsPage() {
  const { store } = await requireStoreOwner();

  const orgs = dummyOrganizations
    .filter((o) => o.status === "active")
    .map((o) => ({ id: o.id, name: o.name }));

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          設定
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          プランや応援先を変更できます
        </p>
        <SettingsForm
          currentTier={(store.tier as TierKey) ?? "standard"}
          currentOrgId={store.defaultOrgId}
          currentBudgetCap={store.monthlyBudgetCap}
          organizations={orgs}
        />
      </div>
    </section>
  );
}
