import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AsciiArtEntry } from "../types/asciiArt.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "../../db.json");

function sanitizeInvalidBackslashes(raw: string): string {
  return raw.replace(/\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g, "\\\\");
}

export function loadAsciiArtDb(): AsciiArtEntry[] {
  const raw = readFileSync(dbPath, "utf-8");

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      throw new Error("Invalid db.json format: expected an array.");
    }

    return parsed as AsciiArtEntry[];

  } catch (err) {
    // intentar reparar solo los backslashes
    const sanitized = sanitizeInvalidBackslashes(raw);

    const parsed = JSON.parse(sanitized);

    if (!Array.isArray(parsed)) {
      throw new Error("Invalid db.json format: expected an array.");
    }

    return parsed as AsciiArtEntry[];
  }
}