"use client";

import { useState, useEffect } from "react";
import { roleLabels, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date | null;
}

export default function UtentiPage() {
  const [utenti, setUtenti] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "geometra" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/utenti")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setUtenti(data);
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/utenti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Errore durante la creazione");
        return;
      }

      const newUser = await res.json();
      setUtenti((prev) => [newUser, ...prev]);
      setForm({ name: "", email: "", password: "", role: "geometra" });
      setShowForm(false);
    } catch {
      setError("Errore di connessione");
    } finally {
      setSaving(false);
    }
  }

  const roleColors: Record<string, string> = {
    admin: "bg-indigo-100 text-indigo-700 ring-indigo-600/20",
    geometra: "bg-blue-100 text-blue-700 ring-blue-600/20",
    cliente: "bg-slate-100 text-slate-600 ring-slate-500/20",
  };

  const avatarGradients: Record<string, string> = {
    admin: "from-indigo-500 to-indigo-700",
    geometra: "from-blue-500 to-blue-700",
    cliente: "from-slate-400 to-slate-600",
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Utenti
          </h1>
          <p className="text-slate-500 mt-1">
            Gestisci gli utenti del sistema
          </p>
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
              Nuovo Utente
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Crea Nuovo Utente</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleCreate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                  placeholder="Mario Rossi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                  placeholder="email@esempio.it"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password *</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={6}
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                  placeholder="Min. 6 caratteri"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Ruolo</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                >
                  <option value="geometra">Geometra</option>
                  <option value="admin">Amministratore</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={saving} className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 rounded-xl px-6">
                Crea Utente
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => { setShowForm(false); setError(""); }}
                className="rounded-xl"
              >
                Annulla
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="text-sm text-slate-400 font-medium">
        {utenti.length} {utenti.length === 1 ? "utente" : "utenti"}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-slate-400">Caricamento...</span>
          </div>
        </div>
      ) : utenti.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-16 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-slate-500 font-medium">Nessun utente presente</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {utenti.map((u) => (
            <div
              key={u.id}
              className="group bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 hover:shadow-md hover:border-indigo-200/60 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${avatarGradients[u.role] || avatarGradients.cliente} flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-white`}
                >
                  {u.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 truncate">
                    {u.name}
                  </h3>
                  <p className="text-sm text-slate-400 truncate">{u.email}</p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ring-1 ring-inset ${roleColors[u.role] || roleColors.cliente}`}
                >
                  {roleLabels[u.role] || u.role}
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-400">
                  Registrato{" "}
                  {u.createdAt ? formatDate(u.createdAt) : "\u2014"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
