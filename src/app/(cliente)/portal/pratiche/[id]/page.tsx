import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/db";
import { pratiche, documenti, clienti, users, praticheClienti } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import {
  statoLabels,
  statoColors,
  formatDate,
  formatFileSize,
} from "@/lib/utils";
import Link from "next/link";
import { ClientePortalHeader } from "../../ClientePortalHeader";
import { TicketForm } from "./TicketForm";

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
      createdAt: pratiche.createdAt,
      geometraNome: users.name,
    })
    .from(pratiche)
    .leftJoin(users, eq(pratiche.geometraId, users.id))
    .where(eq(pratiche.id, praticaId));

  if (!pratica[0]) notFound();

  let cliente = null;
  try {
    const [c] = await db
      .select()
      .from(clienti)
      .where(eq(clienti.userId, user.id));
    cliente = c;
  } catch {
    // table may not exist
  }

  if (!cliente) notFound();

  let hasAccess = false;
  try {
    const [link] = await db
      .select()
      .from(praticheClienti)
      .where(
        and(eq(praticheClienti.praticaId, praticaId), eq(praticheClienti.clienteId, cliente.id))
      );
    hasAccess = !!link;
  } catch {
    // table may not exist
  }

  if (!hasAccess) notFound();

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
          eq(documenti.praticaId, praticaId),
          eq(documenti.visibileAlCliente, true)
        )
      );
  } catch {
    // table may not exist
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ClientePortalHeader userName={user.name} />

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-start gap-4">
          <Link
            href="/portal"
            className="mt-1 flex items-center justify-center w-9 h-9 rounded-xl bg-white shadow-sm border border-slate-200/60 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {pratica[0].titolo}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ring-1 ring-inset ${statoColors[pratica[0].stato || "aperta"]}`}
              >
                {statoLabels[pratica[0].stato || "aperta"]}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
          <h2 className="font-semibold text-slate-900 mb-5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            Dettagli
          </h2>
          <dl className="grid grid-cols-2 gap-5 text-sm">
{pratica[0].indirizzo && (
                <div className="bg-slate-50 rounded-xl p-3">
                  <dt className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Indirizzo
                  </dt>
                  <dd className="text-slate-900 font-medium mt-1">
                    {pratica[0].indirizzo}
                  </dd>
                </div>
              )}
              {pratica[0].foglio && (
                <div className="bg-slate-50 rounded-xl p-3">
                  <dt className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Foglio
                  </dt>
                  <dd className="text-slate-900 font-medium mt-1">
                    {pratica[0].foglio}
                  </dd>
                </div>
              )}
              {pratica[0].particella && (
                <div className="bg-slate-50 rounded-xl p-3">
                  <dt className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Particella
                  </dt>
                  <dd className="text-slate-900 font-medium mt-1">
                    {pratica[0].particella}
                  </dd>
                </div>
              )}
              {pratica[0].sub && (
                <div className="bg-slate-50 rounded-xl p-3">
                  <dt className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Sub
                  </dt>
                  <dd className="text-slate-900 font-medium mt-1">
                    {pratica[0].sub}
                  </dd>
                </div>
              )}
              <div className="bg-slate-50 rounded-xl p-3">
                <dt className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Geometra
                </dt>
                <dd className="text-slate-900 font-medium mt-1">
                  {pratica[0].geometraNome || "\u2014"}
                </dd>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <dt className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Data
                </dt>
                <dd className="text-slate-900 font-medium mt-1">
                  {pratica[0].createdAt ? formatDate(pratica[0].createdAt) : "\u2014"}
                </dd>
              </div>
            </dl>
            {pratica[0].descrizione && (
              <div className="mt-5 pt-5 border-t border-slate-100">
                <dt className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Descrizione
                </dt>
                <dd className="text-slate-700 text-sm mt-2 leading-relaxed">
                  {pratica[0].descrizione}
              </dd>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
          <h2 className="font-semibold text-slate-900 mb-5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-indigo-600"
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
            Documenti Condivisi ({docs.length})
          </h2>
          {docs.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm text-slate-400">
                Nessun documento condiviso
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {docs.map((doc: { id: number; nome: string; filename: string; dimensione: number | null; createdAt: Date | null }) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-indigo-50/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200/60 flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-indigo-500"
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
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {doc.nome}
                      </p>
                      <p className="text-xs text-slate-400">
                        {doc.dimensione
                          ? formatFileSize(doc.dimensione)
                          : ""}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`/uploads/${doc.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                  >
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Scarica
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        <TicketForm praticaId={pratica.id} />
      </main>
    </div>
  );
}
