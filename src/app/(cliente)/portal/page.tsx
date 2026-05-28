import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/db";
import { pratiche, documenti, clienti } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { statoLabels, statoColors, formatDate, formatFileSize } from "@/lib/utils";
import Link from "next/link";
import { ClientePortalHeader } from "./ClientePortalHeader";

export default async function ClientePortalPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "cliente") {
    redirect("/login");
  }

  const [cliente] = await db
    .select()
    .from(clienti)
    .where(eq(clienti.userId, user.id));

  const userPratiche = cliente
    ? await db
        .select({
          id: pratiche.id,
          titolo: pratiche.titolo,
          descrizione: pratiche.descrizione,
          stato: pratiche.stato,
          indirizzo: pratiche.indirizzo,
          createdAt: pratiche.createdAt,
        })
        .from(pratiche)
        .where(eq(pratiche.clienteId, cliente.id))
        .orderBy(desc(pratiche.createdAt))
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientePortalHeader userName={user.name} />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Benvenuto, {user.name}
          </h1>
          <p className="text-gray-500 mt-1">
            Qui puoi consultare le tue pratiche e i documenti condivisi
          </p>
        </div>

        {userPratiche.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-4 text-gray-500">
              Non hai ancora pratiche assegnate
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {userPratiche.map((p) => (
              <PraticaCard key={p.id} pratica={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

async function PraticaCard({ pratica }: { pratica: { id: number; titolo: string; descrizione: string | null; stato: string | null; indirizzo: string | null; createdAt: Date | null } }) {
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
        eq(documenti.praticaId, pratica.id),
        eq(documenti.visibileAlCliente, true)
      )
    );

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href={`/portal/pratiche/${pratica.id}`}
              className="text-lg font-semibold text-gray-900 hover:text-blue-600"
            >
              {pratica.titolo}
            </Link>
            <div className="flex items-center gap-3 mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statoColors[pratica.stato || "aperta"]}`}
              >
                {statoLabels[pratica.stato || "aperta"]}
              </span>
              {pratica.indirizzo && (
                <span className="text-sm text-gray-400">
                  {pratica.indirizzo}
                </span>
              )}
            </div>
          </div>
          <Link
            href={`/portal/pratiche/${pratica.id}`}
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            Dettaglio →
          </Link>
        </div>

        {docs.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase mb-2">
              Documenti condivisi ({docs.length})
            </p>
            <div className="space-y-1">
              {docs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-700">{doc.nome}</span>
                    {doc.dimensione && (
                      <span className="text-xs text-gray-400">
                        ({formatFileSize(doc.dimensione)})
                      </span>
                    )}
                  </div>
                  <a
                    href={`/uploads/${doc.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Scarica
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
