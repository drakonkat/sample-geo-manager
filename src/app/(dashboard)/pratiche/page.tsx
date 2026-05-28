"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { statoLabels, statoColors, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

interface Pratica {
  id: number;
  titolo: string;
  stato: string;
  indirizzo: string | null;
  createdAt: Date | null;
  clienteNome: string | null;
  clienteCognome: string | null;
  geometraNome: string | null;
}

export default function PratichePage() {
  const [pratiche, setPratiche] = useState<Pratica[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("tutte");
  const [form, setForm] = useState({
    titolo: "",
    descrizione: "",
    indirizzo: "",
    foglio: "",
    particella: "",
    sub: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/pratiche")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (!cancelled && data) setPratiche(data);
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/pratiche", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowForm(false);
      setForm({
        titolo: "",
        descrizione: "",
        indirizzo: "",
        foglio: "",
        particella: "",
        sub: "",
      });
      const data = await fetch("/api/pratiche").then((r) => r.json());
      setPratiche(data);
    }
    setSaving(false);
  }

  const filtered =
    filter === "tutte"
      ? pratiche
      : pratiche.filter((p) => p.stato === filter);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pratiche</h1>
          <p className="text-slate-500 mt-1">Gestisci le tue pratiche e commesse</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-sm hover:from-indigo-700 hover:to-indigo-600 transition-all cursor-pointer"
        >
          {showForm ? (
            "Annulla"
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuova Pratica
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Nuova Pratica</h2>
          <form onSubmit={handleCreate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Titolo *
                </label>
                <input
                  type="text"
                  value={form.titolo}
                  onChange={(e) =>
                    setForm({ ...form, titolo: e.target.value })
                  }
                  required
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                  placeholder="es. Pratica Catastale Via Roma 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Indirizzo
                </label>
                <input
                  type="text"
                  value={form.indirizzo}
                  onChange={(e) =>
                    setForm({ ...form, indirizzo: e.target.value })
                  }
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                  placeholder="Via Roma 1, Milano"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Foglio
                </label>
                <input
                  type="text"
                  value={form.foglio}
                  onChange={(e) =>
                    setForm({ ...form, foglio: e.target.value })
                  }
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Particella
                </label>
                <input
                  type="text"
                  value={form.particella}
                  onChange={(e) =>
                    setForm({ ...form, particella: e.target.value })
                  }
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Sub
                </label>
                <input
                  type="text"
                  value={form.sub}
                  onChange={(e) =>
                    setForm({ ...form, sub: e.target.value })
                  }
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Descrizione
              </label>
              <textarea
                value={form.descrizione}
                onChange={(e) =>
                  setForm({ ...form, descrizione: e.target.value })
                }
                rows={3}
                className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none resize-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={saving} className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 rounded-xl px-6">
                Crea Pratica
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowForm(false)}
                className="rounded-xl"
              >
                Annulla
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {["tutte", "aperta", "in_corso", "sospesa", "chiusa"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all cursor-pointer ${
              filter === f
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-500 hover:text-slate-700 shadow-sm border border-slate-200/60"
            }`}
          >
            {f === "tutte" ? "Tutte" : statoLabels[f]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-4 bg-slate-100 rounded-full w-1/4 animate-pulse" />
                <div className="h-4 bg-slate-100 rounded-full w-1/6 animate-pulse" />
                <div className="h-4 bg-slate-100 rounded-full w-1/6 animate-pulse" />
                <div className="h-6 bg-slate-100 rounded-full w-20 animate-pulse" />
                <div className="h-4 bg-slate-100 rounded-full w-1/6 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
            <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Nessuna pratica trovata</h3>
          <p className="text-slate-500 text-sm">Crea una nuova pratica per iniziare</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="px-6 py-4">Pratica</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Geometra</th>
                <th className="px-6 py-4">Stato</th>
                <th className="px-6 py-4">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-indigo-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      href={`/pratiche/${p.id}`}
                      className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                    >
                      {p.titolo}
                    </Link>
                    {p.indirizzo && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        {p.indirizzo}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {p.clienteNome
                      ? `${p.clienteNome} ${p.clienteCognome}`
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {p.geometraNome || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statoColors[p.stato]}`}
                    >
                      {statoLabels[p.stato]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {p.createdAt ? formatDate(p.createdAt) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
