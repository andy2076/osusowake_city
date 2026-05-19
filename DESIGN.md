# まちのおすそわけ 設計書

> 都城・三股・曽於の応援グルメプラットフォーム

---

## 1. プロジェクト概要

### ビジョン
飲食店の利用が、自動的に地元の子ども食堂や少年団への支援に変わる仕組み。ホットペッパーや食べログに代わる、地域密着型の応援グルメサイト。

### コアバリュー
- 客: 「食べる行為が地元支援になる」という体験価値
- 店: 月額固定費なし、来店時のみ少額負担、地域貢献ブランディング
- 団体: 月数万〜数十万の安定的な支援金、運営事務負担ほぼゼロ

### ブランド
- サービス名: **まちのおすそわけ**
- サブタイトル: 都城・三股・曽於の応援グルメ
- タグライン: 食べて、まちをおすそわけ。
- ドメイン: `osusowake.city`

---

## 2. 技術スタック

### 構成 (ConoHa VPS 自前運用)

| レイヤー | 技術 | 理由 |
|---|---|---|
| フロントエンド | **Next.js 14+ (App Router) + TypeScript** | フルスタック1コードベース、Claude Codeとの相性◎ |
| スタイリング | **Tailwind CSS + shadcn/ui** | 高速UI構築、ダークモード対応 |
| データベース | **PostgreSQL 16** (VPS上) | jsonb / 全文検索 / 拡張性で MySQL より優位 |
| ORM | **Drizzle ORM** | 軽量、TypeScript完全対応、migration内蔵 |
| 認証 | **NextAuth.js (Auth.js v5)** | OSS定番、Email Magic Link / OAuth対応 |
| 地図 | **Leaflet + OpenStreetMap** | 無料、Mapbox移行も容易 |
| 画像保存 | **VPSローカル + Nginx静的配信** | `/var/www/uploads/receipts/` 等 |
| ホスティング | **ConoHa VPS** (既存) | 月額固定、完全制御 |
| デプロイ | **Docker + docker-compose** | ワンコマンド起動、開発環境と本番揃う |
| リバプロ・SSL | **Nginx + Let's Encrypt (Certbot)** | HTTPS無料、自動更新 |
| プロセス管理 | **Docker (production)** | コンテナ単位で再起動・更新 |
| メール送信 | **Resend** または **SMTP直接** | 月3,000通まで無料 |
| 監視 (任意) | **Uptime Kuma** (自前ホスト) | 軽量、無料 |

### Docker構成イメージ

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/osusowake
    depends_on: [db]
  
  db:
    image: postgres:16-alpine
    volumes: 
      - ./data/postgres:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=osusowake
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
  
  nginx:
    image: nginx:alpine
    ports: ["80:80", "443:443"]
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./data/uploads:/var/www/uploads
      - ./data/certs:/etc/letsencrypt
    depends_on: [app]
```

### バックアップ運用

VPSは自前なので、データ消失リスクは自分で管理:

- `pg_dump` を毎日 cron で実行 → `/backup/` に保存
- `/var/www/uploads/` を毎日 rsync で別ディレクトリにコピー
- 週次で外部ストレージ(Cloudflare R2 無料枠など)に圧縮アップロード

### 初期コスト試算

- ドメイン: 年 ¥2,500 (取得済)
- ConoHa VPS: 月 ¥1,500前後 (既存)
- Let's Encrypt: ¥0
- Resend 無料枠: ¥0 (月3,000通まで)
- **MVP段階の月額コスト: VPS代のみ (実質ゼロ円増)**

---

## 3. ユーザーペルソナ

### A. 客 (Eater)
- 都城・三股・曽於エリアの飲食店利用者
- スマホ中心、20〜60代
- 動機: 美味しい店探し + 地元応援

### B. 店主 (Owner)
- エリア内の飲食店経営者
- PC/タブレット利用、40〜70代
- 動機: 集客 + 地域貢献 + ホットペッパー脱却

### C. 団体 (Org)
- 子ども食堂・少年団・クラブチームの代表
- 月次レポート確認のみ
- 動機: 安定的な支援獲得

### D. 運営 (Admin)
- プラットフォーム運営者(あなた)
- 全体監視、月次送金、コンテンツ管理

---

## 4. データモデル

```sql
-- ユーザー
users (
  id uuid PRIMARY KEY,
  email text UNIQUE,
  display_name text,
  default_donation_mode text CHECK (default_donation_mode IN ('self', 'donate', 'ask')),
  preferred_org_id uuid REFERENCES organizations(id),
  total_donated_amount int DEFAULT 0,
  total_self_points int DEFAULT 0,
  created_at timestamp DEFAULT now()
)

