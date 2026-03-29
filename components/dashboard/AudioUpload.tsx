"use client";

import { useState, useRef } from "react";

interface AudioUploadProps {
  onUpload: (url: string) => void;
}

export default function AudioUpload({ onUpload }: AudioUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "audio");

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        onUpload(data.url);
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-accent-from/40 transition-colors"
    >
      {fileName ? (
        <div>
          <p className="text-text-primary text-sm mb-1">{fileName}</p>
          <p className="text-text-secondary text-xs">
            {uploading ? "Uploading..." : "Uploaded successfully"}
          </p>
        </div>
      ) : (
        <div>
          <svg className="w-8 h-8 text-text-secondary/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
          </svg>
          <p className="text-text-secondary text-sm">
            Click to upload audio file
          </p>
          <p className="text-text-secondary/50 text-xs mt-1">MP3 or WAV</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="audio/mpeg,audio/wav,audio/mp3,audio/x-wav"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
