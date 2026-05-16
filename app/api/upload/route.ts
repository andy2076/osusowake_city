import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json(
      { error: "ファイルが選択されていません" },
      { status: 400 }
    );
  }

  // 画像ファイルのみ許可
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "画像ファイルのみアップロードできます" },
      { status: 400 }
    );
  }

  // 5MB 上限
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "ファイルサイズは5MB以下にしてください" },
      { status: 400 }
    );
  }

  const userId = session.user.id;
  const timestamp = Date.now();
  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${timestamp}.${ext}`;

  const uploadDir = path.join(
    process.cwd(),
    "data",
    "uploads",
    "receipts",
    userId
  );
  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(uploadDir, filename);
  await writeFile(filePath, buffer);

  // DB に保存するための相対パス
  const photoUrl = `/data/uploads/receipts/${userId}/${filename}`;

  return NextResponse.json({ photoUrl });
}
