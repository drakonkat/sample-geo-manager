"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface AccountFormProps {
  user: { id: number; name: string; email: string; role: string };
}

export function AccountForm({ user }: AccountFormProps) {
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password && password !== confirmPassword) {
      setError("Le password non coincidono");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          ...(password ? { password } : {}),
        }),
      });

      if (res.ok) {
        setMessage("Profilo aggiornato con successo");
        setPassword("");
        setConfirmPassword("");
      } else {
        const data = await res.json();
        setError(data.error || "Errore durante l'aggiornamento");
      }
    } catch {
      setError("Errore di connessione");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      {message && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={user.email}
          disabled
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-50 text-gray-500"
        />
      </div>

      <div className="pt-2 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-3">
          Cambia Password (opzionale)
        </p>
        <div className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Nuova password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Conferma nuova password"
          />
        </div>
      </div>

      <Button type="submit" loading={loading}>
        Salva Modifiche
      </Button>
    </form>
  );
}
