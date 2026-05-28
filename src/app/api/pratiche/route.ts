import { NextResponse } from "next/server";
import { db } from "@/db";
import { pratiche, clienti, users, praticheClienti } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role === "cliente") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const conditions = user.role === "geometra"
    ? eq(pratiche.geometraId, user.id)
    : undefined;

  const allPratiche = await db
    .select({
      id: pratiche.id,
      titolo: pratiche.titolo,
      stato: pratiche.stato,
      indirizzo: pratiche.indirizzo,
      createdAt: pratiche.createdAt,
      clienteId: pratiche.clienteId,
      geometraNome: users.name,
    })
    .from(pratiche)
    .leftJoin(users, eq(pratiche.geometraId, users.id))
    .where(conditions)
    .orderBy(desc(pratiche.createdAt));

  const praticheIds = allPratiche.map((p: { id: number; titolo: string; stato: string; indirizzo: string | null; createdAt: Date | null; clienteId: number | null; geometraNome: string | null }) => p.id);

  let clientiMap: Record<number, { id: number; nome: string; cognome: string }[]> = {};
  if (praticheIds.length > 0) {
    const allLinks = await db
      .select({
        praticaId: praticheClienti.praticaId,
        clienteId: clienti.id,
        nome: clienti.nome,
        cognome: clienti.cognome,
      })
      .from(praticheClienti)
      .innerJoin(clienti, eq(praticheClienti.clienteId, clienti.id));

    for (const link of allLinks) {
      if (!clientiMap[link.praticaId]) clientiMap[link.praticaId] = [];
      clientiMap[link.praticaId].push({ id: link.clienteId, nome: link.nome, cognome: link.cognome });
    }
  }

  const result = allPratiche.map((p: { id: number; titolo: string; stato: string; indirizzo: string | null; createdAt: Date | null; clienteId: number | null; geometraNome: string | null }) => ({
    ...p,
    clientiAssociati: clientiMap[p.id] || [],
  }));

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role === "cliente") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const body = await request.json();
  const { titolo, descrizione, stato, indirizzo, foglio, particella, sub, clienteId, clientiIds } = body;

  if (!titolo) {
    return NextResponse.json({ error: "Titolo richiesto" }, { status: 400 });
  }

  const [newPratica] = await db
    .insert(pratiche)
    .values({
      titolo,
      descrizione,
      stato: stato || "aperta",
      indirizzo,
      foglio,
      particella,
      sub,
      geometraId: user.id,
    })
    .returning();

  const idsToLink = clientiIds?.length
    ? clientiIds.map(Number)
    : clienteId
      ? [Number(clienteId)]
      : [];

  if (idsToLink.length > 0) {
    await db.insert(praticheClienti).values(
      idsToLink.map((cid: number) => ({ praticaId: newPratica.id, clienteId: cid }))
    );
  }

  return NextResponse.json(newPratica);
}
