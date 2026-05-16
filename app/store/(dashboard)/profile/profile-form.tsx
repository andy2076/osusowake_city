"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { updateStoreProfile } from "./actions";

const DAYS = ["月", "火", "水", "木", "金", "土", "日"] as const;

const FEATURE_OPTIONS = [
  "キッズメニュー",
  "座敷あり",
  "個室あり",
  "駐車場あり",
  "送迎あり",
  "テラス席",
  "ペット同伴可",
  "完全予約制",
  "カウンター席",
  "Wi-Fi",
  "禁煙",
];

type Props = {
  store: {
    name: string;
    cuisine: string | null;
    address: string | null;
    phone: string | null;
    businessHours: Record<string, string> | null;
    features: string[] | null;
    description: string | null;
  };
};

export function ProfileForm({ store }: Props) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(store.name);
  const [cuisine, setCuisine] = useState(store.cuisine ?? "");
  const [address, setAddress] = useState(store.address ?? "");
  const [phone, setPhone] = useState(store.phone ?? "");
  const [description, setDescription] = useState(store.description ?? "");
  const [hours, setHours] = useState<Record<string, string>>(
    (store.businessHours as Record<string, string>) ?? {}
  );
  const [features, setFeatures] = useState<string[]>(store.features ?? []);

  function toggleFeature(f: string) {
    setFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(false);

    if (!name.trim()) {
      setError("店名を入力してください");
      return;
    }

    startTransition(async () => {
      try {
        await updateStoreProfile({
          name: name.trim(),
          cuisine,
          address,
          phone,
          businessHours: hours,
          features,
          description,
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
      {/* 基本情報 */}
      <Card className="border-border">
        <CardContent className="pt-5 space-y-4">
          <h2 className="font-bold text-sm mb-2">基本情報</h2>
          <div>
            <label className="block text-sm font-medium mb-1">店名 *</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0986-00-0000"
              type="tel"
            />
          </div>
        </CardContent>
      </Card>

      {/* 営業時間 */}
      <Card className="border-border">
        <CardContent className="pt-5">
          <h2 className="font-bold text-sm mb-3">営業時間</h2>
          <div className="space-y-2">
            {DAYS.map((day) => (
              <div key={day} className="flex items-center gap-3">
                <span className="w-6 text-sm font-medium text-center">
                  {day}
                </span>
                <Input
                  value={hours[day] ?? ""}
                  onChange={(e) =>
                    setHours((prev) => ({ ...prev, [day]: e.target.value }))
                  }
                  placeholder="11:00〜14:00 / 17:00〜21:00 or 定休日"
                  className="text-sm"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 特徴タグ */}
      <Card className="border-border">
        <CardContent className="pt-5">
          <h2 className="font-bold text-sm mb-3">特徴</h2>
          <div className="flex flex-wrap gap-2">
            {FEATURE_OPTIONS.map((f) => {
              const selected = features.includes(f);
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFeature(f)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    selected
                      ? "bg-indigo/10 border-indigo text-indigo"
                      : "border-border text-muted-foreground hover:border-indigo/30"
                  }`}
                >
                  {selected && <Check size={12} className="inline mr-1" />}
                  {f}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 紹介文 */}
      <Card className="border-border">
        <CardContent className="pt-5">
          <h2 className="font-bold text-sm mb-2">紹介文</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/30 resize-none"
            placeholder="お店の紹介文を入力してください"
          />
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
