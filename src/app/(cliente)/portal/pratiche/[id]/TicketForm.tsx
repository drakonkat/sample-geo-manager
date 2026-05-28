"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function TicketForm({ praticaId }: { praticaId: number }) {
  const [titolo, setTitolo] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [saving, setSaving] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titolo,
          messaggio,
          praticaId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Errore durante l'invio");
        return;
      }

      setSent(true);
      setTitolo("");
      setMessaggio("");
    } catch {
      setError("Errore di connessione");
    } finally {
      setSaving(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8 text-center">
        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">Ticket inviato!</h3>
        <p className="text-slate-500 text-sm mb-4">
          Il tuo ticket è stato creato. Il geometra lo vedrà e lavorerà alla risoluzione.
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
        >
          Apri un altro ticket
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
      <h2 className="font-semibold text-slate-900 mb-5 flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </div>
        Apri Ticket
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Titolo *
          </label>
          <input
            type="text"
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
            required
            className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
            placeholder="es. Documentazione mancante"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Messaggio
          </label>
          <textarea
            value={messaggio}
            onChange={(e) => setMessaggio(e.target.value)}
            rows={3}
            className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none resize-none"
            placeholder="Descrivi il tuo problema o richiesta..."
          />
        </div>
        <Button
          type="submit"
          loading={saving}
          className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 rounded-xl px-6"
        >
          Invia Ticket
        </Button>
      </form>
    </div>
  );
}
