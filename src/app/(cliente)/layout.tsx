import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== "cliente") {
    redirect("/login");
  }

  return <>{children}</>;
}
