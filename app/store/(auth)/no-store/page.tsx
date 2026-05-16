import type { Metadata } from "next";
import Link from "next/link";
import { Store } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "店舗未登録 | まちのおすそわけ",
};

export default function NoStorePage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-sm px-4 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
          <Store size={28} className="text-muted-foreground" />
        </div>
        <h1 className="font-serif text-xl font-bold mb-3">
          登録店舗がありません
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          店主アカウントに紐付いた店舗が見つかりません。
          運営にお問い合わせください。
        </p>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          トップページに戻る
        </Link>
      </div>
    </section>
  );
}
