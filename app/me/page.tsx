import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Award } from "lucide-react";
import { dummyOrganizations } from "@/lib/dummy-data";
import { DonationModeSelector } from "./donation-mode-selector";
import { PreferredOrgSelector } from "./preferred-org-selector";
import { DisplayNameForm } from "./display-name-form";

export const metadata: Metadata = {
  title: "マイページ | まちのおすそわけ",
};

export default async function MyPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user) redirect("/login");

  const preferredOrg = user.preferredOrgId
    ? dummyOrganizations.find((o) => o.id === user.preferredOrgId)
    : null;

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-8">
          マイページ
        </h1>

        {/* 累計実績 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="pt-5 text-center">
              <Heart size={20} className="mx-auto mb-2 text-accent" />
              <p className="text-xs text-muted-foreground mb-1">累計支援額</p>
              <p className="text-2xl font-bold text-accent">
                ¥{(user.totalDonatedAmount ?? 0).toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-5 text-center">
              <Award size={20} className="mx-auto mb-2 text-indigo" />
              <p className="text-xs text-muted-foreground mb-1">累計ポイント</p>
              <p className="text-2xl font-bold text-indigo">
                {(user.totalSelfPoints ?? 0).toLocaleString()} pt
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 表示名 */}
        <Card className="border-border mb-5">
          <CardContent className="pt-5">
            <h2 className="font-bold text-base mb-4">プロフィール</h2>
            <DisplayNameForm
              currentName={user.displayName ?? ""}
              email={user.email}
            />
          </CardContent>
        </Card>

        {/* 寄付モード */}
        <Card className="border-border mb-5">
          <CardContent className="pt-5">
            <h2 className="font-bold text-base mb-1">おすそわけモード</h2>
            <p className="text-xs text-muted-foreground mb-4">
              レシート登録時のデフォルト動作を選べます
            </p>
            <DonationModeSelector
              currentMode={user.defaultDonationMode ?? "ask"}
            />
          </CardContent>
        </Card>

        {/* デフォルト応援先 */}
        <Card className="border-border">
          <CardContent className="pt-5">
            <h2 className="font-bold text-base mb-1">デフォルト応援先</h2>
            <p className="text-xs text-muted-foreground mb-4">
              レシート登録時に自動で選ばれる応援先団体です
            </p>
            <PreferredOrgSelector
              currentOrgId={user.preferredOrgId}
              currentOrgName={preferredOrg?.name ?? null}
              organizations={dummyOrganizations.map((o) => ({
                id: o.id,
                name: o.name,
              }))}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
