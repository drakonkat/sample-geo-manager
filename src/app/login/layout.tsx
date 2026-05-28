import { ensureSeeded } from "@/lib/seed";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await ensureSeeded();
  return <>{children}</>;
}
