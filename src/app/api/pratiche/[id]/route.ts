import { NextResponse } from "next/server";
import { db } from "@/db";
import { pratiche, praticheClienti } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role === "cliente") {
      return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
    }

    const body = await request.json();
    const { id, stato, clientiIds, titolo, descrizione, indirizzo } = body;

    if (!id) {
      return NextResponse.json({ error: "ID richiesto" }, { status: 400 });
    }

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (stato) updates.stato = stato;
    if (titolo) updates.titolo = titolo;
    if (descrizione !== undefined) updates.descrizione = descrizione;
    if (indirizzo !== undefined) updates.indirizzo = indirizzo;

    await db.update(pratiche).set(updates).where(eq(pratiche.id, id));

    if (Array.isArray(clientiIds)) {
      try {
        await db.delete(praticheClienti).where(eq(praticheClienti.praticaId, id));
        if (clientiIds.length > 0) {
          await db.insert(praticheClienti).values(
            clientiIds.map((cid: number) => ({ praticaId: id, clienteId: cid }))
          );
        }
      } catch {
        // pratiche_clienti table may not exist yet
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Errore nell'aggiornamento pratica:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
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
  } catch (error) {
    console.error("Errore nell'eliminazione pratica:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
