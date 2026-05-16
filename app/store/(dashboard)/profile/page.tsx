import type { Metadata } from "next";
import { requireStoreOwner } from "@/lib/store-auth";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = {
  title: "店舗情報編集 | 店主管理",
};

export default async function StoreProfilePage() {
  const { store } = await requireStoreOwner();

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          店舗情報
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          お客様に表示される店舗情報を編集できます
        </p>
        <ProfileForm
          store={{
            name: store.name,
            cuisine: store.cuisine,
            address: store.address,
            phone: store.phone,
            businessHours: store.businessHours as Record<string, string> | null,
            features: store.features,
            description: store.description,
          }}
        />
      </div>
    </section>
  );
}
