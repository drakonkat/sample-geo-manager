"use client";

import { useState, useEffect } from "react";
import { roleLabels, formatDate } from "@/lib/utils";

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

  useEffect(() => {
    let cancelled = false;
    fetch("/api/utenti")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setUtenti(data);
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
        <div className="text-sm text-slate-400 font-medium">
          {utenti.length} {utenti.length === 1 ? "utente" : "utenti"}
        </div>
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
            <svg
              className="w-8 h-8 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
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
