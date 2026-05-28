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

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export const statoLabels: Record<string, string> = {
  aperta: "Aperta",
  in_corso: "In Corso",
  sospesa: "Sospesa",
  chiusa: "Chiusa",
};

export const statoColors: Record<string, string> = {
  aperta: "bg-blue-100 text-blue-800",
  in_corso: "bg-yellow-100 text-yellow-800",
  sospesa: "bg-gray-100 text-gray-800",
  chiusa: "bg-green-100 text-green-800",
};

export const roleLabels: Record<string, string> = {
  admin: "Amministratore",
  geometra: "Geometra",
  cliente: "Cliente",
};
