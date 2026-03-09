import { z } from "zod";
import type { AsciiArtEntry } from "../types/asciiArt.js";

export const listCategoriesInputSchema = z.object({});

export function listCategories(entries: AsciiArtEntry[]): string[] {
  return [...new Set(entries.map((entry) => entry.categoria))].sort((a, b) =>
    a.localeCompare(b)
  );
}
