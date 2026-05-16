import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getStoreById, getOrgById, dummyStores } from "@/lib/dummy-data";
import { TIER_CONFIG } from "@/lib/constants";
import {
  MapPin,
  Phone,
  Clock,
  ArrowLeft,
  Heart,
  ArrowRight,
} from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return dummyStores.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const store = getStoreById(id);
  return {
    title: store
      ? `${store.name} | まちのおすそわけ`
      : "店舗が見つかりません",
  };
}

const WEEKDAYS = ["月", "火", "水", "木", "金", "土", "日"] as const;

export default async function StoreDetailPage({ params }: Props) {
  const { id } = await params;
  const store = getStoreById(id);
  if (!store) notFound();

  const tier = TIER_CONFIG[store.tier];
  const org = store.defaultOrgId ? getOrgById(store.defaultOrgId) : null;

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4">
        {/* 戻るリンク */}
        <Link
          href="/stores"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={15} />
          お店一覧に戻る
        </Link>

        {/* 店名ヘッダー */}
        <div className="flex flex-wrap items-start gap-3 mb-2">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            {store.name}
          </h1>
          {store.founderMember && (
            <Badge
              variant="outline"
              className="text-accent border-accent/40 text-xs mt-1"
            >
              創業パートナー
            </Badge>
          )}
        </div>

        {/* ジャンル・階層 */}
        <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
          <span className="text-muted-foreground">{store.cuisine}</span>
          <Badge variant="secondary" className="text-xs">
            {tier.label}（1回 ¥{tier.storeBurden}）
          </Badge>
        </div>

        {/* ===== 累計支援 ヒーロー帯 ===== */}
        <div className="rounded-xl bg-accent/5 border border-accent/20 px-6 py-6 mb-8 text-center">
          <p className="text-xs text-muted-foreground mb-1">
            このお店から届いた支援金
          </p>
          <p className="text-4xl sm:text-5xl font-bold text-accent tracking-tight">
            ¥{store.cumulativeDonation.toLocaleString()}
          </p>

          {org && (
            <Link
              href={`/orgs/${org.id}`}
              className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-full bg-indigo/10 text-indigo text-sm font-medium hover:bg-indigo/20 transition-colors"
            >
              <Heart size={14} />
              応援先: {org.name}
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {/* 説明 */}
        <p className="text-sm leading-relaxed text-muted-foreground mb-8">
          {store.description}
        </p>

        {/* 情報カード群 */}
        <div className="grid gap-5 sm:grid-cols-2 mb-8">
          {/* 基本情報 */}
          <Card className="border-border">
            <CardContent className="pt-5 space-y-4">
              <h2 className="font-bold text-base">基本情報</h2>

              <div className="flex items-start gap-2 text-sm">
                <MapPin
                  size={16}
                  className="shrink-0 mt-0.5 text-muted-foreground"
                />
                <span>{store.address}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Phone size={16} className="shrink-0 text-muted-foreground" />
                <span>{store.phone}</span>
              </div>

              {store.features.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {store.features.map((f) => (
                    <Badge
                      key={f}
                      variant="outline"
                      className="text-xs font-normal"
                    >
                      {f}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 営業時間 */}
          <Card className="border-border">
            <CardContent className="pt-5 space-y-3">
              <h2 className="font-bold text-base flex items-center gap-2">
                <Clock size={16} className="text-muted-foreground" />
                営業時間
              </h2>
              <dl className="text-sm space-y-1">
                {WEEKDAYS.map((day) => {
                  const hours = store.businessHours[day] ?? "—";
                  const isClosed = hours === "定休日";
                  return (
                    <div key={day} className="flex gap-3">
                      <dt className="w-6 font-medium text-center">{day}</dt>
                      <dd
                        className={
                          isClosed
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }
                      >
                        {hours}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
