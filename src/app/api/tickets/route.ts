import { NextResponse } from "next/server";
import { db } from "@/db";
import { tickets, clienti, users, pratiche } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  if (user.role === "cliente") {
    const [cliente] = await db
      .select()
      .from(clienti)
      .where(eq(clienti.userId, user.id));

    if (!cliente) {
      return NextResponse.json([]);
    }

    const allTickets = await db
      .select({
        id: tickets.id,
        titolo: tickets.titolo,
        messaggio: tickets.messaggio,
        stato: tickets.stato,
        praticaId: tickets.praticaId,
        clienteId: tickets.clienteId,
        geometraId: tickets.geometraId,
        createdAt: tickets.createdAt,
        updatedAt: tickets.updatedAt,
        clienteNome: clienti.nome,
        clienteCognome: clienti.cognome,
        geometraNome: users.name,
        praticaTitolo: pratiche.titolo,
      })
      .from(tickets)
      .leftJoin(clienti, eq(tickets.clienteId, clienti.id))
      .leftJoin(users, eq(tickets.geometraId, users.id))
      .leftJoin(pratiche, eq(tickets.praticaId, pratiche.id))
      .where(eq(tickets.clienteId, cliente.id))
      .orderBy(desc(tickets.createdAt));

    return NextResponse.json(allTickets);
  }

  const conditions =
    user.role === "geometra"
      ? eq(tickets.geometraId, user.id)
      : undefined;

  const allTickets = await db
    .select({
      id: tickets.id,
      titolo: tickets.titolo,
      messaggio: tickets.messaggio,
      stato: tickets.stato,
      praticaId: tickets.praticaId,
      clienteId: tickets.clienteId,
      geometraId: tickets.geometraId,
      createdAt: tickets.createdAt,
      updatedAt: tickets.updatedAt,
      clienteNome: clienti.nome,
      clienteCognome: clienti.cognome,
      geometraNome: users.name,
      praticaTitolo: pratiche.titolo,
    })
    .from(tickets)
    .leftJoin(clienti, eq(tickets.clienteId, clienti.id))
    .leftJoin(users, eq(tickets.geometraId, users.id))
    .leftJoin(pratiche, eq(tickets.praticaId, pratiche.id))
    .where(conditions)
    .orderBy(desc(tickets.createdAt));

  return NextResponse.json(allTickets);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const body = await request.json();
  const { titolo, messaggio, praticaId } = body;

  if (!titolo) {
    return NextResponse.json({ error: "Titolo richiesto" }, { status: 400 });
  }

  let clienteId: number;

  if (user.role === "cliente") {
    const [cliente] = await db
      .select()
      .from(clienti)
      .where(eq(clienti.userId, user.id));
    if (!cliente) {
      return NextResponse.json({ error: "Cliente non trovato" }, { status: 404 });
    }
    clienteId = cliente.id;
  } else {
    const { clienteId: cid } = body;
    if (!cid) {
      return NextResponse.json({ error: "clienteId richiesto" }, { status: 400 });
    }
    clienteId = Number(cid);
  }

  const [newTicket] = await db
    .insert(tickets)
    .values({
      titolo,
      messaggio,
      praticaId: praticaId || null,
      clienteId,
      geometraId: user.role === "geometra" ? user.id : null,
    })
    .returning();

  return NextResponse.json(newTicket);
}
