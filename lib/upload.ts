import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

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
  const dir = path.join(UPLOAD_DIR, subfolder);

  await mkdir(dir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filepath = path.join(dir, filename);
  await writeFile(filepath, buffer);

  return `/uploads/${subfolder}/${filename}`;
}
