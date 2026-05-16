import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  decimal,
  jsonb,
  boolean,
  date,
  primaryKey,
} from "drizzle-orm/pg-core";

// ============================================================
// NextAuth.js 用テーブル
// ============================================================

// ユーザー（NextAuth + アプリ固有フィールドを統合）
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  password: text("password"),
  // --- アプリ固有 ---
  role: text("role", {
    enum: ["customer", "store_owner", "admin"],
  }).default("customer"),
  displayName: text("display_name"),
  defaultDonationMode: text("default_donation_mode", {
    enum: ["self", "donate", "ask"],
  }).default("ask"),
  preferredOrgId: uuid("preferred_org_id"),
  totalDonatedAmount: integer("total_donated_amount").default(0),
  totalSelfPoints: integer("total_self_points").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// OAuth アカウント連携
export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (table) => [
    primaryKey({ columns: [table.provider, table.providerAccountId] }),
  ]
);

// セッション（DB セッション戦略用）
export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
});

// メール認証トークン
export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.identifier, table.token] }),
  ]
);

// ============================================================
// アプリケーションテーブル
// ============================================================

// 店舗
export const stores = pgTable("stores", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  tier: text("tier", {
    enum: ["light", "standard", "group", "premium"],
  }),
  cuisine: text("cuisine"),
  description: text("description"),
  address: text("address"),
  lat: decimal("lat"),
  lng: decimal("lng"),
  phone: text("phone"),
  businessHours: jsonb("business_hours"),
  features: text("features").array(),
  defaultOrgId: uuid("default_org_id").references(
    () => organizations.id
  ),
  founderMember: boolean("founder_member").default(false),
  monthlyBudgetCap: integer("monthly_budget_cap"),
  cumulativeDonation: integer("cumulative_donation").default(0),
  status: text("status", {
    enum: ["active", "pending", "paused"],
  }),
  ownerUserId: uuid("owner_user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// 支援団体
export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  type: text("type", {
    enum: ["kodomo_shokudo", "shounen_dan", "club", "other"],
  }),
  description: text("description"),
  photoUrl: text("photo_url"),
  bankAccount: jsonb("bank_account"), // 暗号化保存
  cumulativeReceived: integer("cumulative_received").default(0),
  representativeName: text("representative_name"),
  representativeContact: text("representative_contact"),
  status: text("status", {
    enum: ["active", "paused"],
  }),
  createdAt: timestamp("created_at").defaultNow(),
});

// レシート（支援金発生の根拠）
export const receipts = pgTable("receipts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  storeId: uuid("store_id").references(() => stores.id),
  photoUrl: text("photo_url").notNull(),
  amount: integer("amount"),
  status: text("status", {
    enum: ["pending", "verified", "rejected"],
  }),
  storeBurden: integer("store_burden"),
  selfPoints: integer("self_points"),
  donationAmount: integer("donation_amount"),
  operatorFee: integer("operator_fee"),
  donationMode: text("donation_mode", {
    enum: ["self", "donate"],
  }),
  recipientOrgId: uuid("recipient_org_id").references(
    () => organizations.id
  ),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  verifiedAt: timestamp("verified_at"),
});

// チェックイン（来店記録）
export const checkins = pgTable("checkins", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  storeId: uuid("store_id").references(() => stores.id),
  lat: decimal("lat"),
  lng: decimal("lng"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 予約 (Phase 2)
export const reservations = pgTable("reservations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  storeId: uuid("store_id").references(() => stores.id),
  scheduledAt: timestamp("scheduled_at"),
  partySize: integer("party_size"),
  notes: text("notes"),
  status: text("status", {
    enum: ["pending", "confirmed", "visited", "no_show", "cancelled"],
  }),
  createdAt: timestamp("created_at").defaultNow(),
});

// 月次送金記録
export const monthlyPayouts = pgTable("monthly_payouts", {
  id: uuid("id").defaultRandom().primaryKey(),
  orgId: uuid("org_id").references(() => organizations.id),
  period: date("period"), // YYYY-MM-01
  totalAmount: integer("total_amount"),
  paidAt: timestamp("paid_at"),
  status: text("status", {
    enum: ["calculated", "paid"],
  }),
});
