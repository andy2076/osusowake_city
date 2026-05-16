import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | まちのおすそわけ",
};

export default function TermsPage() {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-8">
          利用規約
        </h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p>
            本利用規約（以下「本規約」）は、まちのおすそわけ（以下「本サービス」）の利用条件を定めるものです。
          </p>

          <h2 className="text-lg font-bold text-foreground">第1条（適用）</h2>
          <p>
            本規約は、本サービスの利用に関する一切の関係に適用されます。
          </p>

          <h2 className="text-lg font-bold text-foreground">第2条（利用登録）</h2>
          <p>
            利用希望者がメールアドレスを登録し、当方がこれを承認することによって、利用登録が完了するものとします。
          </p>

          <h2 className="text-lg font-bold text-foreground">第3条（禁止事項）</h2>
          <p>
            利用者は、本サービスの利用にあたり、不正行為、虚偽のレシート登録、その他当方が不適切と判断する行為を行ってはなりません。
          </p>

          <div className="border-t border-border pt-6 mt-8">
            <p className="text-xs">
              ※ 本規約はプレースホルダーです。正式なローンチ前に法務確認の上、正式な規約を掲載します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
