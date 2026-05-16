import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/db";
import { organizations } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ORG_TYPE_LABELS: Record<string, string> = {
  kodomo_shokudo: "子ども食堂",
  shounen_dan: "少年団",
  club: "クラブ",
  other: "その他",
};

export const metadata: Metadata = {
  title: "団体管理 | まちのおすそわけ",
};

export default async function AdminOrgsPage() {
  await requireAdmin();

  const allOrgs = await db
    .select()
    .from(organizations)
    .orderBy(desc(organizations.createdAt));

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">団体管理</h1>
          <Link
            href="/admin/orgs/new"
            className={buttonVariants({ className: "bg-accent hover:bg-accent-dark text-white" })}
          >
            <Plus size={16} className="mr-1" />
            団体追加
          </Link>
        </div>

        {allOrgs.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-12 text-center text-muted-foreground text-sm">
              登録された団体はありません
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {allOrgs.map((o) => (
              <Card key={o.id} className="border-border">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-sm truncate">{o.name}</p>
                        <Badge variant="outline" className="shrink-0">
                          {ORG_TYPE_LABELS[o.type ?? ""] ?? o.type}
                        </Badge>
                        <Badge
                          variant={o.status === "active" ? "default" : "outline"}
                          className="shrink-0"
                        >
                          {o.status === "active" ? "稼働中" : "停止中"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {o.representativeName && `代表: ${o.representativeName} · `}
                        {o.description?.slice(0, 60) ?? ""}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-accent shrink-0">
                      ¥{(o.cumulativeReceived ?? 0).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
