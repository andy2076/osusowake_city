"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-sm px-4 text-center">
        <p className="text-4xl font-bold text-muted-foreground/30 mb-4">
          エラー
        </p>
        <h1 className="font-serif text-xl font-bold mb-3">
          問題が発生しました
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          ページの読み込み中にエラーが発生しました。もう一度お試しください。
        </p>
        <Button variant="outline" onClick={() => reset()}>
          もう一度試す
        </Button>
      </div>
    </section>
  );
}
