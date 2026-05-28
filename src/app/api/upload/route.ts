import { NextResponse } from "next/server";
import { db } from "@/db";
import { documenti } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role === "cliente") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const praticaId = formData.get("praticaId") as string;
  const visibileAlCliente = formData.get("visibileAlCliente") === "true";

  if (!file || !praticaId) {
    return NextResponse.json(
      { error: "File e praticaId richiesti" },
      { status: 400 }
    );
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const ext = path.extname(file.name);
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const filePath = path.join(uploadDir, safeName);

  const bytes = await file.arrayBuffer();
  await writeFile(filePath, Buffer.from(bytes));

  const [doc] = await db
    .insert(documenti)
    .values({
      nome: file.name,
      filename: safeName,
      mimeType: file.type,
      dimensione: file.size,
      praticaId: parseInt(praticaId),
      caricatoDa: user.id,
      visibileAlCliente,
    })
    .returning();

  return NextResponse.json(doc);
}