-- 店舗
stores (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  tier text CHECK (tier IN ('light', 'standard', 'group', 'premium')),
  cuisine text,
  description text,
  address text,
  lat decimal,
  lng decimal,
  phone text,
  business_hours jsonb,
  features text[], -- ['送迎あり', '個室あり', 'キッズメニュー', ...]
  default_org_id uuid REFERENCES organizations(id), -- 店指定の応援先(任意)
  founder_member boolean DEFAULT false,
  monthly_budget_cap int, -- 月の負担上限(任意)
  cumulative_donation int DEFAULT 0, -- 累計支援額
  status text CHECK (status IN ('active', 'pending', 'paused')),
  owner_user_id uuid REFERENCES users(id),
  created_at timestamp DEFAULT now()
)

-- 支援団体
organizations (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  type text CHECK (type IN ('kodomo_shokudo', 'shounen_dan', 'club', 'other')),
  description text,
  photo_url text,
  bank_account jsonb, -- 暗号化保存
  cumulative_received int DEFAULT 0,
  representative_name text,
  representative_contact text,
  status text CHECK (status IN ('active', 'paused')),
  created_at timestamp DEFAULT now()
)

-- レシート (寄付発生の根拠)
receipts (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  store_id uuid REFERENCES stores(id),
  photo_url text NOT NULL,
  amount int, -- OCR読み取り or 手動入力
  status text CHECK (status IN ('pending', 'verified', 'rejected')),
  -- 階層に応じた配分
  store_burden int, -- 店負担合計
  self_points int, -- 客への還元(donate選択時は0)
  donation_amount int, -- 寄付額
  operator_fee int, -- 運営手数料
  donation_mode text CHECK (donation_mode IN ('self', 'donate')),
  recipient_org_id uuid REFERENCES organizations(id),
  uploaded_at timestamp DEFAULT now(),
  verified_at timestamp
)

-- チェックイン (来店記録、レシート無し場合)
checkins (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  store_id uuid REFERENCES stores(id),
  lat decimal,
  lng decimal,
  created_at timestamp DEFAULT now()
)

-- 予約 (Phase 2)
reservations (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  store_id uuid REFERENCES stores(id),
  scheduled_at timestamp,
  party_size int,
  notes text,
  status text CHECK (status IN ('pending', 'confirmed', 'visited', 'no_show', 'cancelled')),
  created_at timestamp DEFAULT now()
)

