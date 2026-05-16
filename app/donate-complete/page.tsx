import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Heart, Award, Store, User } from "lucide-react";

export const metadata: Metadata = {
  title: "おすそわけ完了 | まちのおすそわけ",
};

export default async function DonateCompletePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const {
    donationAmount = "0",
    selfPoints = "0",
    orgName = "",
    mode = "self",
    storeName = "",
  } = params;

  const donation = parseInt(donationAmount);
  const points = parseInt(selfPoints);

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-lg px-4 text-center">
        {/* 成功アイコン */}
        <div className="mx-auto w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
          <Heart size={36} className="text-accent" />
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-3">
          おすそわけ完了!
        </h1>

        <p className="text-muted-foreground mb-8">
          {storeName} でのお食事が、まちの応援につながりました
        </p>

        {/* メインカード */}
        <Card className="border-accent/30 mb-6">
          <CardContent className="pt-6 pb-6">
            <p className="text-sm text-muted-foreground mb-2">
              {orgName} に届けた支援金
            </p>
            <p className="text-4xl font-bold text-accent mb-1">
              ¥{donation.toLocaleString()}
            </p>

            {mode === "self" && points > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-center gap-2 text-indigo">
                  <Award size={18} />
                  <span className="font-bold">
                    +{points} pt をゲット!
                  </span>
                </div>
              </div>
            )}

            {mode === "donate" && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  ポイント分もまちにおすそわけしました
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ナビゲーション */}
        <div className="space-y-3">
          <Link
            href="/stores"
            className={buttonVariants({ className: "w-full bg-accent hover:bg-accent-dark text-white" })}
          >
            <Store size={16} className="mr-2" />
            お店一覧に戻る
          </Link>
          <Link
            href="/me"
            className={buttonVariants({ variant: "outline", className: "w-full" })}
          >
            <User size={16} className="mr-2" />
            マイページを見る
          </Link>
        </div>
      </div>
    </section>
  );
}
