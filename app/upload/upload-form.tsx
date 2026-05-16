"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Store, Receipt, ArrowRight } from "lucide-react";
import type { TierKey } from "@/lib/constants";

type StoreOption = {
  id: string;
  name: string;
  tier: TierKey;
};

export function UploadForm({ stores }: { stores: StoreOption[] }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [storeId, setStoreId] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedStore = stores.find((s) => s.id === storeId);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選択してください");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("ファイルサイズは5MB以下にしてください");
      return;
    }

    setPhoto(file);
    setError("");

    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!storeId) {
      setError("お店を選択してください");
      return;
    }
    if (!photo) {
      setError("レシート写真を撮影してください");
      return;
    }
    if (!amount || parseInt(amount) <= 0) {
      setError("お会計金額を入力してください");
      return;
    }

    setLoading(true);

    try {
      // 画像アップロード
      const formData = new FormData();
      formData.append("file", photo);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const data = await uploadRes.json();
        throw new Error(data.error || "アップロードに失敗しました");
      }

      const { photoUrl } = await uploadRes.json();

      // 次のページへ遷移（クエリパラメータで情報を渡す）
      const params = new URLSearchParams({
        storeId,
        tier: selectedStore!.tier,
        storeName: selectedStore!.name,
        amount,
        photoUrl,
      });
      router.push(`/donate-select?${params.toString()}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "エラーが発生しました"
      );
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step 1: 店舗選択 */}
      <Card className="border-border">
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-3">
            <Store size={18} className="text-accent" />
            <h2 className="font-bold text-sm">お店を選ぶ</h2>
          </div>
          <select
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="">お店を選択してください</option>
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Step 2: レシート写真 */}
      <Card className="border-border">
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-3">
            <Camera size={18} className="text-accent" />
            <h2 className="font-bold text-sm">レシートを撮影</h2>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoChange}
            className="hidden"
          />

          {photoPreview ? (
            <div className="space-y-3">
              <div className="relative rounded-lg overflow-hidden border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoPreview}
                  alt="レシートプレビュー"
                  className="w-full max-h-64 object-contain bg-muted"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                撮り直す
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-border rounded-lg py-10 flex flex-col items-center gap-2 text-muted-foreground hover:border-accent/50 hover:text-accent transition-colors"
            >
              <Camera size={32} />
              <span className="text-sm">タップして撮影・選択</span>
            </button>
          )}
        </CardContent>
      </Card>

      {/* Step 3: 金額入力 */}
      <Card className="border-border">
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-3">
            <Receipt size={18} className="text-accent" />
            <h2 className="font-bold text-sm">お会計金額</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">¥</span>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="1200"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={1}
              className="text-lg"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            レシートに記載されたお会計金額を入力してください
          </p>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent-dark text-white py-6 text-base"
        disabled={loading || !storeId || !photo || !amount}
      >
        {loading ? (
          "アップロード中..."
        ) : (
          <>
            次へ：おすそわけ先を選ぶ
            <ArrowRight size={18} className="ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}