-- 月次送金記録
monthly_payouts (
  id uuid PRIMARY KEY,
  org_id uuid REFERENCES organizations(id),
  period date, -- YYYY-MM-01
  total_amount int,
  paid_at timestamp,
  status text CHECK (status IN ('calculated', 'paid'))
)
```

---

## 5. 階層・料金ロジック

### 階層定義 (確定)

| Tier | 業態 | レシート1枚 | 客pt | 寄付 | 運営 |
|---|---|---|---|---|---|
| `light` | 喫茶、弁当、ファストフード | ¥20 | ¥8 | ¥8 | ¥4 |
| `standard` | ラーメン、定食、カフェ | ¥40 | ¥15 | ¥17 | ¥8 |
| `group` | 居酒屋、焼肉、寿司 | ¥80 | ¥30 | ¥35 | ¥15 |
| `premium` | 割烹、コース、ファインダイニング | ¥150 | ¥55 | ¥65 | ¥30 |

### 「全部寄付」選択時のボーナス

客が「自分pt不要、全部寄付」を選んだ場合、店負担は客pt分を引いた額に減る:

| Tier | 通常負担 | 全部寄付選択時 | 寄付増加 |
|---|---|---|---|
| `light` | ¥20 | ¥12 | +0 (自pt¥8がそのまま消える) |
| `standard` | ¥40 | ¥25 | +0 |
| `group` | ¥80 | ¥50 | +0 |
| `premium` | ¥150 | ¥95 | +0 |

**重要**: 「全部寄付」の意味は2通り設計可能。要意思決定:

- **案A**: 客pt¥8 → 寄付¥0増、店負担¥8減 (店も嬉しい)
- **案B**: 客pt¥8 → 寄付¥8増、店負担同じ (寄付者の意思を最大化)

→ **MVPは案A推奨**(店主に売り込みやすい)

### 立ち上げ期の特別措置

最初6ヶ月は「ライト階層のみ¥9(運営費)、寄付・客ptなし」モードもありうる。創業メンバー店向けの選択肢として保持。

---

## 6. 主要画面一覧

### 客向け (モバイル中心)

| Route | 画面 | 機能 |
|---|---|---|
| `/` | ランディング | サービス説明、参加店紹介、人気団体 |
| `/stores` | 店舗一覧 | リスト/マップ切替、絞り込み |
| `/stores/map` | マップ検索 | **丸囲み検索**、ピン表示、絞り込みチップ |
| `/stores/[id]` | 店舗詳細 | 情報、応援団体、累計支援額、チェックインボタン |
| `/upload` | レシートアップ | 写真撮影、店舗選択、金額確認 |
| `/donate-select` | 寄付振り分け | 自分pt/寄付選択、団体選択 |
| `/me` | マイページ | 累計、応援履歴、設定 |
| `/orgs` | 団体一覧 | 全団体表示 |
| `/orgs/[id]` | 団体詳細 | 活動紹介、累計受領、支援店ランキング |
| `/for-stores` | 飲食店向け提案 | 地域密着訴求、料金プラン、創業パートナー募集、お問い合わせ導線 |
| `/for-orgs` | 団体向けLP | 感情訴求（Hero画像クロスフェード+Framer Motion）→ コンバージョン要素（仕組み具体例、料金表、参加ステップ、FAQ、比較表、創業パートナー30団体、CTA） |

### 店主向け (PC/タブレット)

| Route | 画面 | 機能 |
|---|---|---|
| `/store/login` | ログイン | メール+パスワード |
| `/store/dashboard` | ダッシュボード | 今月のチェックイン、寄付実績、累計 |
| `/store/profile` | 店舗情報編集 | 基本情報、写真、特徴、営業時間 |
| `/store/settings` | 設定 | 階層変更、応援団体指定、月予算上限 |
| `/store/receipts` | レシート確認 | 未確認/確認済の一覧 |
| `/store/reservations` | 予約管理 | (Phase 2) |

### 団体向け (PC、月数回利用)

| Route | 画面 | 機能 |
|---|---|---|
| `/org/login` | ログイン | |
| `/org/dashboard` | ダッシュボード | 累計受領、今月の見込み、支援店一覧 |
| `/org/page` | 公開ページ編集 | 紹介文、写真、活動報告 |

### 運営向け

| Route | 画面 | 機能 |
|---|---|---|
| `/admin` | 全体管理 | KPI、店舗・団体・ユーザー管理 |
| `/admin/payouts` | 月次送金管理 | 集計、振込指示、記録 |

---

## 7. MVP スコープ

### Phase 1: コア体験 (4〜6週間目標)

**必須機能**:
- [x] ランディングページ
- [x] 店舗一覧 (シンプルなリスト)
- [x] 店舗詳細ページ
- [x] レシートアップロード (画像保存のみ、OCRなし。金額は手入力)
- [x] 寄付振り分け選択UI
- [x] 団体詳細ページ (累計表示)
- [x] マイページ (累計・履歴)
- [x] 店主管理画面 (超簡易版: 店舗情報編集のみ)
- [x] 運営管理画面 (月次集計が見られる)

**意図的に外す**:
- ❌ 予約機能
- ❌ マップ検索 (リストのみで開始)
- ❌ OCR自動読み取り
- ❌ プッシュ通知
- ❌ 天候クーポン

### Phase 2: 体験強化 (Phase 1から2〜3ヶ月後)

- [ ] マップ検索 (丸囲み)
- [ ] 予約機能
- [ ] OCR自動読み取り
- [ ] 送迎フィルタ
- [ ] 創業パートナー店認定システム

### Phase 3: 拡張 (1年後〜)

- [ ] 天候連動クーポン
- [ ] リアルタイム空席クーポン
- [ ] 美容室・他業態への拡張
- [ ] 近隣エリアへの展開

---

## 8. ビルド順 (Claude Code向けスプリント)

### Sprint 1: 土台 (5〜7日) [完了 2026-05-14]

```
Goal: Next.js + PostgreSQL + Docker の雛形が VPS上で動く
- プロジェクト初期化 (Next.js 14, TypeScript, Tailwind)
- Drizzle ORM 設定、PostgreSQL接続
- NextAuth.js v5 セットアップ
- data model セクションのスキーマを Drizzle schema として作成
- docker-compose.yml (app + postgres + nginx)
- Nginx + Let's Encrypt の設定
- ConoHa VPSへ初回デプロイ
- ランディングページ (ブランド表示のみ)
- 基本レイアウト (Header, Footer)
```

### Sprint 2: 店舗・団体の表示 (5〜7日) [完了 2026-05-14]

```
Goal: 「触れる」店舗ページが見える
- 店舗一覧ページ (DBから取得して表示)
- 店舗詳細ページ
- 団体一覧、団体詳細
- ダミーデータ投入 (店舗5軒、団体3つ)
```

### Sprint 3: 認証 + ユーザー機能 (5〜7日) [完了 2026-05-15]

```
Goal: ログインしてマイページが見える
- Supabase Auth実装
- 新規登録、ログイン
- マイページ (累計表示、ダミーデータ)
- デフォルト寄付モード設定
```

### Sprint 4: 寄付ループ (7〜10日) ← ここがコア [完了 2026-05-15]

```
Goal: レシートアップ → 寄付発生 までの一連の流れ
- レシートアップロード画面 (画像+金額手入力)
- 階層に応じた金額計算ロジック
- 寄付振り分け選択画面
- 完了画面 (「○○団体に¥21を届けました」)
- DB記録、累計更新
```

### Sprint 5: 店主管理画面 (5〜7日) [完了 2026-05-15]

```
Goal: 店主が自分のページを編集できる
- 店主ログイン
- 店舗情報編集画面
- ダッシュボード (累計表示)
- 設定 (階層、応援団体、月予算)
```

### Sprint 6: 運営管理 + 仕上げ (3〜5日) [完了 2026-05-15]

```
Goal: 運営側で集計が見えて、ローンチ準備完了
- 運営ダッシュボード
- 月次集計ロジック
- メール通知 (Resend連携)
- バグ修正、UIブラッシュアップ
```

### Sprint 7: マーケティングページ + UI強化 [完了 2026-05-19]

```
Goal: /for-stores と /for-orgs のマーケティングページ完成
- /for-stores: 地域密着ポジショニングに再構成（Hot Pepper安い版→独自価値訴求）
- /for-orgs: LP風campaign styleで全面リライト（8回のイテレーション）
  - 感情訴求セクション（Hero画像クロスフェード、共感、仮説、3ステップ、書類不要、期待値、ブランド結び）
  - コンバージョン要素（仕組み具体例、4階層料金表、参加4ステップ、FAQ10問、比較表、創業パートナー30団体、CTA）
