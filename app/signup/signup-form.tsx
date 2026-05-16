"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { signUp } from "./actions";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("パスワードは6文字以上で入力してください。");
      return;
    }

    if (password !== passwordConfirm) {
      setError("パスワードが一致しません。");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp({ email, password });
      if (result?.error) {
        setError(result.error);
      }
      // 成功時は actions.ts 内で redirect される
    } catch {
      // redirect は NEXT_REDIRECT エラーを throw するので、
      // それ以外のエラーのみキャッチ
      setError("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1.5">
          メールアドレス
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1.5">
          パスワード（6文字以上）
        </label>
        <Input
          id="password"
          type="password"
          placeholder="パスワードを入力"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
        />
      </div>

      <div>
        <label htmlFor="password-confirm" className="block text-sm font-medium mb-1.5">
          パスワード（確認）
        </label>
        <Input
          id="password-confirm"
          type="password"
          placeholder="もう一度入力"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent-dark text-white"
        disabled={loading}
      >
        <UserPlus size={16} className="mr-2" />
        {loading ? "登録中..." : "新規登録"}
      </Button>

      <p className="text-xs text-center text-muted-foreground pt-2">
        既にアカウントをお持ちの方は{" "}
        <Link href="/login" className="text-accent hover:underline">
          ログイン
        </Link>
      </p>
    </form>
  );
}
