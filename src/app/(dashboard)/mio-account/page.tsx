import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { roleLabels } from "@/lib/utils";
import { AccountForm } from "./AccountForm";

export default async function MioAccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Il Mio Account
        </h1>
        <p className="text-slate-500 mt-1">
          Gestisci le impostazioni del tuo profilo
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-indigo-600 to-indigo-500" />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-5 -mt-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-2xl font-bold text-white shadow-lg ring-4 ring-white">
              {user.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div className="pb-1">
              <h2 className="text-xl font-semibold text-slate-900">
                {user.name}
              </h2>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-100 text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
              {roleLabels[user.role]}
            </span>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100">
            <AccountForm user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
