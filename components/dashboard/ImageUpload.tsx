"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  currentImage: string | null;
  onUpload: (url: string) => void;
}

export default function ImageUpload({ currentImage, onUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "artists");

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setPreview(data.url);
        onUpload(data.url);
      }
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative w-full aspect-[4/3] rounded-xl border-2 border-dashed cursor-pointer transition-colors overflow-hidden flex items-center justify-center ${
        dragOver
          ? "border-accent-from bg-accent-from/5"
          : "border-border hover:border-accent-from/40"
      }`}
    >
      {preview ? (
        <img
          src={preview}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-center p-6">
          <svg className="w-10 h-10 text-text-secondary/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.04l-.821 1.315Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
          </svg>
          <p className="text-text-secondary text-sm">
            {uploading ? "Uploading..." : "Click or drag to upload"}
          </p>
          <p className="text-text-secondary/50 text-xs mt-1">
            JPG, PNG, or WebP
          </p>
        </div>
      )}

      {preview && !uploading && (
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <p className="text-white text-sm">Click to change</p>
        </div>
      )}

      {uploading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <p className="text-white text-sm">Uploading...</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
