import type { TierKey } from "./constants";

// ---------- 型定義 ----------
export type Store = {
  id: string;
  name: string;
  tier: TierKey;
  cuisine: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  businessHours: Record<string, string>;
  features: string[];
  founderMember: boolean;
  cumulativeDonation: number;
  status: "active" | "pending" | "paused";
  defaultOrgId: string | null;
};

export type Organization = {
  id: string;
  name: string;
  type: "kodomo_shokudo" | "shounen_dan" | "club" | "other";
  description: string;
  cumulativeReceived: number;
  status: "active" | "paused";
};

// ---------- 団体ダミーデータ ----------
export const dummyOrganizations: Organization[] = [
  {
    id: "org-1",
    name: "みやこのじょう子ども食堂 ひなた",
    type: "kodomo_shokudo",
    description:
      "毎月第2・第4土曜日に都城市中心部で開催。地域のボランティアが手作りの温かい食事を提供し、子どもたちの居場所づくりに取り組んでいます。毎回約40名の子どもたちが参加しています。",
    cumulativeReceived: 48500,
    status: "active",
  },
  {
    id: "org-2",
    name: "三股ジュニアサッカークラブ",
    type: "shounen_dan",
    description:
      "三股町を拠点に活動する少年サッカーチーム。小学1年生から6年生まで約30名が所属。週3回の練習と週末の試合を通じて、サッカーの技術だけでなく礼儀や協調性も育んでいます。",
    cumulativeReceived: 32000,
    status: "active",
  },
  {
    id: "org-3",
    name: "曽於っ子学習支援の会",
    type: "other",
    description:
      "曽於市内の小中学生を対象に、毎週水曜・金曜の放課後に無料の学習支援教室を運営。元教師や大学生ボランティアが算数・英語を中心に個別指導を行っています。",
    cumulativeReceived: 21000,
    status: "active",
  },
];

// ---------- 店舗ダミーデータ ----------
export const dummyStores: Store[] = [
  {
    id: "store-1",
    name: "定食屋 まるふく",
    tier: "standard",
    cuisine: "定食・家庭料理",
    description:
      "都城駅前で30年。日替わり定食が自慢の老舗。地元の野菜をふんだんに使った素朴で温かい家庭料理をお届けします。ランチタイムはいつも地元の方で賑わっています。",
    address: "都城市栄町4-1",
    lat: 31.7212,
    lng: 131.0625,
    phone: "0986-00-0001",
    businessHours: {
      月: "11:00〜14:00 / 17:00〜21:00",
      火: "11:00〜14:00 / 17:00〜21:00",
      水: "定休日",
      木: "11:00〜14:00 / 17:00〜21:00",
      金: "11:00〜14:00 / 17:00〜21:00",
      土: "11:00〜14:00 / 17:00〜21:00",
      日: "11:00〜14:00",
    },
    features: ["キッズメニュー", "座敷あり"],
    founderMember: true,
    cumulativeDonation: 12580,
    status: "active",
    defaultOrgId: "org-1",
  },
  {
    id: "store-2",
    name: "炭火焼肉 霧の蔵",
    tier: "group",
    cuisine: "焼肉",
    description:
      "宮崎牛を中心に、地元の上質な肉を炭火でじっくり。個室完備でファミリーや宴会にも最適です。自家製のタレと新鮮な野菜が自慢。",
    address: "都城市上町8-15",
    lat: 31.7185,
    lng: 131.0598,
    phone: "0986-00-0002",
    businessHours: {
      月: "定休日",
      火: "17:00〜22:00",
      水: "17:00〜22:00",
      木: "17:00〜22:00",
      金: "17:00〜23:00",
      土: "17:00〜23:00",
      日: "17:00〜21:30",
    },
    features: ["個室あり", "駐車場あり", "送迎あり"],
    founderMember: true,
    cumulativeDonation: 28700,
    status: "active",
    defaultOrgId: "org-2",
  },
  {
    id: "store-3",
    name: "カフェ こもれび",
    tier: "light",
    cuisine: "カフェ・スイーツ",
    description:
      "三股町の住宅街にある隠れ家カフェ。自家焙煎コーヒーと手作りケーキが人気。木の温もりを感じる落ち着いた店内で、ゆったりとした時間を過ごせます。",
    address: "三股町樺山3-22",
    lat: 31.7302,
    lng: 131.0812,
    phone: "0986-00-0003",
    businessHours: {
      月: "定休日",
      火: "10:00〜17:00",
      水: "10:00〜17:00",
      木: "10:00〜17:00",
      金: "10:00〜17:00",
      土: "9:00〜18:00",
      日: "9:00〜18:00",
    },
    features: ["テラス席", "ペット同伴可"],
    founderMember: false,
    cumulativeDonation: 4200,
    status: "active",
    defaultOrgId: "org-3",
  },
  {
    id: "store-4",
    name: "ラーメン 黒豚亭",
    tier: "standard",
    cuisine: "ラーメン",
    description:
      "黒豚の豚骨をじっくり煮込んだ濃厚スープが看板メニュー。替玉無料、ランチタイムはごはんもサービス。地元の常連さんに愛される一杯をどうぞ。",
    address: "都城市中町2-8",
    lat: 31.7195,
    lng: 131.0635,
    phone: "0986-00-0004",
    businessHours: {
      月: "11:00〜14:30 / 18:00〜22:00",
      火: "11:00〜14:30 / 18:00〜22:00",
      水: "11:00〜14:30 / 18:00〜22:00",
      木: "定休日",
      金: "11:00〜14:30 / 18:00〜22:00",
      土: "11:00〜15:00 / 18:00〜22:00",
      日: "11:00〜15:00",
    },
    features: ["カウンター席", "駐車場あり"],
    founderMember: true,
    cumulativeDonation: 9350,
    status: "active",
    defaultOrgId: null,
  },
  {
    id: "store-5",
    name: "割烹 花よし",
    tier: "premium",
    cuisine: "割烹・会席",
    description:
      "曽於市の老舗割烹。四季折々の食材を活かした会席料理をご用意。接待や記念日、法事にもご利用いただけます。完全予約制。",
    address: "曽於市末吉町二之方1-5",
    lat: 31.6501,
    lng: 131.0672,
    phone: "0986-00-0005",
    businessHours: {
      月: "定休日",
      火: "定休日",
      水: "11:30〜14:00 / 17:30〜21:00",
      木: "11:30〜14:00 / 17:30〜21:00",
      金: "11:30〜14:00 / 17:30〜21:00",
      土: "11:30〜14:00 / 17:30〜21:00",
      日: "11:30〜14:00",
    },
    features: ["完全予約制", "個室あり", "駐車場あり"],
    founderMember: false,
    cumulativeDonation: 45600,
    status: "active",
    defaultOrgId: "org-1",
  },
];

// ---------- ヘルパー ----------
export function getStoreById(id: string): Store | undefined {
  return dummyStores.find((s) => s.id === id);
}

export function getOrgById(id: string): Organization | undefined {
  return dummyOrganizations.find((o) => o.id === id);
}
