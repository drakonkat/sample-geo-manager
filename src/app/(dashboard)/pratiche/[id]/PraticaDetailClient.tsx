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
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/pratiche"
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{pratica.titolo}</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Creata il {pratica.createdAt ? formatDate(pratica.createdAt) : "—"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
                <dt className="text-gray-500">Cliente</dt>
                <dd className="text-gray-900 mt-0.5">
                  {pratica.clienteNome
                    ? `${pratica.clienteNome} ${pratica.clienteCognome}`
                    : "—"}
                </dd>
              </div>
            </dl>
            {pratica.descrizione && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <dt className="text-gray-500 text-sm">Descrizione</dt>
                <dd className="text-gray-900 text-sm mt-1">
                  {pratica.descrizione}
                </dd>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">
              Documenti ({docList.length})
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
              <p className="text-gray-400 text-sm text-center py-4">
                Nessun documento caricato
              </p>
            ) : (
              <div className="space-y-2">
                {docList.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {doc.nome}
                        </p>
                        <p className="text-xs text-gray-400">
                          {doc.dimensione ? formatFileSize(doc.dimensione) : ""}{" "}
                          {doc.caricatoDa && `• ${doc.caricatoDa}`}
                          {doc.visibileAlCliente && (
                            <span className="ml-2 text-green-600">
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
                        className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                      >
                        Scarica
                      </a>
                      {canEdit && (
                        <button
                          onClick={() => deleteDoc(doc.id)}
                          className="text-red-400 hover:text-red-600 ml-2"
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
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Aggiorna</h2>
              <div className="space-y-4">
                <Select
                  label="Stato"
                  value={stato}
                  onChange={(e) => setStato(e.target.value)}
                  options={[
                    { value: "aperta", label: "Aperta" },
                    { value: "in_corso", label: "In Corso" },
                    { value: "sospesa", label: "Sospesa" },
                    { value: "chiusa", label: "Chiusa" },
                  ]}
                />
                <Select
                  label="Cliente"
                  value={clienteId}
                  onChange={(e) => setClienteId(e.target.value)}
                  options={[
                    { value: "", label: "Nessuno" },
                    ...allClienti.map((c) => ({
                      value: String(c.id),
                      label: `${c.nome} ${c.cognome}`,
                    })),
                  ]}
                />
                <Button
                  onClick={updateStato}
                  loading={saving}
                  className="w-full"
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
