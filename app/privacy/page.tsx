import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | まちのおすそわけ",
};

export default function PrivacyPage() {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-8">
          プライバシーポリシー
        </h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p>
            まちのおすそわけ（以下「本サービス」）は、利用者の個人情報の保護に努めます。
          </p>

          <h2 className="text-lg font-bold text-foreground">1. 収集する情報</h2>
          <p>
            本サービスでは、以下の情報を収集します：メールアドレス、レシート画像、お会計金額。
          </p>

          <h2 className="text-lg font-bold text-foreground">2. 利用目的</h2>
          <p>
            収集した情報は、サービスの提供・運営、支援金額の計算、利用状況の分析に利用します。
          </p>

          <h2 className="text-lg font-bold text-foreground">3. 第三者提供</h2>
          <p>
            法令に基づく場合を除き、利用者の同意なく個人情報を第三者に提供することはありません。
          </p>

          <div className="border-t border-border pt-6 mt-8">
            <p className="text-xs">
              ※ 本ポリシーはプレースホルダーです。正式なローンチ前に法務確認の上、正式な内容を掲載します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
