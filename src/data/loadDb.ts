import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AsciiArtEntry } from "../types/asciiArt.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "../../db.json");

function sanitizeInvalidBackslashes(raw: string): string {
  return raw.replace(/\\(?!["\\/bfnrtu])/g, "\\\\");
}

export function loadAsciiArtDb(): AsciiArtEntry[] {
  const raw = readFileSync(dbPath, "utf-8");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = JSON.parse(sanitizeInvalidBackslashes(raw));
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Invalid db.json format: expected an array of entries.");
  }

  return parsed as AsciiArtEntry[];
}
