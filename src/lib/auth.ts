import { cookies } from "next/headers";
import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { hash, compare } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashStr: string
): Promise<boolean> {
  return compare(password, hashStr);
}

export async function createSession(userId: number): Promise<string> {
  const id = uuidv4();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  await db.insert(sessions).values({ id, userId, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set("session_id", id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
  return id;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;
  if (!sessionId) return null;

  const [session] = await db
    .select()
    .from(sessions)
    .where(
      and(eq(sessions.id, sessionId), gt(sessions.expiresAt, new Date()))
    );

  if (!session) return null;

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, session.userId));

  return user ?? null;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;
  if (sessionId) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    cookieStore.delete("session_id");
  }
}

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;
