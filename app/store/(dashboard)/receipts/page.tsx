import type { Metadata } from "next";
import { requireStoreOwner } from "@/lib/store-auth";
import { db } from "@/db";
import { receipts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "レシート確認 | 店主管理",
};

export default async function StoreReceiptsPage() {
  const { store } = await requireStoreOwner();

  const storeReceipts = await db
    .select()
    .from(receipts)
    .where(eq(receipts.storeId, store.id))
    .orderBy(desc(receipts.uploadedAt))
    .limit(50);

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          レシート確認
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          お客様がアップロードしたレシートの一覧です
        </p>

        {storeReceipts.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-12 text-center text-muted-foreground text-sm">
              まだレシートがありません
            </CardContent>
          </Card>
        ) : (
          <>
            {/* ヘッダー (PC) */}
            <div className="hidden sm:grid sm:grid-cols-6 gap-4 px-4 pb-2 text-xs font-medium text-muted-foreground border-b border-border">
              <span>日時</span>
              <span className="text-right">会計金額</span>
              <span className="text-right">負担額</span>
              <span className="text-right">支援額</span>
              <span className="text-center">モード</span>
              <span className="text-center">ステータス</span>
            </div>

            <div className="space-y-2 sm:space-y-0">
              {storeReceipts.map((r) => (
                <div
                  key={r.id}
                  className="sm:grid sm:grid-cols-6 gap-4 px-4 py-3 border-b border-border last:border-b-0 text-sm"
                >
                  {/* 日時 */}
                  <span className="text-muted-foreground">
                    {r.uploadedAt
                      ? new Date(r.uploadedAt).toLocaleDateString("ja-JP", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </span>

                  {/* 会計金額 */}
                  <span className="text-right font-medium">
                    <span className="sm:hidden text-xs text-muted-foreground mr-2">
                      会計:
                    </span>
                    ¥{(r.amount ?? 0).toLocaleString()}
                  </span>

                  {/* 負担額 */}
                  <span className="text-right">
                    <span className="sm:hidden text-xs text-muted-foreground mr-2">
                      負担:
                    </span>
                    ¥{r.storeBurden ?? 0}
                  </span>

                  {/* 支援額 */}
                  <span className="text-right text-accent">
                    <span className="sm:hidden text-xs text-muted-foreground mr-2">
                      支援:
                    </span>
                    ¥{r.donationAmount ?? 0}
                  </span>

                  {/* モード */}
                  <span className="text-center">
                    {r.donationMode === "donate" ? "おすそわけ" : "通常"}
                  </span>

                  {/* ステータス */}
                  <span className="text-center">
                    <Badge
                      variant={
                        r.status === "verified"
                          ? "default"
                          : r.status === "rejected"
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {r.status === "verified"
                        ? "確認済"
                        : r.status === "rejected"
                          ? "却下"
                          : "保留"}
                    </Badge>
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              最新50件を表示しています
            </p>
          </>
        )}
      </div>
    </section>
  );
}
