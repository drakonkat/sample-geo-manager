"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  praticaId: number;
  onUploaded?: () => void;
}

export function FileUpload({ praticaId, onUploaded }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [visibileAlCliente, setVisibileAlCliente] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("praticaId", String(praticaId));
        formData.append("visibileAlCliente", String(visibileAlCliente));

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          alert(data.error || "Errore durante l'upload");
        }
      }
      onUploaded?.();
    } finally {
      setUploading(false);
    }
  }

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-3 text-sm cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            checked={visibileAlCliente}
            onChange={(e) => setVisibileAlCliente(e.target.checked)}
            className="peer sr-only"
          />
          <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all flex items-center justify-center">
            {visibileAlCliente && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">Visibile al cliente</span>
      </label>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-10 text-center transition-all",
          dragActive
            ? "border-indigo-400 bg-indigo-50 scale-[1.01]"
            : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
        )}
      >
        {uploading ? (
          <div className="flex flex-col items-center justify-center gap-3 text-indigo-600">
            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
              <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <p className="text-sm font-medium">Caricamento in corso...</p>
          </div>
        ) : (
          <>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-50 mb-4">
              <svg className="w-7 h-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm text-slate-600">
              Trascina i file qui o{" "}
              <label className="text-indigo-600 hover:text-indigo-500 cursor-pointer font-semibold underline underline-offset-2">
                sfoglia
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
            </p>
            <p className="mt-2 text-xs text-slate-400">
              PDF, DWG, DXF, immagini, documenti
            </p>
          </>
        )}
      </div>
    </div>
  );
}
