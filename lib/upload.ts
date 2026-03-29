import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { supabase } from "./supabase";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const ALLOWED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "audio/mp3",
  "audio/x-wav",
];

export async function saveUploadedFile(
  file: File,
  subfolder: "artists" | "audio"
): Promise<string> {
  const allowedTypes =
    subfolder === "artists" ? ALLOWED_IMAGE_TYPES : ALLOWED_AUDIO_TYPES;

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Invalid file type: ${file.type}`);
  }

  const ext = file.name.split(".").pop() || "bin";
  const filename = `${randomUUID()}.${ext}`;

  // Audio → Supabase Storage (private bucket, streamed via /api/stream)
  if (subfolder === "audio") {
    const storagePath = `audio/${filename}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from("music")
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Return the storage path — served through authenticated /api/stream endpoint
    return storagePath;
  }

  // Images → local filesystem (static assets, publicly accessible)
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const dir = path.join(uploadDir, subfolder);
  await mkdir(dir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${subfolder}/${filename}`;
}
