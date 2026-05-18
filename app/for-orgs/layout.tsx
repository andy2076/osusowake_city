import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "団体の方へ | まちのおすそわけ",
  description:
    "少年団・部活動・クラブチーム・子ども食堂など、地域の子ども関連団体へ。地元の飲食店でごはんを食べるだけで、あなたの団体への支援金が届く仕組みです。都城・三股・曽於エリア。",
};

export default function ForOrgsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
