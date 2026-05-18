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
    <div className="aspect-[4/3] max-w-md mx-auto bg-stone-200 rounded-lg flex items-center justify-center print:border print:border-gray-300">
      <span className="text-sm text-stone-400">写真エリア</span>
    </div>
  );
}

export default function ForOrgsPage() {
  return (
    <div className="print:text-black">
      {/* Hero */}
      <section className="bg-stone-100 py-28 sm:py-36 print:py-12 print:bg-white">
        <div className="mx-auto max-w-prose px-4 text-center">
          <p className="text-lg sm:text-xl text-foreground/60 mb-8">
            おすそわけ、です。
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            子どもたちのために、
            <br />
            今日も頑張っている、あなたへ。
          </h1>
        </div>
      </section>

      {/* Section 1: 共感の問いかけ */}
      <section className="bg-stone-50 py-24 sm:py-32 print:py-8 print:bg-white">
        <div className="mx-auto max-w-prose px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-10 leading-snug">
            「来月の食材費、足りるかな」
          </h2>
          <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-foreground/70 print:text-gray-700">
            <p>
              朝、まだ誰もいないキッチンで、ふと、そう思ったことはありませんか。
            </p>
            <p>
              バザー、フリマ、助成金の書類、スポンサー回り。「子どもたちのため」と続けてきた活動の裏で、気がつくと、お金集めに時間を取られている。
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: 仮説の提示 */}
      <section className="bg-white py-24 sm:py-32 print:py-8">
        <div className="mx-auto max-w-prose px-4 text-center">
          <div className="mb-12">
            <ImagePlaceholder />
          </div>
          <p className="text-lg sm:text-xl text-foreground/60 mb-6 leading-relaxed">
            ねえ、知っていますか。
          </p>
          <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed mb-10">
            いまこの瞬間、すぐ近くの居酒屋で、誰かがビールを飲んで、ご飯を食べています。
          </p>
          <p className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
            その一食を、
            <br />
            あなたの団体への応援に変えられるとしたら？
          </p>
        </div>
      </section>

      {/* Section 3: 仕組み — 3カラムカード */}
      <section className="bg-stone-50 py-24 sm:py-32 print:py-8 print:bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { num: "1", verb: "食べる", desc: "いつものお店で、いつもの食事を。" },
              { num: "2", verb: "撮る", desc: "レシートをアプリで撮影。" },
              { num: "3", verb: "届く", desc: "支援金が、あなたの団体へ。" },
            ].map((item) => (
              <div
                key={item.num}
                className="text-center p-8 rounded-lg border border-border bg-white print:border-gray-300"
              >
                <p className="text-7xl font-bold text-stone-200 leading-none mb-2 print:text-gray-300">
                  {item.num}
                </p>
                <p className="font-serif text-2xl sm:text-3xl font-bold mb-3">
                  {item.verb}
                </p>
                <p className="text-sm text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-center">
            たったそれだけ。
          </p>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-foreground/70 text-center max-w-prose mx-auto print:text-gray-700">
            お客様が、いつものお店で、いつもの食事をする。レシートをアプリで撮る。自動で支援金が発生して、月末に振り込まれる。
          </p>
        </div>
      </section>

      {/* Section 4: 団体の負担 */}
      <section className="bg-white py-24 sm:py-32 print:py-8">
        <div className="mx-auto max-w-prose px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mb-10">
            あなたがやることは、
            <br />
            たった、ひとつ。
          </h2>
          <p className="font-serif text-xl sm:text-2xl font-bold text-accent mb-10 print:text-black">
            口座を、教えてください。
          </p>
          <p className="text-lg sm:text-xl leading-relaxed text-foreground/70 print:text-gray-700">
            営業も、申請書類も、集計も、月次報告書も。全部、運営がやります。
          </p>
        </div>
      </section>

      {/* Section 5: 現実的な期待値 */}
      <section className="bg-stone-100 py-24 sm:py-32 print:py-8 print:bg-white">
        <div className="mx-auto max-w-prose px-4 text-center">
          <p className="text-lg sm:text-xl text-foreground font-medium mb-10">
            正直に書きます。
          </p>
          <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-foreground/70 print:text-gray-700">
            <p>
              最初の数ヶ月は、月¥500くらいかもしれません。月¥3,000かもしれません。
            </p>
            <p className="text-foreground font-medium">
              でも、ちりつも、です。
            </p>
            <p>
              何もしなくても、毎月、確実に積み上がります。1年後、振り返ったとき、「あって良かった」と思える額になっているはず。
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: 結び — ブランド理念 */}
      <section className="bg-white py-24 sm:py-32 print:py-8">
        <div className="mx-auto max-w-prose px-4 text-center">
          <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-foreground/60 print:text-gray-600">
            <p>
              ホットペッパーじゃありません。ふるさと納税でもありません。
            </p>
            <p>
              都城・三股・曽於、ここだけの、小さくて、確かな仕組み。
            </p>
          </div>
          <p className="mt-10 text-lg sm:text-xl leading-relaxed text-foreground/80 print:text-gray-700">
            あなたの団体の活動を、地元のみんなで、ちょっとだけ、応援する。
          </p>
          <p className="mt-8 font-serif text-2xl sm:text-3xl font-bold">
            それが、「まちのおすそわけ」です。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 text-white py-24 sm:py-32 print:py-8 print:bg-white print:text-black">
        <div className="mx-auto max-w-prose px-4 text-center">
          <p className="text-lg sm:text-xl text-white/70 mb-6 print:text-gray-600">
            もし、ご興味があれば。
          </p>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 print:text-gray-700">
            仕組みのご説明と、ご質問への回答だけ、30分のお時間をいただけませんか。
          </p>
          <Link
            href="/contact"
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className:
                "bg-accent hover:bg-accent-dark text-white px-12 py-4 text-lg font-bold print:hidden",
            })}
          >
            話を聞かせてください
          </Link>
          <p className="mt-6 text-xs text-white/40 print:text-gray-500">
            osusowake.city/contact
          </p>
        </div>
      </section>
    </div>
  );
}
