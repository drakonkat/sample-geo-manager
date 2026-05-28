import { NextResponse } from "next/server";
import { db } from "@/db";
import { pratiche } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role === "cliente") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const body = await request.json();
  const { id, stato, clienteId, titolo, descrizione, indirizzo } = body;

  if (!id) {
    return NextResponse.json({ error: "ID richiesto" }, { status: 400 });
  }

  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (stato) updates.stato = stato;
  if (clienteId !== undefined) updates.clienteId = clienteId || null;
  if (titolo) updates.titolo = titolo;
  if (descrizione !== undefined) updates.descrizione = descrizione;
  if (indirizzo !== undefined) updates.indirizzo = indirizzo;

  await db.update(pratiche).set(updates).where(eq(pratiche.id, id));

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "ID richiesto" }, { status: 400 });
  }

  await db.delete(pratiche).where(eq(pratiche.id, id));
  return NextResponse.json({ ok: true });
}
