export const TIER_CONFIG = {
  light: {
    label: "ライト",
    storeBurden: 20,
    selfPoints: 8,
    donation: 8,
    operatorFee: 4,
    description: "喫茶、弁当、ファストフード等",
  },
  standard: {
    label: "スタンダード",
    storeBurden: 40,
    selfPoints: 15,
    donation: 17,
    operatorFee: 8,
    description: "ラーメン、定食、カフェ等",
  },
  group: {
    label: "グループ",
    storeBurden: 80,
    selfPoints: 30,
    donation: 35,
    operatorFee: 15,
    description: "居酒屋、焼肉、寿司等",
  },
  premium: {
    label: "プレミアム",
    storeBurden: 150,
    selfPoints: 55,
    donation: 65,
    operatorFee: 30,
    description: "割烹、コース、ファインダイニング",
  },
} as const;

export type TierKey = keyof typeof TIER_CONFIG;

export const SERVICE_AREA = {
  cities: ["都城市", "三股町", "曽於市"],
  centerLat: 31.7203,
  centerLng: 131.0617,
  defaultRadius: 5000,
} as const;

export const FOUNDING_MEMBER_LIMIT = 30;

export const BRAND = {
  name: "まちのおすそわけ",
  subtitle: "都城・三股・曽於の応援グルメ",
  tagline: "食べて、まちをおすそわけ。",
  domain: "osusowake.city",
} as const;
