"use client";

import { useState, useTransition } from "react";
import { updateDonationMode } from "./actions";

const MODES = [
  {
    value: "self" as const,
    label: "自分にポイント",
    description: "支援金を団体に、ポイントは自分に還元",
  },
  {
    value: "donate" as const,
    label: "全部おすそわけ",
    description: "ポイント分もまとめて団体へ（店の負担も軽減）",
  },
  {
    value: "ask" as const,
    label: "毎回えらぶ",
    description: "レシート登録のたびに選択します",
  },
];

export function DonationModeSelector({
  currentMode,
}: {
  currentMode: string;
}) {
  const [selected, setSelected] = useState(currentMode);
  const [isPending, startTransition] = useTransition();

  function handleSelect(mode: "self" | "donate" | "ask") {
    setSelected(mode);
    startTransition(async () => {
      await updateDonationMode(mode);
    });
  }

  return (
    <div className="space-y-2">
      {MODES.map((mode) => {
        const isActive = selected === mode.value;
        return (
          <button
            key={mode.value}
            type="button"
            disabled={isPending}
            onClick={() => handleSelect(mode.value)}
            className={`w-full text-left rounded-lg border px-4 py-3 transition-colors ${
              isActive
                ? "border-accent bg-accent/5"
                : "border-border hover:border-accent/40"
            } ${isPending ? "opacity-60" : ""}`}
          >
            <p className="text-sm font-medium">{mode.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {mode.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
