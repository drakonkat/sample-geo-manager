import { NextResponse } from "next/server";
import { db } from "@/db";
import { pratiche, clienti, users, documenti } from "@/db/schema";
import { eq, desc, count, and, sql } from "drizzle-orm";
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
      clienteNome: clienti.nome,
      clienteCognome: clienti.cognome,
      geometraNome: users.name,
    })
    .from(pratiche)
    .leftJoin(clienti, eq(pratiche.clienteId, clienti.id))
    .leftJoin(users, eq(pratiche.geometraId, users.id))
    .where(conditions)
    .orderBy(desc(pratiche.createdAt));

  return NextResponse.json(allPratiche);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role === "cliente") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const body = await request.json();
  const { titolo, descrizione, stato, indirizzo, foglio, particella, sub, clienteId } = body;

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
      clienteId: clienteId || null,
      geometraId: user.id,
    })
    .returning();

  return NextResponse.json(newPratica);
}
