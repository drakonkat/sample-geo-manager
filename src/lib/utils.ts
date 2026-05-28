import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function formatDate(date: Date | number | string | null): string {
  if (!date) return "—";
  const d = date instanceof Date ? date : new Date(typeof date === "number" ? date * 1000 : date);
  if (isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export const statoLabels: Record<string, string> = {
  aperta: "Aperta",
  in_corso: "In Corso",
  sospesa: "Sospesa",
  chiusa: "Chiusa",
};

export const statoColors: Record<string, string> = {
  aperta: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
  in_corso: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
  sospesa: "bg-slate-50 text-slate-700 ring-1 ring-slate-600/20",
  chiusa: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20",
};

export const roleLabels: Record<string, string> = {
  admin: "Amministratore",
  geometra: "Geometra",
  cliente: "Cliente",
};

export const ticketStatoLabels: Record<string, string> = {
  aperto: "Aperto",
  in_lavorazione: "In Lavorazione",
  risolto: "Risolto",
};

export const ticketStatoColors: Record<string, string> = {
  aperto: "bg-red-50 text-red-700 ring-1 ring-red-600/20",
  in_lavorazione: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
  risolto: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
};
