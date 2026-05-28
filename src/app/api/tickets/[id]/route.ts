import { NextResponse } from "next/server";
import { db } from "@/db";
import { tickets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user || user.role === "cliente") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { id } = await params;
  const ticketId = parseInt(id);
  if (isNaN(ticketId)) {
    return NextResponse.json({ error: "ID non valido" }, { status: 400 });
  }

  const body = await request.json();
  const { stato, geometraId } = body;

  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (stato) updates.stato = stato;
  if (geometraId !== undefined) updates.geometraId = geometraId || null;

  await db.update(tickets).set(updates).where(eq(tickets.id, ticketId));

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { id } = await params;
  const ticketId = parseInt(id);
  if (isNaN(ticketId)) {
    return NextResponse.json({ error: "ID non valido" }, { status: 400 });
  }

  await db.delete(tickets).where(eq(tickets.id, ticketId));
  return NextResponse.json({ ok: true });
}
