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
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pratiche</h1>
          <p className="text-gray-500 mt-1">Gestisci le tue pratiche e commesse</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Annulla" : "+ Nuova Pratica"}
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Nuova Pratica</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titolo *
                </label>
                <input
                  type="text"
                  value={form.titolo}
                  onChange={(e) =>
                    setForm({ ...form, titolo: e.target.value })
                  }
                  required
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="es. Pratica Catastale Via Roma 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Indirizzo
                </label>
                <input
                  type="text"
                  value={form.indirizzo}
                  onChange={(e) =>
                    setForm({ ...form, indirizzo: e.target.value })
                  }
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Via Roma 1, Milano"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Foglio
                </label>
                <input
                  type="text"
                  value={form.foglio}
                  onChange={(e) =>
                    setForm({ ...form, foglio: e.target.value })
                  }
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Particella
                </label>
                <input
                  type="text"
                  value={form.particella}
                  onChange={(e) =>
                    setForm({ ...form, particella: e.target.value })
                  }
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub
                </label>
                <input
                  type="text"
                  value={form.sub}
                  onChange={(e) =>
                    setForm({ ...form, sub: e.target.value })
                  }
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrizione
              </label>
              <textarea
                value={form.descrizione}
                onChange={(e) =>
                  setForm({ ...form, descrizione: e.target.value })
                }
                rows={3}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" loading={saving}>
                Crea Pratica
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowForm(false)}
              >
                Annulla
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="flex gap-2">
        {["tutte", "aperta", "in_corso", "sospesa", "chiusa"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
              filter === f
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {f === "tutte" ? "Tutte" : statoLabels[f]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Caricamento...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          Nessuna pratica trovata
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                <th className="px-6 py-3">Pratica</th>
                <th className="px-6 py-3">Cliente</th>
                <th className="px-6 py-3">Geometra</th>
                <th className="px-6 py-3">Stato</th>
                <th className="px-6 py-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <Link
                      href={`/pratiche/${p.id}`}
                      className="font-medium text-gray-900 hover:text-blue-600"
                    >
                      {p.titolo}
                    </Link>
                    {p.indirizzo && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {p.indirizzo}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">
                    {p.clienteNome
                      ? `${p.clienteNome} ${p.clienteCognome}`
                      : "—"}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">
                    {p.geometraNome || "—"}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statoColors[p.stato]}`}
                    >
                      {statoLabels[p.stato]}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">
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
