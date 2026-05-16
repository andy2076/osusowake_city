"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { TIER_CONFIG, type TierKey } from "@/lib/constants";
import { updateStoreSettings } from "./actions";

type Props = {
  currentTier: TierKey;
  currentOrgId: string | null;
  currentBudgetCap: number | null;
  organizations: { id: string; name: string }[];
};

const tierKeys = Object.keys(TIER_CONFIG) as TierKey[];

export function SettingsForm({
  currentTier,
  currentOrgId,
  currentBudgetCap,
  organizations,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [tier, setTier] = useState<TierKey>(currentTier);
  const [orgId, setOrgId] = useState(currentOrgId ?? "");
  const [budgetCap, setBudgetCap] = useState(
    currentBudgetCap != null ? String(currentBudgetCap) : ""
  );

  const tierConfig = TIER_CONFIG[tier];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(false);

    startTransition(async () => {
      try {
        await updateStoreSettings({
          tier,
          defaultOrgId: orgId || null,
          monthlyBudgetCap: budgetCap ? parseInt(budgetCap) : null,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } catch {
        setError("保存に失敗しました");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 階層選択 */}
      <Card className="border-border">
        <CardContent className="pt-5">
          <h2 className="font-bold text-sm mb-3">プラン（階層）</h2>
          <div className="space-y-2">
            {tierKeys.map((key) => {
              const config = TIER_CONFIG[key];
              const selected = tier === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTier(key)}
                  className={`w-full text-left rounded-lg border-2 px-4 py-3 transition-colors ${
                    selected
                      ? "border-indigo bg-indigo/5"
                      : "border-border hover:border-indigo/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm">{config.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {config.description}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-indigo">
                      ¥{config.storeBurden}/枚
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 選択中プランの内訳 */}
          <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs space-y-1">
            <p>
              お店負担: <span className="font-bold">¥{tierConfig.storeBurden}</span>
              {" / "}
              お客様pt: <span className="font-bold">¥{tierConfig.selfPoints}</span>
              {" / "}
              支援金: <span className="font-bold text-accent">¥{tierConfig.donation}</span>
              {" / "}
              運営: <span className="font-bold">¥{tierConfig.operatorFee}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* デフォルト応援先 */}
      <Card className="border-border">
        <CardContent className="pt-5">
          <h2 className="font-bold text-sm mb-1">デフォルト応援先</h2>
          <p className="text-xs text-muted-foreground mb-3">
            お客様がレシート登録時に自動で選ばれる応援先です
          </p>
          <select
            value={orgId}
            onChange={(e) => setOrgId(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/30"
          >
            <option value="">未設定</option>
            {organizations.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* 月予算上限 */}
      <Card className="border-border">
        <CardContent className="pt-5">
          <h2 className="font-bold text-sm mb-1">月予算上限</h2>
          <p className="text-xs text-muted-foreground mb-3">
            月の負担額がこの金額に達すると、レシート受付を一時停止します（任意）
          </p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">¥</span>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="上限なし"
              value={budgetCap}
              onChange={(e) => setBudgetCap(e.target.value)}
              min={0}
            />
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        className="w-full bg-indigo hover:bg-indigo-dark text-white"
        disabled={isPending}
      >
        {isPending ? "保存中..." : saved ? "保存しました" : "保存する"}
      </Button>
    </form>
  );
}
