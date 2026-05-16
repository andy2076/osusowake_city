import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            まちのおすそわけ
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
            都城・三股・曽於の応援グルメ
          </p>
          <p className="mt-8 font-serif text-2xl sm:text-3xl text-accent font-semibold">
            食べて、まちをおすそわけ。
          </p>
          <p className="mt-6 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            いつものお店でごはんを食べる。
            <br className="hidden sm:block" />
            それだけで、地元の子どもたちへの支援になる。
          </p>
        </div>
      </section>

      {/* 仕組み説明 */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-12">
            おすそわけの仕組み
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <Card className="bg-card border-border">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">1</span>
                </div>
                <h3 className="font-bold text-lg mb-2">お店で食べる</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  参加店舗でいつも通りお食事。特別な手続きは不要です。
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">2</span>
                </div>
                <h3 className="font-bold text-lg mb-2">レシートを撮影</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  レシートの写真をアップロード。お店の階層に応じて支援金額が決まります。
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">3</span>
                </div>
                <h3 className="font-bold text-lg mb-2">まちに届く</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  支援金は子ども食堂や少年団へ届きます。あなたのポイントも貯まります。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 対象エリア */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-6">
            対象エリア
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["都城市", "三股町", "曽於市"].map((city) => (
              <span
                key={city}
                className="px-6 py-2 rounded-full border border-accent/30 text-accent font-medium bg-card"
              >
                {city}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            参加店舗を随時拡大中
          </p>
        </div>
      </section>

      {/* お店・団体への案内 */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid sm:grid-cols-2 gap-8">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <h3 className="font-serif text-xl font-bold mb-3 text-indigo">
                  飲食店の方へ
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  月額固定費はゼロ。来店時の少額負担のみで、地域貢献と集客を両立できます。
                  ホットペッパーのような高額掲載料は不要です。
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <h3 className="font-serif text-xl font-bold mb-3 text-indigo">
                  団体の方へ
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  子ども食堂、少年団、クラブチームなど。
                  事務負担ほぼゼロで、安定的な支援金を毎月受け取れます。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
