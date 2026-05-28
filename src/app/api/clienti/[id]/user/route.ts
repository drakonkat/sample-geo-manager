import { NextResponse } from "next/server";
import { db } from "@/db";
import { clienti, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser, hashPassword } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role === "cliente") {
      return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
    }

    const { id } = await params;
    const clienteId = parseInt(id);
    if (isNaN(clienteId)) {
      return NextResponse.json({ error: "ID non valido" }, { status: 400 });
    }

    const [cliente] = await db
      .select()
      .from(clienti)
      .where(eq(clienti.id, clienteId));

    if (!cliente) {
      return NextResponse.json({ error: "Cliente non trovato" }, { status: 404 });
    }

    if (cliente.userId) {
      return NextResponse.json(
        { error: "Il cliente ha già un account utente" },
        { status: 409 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const password = body.password || "client123";
    const email = cliente.email;

    if (!email) {
      return NextResponse.json(
        { error: "Il cliente non ha un'email associata" },
        { status: 400 }
      );
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Email già registrata come utente" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({
        name: `${cliente.nome} ${cliente.cognome}`,
        email,
        passwordHash,
        role: "cliente",
      })
      .returning();

    await db
      .update(clienti)
      .set({ userId: newUser.id })
      .where(eq(clienti.id, clienteId));

    return NextResponse.json({
      userId: newUser.id,
      email,
      password,
      message: "Account utente creato con successo",
    });
  } catch (error) {
    console.error("Errore nella creazione account cliente:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
