import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "団体の方へ | まちのおすそわけ",
  description:
    "寄付のお願いに回らなくていい。地元の飲食店でごはんを食べるだけで、皆さんの活動を支える支援金が届く仕組みです。都城・三股・曽於エリア。",
};

function ImagePlaceholder({ alt }: { alt: string }) {
  return (
    <div className="w-full aspect-[16/7] bg-muted/60 rounded-lg flex items-center justify-center print:border print:border-gray-300">
      <p className="text-sm text-muted-foreground">{alt}</p>
    </div>
  );
}

export default function ForOrgsPage() {
  return (
    <div className="print:text-black">
      {/* ヒーロー — 大きな画像 + タイトル */}
      <section className="print:py-8 print:bg-white">
        <div className="mx-auto max-w-4xl px-4 pt-8 sm:pt-12">
          <ImagePlaceholder alt="写真: 子ども食堂の温かい食卓の風景" />
        </div>
        <div className="mx-auto max-w-3xl px-4 pt-8 pb-12 sm:pt-12 sm:pb-16 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-snug">
            ある日の、
            <br />
            子ども食堂の代表さんへ。
          </h1>
        </div>
      </section>

      {/* セクション1: 共感の問いかけ */}
      <section className="py-12 sm:py-16 bg-muted/30 print:py-6 print:bg-white">
        <div className="mx-auto max-w-2xl px-4">
          <div className="space-y-6 text-base leading-loose text-foreground/80 print:text-gray-700">
            <p>
              朝、子どもたちが来る前のキッチンで、
              「来月の食材費、足りるだろうか」と思ったことはありませんか。
            </p>
            <p>
              バザーの準備、フリマの出店、助成金の申請書類。
              企業へのお願い回り、寄付してくれた方へのお礼と報告。
            </p>
            <p>
              子どもたちのために始めた活動なのに、
              気がつけば「お金集めの仕事」に追われる毎日になっている。
            </p>
            <p className="text-foreground font-medium">
              本当は、その時間を、子どもたちと過ごしたいのに。
            </p>
          </div>
        </div>
      </section>

      {/* セクション2: 仮説の提示 */}
      <section className="py-14 sm:py-20 print:py-8">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-base text-foreground/70 leading-loose mb-6">
            いま、すぐ近くの居酒屋で、誰かが食事をしています。
            <br />
            定食屋のカウンターで、誰かがごはんを食べています。
          </p>
          <p className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
            もし、その一食が、
            <br />
            あなたの団体への応援に変わったら？
          </p>
        </div>
      </section>

      {/* セクション3: 仕組みを最小限で */}
      <section className="py-12 sm:py-16 bg-muted/30 print:py-6 print:bg-white">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="flex items-center justify-center gap-4 sm:gap-6 text-lg sm:text-xl font-bold text-foreground mb-8">
            <span className="px-4 py-2 rounded-lg bg-card border border-border">食べる</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-4 py-2 rounded-lg bg-card border border-border">撮る</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent print:text-black print:border-gray-400">届く</span>
          </div>
          <p className="text-base text-foreground/70 leading-loose">
            地元のお店でごはんを食べた人が、レシートを撮って登録する。
            それだけで、お店の業態に応じた支援金が発生して、
            あなたの団体に届きます。
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            集計も振込も、すべて運営が行います。
            皆さんが何かをする必要はありません。
          </p>
        </div>
      </section>

      {/* セクション4: 団体の負担 */}
      <section className="py-14 sm:py-20 print:py-8">
        <div className="mx-auto max-w-2xl px-4">
          <div className="space-y-6 text-base leading-loose">
            <p className="font-serif text-2xl sm:text-3xl font-bold text-center leading-snug mb-8">
              あなたがやることは、
              <br />
              たったひとつ。
            </p>
            <p className="text-foreground/80 text-center">
              振込先の口座を教えてください。それだけです。
            </p>
            <p className="text-foreground/60 text-center">
              営業活動も、書類作成も、月次の集計も、
              お礼のご連絡も。全部、運営がやります。
              皆さんは活動に集中してください。
            </p>
          </div>
        </div>
      </section>

      {/* セクション5: 現実的な期待値 */}
      <section className="py-12 sm:py-16 bg-muted/30 print:py-6 print:bg-white">
        <div className="mx-auto max-w-2xl px-4">
          <div className="space-y-6 text-base leading-loose text-foreground/80 print:text-gray-700">
            <p className="text-foreground font-medium">
              正直にお伝えします。
            </p>
            <p>
              最初は、月¥500からかもしれません。
              参加するお店もまだ少ないし、
              レシートを登録してくれる人も、これからです。
            </p>
            <p>
              でも、何もしなくても、毎月、確実に積み上がります。
              お店が増え、利用者が増えるたびに、少しずつ。
            </p>
            <p className="text-foreground font-medium">
              1年後に振り返って、「あって良かった」と思える額に。
              そういう仕組みを、一緒に育てていけたらと思っています。
            </p>
          </div>
        </div>
      </section>

      {/* セクション6: ブランド理念 */}
      <section className="py-14 sm:py-20 print:py-8">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="space-y-6 text-base leading-loose text-foreground/70">
            <p>
              ホットペッパーやふるさと納税のような、
              大きな仕組みじゃありません。
            </p>
            <p>
              都城、三股、曽於。
              <br />
              この狭いエリアの、小さくて温かい仕組みです。
            </p>
            <p className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              ちりも積もれば——。
              <br />
              地元のたくさんの食卓から届く、
              <br />
              小さなおすそわけです。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-muted/30 print:py-8 print:bg-white">
        <div className="mx-auto max-w-lg px-4 text-center">
          <Link
            href="/contact"
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className:
                "bg-accent hover:bg-accent-dark text-white px-10 py-6 text-base font-bold print:hidden",
            })}
          >
            お話を聞かせてください
          </Link>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            30分のお時間で、仕組みのご説明と、ご質問にお答えします。
          </p>
          <p className="mt-2 text-xs text-muted-foreground print:text-gray-500">
            osusowake.city/contact
          </p>
        </div>
      </section>
    </div>
  );
}
