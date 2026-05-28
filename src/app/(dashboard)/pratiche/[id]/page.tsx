import { db } from "@/db";
import { pratiche, clienti, users, documenti } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { statoLabels, statoColors, formatDate, formatFileSize } from "@/lib/utils";
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

  const [pratica] = await db
    .select({
      id: pratiche.id,
      titolo: pratiche.titolo,
      descrizione: pratiche.descrizione,
      stato: pratiche.stato,
      indirizzo: pratiche.indirizzo,
      foglio: pratiche.foglio,
      particella: pratiche.particella,
      sub: pratiche.sub,
      clienteId: pratiche.clienteId,
      geometraId: pratiche.geometraId,
      createdAt: pratiche.createdAt,
      updatedAt: pratiche.updatedAt,
      clienteNome: clienti.nome,
      clienteCognome: clienti.cognome,
      geometraNome: users.name,
    })
    .from(pratiche)
    .leftJoin(clienti, eq(pratiche.clienteId, clienti.id))
    .leftJoin(users, eq(pratiche.geometraId, users.id))
    .where(eq(pratiche.id, praticaId));

  if (!pratica) notFound();

  const docs = await db
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

  const allClienti = await db
    .select({ id: clienti.id, nome: clienti.nome, cognome: clienti.cognome })
    .from(clienti);

  return (
    <PraticaDetailClient
      pratica={pratica}
      docs={docs}
      allClienti={allClienti}
      userRole={user.role}
    />
  );
}
