import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  getOrgById,
  dummyOrganizations,
  dummyStores,
} from "@/lib/dummy-data";
import { TIER_CONFIG } from "@/lib/constants";
import { ArrowLeft, Heart, MapPin, ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return dummyOrganizations.map((o) => ({ id: o.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const org = getOrgById(id);
  return {
    title: org
      ? `${org.name} | まちのおすそわけ`
      : "団体が見つかりません",
  };
}

const ORG_TYPE_LABEL: Record<string, string> = {
  kodomo_shokudo: "子ども食堂",
  shounen_dan: "少年団",
  club: "クラブ",
  other: "その他",
};

export default async function OrgDetailPage({ params }: Props) {
  const { id } = await params;
  const org = getOrgById(id);
  if (!org) notFound();

  // この団体を応援している店舗（支援額の多い順）
  const supportingStores = dummyStores
    .filter((s) => s.defaultOrgId === org.id)
    .sort((a, b) => b.cumulativeDonation - a.cumulativeDonation);

  const totalFromStores = supportingStores.reduce(
    (sum, s) => sum + s.cumulativeDonation,
    0
  );

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4">
        {/* 戻るリンク */}
        <Link
          href="/orgs"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={15} />
          応援先一覧に戻る
        </Link>

        {/* 団体名ヘッダー */}
        <div className="flex flex-wrap items-start gap-3 mb-6">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            {org.name}
          </h1>
          <Badge variant="secondary" className="text-xs mt-1">
            {ORG_TYPE_LABEL[org.type]}
          </Badge>
        </div>

        {/* ===== 累計受領 ヒーロー帯 ===== */}
        <div className="rounded-xl bg-accent/5 border border-accent/20 px-6 py-6 mb-8 text-center">
          <p className="text-xs text-muted-foreground mb-1">
            届いた支援金の合計
          </p>
          <p className="text-4xl sm:text-5xl font-bold text-accent tracking-tight">
            ¥{org.cumulativeReceived.toLocaleString()}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {supportingStores.length} 店舗が応援中
          </p>
        </div>

        {/* 説明 */}
        <div className="mb-10">
          <h2 className="font-bold text-base mb-3">活動について</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {org.description}
          </p>
        </div>

        {/* 応援してくれているお店 */}
        {supportingStores.length > 0 && (
          <div>
            <h2 className="font-bold text-base mb-4 flex items-center gap-2">
              <Heart size={16} className="text-accent" />
              応援してくれているお店
            </h2>
            <div className="space-y-3">
              {supportingStores.map((store, i) => {
                const tier = TIER_CONFIG[store.tier];
                return (
                  <Link key={store.id} href={`/stores/${store.id}`}>
                    <Card className="hover:shadow-md transition-shadow border-border">
                      <CardContent className="py-4 flex items-center gap-4">
                        {/* 順位 */}
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-accent">
                            {i + 1}
                          </span>
                        </div>

                        {/* 店舗情報 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="font-bold text-sm truncate">
                              {store.name}
                            </h3>
                            {store.founderMember && (
                              <Badge
                                variant="outline"
                                className="text-accent border-accent/40 text-[10px] shrink-0"
                              >
                                創業
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{store.cuisine}</span>
                            <span className="text-border">|</span>
                            <span className="text-indigo">{tier.label}</span>
                            <span className="text-border">|</span>
                            <span className="inline-flex items-center gap-0.5">
                              <MapPin size={11} />
                              {store.address}
                            </span>
                          </div>
                        </div>

                        {/* 支援額 */}
                        <div className="text-right shrink-0">
                          <p className="text-base font-bold text-foreground">
                            ¥{store.cumulativeDonation.toLocaleString()}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            累計支援
                          </p>
                        </div>

                        <ArrowRight
                          size={16}
                          className="shrink-0 text-muted-foreground"
                        />
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* 合計 */}
            <div className="mt-4 text-right text-sm text-muted-foreground">
              参加店舗からの累計支援{" "}
              <span className="font-bold text-foreground">
                ¥{totalFromStores.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
