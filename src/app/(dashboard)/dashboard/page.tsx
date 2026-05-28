import { db } from "@/db";
import { pratiche, clienti, tickets } from "@/db/schema";
import { eq, count } from "drizzle-orm";
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
  const ticketsAperti = await db
    .select({ count: count() })
    .from(tickets)
    .where(eq(tickets.stato, "aperto"));

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
      label: "Ticket Aperti",
      value: ticketsAperti[0].count,
      gradient: "from-red-500 to-red-600",
      icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <div className="p-4">
            <RecentPratiche />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Ticket Recenti</h2>
            <Link
              href="/tickets"
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Vedi tutti →
            </Link>
          </div>
          <div className="p-4">
            <RecentTickets />
          </div>
        </div>
      </div>
    </div>
  );
}

async function RecentPratiche() {
  const recentPratiche = await db
    .select({
      id: pratiche.id,
      titolo: pratiche.titolo,
      stato: pratiche.stato,
      createdAt: pratiche.createdAt,
    })
    .from(pratiche)
    .orderBy(pratiche.createdAt)
    .limit(5);

  if (recentPratiche.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500 font-medium">Nessuna pratica presente</p>
        <p className="text-sm text-slate-400 mt-1">Inizia creando la tua prima pratica</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {recentPratiche.map((p: { id: number; titolo: string; stato: string; createdAt: Date | null }) => (
        <div key={p.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="min-w-0">
            <Link
              href={`/pratiche/${p.id}`}
              className="font-medium text-slate-900 hover:text-indigo-600 transition-colors text-sm"
            >
              {p.titolo}
            </Link>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${statoColors[p.stato || "aperta"]}`}>
              {statoLabels[p.stato || "aperta"]}
            </span>
            <span className="text-xs text-slate-400">
              {p.createdAt ? formatDate(p.createdAt) : "—"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

async function RecentTickets() {
  const recentTickets = await db
    .select({
      id: tickets.id,
      titolo: tickets.titolo,
      stato: tickets.stato,
      createdAt: tickets.createdAt,
    })
    .from(tickets)
    .orderBy(tickets.createdAt)
    .limit(5);

  const ticketStatoLabels: Record<string, string> = {
    aperto: "Aperto",
    in_lavorazione: "In Lavorazione",
    risolto: "Risolto",
  };

  const ticketStatoColors: Record<string, string> = {
    aperto: "bg-red-50 text-red-700 ring-1 ring-red-600/20",
    in_lavorazione: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
    risolto: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
  };

  if (recentTickets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500 font-medium">Nessun ticket presente</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {recentTickets.map((t: { id: number; titolo: string; stato: string; createdAt: Date | null }) => (
        <div key={t.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="min-w-0">
            <p className="font-medium text-slate-900 text-sm truncate">{t.titolo}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${ticketStatoColors[t.stato || "aperto"]}`}>
              {ticketStatoLabels[t.stato || "aperto"]}
            </span>
            <span className="text-xs text-slate-400">
              {t.createdAt ? formatDate(t.createdAt) : "—"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
