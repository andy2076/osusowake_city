"use client";

import { useState, useTransition } from "react";
import { updateDisplayName } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DisplayNameForm({
  currentName,
  email,
}: {
  currentName: string;
  email: string;
}) {
  const [name, setName] = useState(currentName);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const hasChanged = name.trim() !== currentName;

  function handleSave() {
    setSaved(false);
    startTransition(async () => {
      await updateDisplayName(name);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-muted-foreground mb-1">
          メールアドレス
        </label>
        <p className="text-sm">{email}</p>
      </div>
      <div>
        <label
          htmlFor="displayName"
          className="block text-xs text-muted-foreground mb-1"
        >
          表示名
        </label>
        <div className="flex gap-2">
          <Input
            id="displayName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="表示名を入力"
            className="flex-1"
          />
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={isPending || !hasChanged}
            className="bg-accent hover:bg-accent-dark text-white shrink-0"
          >
            {isPending ? "保存中" : saved ? "保存済み" : "保存"}
          </Button>
        </div>
      </div>
    </div>
  );
}
