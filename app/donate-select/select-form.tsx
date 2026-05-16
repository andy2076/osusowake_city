"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Award, HandHeart } from "lucide-react";
import { calculateDonation, type DonationMode } from "@/lib/donation";
import { TIER_CONFIG, type TierKey } from "@/lib/constants";
import { submitDonation } from "./actions";

type Props = {
  storeId: string;
  storeName: string;
  tier: TierKey;
  amount: number;
  photoUrl: string;
  defaultMode?: DonationMode;
  defaultOrgId: string;
  organizations: { id: string; name: string }[];
};

export function SelectForm({
  storeId,
  storeName,
  tier,
  amount,
  photoUrl,
  defaultMode,
  defaultOrgId,
  organizations,
}: Props) {
  const router = useRouter();
  const [mode, setMode] = useState<DonationMode>(defaultMode ?? "self");
  const [orgId, setOrgId] = useState(defaultOrgId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const breakdown = calculateDonation(tier, mode);
  const tierConfig = TIER_CONFIG[tier];
  const selectedOrg = organizations.find((o) => o.id === orgId);

  async function handleSubmit() {
    if (!orgId) {
      setError("応援先を選択してください");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await submitDonation({
        storeId,
        storeName,
        tier,
        amount,
        photoUrl,
        mode,
        orgId,
        orgName: selectedOrg?.name ?? "",
      });

      // 完了ページへ遷移
      const params = new URLSearchParams({
        donationAmount: String(result.donationAmount),
        selfPoints: String(result.selfPoints),
        orgName: result.orgName,
        mode: result.mode,
        storeName,
      });
      router.push(`/donate-complete?${params.toString()}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "エラーが発生しました"
      );
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* 階層情報 */}
      <Card className="border-border bg-muted/50">
        <CardContent className="pt-5">
          <p className="text-xs text-muted-foreground mb-1">
            {storeName} ({tierConfig.label}プラン)
          </p>
          <p className="text-sm">
            お会計金額: <span className="font-bold">¥{amount.toLocaleString()}</span>
          </p>
        </CardContent>
      </Card>

      {/* 寄付モード選択 */}
      <div>
        <h2 className="font-bold text-sm mb-3">おすそわけモード</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMode("self")}
            className={`rounded-lg border-2 p-4 text-center transition-colors ${
              mode === "self"
                ? "border-indigo bg-indigo/5"
                : "border-border hover:border-indigo/30"
            }`}
          >
            <Award
              size={24}
              className={`mx-auto mb-2 ${
                mode === "self" ? "text-indigo" : "text-muted-foreground"
              }`}
            />
            <p className="font-bold text-sm">自分にポイント</p>
            <p className="text-xs text-muted-foreground mt-1">
              ポイントを貯めつつ支援
            </p>
          </button>
          <button
            type="button"
            onClick={() => setMode("donate")}
            className={`rounded-lg border-2 p-4 text-center transition-colors ${
              mode === "donate"
                ? "border-accent bg-accent/5"
                : "border-border hover:border-accent/30"
            }`}
          >
            <Heart
              size={24}
              className={`mx-auto mb-2 ${
                mode === "donate" ? "text-accent" : "text-muted-foreground"
              }`}
            />
            <p className="font-bold text-sm">全部おすそわけ</p>
            <p className="text-xs text-muted-foreground mt-1">
              ポイント分もまちへ
            </p>
          </button>
        </div>
      </div>

      {/* 金額プレビュー */}
      <Card className="border-border">
        <CardContent className="pt-5">
          <h2 className="font-bold text-sm mb-4">支援の内訳</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">支援金額</span>
              <span className="font-bold text-accent">
                ¥{breakdown.donationAmount}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">あなたのポイント</span>
              <span className="font-bold text-indigo">
                {breakdown.selfPoints > 0
                  ? `+¥${breakdown.selfPoints}`
                  : "¥0 (全部おすそわけ)"}
              </span>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>お店の負担</span>
              <span>¥{breakdown.storeBurden}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>運営費</span>
              <span>¥{breakdown.operatorFee}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 応援先団体選択 */}
      <div>
        <h2 className="font-bold text-sm mb-3">応援先を選ぶ</h2>
        <div className="space-y-2">
          {organizations.map((org) => (
            <button
              key={org.id}
              type="button"
              onClick={() => setOrgId(org.id)}
              className={`w-full text-left rounded-lg border-2 px-4 py-3 transition-colors ${
                orgId === org.id
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-accent/30"
              }`}
            >
              <span className="text-sm font-medium">{org.name}</span>
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        onClick={handleSubmit}
        className="w-full bg-accent hover:bg-accent-dark text-white py-6 text-base"
        disabled={loading || !orgId}
      >
        {loading ? (
          "送信中..."
        ) : (
          <>
            <HandHeart size={18} className="mr-2" />
            おすそわけする
          </>
        )}
      </Button>
    </div>
  );
}
