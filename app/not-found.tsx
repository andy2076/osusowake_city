import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-sm px-4 text-center">
        <p className="text-6xl font-bold text-muted-foreground/30 mb-4">404</p>
        <h1 className="font-serif text-xl font-bold mb-3">
          ページが見つかりません
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          トップページに戻る
        </Link>
      </div>
    </section>
  );
}
