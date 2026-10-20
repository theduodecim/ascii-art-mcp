import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { asciiArtDatabaseSchema } from "../src/types/asciiArt.js";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const databasePath = path.resolve(scriptDirectory, "../db.json");

try {
  const raw = readFileSync(databasePath, "utf8");
  const entries = asciiArtDatabaseSchema.parse(JSON.parse(raw));
  console.log(`Validated ${entries.length} ASCII art entries.`);
} catch (error) {
  console.error("db.json validation failed:");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
