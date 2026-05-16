import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { dummyOrganizations, dummyStores } from "@/lib/dummy-data";
import { SelectForm } from "./select-form";
import type { TierKey } from "@/lib/constants";

export const metadata: Metadata = {
  title: "おすそわけ先を選ぶ | まちのおすそわけ",
};

export default async function DonateSelectPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const params = await searchParams;
  const { storeId, tier, storeName, amount, photoUrl } = params;

  // 必要なパラメータが揃っているか確認
  if (!storeId || !tier || !storeName || !amount || !photoUrl) {
    redirect("/upload");
  }

  // ユーザー設定を取得
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user) redirect("/login");

  // デフォルト団体の候補を決定
  const store = dummyStores.find((s) => s.id === storeId);
  const defaultOrgId =
    user.preferredOrgId ?? store?.defaultOrgId ?? dummyOrganizations[0]?.id;

  const orgs = dummyOrganizations
    .filter((o) => o.status === "active")
    .map((o) => ({ id: o.id, name: o.name }));

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-lg px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          おすそわけ先を選ぶ
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          <span className="font-bold">{storeName}</span> でのお食事ありがとうございます
        </p>
        <SelectForm
          storeId={storeId}
          storeName={storeName}
          tier={tier as TierKey}
          amount={parseInt(amount)}
          photoUrl={photoUrl}
          defaultMode={
            user.defaultDonationMode === "ask"
              ? undefined
              : (user.defaultDonationMode as "self" | "donate") ?? undefined
          }
          defaultOrgId={defaultOrgId ?? ""}
          organizations={orgs}
        />
      </div>
    </section>
  );
}
