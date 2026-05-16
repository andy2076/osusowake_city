"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { TIER_CONFIG, type TierKey } from "@/lib/constants";
import { createStore } from "./actions";

const tierKeys = Object.keys(TIER_CONFIG) as TierKey[];

export function StoreForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [name, setName] = useState("");
  const [tier, setTier] = useState<TierKey>("standard");
  const [cuisine, setCuisine] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!ownerEmail.trim() || !name.trim() || !ownerPassword.trim()) {
      setError("店主メールアドレス、初期パスワード、店名は必須です");
      return;
    }

    if (ownerPassword.length < 6) {
      setError("パスワードは6文字以上で設定してください");
      return;
    }

    startTransition(async () => {
      try {
        await createStore({
          ownerEmail: ownerEmail.trim(),
          ownerPassword: ownerPassword.trim(),
          name: name.trim(),
          tier,
          cuisine,
          address,
          phone,
          description,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "作成に失敗しました");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 店主情報 */}
      <Card className="border-border">
        <CardContent className="pt-5 space-y-4">
          <h2 className="font-bold text-sm">店主アカウント</h2>
          <div>
            <label className="block text-sm font-medium mb-1">
              店主メールアドレス *
            </label>
            <Input
              type="email"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
              placeholder="owner@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              初期パスワード *
            </label>
            <Input
              type="text"
              value={ownerPassword}
              onChange={(e) => setOwnerPassword(e.target.value)}
              placeholder="6文字以上"
              required
              minLength={6}
            />
            <p className="text-xs text-muted-foreground mt-1">
              店主に直接お伝えください。ログイン後に変更可能です。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 店舗情報 */}
      <Card className="border-border">
        <CardContent className="pt-5 space-y-4">
          <h2 className="font-bold text-sm">店舗情報</h2>
          <div>
            <label className="block text-sm font-medium mb-1">店名 *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">業態</label>
            <Input
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="ラーメン、定食、カフェ等"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">住所</label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="都城市○○町1-2-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">電話番号</label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0986-00-0000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">紹介文</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
              placeholder="お店の紹介文"
            />
          </div>
        </CardContent>
      </Card>

      {/* 階層選択 */}
      <Card className="border-border">
        <CardContent className="pt-5">
          <h2 className="font-bold text-sm mb-3">プラン</h2>
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
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm">{config.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {config.description}
                      </p>
                    </div>
                    <p className="text-sm font-bold">¥{config.storeBurden}/枚</p>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent-dark text-white"
        disabled={isPending}
      >
        {isPending ? "作成中..." : "店舗を追加"}
      </Button>
    </form>
  );
}
