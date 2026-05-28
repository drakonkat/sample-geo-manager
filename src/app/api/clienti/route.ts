import { NextResponse } from "next/server";
import { db } from "@/db";
import { clienti } from "@/db/schema";
import { desc } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role === "cliente") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const allClienti = await db
    .select()
    .from(clienti)
    .orderBy(desc(clienti.createdAt));

  return NextResponse.json(allClienti);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role === "cliente") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const body = await request.json();
  const { nome, cognome, email, telefono, indirizzo, codiceFiscale, userId } = body;

  if (!nome || !cognome) {
    return NextResponse.json(
      { error: "Nome e cognome richiesti" },
      { status: 400 }
    );
  }

  const [newCliente] = await db
    .insert(clienti)
    .values({ nome, cognome, email, telefono, indirizzo, codiceFiscale, userId })
    .returning();

  return NextResponse.json(newCliente);
}
