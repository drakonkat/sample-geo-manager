"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "cliente" as string,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Le password non coincidono");
      return;
    }

    if (form.password.length < 6) {
      setError("La password deve essere di almeno 6 caratteri");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Errore di registrazione");
        return;
      }

      if (data.user.role === "cliente") {
        router.push("/portal");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch {
      setError("Errore di connessione");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">GeoGest</h1>
          <p className="text-gray-500 mt-1">Crea il tuo account</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Mario Rossi"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="email@esempio.it"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Ruolo
              </label>
              <select
                id="role"
                value={form.role}
                onChange={(e) => updateField("role", e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="cliente">Cliente</option>
                <option value="geometra">Geometra</option>
                <option value="admin">Amministratore</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Conferma password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Registrazione..." : "Registrati"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Hai già un account?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Accedi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