- Framer Motion導入（スクロールアニメーション、stagger、spring、CTAパルス）
- shadcn/ui Table + Accordion コンポーネント追加
- ヘッダーに「飲食店の方へ」「団体の方へ」ナビリンク追加
- ランディングページカードにリンク追加
- Ken Burns CSS アニメーション + prefers-reduced-motion 対応
```

**合計**: 約 28〜41日 = **6〜8週間でMVP完成**

---

## 9. 重要な定数・設定値

```typescript
// app/config/constants.ts

export const TIER_CONFIG = {
  light: {
    label: 'ライト',
    storeBurden: 20,
    selfPoints: 8,
    donation: 8,
    operatorFee: 4,
    description: '喫茶、弁当、ファストフード等',
  },
  standard: {
    label: 'スタンダード',
    storeBurden: 40,
    selfPoints: 15,
    donation: 17,
    operatorFee: 8,
    description: 'ラーメン、定食、カフェ等',
  },
  group: {
    label: 'グループ',
    storeBurden: 80,
    selfPoints: 30,
    donation: 35,
    operatorFee: 15,
    description: '居酒屋、焼肉、寿司等',
  },
  premium: {
    label: 'プレミアム',
    storeBurden: 150,
    selfPoints: 55,
    donation: 65,
    operatorFee: 30,
    description: '割烹、コース、ファインダイニング',
  },
} as const;

export const SERVICE_AREA = {
  cities: ['都城市', '三股町', '曽於市'],
  centerLat: 31.7203,  // 都城駅周辺
  centerLng: 131.0617,
  defaultRadius: 5000, // 5km
};

export const FOUNDING_MEMBER_LIMIT = 30;

