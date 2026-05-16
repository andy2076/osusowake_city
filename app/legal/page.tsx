import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | まちのおすそわけ",
};

export default function LegalPage() {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-8">
          特定商取引法に基づく表記
        </h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground w-1/3">事業者名</td>
                <td className="py-3">（準備中）</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">所在地</td>
                <td className="py-3">（準備中）</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">連絡先</td>
                <td className="py-3">（準備中）</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">サービス内容</td>
                <td className="py-3">飲食店利用に伴う地域支援プラットフォームの運営</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">料金</td>
                <td className="py-3">利用者への課金はありません（店舗側が負担）</td>
              </tr>
            </tbody>
          </table>

          <div className="border-t border-border pt-6 mt-8">
            <p className="text-xs">
              ※ 本表記はプレースホルダーです。正式なローンチ前に正確な情報を掲載します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
