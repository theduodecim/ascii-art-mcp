import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { asciiArtDatabaseSchema, type AsciiArtEntry } from "../types/asciiArt.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "../../db.json");

export function loadAsciiArtDb(): AsciiArtEntry[] {
  const raw = readFileSync(dbPath, "utf-8");
  return asciiArtDatabaseSchema.parse(JSON.parse(raw));
}