export const BRAND = {
  name: 'まちのおすそわけ',
  subtitle: '都城・三股・曽於の応援グルメ',
  tagline: '食べて、まちをおすそわけ。',
  domain: 'osusowake.city',
};
```

---

## 10. セキュリティ・法務メモ

### セキュリティ最低限
- アプリ層で **権限チェック** を全エンドポイントに実装
  - 店主は自分の店だけ編集可
  - 団体は自分の団体ページだけ編集可
  - レシート画像は認証ユーザーのみアクセス可 (Next.jsのAPI Route経由でNginxの`X-Accel-Redirect`を使う等)
- DB接続情報は `.env.local` で管理、絶対にコミットしない
- 銀行口座情報は **AES-256で暗号化保存**、復号鍵は環境変数で管理
- VPSは **fail2ban + UFW** でSSH攻撃対策
- nginx で rate limit 設定 (連続ログイン試行・レシートアップ制限)
- PostgreSQLは VPS外部から接続させない (`listen_addresses = 'localhost'`)

### 法務確認事項 (ローンチ前)
- [ ] 特定商取引法に基づく表記 (運営者名、連絡先) — バーチャルオフィス契約後
- [ ] プライバシーポリシー (個人情報の取扱)
- [ ] 利用規約 (店舗・客・団体それぞれ)
- [ ] 預り金処理 — 税理士に1回相談 (運営¥X / 寄付¥Y の分離)
- [ ] 寄付の名目 — 「支援金」「協賛金」の文言で統一(寄付控除等の誤解を避ける)

### 個人情報の扱い
- レシート画像に他人の名前等が写る可能性 → 客に同意取得
- 客の位置情報 → チェックイン時のみ取得、保存は粗い精度で
- メールアドレスは2要素認証で保護

---

## 11. ローンチ前チェックリスト

### 技術
- [ ] 全画面モバイル対応確認
- [ ] エラーハンドリング (ネットワーク切れ、画像アップ失敗)
- [ ] バックアップ自動化
- [ ] 監視 (Sentry等)

### 事業
- [ ] 店舗5軒分の実データ投入
- [ ] 団体1〜2つ分の実データ投入
- [ ] 利用規約・プライバシーポリシー公開
- [ ] お問い合わせフォーム稼働
- [ ] SNS開設 (Instagram、X)

### マーケティング
- [ ] プレスリリース原稿準備 (宮日、MJ、ケーブルテレビ向け)
- [ ] 店頭ステッカー印刷
- [ ] 創業パートナー店認定証デザイン

---

## 12. オープン論点 (要決定)

ローンチまでに決めなきゃいけない、まだ宙吊りの判断:

1. **「全部寄付」モードの設計**: 案A (店負担減) vs 案B (寄付額増)
2. **客pt の使い道**: 次回利用時の店舗割引 / 全店共通クーポン / その他
3. **客ptの有効期限**: あり (例: 1年) / なし
4. **店主の「来店確認」UI**: 自動チェックインのみ / 店主側でも来店確認ボタン
5. **応援団体の選び方**: 客が毎回選ぶ / 客のデフォルト設定 / 店指定 (店ごとに固定団体)
6. **新規店舗の審査**: 自己申請 → 即承認 / 運営が事前審査
7. **写真の用意**: 店主が用意 / 運営が撮影代行 (創業メンバー特典として)
8. **「創業パートナー店」の権利**: 永久ロックの具体内容 (料金?機能?表示?)

---

## 13. 次に Claude Code に渡すプロンプト例

Sprint 1 の最初の指示として:

```
このプロジェクトの設計書 (machinoosusowake_design.md) を参照してください。

これからSprint 1の実装を始めます。以下の作業をお願いします:

1. Next.js 14 (App Router) + TypeScript + Tailwind CSS でプロジェクトを初期化
2. shadcn/ui のセットアップ
3. Drizzle ORM のセットアップ、PostgreSQL接続設定
4. NextAuth.js (v5) の初期設定 (Email Magic Link)
5. data model セクションのスキーマ通りに、Drizzle schema (TypeScript) を生成
6. docker-compose.yml を作成 (app + postgres + nginx の3コンテナ構成)
7. .env.local.example を作成 (DATABASE_URL, NEXTAUTH_SECRET 等)
8. ConoHa VPS にデプロイするための README に手順を書く
9. 仮のランディングページを作成。ブランド (まちのおすそわけ) とタグライン (食べて、まちをおすそわけ。) を表示

ブランド方針: 和モダン、温かみ、セリフ体のロゴ、温白色+朱色or藍色のアクセントカラー。
```

### Sprint 2以降は section 8 を参照

---

最終更新: 2026-05-19
このドキュメントは Claude Code との実装作業の基盤として、適宜更新してください。
