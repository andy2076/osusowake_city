"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";

const heroImages = [
  "/images/photoAI1.png",
  "/images/photoAI2.png",
  "/images/photoAI3.png",
  "/images/photoAI4.png",
];

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

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.8, ease: "easeOut" as const },
};

function Divider() {
  return (
    <div className="text-center py-8 text-stone-400 tracking-widest">
      · · ·
    </div>
  );
}

export default function ForOrgsPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="print:text-black">
      {/* Hero — 画像クロスフェード */}
      <section className="relative min-h-screen w-full overflow-hidden print:min-h-0 print:py-12 print:bg-white">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover animate-kenburns"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40 print:hidden" />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center text-white print:min-h-0 print:text-black print:py-8">
          <div>
            <p className="font-serif text-lg md:text-xl opacity-80 tracking-widest mb-8">
              おすそわけ、です。
            </p>
            <h1
              className="font-serif text-4xl md:text-6xl leading-relaxed font-bold"
              style={{ wordBreak: "keep-all", overflowWrap: "anywhere" }}
            >
              子どもたちのために、
              <br />
              今日も頑張っている、あなたへ。
            </h1>
            <p className="mt-8 text-sm opacity-60">
              少年団・部活動・クラブチーム・子ども食堂・学習支援など
            </p>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm animate-bounce print:hidden">
          ↓ Scroll
        </div>
      </section>

      <Divider />

      {/* Section 1: 共感の問いかけ */}
      <section className="bg-stone-50 py-24 sm:py-32 print:py-8 print:bg-white">
        <motion.div {...fadeInUp} className="mx-auto max-w-prose px-4 text-center">
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
        </motion.div>
      </section>

      <Divider />

      {/* Section 2: 仮説の提示 */}
      <section className="bg-white py-24 sm:py-32 print:py-8">
        <motion.div {...fadeInUp} className="mx-auto max-w-prose px-4 text-center">
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
        </motion.div>
      </section>

      <Divider />

      {/* Section 3: 仕組み — 3カラムカード stagger */}
      <section className="bg-stone-50 py-24 sm:py-32 print:py-8 print:bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { num: "1", verb: "食べる", desc: "いつものお店で、いつもの食事を。" },
              { num: "2", verb: "撮る", desc: "レシートをアプリで撮影。" },
              { num: "3", verb: "届く", desc: "支援金が、あなたの団体へ。" },
            ].map((step) => (
              <motion.div
                key={step.num}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="text-center p-8 rounded-xl border border-stone-200 bg-white hover:shadow-lg transition-shadow print:border-gray-300"
              >
                <p className="text-7xl font-light text-stone-300 leading-none mb-2 print:text-gray-300">
                  {step.num}
                </p>
                <p className="font-serif text-2xl sm:text-3xl font-bold mb-3">
                  {step.verb}
                </p>
                <p className="text-sm text-stone-500">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div {...fadeInUp} className="text-center">
            <p className="font-serif text-2xl sm:text-3xl font-bold">
              たったそれだけ。
            </p>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-foreground/70 max-w-prose mx-auto print:text-gray-700">
              お客様が、いつものお店で、いつもの食事をする。レシートをアプリで撮る。自動で支援金が発生して、月末に振り込まれる。
            </p>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Section 4: 団体の負担 */}
      <section className="bg-white py-24 sm:py-32 print:py-8">
        <motion.div {...fadeInUp} className="mx-auto max-w-prose px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mb-10">
            あなたがやることは、
            <br />
            たった、ひとつ。
          </h2>
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="font-serif text-3xl md:text-4xl font-bold text-accent mb-10 print:text-black"
          >
            「面倒な書類は、いりません。」
          </motion.p>
          <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-foreground/70 print:text-gray-700">
            <p>
              ご登録は、振込先の情報だけ。
            </p>
            <p>
              営業も、申請書類も、集計も、月次報告書も。全部、運営がやります。
            </p>
          </div>
        </motion.div>
      </section>

      <Divider />

      {/* Section 5: 現実的な期待値 */}
      <section className="bg-stone-100 py-24 sm:py-32 print:py-8 print:bg-white">
        <motion.div {...fadeInUp} className="mx-auto max-w-prose px-4 text-center">
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
        </motion.div>
      </section>

      <Divider />

      {/* Section 6: 結び — ブランド理念 */}
      <section className="bg-white py-24 sm:py-32 print:py-8">
        <motion.div {...fadeInUp} className="mx-auto max-w-prose px-4 text-center">
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
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 text-white py-24 sm:py-32 print:py-8 print:bg-white print:text-black">
        <motion.div {...fadeInUp} className="mx-auto max-w-prose px-4 text-center">
          <p className="text-lg sm:text-xl text-white/70 mb-6 print:text-gray-600">
            もし、ご興味があれば。
          </p>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 print:text-gray-700">
            仕組みのご説明と、ご質問への回答だけ、30分のお時間をいただけませんか。
          </p>
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Link
              href="/contact"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className:
                  "bg-accent hover:bg-accent-dark text-white px-12 py-5 text-lg font-bold rounded-full hover:shadow-xl transition-all print:hidden",
              })}
            >
              話を聞かせてください
            </Link>
          </motion.div>
          <p className="mt-6 text-xs text-white/40 print:text-gray-500">
            osusowake.city/contact
          </p>
        </motion.div>
      </section>
    </div>
  );
}
