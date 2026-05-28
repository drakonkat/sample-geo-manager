import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/db";
import { pratiche, documenti, clienti, tickets, praticheClienti } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import {
  statoLabels,
  statoColors,
  formatDate,
  formatFileSize,
} from "@/lib/utils";
import Link from "next/link";
import { ClientePortalHeader } from "./ClientePortalHeader";

export default async function ClientePortalPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "cliente") {
    redirect("/login");
  }

  let cliente = null;
  let userPratiche: Array<{
    id: number;
    titolo: string;
    descrizione: string | null;
    stato: string | null;
    indirizzo: string | null;
    createdAt: Date | null;
  }> = [];
  let userTickets: Array<{
    id: number;
    titolo: string;
    messaggio: string | null;
    stato: string | null;
    praticaId: number | null;
    createdAt: Date | null;
  }> = [];

  try {
    const [c] = await db
      .select()
      .from(clienti)
      .where(eq(clienti.userId, user.id));
    cliente = c;

    if (cliente) {
      userPratiche = await db
        .select({
          id: pratiche.id,
          titolo: pratiche.titolo,
          descrizione: pratiche.descrizione,
          stato: pratiche.stato,
          indirizzo: pratiche.indirizzo,
          createdAt: pratiche.createdAt,
        })
        .from(pratiche)
        .innerJoin(praticheClienti, eq(pratiche.id, praticheClienti.praticaId))
        .where(eq(praticheClienti.clienteId, cliente.id))
        .orderBy(desc(pratiche.createdAt));

      userTickets = await db
        .select({
          id: tickets.id,
          titolo: tickets.titolo,
          messaggio: tickets.messaggio,
          stato: tickets.stato,
          praticaId: tickets.praticaId,
          createdAt: tickets.createdAt,
        })
        .from(tickets)
        .where(eq(tickets.clienteId, cliente.id))
        .orderBy(desc(tickets.createdAt));
    }
  } catch {
    // Database may not be ready during build
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ClientePortalHeader userName={user.name} />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl p-6 text-white shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight">
            Benvenuto, {user.name}
          </h1>
          <p className="text-indigo-100 mt-1">
            Qui puoi consultare le tue pratiche, i documenti condivisi e gestire i tuoi ticket
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Le tue Pratiche</h2>
          </div>
          {!cliente || userPratiche.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
                <svg
                  className="w-8 h-8 text-indigo-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-slate-500 font-medium">
                Non hai ancora pratiche assegnate
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Le tue pratiche appariranno qui quando saranno create
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {userPratiche.map((p) => (
                <PraticaCard key={p.id} pratica={p} />
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">I tuoi Ticket</h2>
          </div>
          {!cliente || userTickets.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-12 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <p className="text-slate-500 font-medium">Nessun ticket</p>
              <p className="text-sm text-slate-400 mt-1">
                Apri un ticket dalla pagina di dettaglio di una pratica
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50">
                    <th className="px-6 py-4">Ticket</th>
                    <th className="px-6 py-4">Stato</th>
                    <th className="px-6 py-4">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {userTickets.map((t) => (
                    <tr key={t.id} className="hover:bg-indigo-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900 text-sm">{t.titolo}</p>
                        {t.messaggio && (
                          <p className="text-xs text-slate-400 mt-0.5 truncate max-w-md">{t.messaggio}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ring-1 ring-inset ${t.stato === "risolto" ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20" : t.stato === "in_lavorazione" ? "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20" : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"}`}>
                          {t.stato === "aperto" ? "Aperto" : t.stato === "in_lavorazione" ? "In Lavorazione" : "Risolto"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {t.createdAt ? formatDate(t.createdAt) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

async function PraticaCard({
  pratica,
}: {
  pratica: {
    id: number;
    titolo: string;
    descrizione: string | null;
    stato: string | null;
    indirizzo: string | null;
    createdAt: Date | null;
  };
}) {
  let docs: Array<{
    id: number;
    nome: string;
    filename: string;
    dimensione: number | null;
    createdAt: Date | null;
  }> = [];

  try {
    docs = await db
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
  } catch {
    // Database may not be ready
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              href={`/portal/pratiche/${pratica.id}`}
              className="text-lg font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
            >
              {pratica.titolo}
            </Link>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ring-1 ring-inset ${statoColors[pratica.stato || "aperta"]}`}
              >
                {statoLabels[pratica.stato || "aperta"]}
              </span>
              {pratica.indirizzo && (
                <span className="flex items-center gap-1 text-sm text-slate-400">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 11 11.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {pratica.indirizzo}
                </span>
              )}
            </div>
          </div>
          <Link
            href={`/portal/pratiche/${pratica.id}`}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
          >
            Dettaglio
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {docs.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Documenti condivisi ({docs.length})
            </p>
            <div className="space-y-1.5">
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm text-slate-700 truncate block">
                        {doc.nome}
                      </span>
                      {doc.dimensione && (
                        <span className="text-xs text-slate-400">
                          {formatFileSize(doc.dimensione)}
                        </span>
                      )}
                    </div>
                  </div>
                  <a
                    href={`/uploads/${doc.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-sm text-indigo-600 hover:text-indigo-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
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