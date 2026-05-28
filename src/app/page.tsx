import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";

export default async function HomePage() {
  await ensureSeeded();

  const user = await getCurrentUser();
  if (user) {
    if (user.role === "cliente") {
      redirect("/portal");
    } else {
      redirect("/dashboard");
    }
  }
  redirect("/login");
}
