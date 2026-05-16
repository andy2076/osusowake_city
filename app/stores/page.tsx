import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dummyStores, dummyOrganizations } from "@/lib/dummy-data";
import { TIER_CONFIG } from "@/lib/constants";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "お店をさがす | まちのおすそわけ",
};

export default function StoresPage() {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          お店をさがす
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          都城・三股・曽於エリアの参加店舗
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dummyStores.map((store) => {
            const tier = TIER_CONFIG[store.tier];
            const org = store.defaultOrgId
              ? dummyOrganizations.find((o) => o.id === store.defaultOrgId)
              : null;

            return (
              <Link key={store.id} href={`/stores/${store.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow border-border bg-card">
                  <CardContent className="pt-5 pb-4 flex flex-col gap-3">
                    {/* ヘッダー行 */}
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-bold text-lg leading-snug">
                        {store.name}
                      </h2>
                      {store.founderMember && (
                        <Badge
                          variant="outline"
                          className="shrink-0 text-accent border-accent/40 text-[11px]"
                        >
                          創業パートナー
                        </Badge>
                      )}
                    </div>

                    {/* ジャンル・階層 */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-muted-foreground">
                        {store.cuisine}
                      </span>
                      <span className="text-border">|</span>
                      <span className="text-indigo font-medium">
                        {tier.label}
                      </span>
                    </div>

                    {/* 説明 */}
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {store.description}
                    </p>

                    {/* 住所 */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin size={13} className="shrink-0" />
                      <span>{store.address}</span>
                    </div>

                    {/* フッター */}
                    <div className="mt-auto pt-2 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        累計支援{" "}
                        <span className="font-semibold text-foreground">
                          ¥{store.cumulativeDonation.toLocaleString()}
                        </span>
                      </span>
                      {org && (
                        <span className="text-accent truncate max-w-[140px]">
                          {org.name}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
