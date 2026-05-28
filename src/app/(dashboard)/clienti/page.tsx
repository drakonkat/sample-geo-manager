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
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clienti</h1>
          <p className="text-gray-500 mt-1">Gestisci l&apos;anagrafica dei clienti</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Annulla" : "+ Nuovo Cliente"}
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Nuovo Cliente</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "nome", label: "Nome *", placeholder: "Mario" },
                { key: "cognome", label: "Cognome *", placeholder: "Rossi" },
                { key: "email", label: "Email", placeholder: "mario@esempio.it" },
                { key: "telefono", label: "Telefono", placeholder: "+39 333 1234567" },
                { key: "indirizzo", label: "Indirizzo", placeholder: "Via Roma 1, Milano" },
                { key: "codiceFiscale", label: "Codice Fiscale", placeholder: "RSSMRA80A01F205X" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={(form as Record<string, string>)[field.key]}
                    onChange={(e) =>
                      setForm({ ...form, [field.key]: e.target.value })
                    }
                    required={field.label.includes("*")}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button type="submit" loading={saving}>
                Crea Cliente
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

      {loading ? (
        <div className="text-center py-12 text-gray-400">Caricamento...</div>
      ) : clienti.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          Nessun cliente presente
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                <th className="px-6 py-3">Nome</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Telefono</th>
                <th className="px-6 py-3">Codice Fiscale</th>
                <th className="px-6 py-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clienti.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {c.nome} {c.cognome}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">
                    {c.email || "—"}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">
                    {c.telefono || "—"}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500 font-mono">
                    {c.codiceFiscale || "—"}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">
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
