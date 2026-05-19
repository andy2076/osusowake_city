"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { TIER_CONFIG, FOUNDING_MEMBER_LIMIT } from "@/lib/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const tiers = Object.values(TIER_CONFIG);

const faqItems = [
  {
    q: "何か手数料はかかりますか？",
    a: "いいえ。完全無料です。集計・振込手続きはすべて運営が代行します。",
  },
  {
    q: "寄付金額は、団体ごとに違いますか？",
    a: "お客さんが選んだ団体に届く仕組みなので、お客さんに選ばれるほど金額が増えます。最初は月¥500くらいかもしれませんが、参加店舗とお客さんが増えると、毎月確実に積み上がります。",
  },
  {
    q: "子ども食堂とスポーツ少年団は、同じ枠ですか？",
    a: "はい。地域の子どもに関わるすべての団体が対象です。お客さんが「どの団体に応援を届けるか」を選びます。",
  },
  {
    q: "お店との関係が悪化したりしませんか？",
    a: "いいえ。お店側は「うちで食事すると地元の○○を応援できます」とブランディングできるので、むしろ歓迎される関係です。",
  },
  {
    q: "振込タイミングと最低額は？",
    a: "月末締め、翌月15日に振込。最低額の設定はありません。",
  },
  {
    q: "個人情報や寄付者情報の管理は？",
    a: "寄付者情報は団体には共有されません。「何人から、合計いくら届いたか」のみの月次レポートをお渡しします。",
  },
  {
    q: "やめたい時はどうすれば？",
    a: "いつでも電話一本でやめられます。違約金や継続義務はありません。",
  },
  {
    q: "報告書や領収書は？",
    a: "月次レポートを電子メールで送付。年末には年間サマリーもお渡しします。",
  },
  {
    q: "競合の助成金との両立は？",
    a: "もちろん可能です。本仕組みは民間の少額支援なので、行政の助成金や他の寄付プログラムと併用できます。",
  },
  {
    q: "いつから参加できますか？",
    a: "お問い合わせから最短2週間で運用開始です。",
  },
];

