"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { submitContact } from "./actions";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("すべての項目を入力してください");
      return;
    }

    startTransition(async () => {
      try {
        await submitContact({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        });
        setSent(true);
      } catch {
        setError("送信に失敗しました。もう一度お試しください。");
      }
    });
  }

  if (sent) {
    return (
      <Card className="border-border">
        <CardContent className="py-12 text-center">
          <p className="font-bold text-lg mb-2">送信完了</p>
          <p className="text-sm text-muted-foreground">
            お問い合わせありがとうございます。内容を確認の上、ご連絡いたします。
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-border">
        <CardContent className="pt-5 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">お名前 *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              メールアドレス *
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              お問い合わせ内容 *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent-dark text-white"
        disabled={isPending}
      >
        <Send size={16} className="mr-2" />
        {isPending ? "送信中..." : "送信する"}
      </Button>
    </form>
  );
}
