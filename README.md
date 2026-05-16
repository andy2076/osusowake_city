# まちのおすそわけ

都城・三股・曽於の応援グルメサイト

## セットアップ

### 前提条件

- Node.js 20 LTS 以上
- pnpm
- Docker & Docker Compose

### ローカル開発

```bash
# 依存関係インストール
pnpm install

# 環境変数を設定
cp .env.local.example .env.local
# .env.local を編集して値を設定

# PostgreSQL をコンテナで起動
docker compose up db -d

# DBマイグレーション
pnpm drizzle-kit push

# 開発サーバー起動
pnpm dev
```

http://localhost:3000 でアクセス。

### Docker で全体起動 (本番に近い構成)

```bash
docker compose up -d
```

3つのコンテナが起動:
- `app` - Next.js (port 3000)
- `db` - PostgreSQL 16 (port 5432)
- `nginx` - リバースプロキシ (port 80/443)

### ConoHa VPS デプロイ

```bash
# VPS に SSH 接続
ssh user@your-vps-ip

# リポジトリをクローン
git clone <repo-url> /opt/osusowake
cd /opt/osusowake

# 環境変数を設定
cp .env.local.example .env.local
vim .env.local

# SSL証明書を取得 (初回のみ)
certbot certonly --standalone -d osusowake.city

# コンテナ起動
docker compose up -d

# マイグレーション実行
docker compose exec app npx drizzle-kit push
```

## 技術スタック

- Next.js 14+ (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- PostgreSQL 16 + Drizzle ORM
- NextAuth.js v5
- Docker + Nginx + Let's Encrypt

詳細は `DESIGN.md` を参照。