const comparisonData = [
  {
    label: "まちのおすそわけ",
    jimu: "ほぼなし",
    amount: "少額〜中額",
    stability: "毎月安定",
    local: "強い",
    easy: "簡単（口座だけ）",
    highlight: true,
  },
  {
    label: "ふるさと納税",
    jimu: "中程度",
    amount: "大きい（時期次第）",
    stability: "寄付期次第",
    local: "中程度",
    easy: "申請が複雑",
    highlight: false,
  },
  {
    label: "直接寄付集め",
    jimu: "重い",
    amount: "不安定",
    stability: "寄付期次第",
    local: "強い",
    easy: "自力で頑張る",
    highlight: false,
  },
];

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
              { num: "2", verb: "応援する", desc: "レシートをアプリで撮影して、団体を選ぶ。" },
              { num: "3", verb: "届く", desc: "団体に支援金が届く。" },
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

      <Divider />

      {/* 追加1: 仕組み具体例 */}
      <section className="bg-stone-50 py-16 sm:py-24 print:py-8 print:bg-white">
        <motion.div {...fadeInUp} className="mx-auto max-w-2xl px-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-10">
            どんなふうに、お金が届くのか。
          </h2>
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-foreground/70 mb-8">
            <p>
              たとえば、お客さんが地元の焼肉店でお食事（¥3,200）。アプリでレシートを撮影して、応援先に「○○少年団」を選びます。
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8 print:border-gray-300">
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex justify-between border-b border-stone-100 pb-3">
                <span className="text-foreground/60">焼肉店のお会計</span>
                <span className="font-bold">¥3,200</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-3">
                <span className="text-foreground/60">お客さんの追加負担</span>
                <span className="font-bold text-accent">¥0</span>
              </div>
              <div className="pt-2 pb-1 text-xs text-foreground/50">
                アプリ操作 → お店から¥80が発生
              </div>
              <div className="flex justify-between pl-4">
                <span>¥35 → ○○少年団へ</span>
                <span className="font-medium text-accent">支援金</span>
              </div>
              <div className="flex justify-between pl-4">
                <span>¥30 → お客さんのポイント</span>
                <span className="text-xs text-foreground/50">（応援先に寄付も可能）</span>
              </div>
              <div className="flex justify-between pl-4">
                <span>¥15 → プラットフォーム運営</span>
                <span></span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-foreground/50 text-center">
            ※お店の業態によって金額は変わります。詳しくは次のセクションをご覧ください。
          </p>
        </motion.div>
      </section>

      <Divider />

      {/* 追加2: 料金表 */}
      <section className="bg-white py-16 sm:py-24 print:py-8">
        <motion.div {...fadeInUp} className="mx-auto max-w-2xl px-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-2">
            レシート1枚あたりの支援金額
          </h2>
          <p className="text-center text-sm text-foreground/50 mb-8">
            お店の業態に応じて4段階
          </p>
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-accent/30">
                <TableHead>業態</TableHead>
                <TableHead className="text-right">お店の負担</TableHead>
                <TableHead className="text-right">団体への支援金</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tiers.map((t) => (
                <TableRow key={t.label}>
                  <TableCell>
                    <span className="font-medium">{t.label}</span>
                    <span className="block text-xs text-muted-foreground">
                      {t.description}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ¥{t.storeBurden}
                  </TableCell>
                  <TableCell className="text-right font-bold text-accent">
                    ¥{t.donation}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-4 text-xs text-foreground/50">
            ※お客さんがポイントを寄付した場合、さらに増えます。
          </p>
        </motion.div>
      </section>

      <Divider />

      {/* 追加3: 参加ステップ */}
      <section className="bg-stone-50 py-16 sm:py-24 print:py-8 print:bg-white">
        <div className="mx-auto max-w-2xl px-4">
          <motion.h2
            {...fadeInUp}
            className="font-serif text-2xl sm:text-3xl font-bold text-center mb-10"
          >
            参加までの4ステップ
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.15 }}
            className="space-y-4"
          >
            {[
              {
                num: "1",
                title: "お問い合わせ",
                desc: "このページ最下部のフォームから、お気軽にご連絡ください。",
              },
              {
                num: "2",
                title: "説明・ヒアリング",
                desc: "担当者がご団体を訪問し、30分ほど仕組みをご説明します。",
              },
              {
                num: "3",
                title: "振込先のご登録",
                desc: "銀行口座をお知らせいただくだけ。それ以外の書類は不要です。",
              },
              {
                num: "4",
                title: "公開・運用開始",
                desc: "サイトに紹介ページを作成。お客さんが応援先として選べるようになります。",
              },
            ].map((step) => (
              <motion.div
                key={step.num}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="flex gap-4 p-5 rounded-xl border border-stone-200 bg-white print:border-gray-300"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold">{step.num}</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{step.title}</h3>
                  <p className="text-sm text-foreground/60">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            {...fadeInUp}
            className="mt-8 text-center font-medium text-foreground/80"
          >
            最短2週間で、最初の振込が始まります。
          </motion.p>
        </div>
      </section>

      <Divider />

      {/* 追加4: FAQ */}
      <section className="bg-white py-16 sm:py-24 print:py-8">
        <motion.div {...fadeInUp} className="mx-auto max-w-2xl px-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-10">
            よくある質問
          </h2>
          <Accordion className="border-t border-stone-200">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} className="border-b border-stone-200">
                <AccordionTrigger className="py-4 text-sm sm:text-base font-medium">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base text-foreground/70 leading-relaxed pb-2">
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      <Divider />

      {/* 追加5: 比較表 */}
      <section className="bg-stone-50 py-16 sm:py-24 print:py-8 print:bg-white">
        <motion.div {...fadeInUp} className="mx-auto max-w-3xl px-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-10">
            他のしくみとの違い
          </h2>
          {/* デスクトップ: テーブル */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>団体の事務作業</TableHead>
                  <TableHead>集まる金額</TableHead>
                  <TableHead>安定性</TableHead>
                  <TableHead>地域貢献感</TableHead>
                  <TableHead>始めやすさ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row) => (
                  <TableRow
                    key={row.label}
                    className={row.highlight ? "bg-accent/5 font-medium" : ""}
                  >
                    <TableCell className="font-bold">
                      {row.highlight && (
                        <span className="text-accent mr-1">●</span>
                      )}
                      {row.label}
                    </TableCell>
                    <TableCell>{row.jimu}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.stability}</TableCell>
                    <TableCell>{row.local}</TableCell>
                    <TableCell>{row.easy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* モバイル: カード */}
          <div className="sm:hidden space-y-4">
            {comparisonData.map((row) => (
              <div
                key={row.label}
                className={`rounded-xl border p-5 ${
                  row.highlight
                    ? "border-accent/30 bg-white shadow-sm"
                    : "border-stone-200 bg-white"
                }`}
              >
                <h3 className="font-bold text-sm mb-3">
                  {row.highlight && (
                    <span className="text-accent mr-1">●</span>
                  )}
                  {row.label}
                </h3>
                <dl className="space-y-2 text-sm">
                  {[
                    ["団体の事務作業", row.jimu],
                    ["集まる金額", row.amount],
                    ["安定性", row.stability],
                    ["地域貢献感", row.local],
                    ["始めやすさ", row.easy],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <dt className="text-foreground/50">{label}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <Divider />

      {/* 追加6: 創業パートナー */}
      <section className="bg-white py-16 sm:py-24 print:py-8">
        <motion.div {...fadeInUp} className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-xs font-medium text-accent mb-2 tracking-wider">
            LIMITED
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-6">
            最初の{FOUNDING_MEMBER_LIMIT}団体は、創業パートナーです。
          </h2>
          <p className="text-sm sm:text-base text-foreground/60 leading-relaxed max-w-lg mx-auto mb-8">
            まずは地元の名団体{FOUNDING_MEMBER_LIMIT}件と一緒に、この仕組みを育てていきます。創業パートナーには、以下の特典をご用意しています。
          </p>
          <div className="text-left max-w-md mx-auto space-y-4">
            {[
              "永久に手数料無料（本サービスの寄付分配ルールが変わっても、創業パートナー団体は最初の条件を維持）",
              "サイト上の優先表示（新規お客さんの目に止まりやすい位置）",
              "都城商工会議所での合同記者会見への招待（任意）",
              "月次レポートに加えて、年次振り返り面談",
            ].map((item) => (
              <div key={item} className="flex gap-3 text-sm sm:text-base">
                <span className="shrink-0 text-accent font-bold">✓</span>
                <span className="text-foreground/70">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 追加7: CTA */}
      <section className="bg-stone-900 text-white py-24 sm:py-32 print:py-8 print:bg-white print:text-black">
        <motion.div {...fadeInUp} className="mx-auto max-w-prose px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-6">
            まずは、お話だけでも。
          </h2>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 print:text-gray-700">
            仕組みのご説明と、ご質問への回答だけで、30分ほどお時間をいただきます。「やってみたい」「迷っている」どちらでもかまいません。
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
              お問い合わせはこちら →
            </Link>
          </motion.div>
          <p className="mt-8 text-sm text-white/50 print:text-gray-500">
            または、お電話でも：○○○-○○○○-○○○○（平日 9:00-18:00）
          </p>
          <p className="mt-2 text-xs text-white/30 print:text-gray-400">
            osusowake.city/contact
          </p>
        </motion.div>
      </section>
    </div>
  );
}
