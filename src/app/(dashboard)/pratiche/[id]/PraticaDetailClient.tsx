"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { statoLabels, statoColors, formatDate, formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { FileUpload } from "@/components/FileUpload";

interface Pratica {
  id: number;
  titolo: string;
  descrizione: string | null;
  stato: string | null;
  indirizzo: string | null;
  foglio: string | null;
  particella: string | null;
  sub: string | null;
  clienteId: number | null;
  geometraId: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  clienteNome: string | null;
  clienteCognome: string | null;
  geometraNome: string | null;
}

interface Doc {
  id: number;
  nome: string;
  filename: string;
  mimeType: string | null;
  dimensione: number | null;
  visibileAlCliente: boolean | null;
  createdAt: Date | null;
  caricatoDa: string | null;
}

interface Cliente {
  id: number;
  nome: string;
  cognome: string;
}

export function PraticaDetailClient({
  pratica,
  docs,
  allClienti,
  userRole,
}: {
  pratica: Pratica;
  docs: Doc[];
  allClienti: Cliente[];
  userRole: string;
}) {
  const router = useRouter();
  const [stato, setStato] = useState(pratica.stato || "aperta");
  const [clienteId, setClienteId] = useState(String(pratica.clienteId || ""));
  const [saving, setSaving] = useState(false);
  const [docList, setDocList] = useState(docs);

  async function updateStato() {
    setSaving(true);
    await fetch(`/api/pratiche`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: pratica.id, stato, clienteId: clienteId || null }),
    });
    setSaving(false);
    router.refresh();
  }

  async function deleteDoc(docId: number) {
    if (!confirm("Eliminare questo documento?")) return;
    await fetch(`/api/documenti`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: docId }),
    });
    setDocList((prev) => prev.filter((d) => d.id !== docId));
  }

  const canEdit = userRole === "admin" || userRole === "geometra";

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/pratiche"
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200/60 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{pratica.titolo}</h1>
          <p className="text-slate-500 text-sm mt-1">
            Creata il {pratica.createdAt ? formatDate(pratica.createdAt) : "—"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Dettagli</h2>
            <div className="grid grid-cols-2 gap-6">
              {pratica.indirizzo && (
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Indirizzo</p>
                  <p className="text-slate-900 font-semibold text-sm">{pratica.indirizzo}</p>
                </div>
              )}
              {pratica.foglio && (
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Foglio</p>
                  <p className="text-slate-900 font-semibold text-sm">{pratica.foglio}</p>
                </div>
              )}
              {pratica.particella && (
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Particella</p>
                  <p className="text-slate-900 font-semibold text-sm">{pratica.particella}</p>
                </div>
              )}
              {pratica.sub && (
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Sub</p>
                  <p className="text-slate-900 font-semibold text-sm">{pratica.sub}</p>
                </div>
              )}
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Geometra</p>
                <p className="text-slate-900 font-semibold text-sm">{pratica.geometraNome || "—"}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Cliente</p>
                <p className="text-slate-900 font-semibold text-sm">
                  {pratica.clienteNome
                    ? `${pratica.clienteNome} ${pratica.clienteCognome}`
                    : "—"}
                </p>
              </div>
            </div>
            {pratica.descrizione && (
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-2">Descrizione</p>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {pratica.descrizione}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Documenti
              <span className="ml-2 inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-full">
                {docList.length}
              </span>
            </h2>
            {canEdit && (
              <div className="mb-6">
                <FileUpload
                  praticaId={pratica.id}
                  onUploaded={() => router.refresh()}
                />
              </div>
            )}
            {docList.length === 0 ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-3">
                  <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-slate-500 text-sm">Nessun documento caricato</p>
              </div>
            ) : (
              <div className="space-y-2">
                {docList.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-indigo-50/50 transition-colors group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {doc.nome}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {doc.dimensione ? formatFileSize(doc.dimensione) : ""}{" "}
                          {doc.caricatoDa && `• ${doc.caricatoDa}`}
                          {doc.visibileAlCliente && (
                            <span className="ml-2 text-emerald-600 font-medium">
                              ✓ Visibile al cliente
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`/uploads/${doc.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Scarica
                      </a>
                      {canEdit && (
                        <button
                          onClick={() => deleteDoc(doc.id)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {canEdit && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Aggiorna</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Stato</label>
                  <select
                    value={stato}
                    onChange={(e) => setStato(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                  >
                    <option value="aperta">Aperta</option>
                    <option value="in_corso">In Corso</option>
                    <option value="sospesa">Sospesa</option>
                    <option value="chiusa">Chiusa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Cliente</label>
                  <select
                    value={clienteId}
                    onChange={(e) => setClienteId(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                  >
                    <option value="">Nessuno</option>
                    {allClienti.map((c) => (
                      <option key={c.id} value={String(c.id)}>
                        {c.nome} {c.cognome}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  onClick={updateStato}
                  loading={saving}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 rounded-xl py-2.5"
                >
                  Salva Modifiche
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
