import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/db";
import { pratiche, documenti, clienti, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import { statoLabels, statoColors, formatDate, formatFileSize } from "@/lib/utils";
import Link from "next/link";
import { ClientePortalHeader } from "../../ClientePortalHeader";

export default async function ClientePraticaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user || user.role !== "cliente") redirect("/login");

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
      createdAt: pratiche.createdAt,
      geometraNome: users.name,
    })
    .from(pratiche)
    .leftJoin(users, eq(pratiche.geometraId, users.id))
    .where(eq(pratiche.id, praticaId));

  if (!pratica) notFound();

  const [cliente] = await db
    .select()
    .from(clienti)
    .where(eq(clienti.userId, user.id));

  if (!cliente || !(await db.select().from(pratiche).where(and(eq(pratiche.id, praticaId), eq(pratiche.clienteId, cliente.id))))[0]) {
    notFound();
  }

  const docs = await db
    .select({
      id: documenti.id,
      nome: documenti.nome,
      filename: documenti.filename,
      dimensione: documenti.dimensione,
      createdAt: documenti.createdAt,
    })
    .from(documenti)
    .where(
      and(
        eq(documenti.praticaId, praticaId),
        eq(documenti.visibileAlCliente, true)
      )
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientePortalHeader userName={user.name} />

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/portal" className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{pratica.titolo}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statoColors[pratica.stato || "aperta"]}`}
              >
                {statoLabels[pratica.stato || "aperta"]}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Dettagli</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            {pratica.indirizzo && (
              <div>
                <dt className="text-gray-500">Indirizzo</dt>
                <dd className="text-gray-900 mt-0.5">{pratica.indirizzo}</dd>
              </div>
            )}
            {pratica.foglio && (
              <div>
                <dt className="text-gray-500">Foglio</dt>
                <dd className="text-gray-900 mt-0.5">{pratica.foglio}</dd>
              </div>
            )}
            {pratica.particella && (
              <div>
                <dt className="text-gray-500">Particella</dt>
                <dd className="text-gray-900 mt-0.5">{pratica.particella}</dd>
              </div>
            )}
            {pratica.sub && (
              <div>
                <dt className="text-gray-500">Sub</dt>
                <dd className="text-gray-900 mt-0.5">{pratica.sub}</dd>
              </div>
            )}
            <div>
              <dt className="text-gray-500">Geometra</dt>
              <dd className="text-gray-900 mt-0.5">{pratica.geometraNome || "—"}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Data</dt>
              <dd className="text-gray-900 mt-0.5">
                {pratica.createdAt ? formatDate(pratica.createdAt) : "—"}
              </dd>
            </div>
          </dl>
          {pratica.descrizione && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <dt className="text-gray-500 text-sm">Descrizione</dt>
              <dd className="text-gray-900 text-sm mt-1">{pratica.descrizione}</dd>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">
            Documenti Condivisi ({docs.length})
          </h2>
          {docs.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">
              Nessun documento condiviso
            </p>
          ) : (
            <div className="space-y-2">
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.nome}</p>
                      <p className="text-xs text-gray-400">
                        {doc.dimensione ? formatFileSize(doc.dimensione) : ""}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`/uploads/${doc.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                  >
                    Scarica
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
