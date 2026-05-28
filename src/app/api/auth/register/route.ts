import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, createSession } from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";

export async function POST(request: Request) {
  try {
    await ensureSeeded();

    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nome, email e password richiesti" },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Email già registrata" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const validRoles = ["admin", "geometra", "cliente"] as const;
    const userRole = validRoles.includes(role) ? role : "cliente";

    const [newUser] = await db
      .insert(users)
      .values({ name, email, passwordHash, role: userRole })
      .returning();

    await createSession(newUser.id);

    return NextResponse.json({
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch {
    return NextResponse.json(
      { error: "Errore del server" },
      { status: 500 }
    );
  }
}
