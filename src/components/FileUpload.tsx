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
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={visibileAlCliente}
          onChange={(e) => setVisibileAlCliente(e.target.checked)}
          className="rounded border-gray-300"
        />
        <span className="text-gray-700">Visibile al cliente</span>
      </label>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          dragActive
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        )}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Caricamento in corso...
          </div>
        ) : (
          <>
            <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              Trascina i file qui o{" "}
              <label className="text-blue-600 hover:text-blue-500 cursor-pointer font-medium">
                sfoglia
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
            </p>
            <p className="mt-1 text-xs text-gray-400">
              PDF, DWG, DXF, immagini, documenti
            </p>
          </>
        )}
      </div>
    </div>
  );
}
