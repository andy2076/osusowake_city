import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "団体の方へ | まちのおすそわけ",
  description:
    "寄付のお願いに回らなくていい。地元の飲食店でごはんを食べるだけで、あなたの団体への支援金が届く仕組みです。都城・三股・曽於エリア。",
};

function ImagePlaceholder() {
  return (
    <div className="w-full aspect-[16/9] bg-stone-200 print:border print:border-gray-300" />
  );
}

export default function ForOrgsPage() {
  return (
    <div className="print:text-black">
      {/* SECTION 1: Hero — 画像背景+暗オーバーレイ、白文字 */}
      <section className="relative print:py-8 print:bg-white">
        <ImagePlaceholder />
        <div className="absolute inset-0 bg-black/40 print:hidden" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center print:relative print:inset-auto">
          <p className="text-white/80 text-lg sm:text-xl mb-6 print:text-gray-500">
            おすそわけ、です。
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug tracking-tight print:text-black">
            子どもたちのために、
            <br />
            今日も頑張っている、あなたへ。
          </h1>
        </div>
      </section>

      {/* SECTION 2: 共感の問いかけ */}
      <section className="py-24 sm:py-32 print:py-8">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-10 leading-snug">
            「来月の食材費、足りるかな」
          </h2>
          <div className="space-y-6 text-lg sm:text-xl leading-loose text-foreground/70 print:text-gray-700">
            <p>
              朝、まだ誰もいないキッチンで、
              <br />
              ふと、そう思ったことはありませんか。
            </p>
            <p>
              バザー、フリマ、助成金の書類、スポンサー回り。
              <br />
              「子どもたちのため」と続けてきた活動の裏で、
              <br />
              気がつくと、お金集めに時間を取られている。
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: 仮説の提示 — 画像区切り */}
      <section className="bg-muted/30 print:bg-white print:py-8">
        <div className="mx-auto max-w-4xl">
          <ImagePlaceholder />
        </div>
        <div className="py-24 sm:py-32 print:py-8">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <p className="text-lg sm:text-xl text-foreground/60 mb-8 leading-loose">
              ねえ、知っていますか。
            </p>
            <p className="text-lg sm:text-xl text-foreground/70 leading-loose mb-10">
              いまこの瞬間、すぐ近くの居酒屋で、
              <br />
              誰かがビールを飲んで、ご飯を食べています。
            </p>
            <p className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
              その一食を、
              <br />
              あなたの団体への応援に変えられるとしたら？
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: 仕組み — シンプルな図 */}
      <section className="py-24 sm:py-32 print:py-8">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-5 text-xl sm:text-2xl font-bold text-foreground mb-4">
            <span>食べる</span>
            <span className="text-muted-foreground font-normal">→</span>
            <span>撮る</span>
            <span className="text-muted-foreground font-normal">→</span>
            <span className="text-accent print:text-black">届く</span>
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-bold mb-10">
            たったそれだけ。
          </p>
          <div className="space-y-6 text-lg sm:text-xl leading-loose text-foreground/70 print:text-gray-700">
            <p>
              お客様が、いつものお店で、いつもの食事をする。
              <br />
              レシートをアプリで撮る。
              <br />
              自動で支援金が発生して、月末に振り込まれる。
            </p>
          </div>
        </div>
      </section>

      {/* 区切り線 */}
      <div className="mx-auto max-w-xs">
        <hr className="border-border" />
      </div>

      {/* SECTION 5: 団体の負担 */}
      <section className="py-24 sm:py-32 print:py-8">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mb-10">
            あなたがやることは、
            <br />
            たった、ひとつ。
          </h2>
          <p className="font-serif text-xl sm:text-2xl font-bold text-accent mb-10 print:text-black">
            口座を、教えてください。
          </p>
          <p className="text-lg sm:text-xl leading-loose text-foreground/70 print:text-gray-700">
            営業も、申請書類も、集計も、月次報告書も。
            <br />
            全部、運営がやります。
          </p>
        </div>
      </section>

      {/* SECTION 6: 現実的な期待値 */}
      <section className="py-24 sm:py-32 bg-muted/30 print:py-8 print:bg-white">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-lg sm:text-xl text-foreground font-medium mb-10">
            正直に書きます。
          </p>
          <div className="space-y-6 text-lg sm:text-xl leading-loose text-foreground/70 print:text-gray-700">
            <p>
              最初の数ヶ月は、月¥500くらいかもしれません。
              <br />
              月¥3,000かもしれません。
            </p>
            <p className="text-foreground font-medium">
              でも、ちりつも、です。
            </p>
            <p>
              何もしなくても、毎月、確実に積み上がります。
              <br />
              1年後、振り返ったとき、
              <br />
              「あって良かった」と思える額になっているはず。
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: 結び — ブランド理念 */}
      <section className="py-24 sm:py-32 print:py-8">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="space-y-6 text-lg sm:text-xl leading-loose text-foreground/60 print:text-gray-600">
            <p>
              ホットペッパーじゃありません。
              <br />
              ふるさと納税でもありません。
            </p>
            <p>
              都城・三股・曽於、ここだけの、
              <br />
              小さくて、確かな仕組み。
            </p>
          </div>
          <p className="mt-10 text-lg sm:text-xl leading-loose text-foreground/80 print:text-gray-700">
            あなたの団体の活動を、
            <br />
            地元のみんなで、ちょっとだけ、応援する。
          </p>
          <p className="mt-8 font-serif text-2xl sm:text-3xl font-bold">
            それが、「まちのおすそわけ」です。
          </p>
        </div>
      </section>

      {/* SECTION 8: CTA */}
      <section className="py-24 sm:py-32 bg-muted/30 print:py-8 print:bg-white">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-10">
            話を、聞かせてください。
          </h2>
          <Link
            href="/contact"
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className:
                "bg-accent hover:bg-accent-dark text-white px-10 py-6 text-lg font-bold print:hidden",
            })}
          >
            30分だけ、お時間いただけませんか
          </Link>
          <p className="mt-4 text-xs text-muted-foreground print:text-gray-500">
            osusowake.city/contact
          </p>
        </div>
      </section>
    </div>
  );
}
