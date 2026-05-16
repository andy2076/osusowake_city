"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { createOrg } from "./actions";

const ORG_TYPES = [
  { value: "kodomo_shokudo" as const, label: "子ども食堂" },
  { value: "shounen_dan" as const, label: "少年団" },
  { value: "club" as const, label: "クラブ" },
  { value: "other" as const, label: "その他" },
];

export function OrgForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [type, setType] = useState<"kodomo_shokudo" | "shounen_dan" | "club" | "other">("kodomo_shokudo");
  const [description, setDescription] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [representativeContact, setRepresentativeContact] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("団体名は必須です");
      return;
    }

    startTransition(async () => {
      try {
        await createOrg({
          name: name.trim(),
          type,
          description,
          representativeName,
          representativeContact,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "作成に失敗しました");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-border">
        <CardContent className="pt-5 space-y-4">
          <h2 className="font-bold text-sm">団体情報</h2>
          <div>
            <label className="block text-sm font-medium mb-1">団体名 *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">種別</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              {ORG_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">説明</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
              placeholder="団体の活動内容"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardContent className="pt-5 space-y-4">
          <h2 className="font-bold text-sm">代表者情報</h2>
          <div>
            <label className="block text-sm font-medium mb-1">代表者名</label>
            <Input
              value={representativeName}
              onChange={(e) => setRepresentativeName(e.target.value)}
              placeholder="山田 太郎"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">連絡先</label>
            <Input
              value={representativeContact}
              onChange={(e) => setRepresentativeContact(e.target.value)}
              placeholder="メールアドレスまたは電話番号"
            />
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent-dark text-white"
        disabled={isPending}
      >
        {isPending ? "作成中..." : "団体を追加"}
      </Button>
    </form>
  );
}
