import { NextResponse } from "next/server";
import { getCurrentUser, hashPassword } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const body = await request.json();
  const { name, password } = body;

  const updates: Record<string, unknown> = {};
  if (name) updates.name = name;
  if (password) {
    if (password.length < 6) {
      return NextResponse.json(
        { error: "La password deve essere di almeno 6 caratteri" },
        { status: 400 }
      );
    }
    updates.passwordHash = await hashPassword(password);
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nessuna modifica" }, { status: 400 });
  }

  await db.update(users).set(updates).where(eq(users.id, user.id));
  return NextResponse.json({ ok: true });
}
