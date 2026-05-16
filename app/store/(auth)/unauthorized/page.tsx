import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "アクセス権限なし | まちのおすそわけ",
};

export default function StoreUnauthorizedPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-sm px-4 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
          <ShieldAlert size={28} className="text-muted-foreground" />
        </div>
        <h1 className="font-serif text-xl font-bold mb-3">
          店主権限がありません
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          このアカウントには店主管理画面へのアクセス権限がありません。
          店舗登録をご希望の場合は運営にお問い合わせください。
        </p>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          トップページに戻る
        </Link>
      </div>
    </section>
  );
}
