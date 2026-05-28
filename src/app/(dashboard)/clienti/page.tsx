"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

interface Cliente {
  id: number;
  nome: string;
  cognome: string;
  email: string | null;
  telefono: string | null;
  indirizzo: string | null;
  codiceFiscale: string | null;
  createdAt: Date | null;
}

export default function ClientiPage() {
  const [clienti, setClienti] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    indirizzo: "",
    codiceFiscale: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/clienti")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (!cancelled && data) setClienti(data);
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/clienti", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowForm(false);
      setForm({
        nome: "",
        cognome: "",
        email: "",
        telefono: "",
        indirizzo: "",
        codiceFiscale: "",
      });
      const data = await fetch("/api/clienti").then((r) => r.json());
      setClienti(data);
    }
    setSaving(false);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Clienti</h1>
          <p className="text-slate-500 mt-1">Gestisci l&apos;anagrafica dei clienti</p>
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
              Nuovo Cliente
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Nuovo Cliente</h2>
          <form onSubmit={handleCreate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { key: "nome", label: "Nome *", placeholder: "Mario" },
                { key: "cognome", label: "Cognome *", placeholder: "Rossi" },
                { key: "email", label: "Email", placeholder: "mario@esempio.it" },
                { key: "telefono", label: "Telefono", placeholder: "+39 333 1234567" },
                { key: "indirizzo", label: "Indirizzo", placeholder: "Via Roma 1, Milano" },
                { key: "codiceFiscale", label: "Codice Fiscale", placeholder: "RSSMRA80A01F205X" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={(form as Record<string, string>)[field.key]}
                    onChange={(e) =>
                      setForm({ ...form, [field.key]: e.target.value })
                    }
                    required={field.label.includes("*")}
                    className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={saving} className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 rounded-xl px-6">
                Crea Cliente
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

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-4 bg-slate-100 rounded-full w-1/5 animate-pulse" />
                <div className="h-4 bg-slate-100 rounded-full w-1/4 animate-pulse" />
                <div className="h-4 bg-slate-100 rounded-full w-1/6 animate-pulse" />
                <div className="h-4 bg-slate-100 rounded-full w-1/5 animate-pulse" />
                <div className="h-4 bg-slate-100 rounded-full w-1/6 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ) : clienti.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
            <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Nessun cliente presente</h3>
          <p className="text-slate-500 text-sm">Aggiungi il tuo primo cliente per iniziare</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Telefono</th>
                <th className="px-6 py-4">Codice Fiscale</th>
                <th className="px-6 py-4">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clienti.map((c) => (
                <tr key={c.id} className="hover:bg-indigo-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 text-sm">
                    {c.nome} {c.cognome}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {c.email || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {c.telefono || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-mono">
                    {c.codiceFiscale || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {c.createdAt ? formatDate(c.createdAt) : "—"}
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
