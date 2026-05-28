import { db } from "@/db";
import { pratiche, clienti, documenti, users } from "@/db/schema";
import { eq, count, and } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { statoLabels, statoColors, formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const totalPratiche = await db.select({ count: count() }).from(pratiche);
  const praticheAperte = await db
    .select({ count: count() })
    .from(pratiche)
    .where(eq(pratiche.stato, "aperta"));
  const praticheInCorso = await db
    .select({ count: count() })
    .from(pratiche)
    .where(eq(pratiche.stato, "in_corso"));
  const totalClienti = await db.select({ count: count() }).from(clienti);

  const recentPratiche = await db
    .select({
      id: pratiche.id,
      titolo: pratiche.titolo,
      stato: pratiche.stato,
      createdAt: pratiche.createdAt,
      clienteNome: clienti.nome,
      clienteCognome: clienti.cognome,
    })
    .from(pratiche)
    .leftJoin(clienti, eq(pratiche.clienteId, clienti.id))
    .orderBy(pratiche.createdAt)
    .limit(5);

  const stats = [
    {
      label: "Pratiche Totali",
      value: totalPratiche[0].count,
      color: "bg-blue-500",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      label: "Aperte",
      value: praticheAperte[0].count,
      color: "bg-green-500",
      icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
    },
    {
      label: "In Corso",
      value: praticheInCorso[0].count,
      color: "bg-yellow-500",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "Clienti",
      value: totalClienti[0].count,
      color: "bg-purple-500",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Benvenuto, {user?.name}. Ecco il riepilogo delle attività.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-center gap-4">
              <div
                className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={stat.icon}
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Ultime Pratiche</h2>
          <Link
            href="/pratiche"
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            Vedi tutte →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                <th className="px-6 py-3">Pratica</th>
                <th className="px-6 py-3">Cliente</th>
                <th className="px-6 py-3">Stato</th>
                <th className="px-6 py-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentPratiche.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    Nessuna pratica presente.{" "}
                    <Link
                      href="/pratiche"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Crea la prima →
                    </Link>
                  </td>
                </tr>
              ) : (
                recentPratiche.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <Link
                        href={`/pratiche/${p.id}`}
                        className="font-medium text-gray-900 hover:text-blue-600"
                      >
                        {p.titolo}
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">
                      {p.clienteNome
                        ? `${p.clienteNome} ${p.clienteCognome}`
                        : "—"}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statoColors[p.stato || "aperta"]}`}
                      >
                        {statoLabels[p.stato || "aperta"]}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">
                      {p.createdAt ? formatDate(p.createdAt) : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
