import type { Metadata } from "next";
import Link from "next/link";
import { TIER_CONFIG } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "支援団体の方へ | まちのおすそわけ",
  description:
    "事務負担ゼロで毎月安定した支援金を受け取れます。子ども食堂・少年団・クラブチーム向け。都城・三股・曽於エリア。",
};

export default function ForOrgsPage() {
  // 試算: 10店舗参加、各店月100枚レシート、standardプラン平均の場合
  const exampleDonationPerReceipt = TIER_CONFIG.standard.donation;
  const exampleStores = 10;
  const exampleReceiptsPerStore = 100;
  const exampleMonthly =
    exampleDonationPerReceipt * exampleStores * exampleReceiptsPerStore;

  return (
    <div className="print:text-black">
      {/* ヒーロー */}
      <section className="bg-muted/30 py-16 sm:py-24 print:py-8 print:bg-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-sm font-medium text-accent mb-3">
            子ども食堂・少年団・クラブチームの皆さまへ
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            事務負担ゼロで、
            <br />
            毎月届く支援金。
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            地元の飲食店でお客様がごはんを食べる。それだけで、
            皆さまの活動を支える支援金が毎月届く仕組みです。
          </p>
        </div>
      </section>

      {/* 仕組み（流れ図） */}
      <section className="py-12 sm:py-16 print:py-6">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-serif text-2xl font-bold text-center mb-8">
            おすそわけの仕組み
          </h2>
          <div className="flex flex-col items-center gap-2">
            {[
              {
                step: "1",
                title: "お客様がお店で食事",
                desc: "参加飲食店でいつも通りお食事。お客様に追加費用はかかりません。",
              },
              {
                step: "2",
                title: "レシートを登録",
                desc: "お客様がアプリでレシートを撮影・登録すると、お店の業態に応じた支援金が発生します。",
              },
              {
                step: "3",
                title: "支援金が積み上がる",
                desc: "レシート1枚あたり¥8〜¥65が支援金としてプールされていきます。",
              },
              {
                step: "4",
                title: "毎月お届け",
                desc: "月末に集計し、翌月にまとめて振込。事務手続きは運営がすべて代行します。",
              },
            ].map((item, i) => (
              <div key={item.step} className="w-full max-w-md">
                <div className="flex gap-4 p-4 rounded-lg border border-border bg-card print:border-gray-300">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center print:border print:border-gray-400 print:bg-white">
                    <span className="text-accent font-bold text-sm print:text-black">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed print:text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
                {i < 3 && (
                  <div className="flex justify-center py-1">
                    <span className="text-muted-foreground text-lg">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 負担ゼロ強調 */}
      <section className="py-12 sm:py-16 bg-muted/30 print:py-6 print:bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-serif text-2xl font-bold text-center mb-8">
            団体さまのご負担
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { label: "初期費用", value: "¥0" },
              { label: "月額費用", value: "¥0" },
              { label: "事務作業", value: "なし" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-6 rounded-lg border border-border bg-card print:border-gray-300"
              >
                <p className="text-xs text-muted-foreground mb-2 print:text-gray-500">
                  {item.label}
                </p>
                <p className="text-3xl font-bold text-accent print:text-black">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center mt-6 leading-relaxed">
            集計・振込手続きはすべて運営が代行します。
            <br />
            団体さまは口座情報をご登録いただくだけで、毎月の支援金を受け取れます。
          </p>
        </div>
      </section>

      {/* 受け取り額の試算 */}
      <section className="py-12 sm:py-16 print:py-6">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-serif text-2xl font-bold text-center mb-2">
            支援金の試算
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-8">
            参加店舗数とレシート数に応じて支援金が増えていきます。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-accent/30">
                  <th className="text-left py-3 pr-2 font-bold">プラン</th>
                  <th className="text-right py-3 px-2 font-bold">
                    1枚あたり支援金
                  </th>
                  <th className="text-right py-3 px-2 font-bold">
                    月100枚の場合
                  </th>
                  <th className="text-right py-3 pl-2 font-bold">
                    月500枚の場合
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {Object.values(TIER_CONFIG).map((t) => (
                  <tr key={t.label}>
                    <td className="py-3 pr-2 font-medium">{t.label}</td>
                    <td className="py-3 px-2 text-right">¥{t.donation}</td>
                    <td className="py-3 px-2 text-right">
                      ¥{(t.donation * 100).toLocaleString()}
                    </td>
                    <td className="py-3 pl-2 text-right font-bold text-accent print:text-black">
                      ¥{(t.donation * 500).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-accent/5 border border-accent/20 print:border-gray-300 print:bg-gray-50">
            <p className="text-sm text-center">
              <span className="font-bold">参考試算:</span>{" "}
              参加店{exampleStores}店舗 × 月{exampleReceiptsPerStore}枚（スタンダード平均）の場合
            </p>
            <p className="text-center text-2xl font-bold text-accent mt-2 print:text-black">
              月額 ¥{exampleMonthly.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* パイロット参加の流れ */}
      <section className="py-12 sm:py-16 bg-muted/30 print:py-6 print:bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-serif text-2xl font-bold text-center mb-8">
            ご参加の流れ
          </h2>
          <div className="space-y-4 max-w-md mx-auto">
            {[
              {
                step: "1",
                title: "お問い合わせ",
                desc: "まずはお気軽にご連絡ください。サービスの詳細をご説明します。",
              },
              {
                step: "2",
                title: "団体情報のご登録",
                desc: "団体名、活動内容、振込先口座をお知らせいただきます。",
              },
              {
                step: "3",
                title: "サイトに掲載開始",
                desc: "団体紹介ページを公開。お客様が応援先として選べるようになります。",
              },
              {
                step: "4",
                title: "毎月の支援金受け取り",
                desc: "月末集計、翌月振込。明細レポートもお届けします。",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 items-start p-4 rounded-lg border border-border bg-card print:border-gray-300"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm print:bg-white print:text-black print:border print:border-gray-400">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground print:text-gray-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
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
            活動内容やご不明な点など、何でもお問い合わせください。
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
