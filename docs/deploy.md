# ConoHa VPS デプロイ手順

## 前提
- ConoHa VPS 1GB（Ubuntu 22.04 推奨）
- ドメイン: osusowake.city（ムームードメインで管理）
- GitHub プライベートリポジトリにコード push 済み

---

## 1. VPS 初期設定

### SSH ログイン
```bash
ssh root@<VPS_IP>
```

### swap 追加（1GB VPS では必須）
```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### Docker インストール
```bash
apt update && apt upgrade -y
apt install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### ファイアウォール
```bash
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

---

## 2. DNS 設定（ムームードメイン）

ムームードメインの管理画面で以下を設定:

| タイプ | ホスト名 | 値 |
|--------|---------|-----|
| A | (空) | VPS の IP アドレス |
| A | www | VPS の IP アドレス |

※ 反映まで数分〜数時間かかる場合あり

---

## 3. アプリデプロイ

### リポジトリ取得
```bash
cd /opt
git clone https://github.com/<ユーザー名>/osusowake_city.git
cd osusowake_city
```

### 環境変数設定
```bash
cat > .env <<'EOF'
AUTH_SECRET=<openssl rand -base64 32 で生成>
AUTH_URL=https://osusowake.city
POSTGRES_PASSWORD=<強力なパスワード>
EOF
```

### ディレクトリ準備
```bash
mkdir -p data/uploads data/postgres data/certs data/certbot-webroot
```

---

## 4. SSL 証明書取得

### Step 4-1: HTTP のみで起動
```bash
# 初回は SSL なしの nginx 設定を使用
cp nginx/http-only.conf nginx/default.conf.bak
cp nginx/http-only.conf nginx/default.conf
docker compose up -d
```

### Step 4-2: certbot で証明書取得
```bash
docker run --rm \
  -v ./data/certs:/etc/letsencrypt \
  -v ./data/certbot-webroot:/var/www/certbot \
  certbot/certbot certonly \
  --webroot -w /var/www/certbot \
  -d osusowake.city \
  --email <メールアドレス> \
  --agree-tos --no-eff-email
```

### Step 4-3: SSL 設定に切り替え
```bash
# SSL 版に戻す
cp nginx/default.conf.bak nginx/default.conf
docker compose restart nginx
```

### Step 4-4: 証明書自動更新（cron）
```bash
crontab -e
```
以下を追加:
```
0 3 * * * docker run --rm -v /opt/osusowake_city/data/certs:/etc/letsencrypt -v /opt/osusowake_city/data/certbot-webroot:/var/www/certbot certbot/certbot renew --quiet && docker compose -f /opt/osusowake_city/docker-compose.yml restart nginx
```

---

## 5. DB 初期設定

### スキーマ反映
```bash
docker compose exec app node -e "
  // Drizzle push はローカルで実行済みなので、
  // 本番 DB には初回起動時に自動でテーブルが作成される場合を除き、
  // 手動で drizzle-kit push を実行する。
"
```

もしくはローカルから:
```bash
DATABASE_URL=postgres://osusowake:<本番パスワード>@<VPS_IP>:5432/osusowake pnpm drizzle-kit push
```

※ DB ポートは外部公開しないので、SSH トンネル経由で接続:
```bash
ssh -L 15432:localhost:5432 root@<VPS_IP>
# 別ターミナルで:
DATABASE_URL=postgres://osusowake:<本番パスワード>@localhost:15432/osusowake pnpm drizzle-kit push
```

### 管理者アカウント作成
```bash
docker compose exec db psql -U osusowake -d osusowake
```

```sql
-- まず /signup でアカウント作成後、以下で admin に昇格:
UPDATE users SET role = 'admin' WHERE email = '<メールアドレス>';
```

---

## 6. 更新デプロイ

```bash
cd /opt/osusowake_city
git pull
docker compose up -d --build
```

---

## トラブルシューティング

### ログ確認
```bash
docker compose logs -f app    # Next.js ログ
docker compose logs -f nginx  # nginx ログ
docker compose logs -f db     # PostgreSQL ログ
```

### コンテナ再起動
```bash
docker compose restart
```

### 全停止・再構築
```bash
docker compose down
docker compose up -d --build
```
