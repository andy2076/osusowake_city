import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "団体の方へ | まちのおすそわけ",
  description:
    "少年団・部活動・クラブチーム・子ども食堂など、地域の子ども関連団体へ。地元の飲食店でごはんを食べるだけで、あなたの団体への支援金が届く仕組みです。都城・三股・曽於エリア。",
};

function HandsIcon() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#8B6F47"
      fill="none"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-24 h-24 md:w-32 md:h-32 mx-auto opacity-70"
    >
      {/* 左手 */}
      <path d="M 30 110 Q 30 90 50 90 L 90 90 Q 100 90 100 100 L 100 130 Q 100 145 85 145 L 50 145 Q 30 145 30 125 Z" />
      {/* 右手 (鏡像配置) */}
      <path d="M 170 110 Q 170 90 150 90 L 110 90 Q 100 90 100 100 L 100 130 Q 100 145 115 145 L 150 145 Q 170 145 170 125 Z" />
      {/* 渡されるもの (湯気/光のような表現) */}
      <path d="M 85 75 Q 90 60 100 55 Q 110 60 115 75" opacity="0.6" />
      <circle cx="100" cy="75" r="4" fill="#8B6F47" opacity="0.4" />
    </svg>
  );
}

function BeerMugIcon() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#8B6F47"
      fill="none"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-32 h-32 md:w-40 md:h-40 mx-auto"
    >
      <path d="M 48 55 Q 58 42 73 55 Q 88 42 103 55 Q 118 42 132 55" />
      <path d="M 50 55 L 50 165 Q 50 172 57 172 L 125 172 Q 132 172 132 165 L 132 55 Z" />
      <path d="M 132 80 Q 162 80 162 110 Q 162 140 132 140" />
      <line x1="65" y1="85" x2="118" y2="85" strokeDasharray="3 5" opacity="0.5" />
      <line x1="65" y1="110" x2="118" y2="110" strokeDasharray="3 5" opacity="0.5" />
      <line x1="65" y1="135" x2="118" y2="135" strokeDasharray="3 5" opacity="0.5" />
    </svg>
  );
}

export default function ForOrgsPage() {
  return (
    <div className="print:text-black">
      {/* Hero */}
      <section className="bg-stone-100 py-28 sm:py-36 print:py-12 print:bg-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mb-8">
            <HandsIcon />
          </div>
          <p className="text-lg sm:text-xl text-foreground/60 mb-8">
            おすそわけ、です。
          </p>
          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight"
            style={{ wordBreak: "keep-all", overflowWrap: "anywhere" }}
          >
            子どもたちのために、
            <br />
            今日も頑張っている、あなたへ。
          </h1>
          <p className="mt-8 text-sm text-foreground/50">
            少年団・部活動・クラブチーム・子ども食堂・学習支援など
          </p>
        </div>
      </section>

      {/* Section 1: 共感の問いかけ */}
      <section className="bg-stone-50 py-24 sm:py-32 print:py-8 print:bg-white">
        <div className="mx-auto max-w-prose px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-10 leading-snug">
            「あの会議で、また『予算が足りない』と聞いた」
          </h2>
          <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-foreground/70 print:text-gray-700">
            <p>
              ユニフォームの買い替え、楽器の修理、食材の調達。来月の遠征費、また保護者にお願いしないと──
            </p>
            <p>
              バザー、フリマ、助成金の書類、スポンサー回り。子どもたちのために続けてきた活動なのに、気がつくと、お金集めの仕事に追われている。
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: 仮説の提示 */}
      <section className="bg-white py-24 sm:py-32 print:py-8">
        <div className="mx-auto max-w-prose px-4 text-center">
          <div className="mb-12">
            <BeerMugIcon />
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
            「面倒な書類は、いりません。」
          </p>
          <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-foreground/70 print:text-gray-700">
            <p>
              ご登録は、振込先の情報だけ。
            </p>
            <p>
              営業も、申請書類も、集計も、月次報告書も。全部、運営がやります。
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: 現実的な期待値 */}
      <section className="bg-stone-100 py-24 sm:py-32 print:py-8 print:bg-white">
        <div className="mx-auto max-w-prose px-4 text-center">
          <p className="text-lg sm:text-xl text-foreground/60 mb-10">
            どれくらい届くか、お伝えしておきます。
          </p>
          <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-foreground/70 print:text-gray-700">
            <p>
              最初の数ヶ月は、月¥500ほどかもしれません。月¥3,000かもしれません。
            </p>
            <p className="text-foreground font-medium">
              でも、ちりつも、です。
            </p>
            <p>
              何もしなくても、毎月、確実に積み上がります。1年後、振り返ったとき、活動の支えになっているはず。
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: 結び — ブランド理念 */}
      <section className="bg-white py-24 sm:py-32 print:py-8">
        <div className="mx-auto max-w-prose px-4 text-center">
          <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-foreground/60 print:text-gray-600">
            <p>
              大きな仕組みでは、ありません。全国の有名サイトでも、ありません。
            </p>
            <p>
              都城・三股・曽於、ここだけの、小さくて、確かな仕組みです。
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
