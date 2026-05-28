import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e password richiesti" },
        { status: 400 }
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!user) {
      return NextResponse.json(
        { error: "Credenziali non valide" },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Credenziali non valide" },
        { status: 401 }
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch {
    return NextResponse.json(
      { error: "Errore del server" },
      { status: 500 }
    );
  }
}
