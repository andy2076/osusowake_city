import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dummyOrganizations } from "@/lib/dummy-data";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "応援先をみる | まちのおすそわけ",
};

const ORG_TYPE_LABEL: Record<string, string> = {
  kodomo_shokudo: "子ども食堂",
  shounen_dan: "少年団",
  club: "クラブ",
  other: "その他",
};

export default function OrgsPage() {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          応援先をみる
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          あなたの「おすそわけ」が届く団体です
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dummyOrganizations.map((org) => (
            <Link key={org.id} href={`/orgs/${org.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow border-border bg-card">
                <CardContent className="pt-5 pb-4 flex flex-col gap-3">
                  {/* ヘッダー行 */}
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-bold text-lg leading-snug">
                      {org.name}
                    </h2>
                    <Badge
                      variant="secondary"
                      className="shrink-0 text-[11px]"
                    >
                      {ORG_TYPE_LABEL[org.type]}
                    </Badge>
                  </div>

                  {/* 説明 */}
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {org.description}
                  </p>

                  {/* フッター */}
                  <div className="mt-auto pt-2 border-t border-border flex items-center gap-2 text-xs">
                    <Heart size={13} className="text-accent" />
                    <span className="text-muted-foreground">
                      累計受領{" "}
                      <span className="font-semibold text-foreground">
                        ¥{org.cumulativeReceived.toLocaleString()}
                      </span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
