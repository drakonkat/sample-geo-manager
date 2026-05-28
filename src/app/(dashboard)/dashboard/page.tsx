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
      gradient: "from-indigo-500 to-indigo-600",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      label: "Aperte",
      value: praticheAperte[0].count,
      gradient: "from-emerald-500 to-emerald-600",
      icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
    },
    {
      label: "In Corso",
      value: praticheInCorso[0].count,
      gradient: "from-amber-500 to-amber-600",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "Clienti",
      value: totalClienti[0].count,
      gradient: "from-violet-500 to-violet-600",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    },
  ];

  const today = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <p className="text-sm text-slate-500 mb-1">{today}</p>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Benvenuto, {user?.name}. Ecco il riepilogo delle attività.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center gap-4">
              <div
                className={`bg-gradient-to-br ${stat.gradient} w-12 h-12 rounded-xl flex items-center justify-center shadow-sm`}
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
                <p className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Ultime Pratiche</h2>
          <Link
            href="/pratiche"
            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Vedi tutte →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3 first:rounded-tl-lg last:rounded-tr-lg">Pratica</th>
                <th className="px-6 py-3">Cliente</th>
                <th className="px-6 py-3">Stato</th>
                <th className="px-6 py-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentPratiche.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-16 h-16 text-slate-200 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-slate-500 font-medium mb-1">
                        Nessuna pratica presente
                      </p>
                      <p className="text-sm text-slate-400 mb-4">
                        Inizia creando la tua prima pratica
                      </p>
                      <Link
                        href="/pratiche"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
                      >
                        Crea la prima →
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                recentPratiche.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-3.5">
                      <Link
                        href={`/pratiche/${p.id}`}
                        className="font-medium text-slate-900 hover:text-indigo-600 transition-colors"
                      >
                        {p.titolo}
                      </Link>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-slate-500">
                      {p.clienteNome
                        ? `${p.clienteNome} ${p.clienteCognome}`
                        : "—"}
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statoColors[p.stato || "aperta"]}`}
                      >
                        {statoLabels[p.stato || "aperta"]}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-slate-500">
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
