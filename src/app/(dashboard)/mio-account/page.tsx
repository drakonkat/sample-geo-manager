import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { roleLabels } from "@/lib/utils";
import { AccountForm } from "./AccountForm";

export default async function MioAccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Il Mio Account</h1>
        <p className="text-gray-500 mt-1">Gestisci le impostazioni del tuo profilo</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xl font-bold">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
              {roleLabels[user.role]}
            </span>
          </div>
        </div>
        <AccountForm user={user} />
      </div>
    </div>
  );
}
