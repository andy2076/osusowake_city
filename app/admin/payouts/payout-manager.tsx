"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  calculateMonthlyPayouts,
  confirmPayout,
  markAsPaid,
  type MonthlySummary,
} from "./actions";

type Props = {
  defaultYear: number;
  defaultMonth: number;
};

export function PayoutManager({ defaultYear, defaultMonth }: Props) {
  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(defaultMonth);
  const [summaries, setSummaries] = useState<MonthlySummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  async function loadData() {
    setLoading(true);
    try {
      const data = await calculateMonthlyPayouts(year, month);
      setSummaries(data);
    } catch {
      setSummaries([]);
    } finally {
      setLoading(false);
    }
  }

  function handleConfirm(orgId: string) {
    startTransition(async () => {
      await confirmPayout(orgId, year, month);
      await loadData();
    });
  }

  function handleMarkPaid(payoutId: string) {
    startTransition(async () => {
      await markAsPaid(payoutId);
      await loadData();
    });
  }

  const totalAmount = summaries.reduce((sum, s) => sum + s.totalDonation, 0);

  return (
    <div className="space-y-6">
      {/* 月選択 */}
      <Card className="border-border">
        <CardContent className="pt-5">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">対象月:</label>
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              {[defaultYear - 1, defaultYear, defaultYear + 1].map((y) => (
                <option key={y} value={y}>
                  {y}年
                </option>
              ))}
            </select>
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {m}月
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* 合計 */}
      <Card className="border-border">
        <CardContent className="pt-5">
          <p className="text-xs text-muted-foreground mb-1">
            {year}年{month}月 総支援額
          </p>
          <p className="text-3xl font-bold text-accent">
            ¥{totalAmount.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* 団体別集計 */}
      {loading ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          集計中...
        </p>
      ) : summaries.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-12 text-center text-muted-foreground text-sm">
            この月のレシートデータはありません
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {summaries.map((s) => (
            <Card key={s.orgId} className="border-border">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate">{s.orgName}</p>
                    <p className="text-xs text-muted-foreground">
                      レシート {s.receiptCount} 件
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <p className="text-lg font-bold text-accent">
                      ¥{s.totalDonation.toLocaleString()}
                    </p>
                    {s.payoutStatus === "paid" ? (
                      <Badge variant="default">振込済</Badge>
                    ) : s.payoutStatus === "calculated" ? (
                      <Button
                        size="sm"
                        onClick={() => handleMarkPaid(s.payoutId!)}
                        disabled={isPending}
                        className="bg-indigo hover:bg-indigo-dark text-white"
                      >
                        振込済にする
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleConfirm(s.orgId)}
                        disabled={isPending}
                      >
                        集計確定
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
