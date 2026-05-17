import type { Metadata } from "next";
import Link from "next/link";
import { TIER_CONFIG, FOUNDING_MEMBER_LIMIT } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "飲食店の方へ | まちのおすそわけ",
  description:
    "月額固定費ゼロ。来店時の少額負担のみで、地域貢献と集客を両立。都城・三股・曽於の飲食店向けプラットフォーム。",
};

const tiers = Object.values(TIER_CONFIG);

export default function ForStoresPage() {
  return (
    <div className="print:text-black">
      {/* ヒーロー */}
      <section className="bg-muted/30 py-16 sm:py-24 print:py-8 print:bg-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-sm font-medium text-accent mb-3">飲食店オーナー様へ</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            月額固定費ゼロで、
            <br />
            地域に愛されるお店へ。
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            「まちのおすそわけ」は、お客様の来店が地元の子ども食堂や少年団への支援に変わる、
            都城・三股・曽於エリアの地域密着型グルメプラットフォームです。
          </p>
        </div>
      </section>

      {/* 課題提起 */}
      <section className="py-12 sm:py-16 print:py-6">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-serif text-2xl font-bold text-center mb-8">
            こんなお悩みはありませんか？
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "毎月の掲載料が高い",
                desc: "既存の大手グルメサイトは、月額数万円の固定費がかかります。来店がなくても費用は発生し続けます。",
              },
              {
                title: "予約キャンセルでも課金される",
                desc: "ネット予約が入ればその時点で課金。ドタキャンでも費用が発生し、お店の負担になっています。",
              },
              {
                title: "地域のお客様に届かない",
                desc: "全国向けプラットフォームでは、本当に来てほしい地元のお客様にアプローチしにくい構造になっています。",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-4 rounded-lg border border-border bg-card print:border-gray-300"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 font-bold print:bg-white print:border print:border-gray-400">
                  !
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground print:text-gray-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 解決策 */}
      <section className="py-12 sm:py-16 bg-muted/30 print:py-6 print:bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-serif text-2xl font-bold text-center mb-2">
            まちのおすそわけなら
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-8">
            すべて解決します。
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                num: "1",
                title: "月額費用ゼロ",
                desc: "固定費は一切かかりません。お客様が来店してレシートを登録した時だけ、1回あたり¥20〜¥150の少額負担。",
              },
              {
                num: "2",
                title: "地域密着",
                desc: "都城・三股・曽於エリアに特化。地元のお客様に確実に届く、地域のためのプラットフォームです。",
              },
              {
                num: "3",
                title: "地域貢献ブランディング",
                desc: "お店の負担の一部が地元の子ども食堂・少年団への支援に。「応援されるお店」としてのブランド価値が生まれます。",
              },
            ].map((item) => (
              <div key={item.num} className="text-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3 print:border print:border-gray-400 print:bg-white">
                  <span className="text-accent font-bold print:text-black">
                    {item.num}
                  </span>
                </div>
                <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed print:text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 料金透明性 */}
      <section className="py-12 sm:py-16 print:py-6">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-serif text-2xl font-bold text-center mb-2">
            料金プラン
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-8">
            業態に合わせた4階層。内訳はすべて公開しています。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-accent/30">
                  <th className="text-left py-3 pr-2 font-bold">プラン</th>
                  <th className="text-left py-3 px-2 font-bold">業態の目安</th>
                  <th className="text-right py-3 px-2 font-bold">
                    お店の負担
                    <span className="block text-xs font-normal text-muted-foreground">
                      /レシート1枚
                    </span>
                  </th>
                  <th className="text-right py-3 px-2 font-bold">
                    うち支援金
                  </th>
                  <th className="text-right py-3 pl-2 font-bold">
                    うち運営費
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tiers.map((t) => (
                  <tr key={t.label}>
                    <td className="py-3 pr-2 font-medium">{t.label}</td>
                    <td className="py-3 px-2 text-muted-foreground print:text-gray-600">
                      {t.description}
                    </td>
                    <td className="py-3 px-2 text-right font-bold text-accent print:text-black">
                      ¥{t.storeBurden}
                    </td>
                    <td className="py-3 px-2 text-right">
                      ¥{t.donation}
                    </td>
                    <td className="py-3 pl-2 text-right text-muted-foreground print:text-gray-600">
                      ¥{t.operatorFee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4 print:text-gray-500">
            ※ 残りはお客様へのポイント還元に充てられます。
            お客様が「全額支援」を選択した場合、ポイント分だけお店の負担が軽くなります。
          </p>
        </div>
      </section>

      {/* 創業パートナー */}
      <section className="py-12 sm:py-16 bg-muted/30 print:py-6 print:bg-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs font-medium text-accent mb-2 tracking-wider">
            LIMITED
          </p>
          <h2 className="font-serif text-2xl font-bold mb-4">
            創業パートナー店 {FOUNDING_MEMBER_LIMIT}店 限定募集
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto mb-6">
            サービス立ち上げ期に参加いただく創業パートナー店には、
            特別な認定マークの付与や優先的なプロモーション掲載など、
            長期的なメリットをご用意しています。
          </p>
          <div className="inline-flex flex-col sm:flex-row gap-3 items-center">
            <span className="px-4 py-2 rounded-full border-2 border-accent text-accent font-bold text-sm">
              初期費用 ¥0
            </span>
            <span className="px-4 py-2 rounded-full border-2 border-accent text-accent font-bold text-sm">
              月額費用 ¥0
            </span>
            <span className="px-4 py-2 rounded-full border-2 border-accent text-accent font-bold text-sm">
              解約自由
            </span>
          </div>
        </div>
      </section>

      {/* お問い合わせ導線 */}
      <section className="py-12 sm:py-16 print:py-6">
        <div className="mx-auto max-w-lg px-4 text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">
            まずはお気軽にご相談ください
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            サービスの詳細やご不明な点など、何でもお問い合わせください。
            担当者が丁寧にご説明いたします。
          </p>
          <Link
            href="/contact"
            className={buttonVariants({
              variant: "default",
              className:
                "bg-accent hover:bg-accent-dark text-white px-8 print:hidden",
            })}
          >
            お問い合わせはこちら
          </Link>
          <p className="mt-4 text-xs text-muted-foreground print:text-gray-500">
            osusowake.city/contact
          </p>
        </div>
      </section>
    </div>
  );
}
