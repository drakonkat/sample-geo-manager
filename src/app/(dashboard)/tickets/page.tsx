"use client";

import { useState, useEffect } from "react";
import { ticketStatoLabels, ticketStatoColors, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface Ticket {
  id: number;
  titolo: string;
  messaggio: string | null;
  stato: string | null;
  praticaId: number | null;
  clienteId: number;
  geometraId: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  clienteNome: string | null;
  clienteCognome: string | null;
  geometraNome: string | null;
  praticaTitolo: string | null;
}

interface Geometra {
  id: number;
  name: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("tutti");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [geometri, setGeometri] = useState<Geometra[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/tickets")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setTickets(data);
        if (!cancelled) setLoading(false);
      });
    fetch("/api/utenti")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) {
          setGeometri(data.filter((u: Geometra & { role?: string }) => u.role === "geometra" || u.role === "admin"));
        }
      });
    return () => { cancelled = true; };
  }, []);

  async function updateTicket(id: number, updates: { stato?: string; geometraId?: number | null }) {
    setSaving(true);
    await fetch(`/api/tickets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t
      )
    );
    if (selectedTicket?.id === id) {
      setSelectedTicket((prev) =>
        prev ? { ...prev, ...updates, updatedAt: new Date() } : prev
      );
    }
    setSaving(false);
  }

  const filtered =
    filter === "tutti"
      ? tickets
      : tickets.filter((t) => t.stato === filter);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Ticket</h1>
        <p className="text-slate-500 mt-1">Gestisci i ticket dei clienti</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["tutti", "aperto", "in_lavorazione", "risolto"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all cursor-pointer ${
              filter === f
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-500 hover:text-slate-700 shadow-sm border border-slate-200/60"
            }`}
          >
            {f === "tutti" ? "Tutti" : ticketStatoLabels[f]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-4 bg-slate-100 rounded-full w-1/4 animate-pulse" />
                <div className="h-4 bg-slate-100 rounded-full w-1/6 animate-pulse" />
                <div className="h-6 bg-slate-100 rounded-full w-20 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
            <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Nessun ticket trovato</h3>
          <p className="text-slate-500 text-sm">I ticket appariranno qui quando i clienti li apriranno</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50">
                  <th className="px-6 py-4">Ticket</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Pratica</th>
                  <th className="px-6 py-4">Stato</th>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-indigo-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedTicket(t)}
                        className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                      >
                        {t.titolo}
                      </button>
                      {t.messaggio && (
                        <p className="text-xs text-slate-400 mt-0.5 truncate max-w-xs">
                          {t.messaggio}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {t.clienteNome ? `${t.clienteNome} ${t.clienteCognome}` : "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {t.praticaTitolo || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${ticketStatoColors[t.stato || "aperto"]}`}
                      >
                        {ticketStatoLabels[t.stato || "aperto"]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {t.createdAt ? formatDate(t.createdAt) : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {t.stato === "aperto" && (
                          <button
                            onClick={() => updateTicket(t.id, { stato: "in_lavorazione" })}
                            className="text-xs font-medium text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
                          >
                            Prendi in carico
                          </button>
                        )}
                        {t.stato === "in_lavorazione" && (
                          <button
                            onClick={() => updateTicket(t.id, { stato: "risolto" })}
                            className="text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                          >
                            Risolvi
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedTicket && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Dettaglio Ticket</h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Titolo</p>
                  <p className="text-slate-900 font-semibold">{selectedTicket.titolo}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Stato</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ring-1 ring-inset ${ticketStatoColors[selectedTicket.stato || "aperto"]}`}>
                    {ticketStatoLabels[selectedTicket.stato || "aperto"]}
                  </span>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Cliente</p>
                  <p className="text-slate-900 font-semibold">
                    {selectedTicket.clienteNome ? `${selectedTicket.clienteNome} ${selectedTicket.clienteCognome}` : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Pratica</p>
                  <p className="text-slate-900 font-semibold">{selectedTicket.praticaTitolo || "—"}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Geometra</p>
                  <p className="text-slate-900 font-semibold">{selectedTicket.geometraNome || "Non assegnato"}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Data</p>
                  <p className="text-slate-900 font-semibold">{selectedTicket.createdAt ? formatDate(selectedTicket.createdAt) : "—"}</p>
                </div>
              </div>

              {selectedTicket.messaggio && (
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-2">Messaggio</p>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedTicket.messaggio}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2 border-t border-slate-100">
                {selectedTicket.stato === "aperto" && (
                  <Button
                    onClick={() => updateTicket(selectedTicket.id, { stato: "in_lavorazione" })}
                    loading={saving}
                    className="bg-amber-500 hover:bg-amber-600 focus:ring-amber-500 rounded-xl px-5"
                  >
                    Prendi in carico
                  </Button>
                )}
                {selectedTicket.stato === "in_lavorazione" && (
                  <Button
                    onClick={() => updateTicket(selectedTicket.id, { stato: "risolto" })}
                    loading={saving}
                    className="bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 rounded-xl px-5"
                  >
                    Risolvi
                  </Button>
                )}
                {selectedTicket.stato === "risolto" && (
                  <Button
                    onClick={() => updateTicket(selectedTicket.id, { stato: "aperto" })}
                    loading={saving}
                    variant="secondary"
                    className="rounded-xl px-5"
                  >
                    Riapri
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
