"use client";

import { useState, useTransition } from "react";
import { updatePreferredOrg } from "./actions";

type Org = { id: string; name: string };

export function PreferredOrgSelector({
  currentOrgId,
  currentOrgName,
  organizations,
}: {
  currentOrgId: string | null;
  currentOrgName: string | null;
  organizations: Org[];
}) {
  const [selected, setSelected] = useState(currentOrgId ?? "");
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSelected(value);
    startTransition(async () => {
      await updatePreferredOrg(value || null);
    });
  }

  return (
    <div>
      <select
        value={selected}
        onChange={handleChange}
        disabled={isPending}
        className={`w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm transition-colors focus:outline-none focus:border-accent ${
          isPending ? "opacity-60" : ""
        }`}
      >
        <option value="">指定しない（毎回えらぶ）</option>
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </select>
      {selected && currentOrgName && (
        <p className="mt-2 text-xs text-muted-foreground">
          現在の応援先: <span className="text-accent font-medium">{currentOrgName}</span>
        </p>
      )}
    </div>
  );
}
