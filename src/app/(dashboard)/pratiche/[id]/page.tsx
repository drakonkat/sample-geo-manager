import { db } from "@/db";
import { pratiche, clienti, users, documenti, praticheClienti } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { PraticaDetailClient } from "./PraticaDetailClient";

export default async function PraticaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const praticaId = parseInt(id);
  if (isNaN(praticaId)) notFound();

  let pratica = await db
    .select({
      id: pratiche.id,
      titolo: pratiche.titolo,
      descrizione: pratiche.descrizione,
      stato: pratiche.stato,
      indirizzo: pratiche.indirizzo,
      foglio: pratiche.foglio,
      particella: pratiche.particella,
      sub: pratiche.sub,
      geometraId: pratiche.geometraId,
      createdAt: pratiche.createdAt,
      updatedAt: pratiche.updatedAt,
      geometraNome: users.name,
    })
    .from(pratiche)
    .leftJoin(users, eq(pratiche.geometraId, users.id))
    .where(eq(pratiche.id, praticaId));

  if (!pratica[0]) notFound();

  let docs: { id: number; nome: string; filename: string; mimeType: string | null; dimensione: number | null; visibileAlCliente: boolean; createdAt: Date | null; caricatoDa: string | null }[] = [];
  try {
    docs = await db
      .select({
        id: documenti.id,
        nome: documenti.nome,
        filename: documenti.filename,
        mimeType: documenti.mimeType,
        dimensione: documenti.dimensione,
        visibileAlCliente: documenti.visibileAlCliente,
        createdAt: documenti.createdAt,
        caricatoDa: users.name,
      })
      .from(documenti)
      .leftJoin(users, eq(documenti.caricatoDa, users.id))
      .where(eq(documenti.praticaId, praticaId));
  } catch {
    // table may not exist
  }

  let allClienti: { id: number; nome: string; cognome: string }[] = [];
  try {
    allClienti = await db
      .select({ id: clienti.id, nome: clienti.nome, cognome: clienti.cognome })
      .from(clienti);
  } catch {
    // table may not exist
  }

  let linkedClientiIds: number[] = [];
  try {
    const linked = await db
      .select({ clienteId: praticheClienti.clienteId })
      .from(praticheClienti)
      .where(eq(praticheClienti.praticaId, praticaId));
    linkedClientiIds = linked.map((l: { clienteId: number }) => l.clienteId);
  } catch {
    // table may not exist
  }

  return (
    <PraticaDetailClient
      pratica={pratica[0]}
      docs={docs}
      allClienti={allClienti}
      linkedClientiIds={linkedClientiIds}
      userRole={user.role}
    />
  );
}
