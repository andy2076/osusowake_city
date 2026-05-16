import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50 mt-auto">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <p className="font-serif text-lg font-semibold text-accent">
              まちのおすそわけ
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              都城・三股・曽於の応援グルメ
            </p>
          </div>
          <nav className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
            <Link href="/stores" className="hover:text-foreground transition-colors">
              お店をさがす
            </Link>
            <Link href="/orgs" className="hover:text-foreground transition-colors">
              応援先をみる
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              お問い合わせ
            </Link>
          </nav>
          <nav className="flex flex-col sm:flex-row gap-4 text-xs text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              利用規約
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/legal" className="hover:text-foreground transition-colors">
              特商法表記
            </Link>
          </nav>
        </div>
        <div className="mt-8 pt-4 border-t border-border text-xs text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} まちのおすそわけ
        </div>
      </div>
    </footer>
  );
}
