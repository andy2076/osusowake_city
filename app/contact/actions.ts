"use server";

export async function submitContact(data: {
  name: string;
  email: string;
  message: string;
}) {
  // TODO: 本番では通知メール送信やDB保存を実装
  console.log("\n========================================");
  console.log("  お問い合わせ受信");
  console.log(`  名前: ${data.name}`);
  console.log(`  メール: ${data.email}`);
  console.log(`  内容: ${data.message}`);
  console.log("========================================\n");
}
