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
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (!cancelled && data) setUtenti(data);
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const roleColors: Record<string, string> = {
    admin: "bg-purple-100 text-purple-800",
    geometra: "bg-blue-100 text-blue-800",
    cliente: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Utenti</h1>
        <p className="text-gray-500 mt-1">Gestisci gli utenti del sistema</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Caricamento...</div>
      ) : utenti.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          Nessun utente presente
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                <th className="px-6 py-3">Nome</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Ruolo</th>
                <th className="px-6 py-3">Registrato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {utenti.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-semibold">
                        {u.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                      <span className="font-medium text-gray-900">
                        {u.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">
                    {u.email}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[u.role] || "bg-gray-100 text-gray-800"}`}
                    >
                      {roleLabels[u.role] || u.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">
                    {u.createdAt ? formatDate(u.createdAt) : "—"}
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
