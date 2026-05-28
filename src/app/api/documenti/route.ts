import { NextResponse } from "next/server";
import { db } from "@/db";
import { documenti } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role === "cliente") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "ID richiesto" }, { status: 400 });
  }

  const [doc] = await db
    .select()
    .from(documenti)
    .where(eq(documenti.id, id));

  if (doc) {
    try {
      await unlink(path.join(process.cwd(), "public", "uploads", doc.filename));
    } catch {
      // file may not exist
    }
  }

  await db.delete(documenti).where(eq(documenti.id, id));
  return NextResponse.json({ ok: true });
}
