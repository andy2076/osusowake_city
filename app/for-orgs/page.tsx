import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "団体の方へ | まちのおすそわけ",
  description:
    "寄付のお願いに回らなくていい。地元の飲食店でごはんを食べるだけで、皆さんの活動を支える支援金が届く仕組みです。都城・三股・曽於エリア。",
};

export default function ForOrgsPage() {
  return (
    <div className="print:text-black">
      {/* ヒーロー */}
      <section className="bg-muted/30 py-16 sm:py-24 print:py-8 print:bg-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-sm font-medium text-accent mb-3">
            子ども食堂・少年団・クラブチームの皆さんへ
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            もう、寄付のお願いを
            <br />
            して回らなくていい。
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            食事が応援になる、新しい支援のかたち。
          </p>
        </div>
      </section>

      {/* EMPATHY — 共感 */}
      <section className="py-12 sm:py-16 print:py-6">
        <div className="mx-auto max-w-2xl px-4">
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed print:text-gray-700">
            <p>
              バザーの準備、フリマの出店、助成金の申請書類。
              <br />
              企業へのお願い回り、寄付者へのお礼と報告——。
            </p>
            <p>
              子どもたちのために始めた活動なのに、
              気がつけば「資金集め」に追われる毎日になっていませんか。
            </p>
            <p>
              本当は、その時間を子どもたちと過ごしたい。
              <br />
              活動そのものに集中したい。
            </p>
            <p className="text-foreground font-medium">
              「まちのおすそわけ」は、そんな皆さんのために作りました。
            </p>
          </div>
        </div>
      </section>

      {/* 仕組み — おすそわけの流れ */}
      <section className="py-12 sm:py-16 bg-muted/30 print:py-6 print:bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-serif text-2xl font-bold text-center mb-3">
            おすそわけの仕組み
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-8">
            皆さんが何かをする必要はありません。
          </p>
          <div className="flex flex-col items-center gap-2">
            {[
              {
                step: "1",
                title: "地元の人がお店でごはんを食べる",
                desc: "都城・三股・曽於の参加飲食店で、いつも通りの食事をするだけ。",
              },
              {
                step: "2",
                title: "レシートを撮って登録",
                desc: "お客様がスマホでレシートを撮影。お店の業態に応じて支援金が発生します。",
              },
              {
                step: "3",
                title: "支援金が少しずつ積み上がる",
                desc: "1枚あたり¥8〜¥65。小さな額が、たくさんの食卓から集まっていきます。",
              },
              {
                step: "4",
                title: "毎月、口座に届く",
                desc: "月末に集計して、翌月にまとめて振込。手続きはすべて運営が行います。",
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

      {/* 負担の対比 */}
      <section className="py-12 sm:py-16 print:py-6">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-serif text-2xl font-bold text-center mb-8">
            皆さんにお願いすること
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* やっていただくこと */}
            <div className="p-6 rounded-lg border-2 border-accent/30 bg-accent/5 print:border-gray-400 print:bg-gray-50">
              <p className="text-xs font-bold text-accent mb-4 tracking-wider print:text-black">
                やっていただくこと
              </p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-accent print:text-black">1つ</span>
                <span className="text-sm text-foreground">だけ</span>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-accent shrink-0 mt-0.5 print:text-black">&#10003;</span>
                  <span>振込先の口座を教えてください</span>
                </li>
              </ul>
            </div>

            {/* やらなくていいこと */}
            <div className="p-6 rounded-lg border border-border bg-card print:border-gray-300">
              <p className="text-xs font-bold text-muted-foreground mb-4 tracking-wider">
                やらなくていいこと
              </p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-muted-foreground">全部</span>
                <span className="text-sm text-muted-foreground">です</span>
              </div>
              <ul className="mt-4 space-y-2">
                {[
                  "営業・お願い回り",
                  "申請書類の作成",
                  "集計・経理処理",
                  "報告書の提出",
                  "お礼回り",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="shrink-0 mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-6 leading-relaxed">
            集計も振込手続きも、すべて運営がお手伝いします。
            <br />
            皆さんは、活動に集中してください。
          </p>
        </div>
      </section>

      {/* CHANGE — 導入後の変化 */}
      <section className="py-12 sm:py-16 bg-muted/30 print:py-6 print:bg-white">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-serif text-2xl font-bold text-center mb-8">
            変わること
          </h2>
          <div className="space-y-4">
            {[
              "寄付のお願いに回る回数が、少し減る。",
              "月末に「また振り込まれてる」がある。",
              "「安定した支援が少しあります」と言える安心感。",
              "お礼回りの時間を、子どもたちと過ごせる。",
            ].map((text) => (
              <div
                key={text}
                className="flex gap-3 items-start p-4 rounded-lg border border-border bg-card print:border-gray-300"
              >
                <span className="text-accent shrink-0 mt-0.5 print:text-black">&#10003;</span>
                <p className="text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ちりつも */}
      <section className="py-12 sm:py-16 print:py-6">
        <div className="mx-auto max-w-2xl px-4">
          <div className="p-6 sm:p-8 rounded-lg border border-border bg-card print:border-gray-300">
            <h2 className="font-serif text-xl font-bold mb-4">
              正直にお伝えします。
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed print:text-gray-700">
              <p>
                最初は、小さな額かもしれません。
              </p>
              <p>
                レシート1枚あたりの支援金は¥8〜¥65。
                参加店舗が増え、利用者が増えるにつれて、少しずつ積み上がっていきます。
              </p>
              <p>
                大きな金額をお約束することはできません。
                <br />
                でも、「誰かにお願いしなくても、毎月届く支援がある」という仕組みを、
                一緒に育てていけたらと思っています。
              </p>
              <p className="text-foreground font-medium">
                ちりも積もれば——。
                地元のたくさんの食卓から届く、小さなおすそわけです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 参加の流れ */}
      <section className="py-12 sm:py-16 bg-muted/30 print:py-6 print:bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-serif text-2xl font-bold text-center mb-8">
            はじめかた
          </h2>
          <div className="space-y-4 max-w-md mx-auto">
            {[
              {
                step: "1",
                title: "お問い合わせ",
                desc: "まずはお気軽にご連絡ください。仕組みについて丁寧にご説明します。",
              },
              {
                step: "2",
                title: "団体の情報を教えてください",
                desc: "団体名、活動内容、振込先口座をお知らせいただきます。",
              },
              {
                step: "3",
                title: "紹介ページを公開",
                desc: "皆さんの活動を紹介するページを作成。お客様が応援先として選べるようになります。",
              },
              {
                step: "4",
                title: "あとは待つだけ",
                desc: "月末に集計して、翌月にお届け。明細もお送りします。",
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
            お話だけでも聞いてみませんか
          </h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            「うちの団体でも使えるの？」「どんな仕組み？」
            <br />
            どんなことでも構いません。お気軽にご連絡ください。
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
