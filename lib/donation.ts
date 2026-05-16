import { TIER_CONFIG, type TierKey } from "./constants";

export type DonationMode = "self" | "donate";

export type DonationBreakdown = {
  storeBurden: number;
  selfPoints: number;
  donationAmount: number;
  operatorFee: number;
};

/**
 * 階層と寄付モードに応じた料金内訳を計算する。
 *
 * mode = "self":  通常モード（客ptあり）
 * mode = "donate": 全部おすそわけ（客pt → 0、店負担が客pt分だけ減額、支援金額は変わらない）
 */
export function calculateDonation(
  tier: TierKey,
  mode: DonationMode
): DonationBreakdown {
  const config = TIER_CONFIG[tier];

  if (mode === "donate") {
    return {
      storeBurden: config.storeBurden - config.selfPoints,
      selfPoints: 0,
      donationAmount: config.donation,
      operatorFee: config.operatorFee,
    };
  }

  // mode === "self"
  return {
    storeBurden: config.storeBurden,
    selfPoints: config.selfPoints,
    donationAmount: config.donation,
    operatorFee: config.operatorFee,
  };
}
