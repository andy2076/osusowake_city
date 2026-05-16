import { auth } from "@/auth";
import { HeaderClient } from "./header-client";

export async function Header() {
  let user: { name?: string | null; email?: string | null } | null = null;

  try {
    const session = await auth();
    user = session?.user ?? null;
  } catch {
    // DB未接続時などはログアウト状態として扱う
  }

  return <HeaderClient user={user} />;
}
