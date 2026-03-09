import { z } from "zod";
import type { AsciiArtEntry } from "../types/asciiArt.js";

export const randomAsciiInputSchema = z.object({
  tipo: z.enum(["ascii", "unicode"]).optional()
});

export function randomAscii(
  entries: AsciiArtEntry[],
  tipo?: "ascii" | "unicode"
): AsciiArtEntry | null {
  const pool = tipo ? entries.filter((entry) => entry.tipo === tipo) : entries;

  if (pool.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * pool.length);
  return pool[index] ?? null;
}
