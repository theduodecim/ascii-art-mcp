import { z } from "zod";
import type { AsciiArtEntry } from "../types/asciiArt.js";

export const getAsciiArtInputSchema = {
  query: z.string().min(1, "query is required")
};

export function getAsciiArt(
  entries: AsciiArtEntry[],
  query: string
): AsciiArtEntry | null {
  const normalized = query.trim().toLowerCase();

  return (
    entries.find((entry) => {
      if (entry.nombre.toLowerCase() === normalized) {
        return true;
      }

      return entry.aliases.some(
        (alias) => alias.toLowerCase() === normalized
      );
    }) ?? null
  );
}