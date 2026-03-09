import { z } from "zod";
import type { AsciiArtEntry } from "../types/asciiArt.js";

export const searchAsciiInputSchema = {
  categoria: z.string().min(1).optional(),
  tag: z.string().min(1).optional()
};

export function searchAscii(
  entries: AsciiArtEntry[],
  filters: { categoria?: string; tag?: string }
): AsciiArtEntry[] {
  const categoria = filters.categoria?.trim().toLowerCase();
  const tag = filters.tag?.trim().toLowerCase();

  if (!categoria && !tag) {
    return [];
  }

  return entries.filter((entry) => {
    const categoriaMatch = categoria
      ? entry.categoria.toLowerCase() === categoria
      : true;

    const tagMatch = tag
      ? entry.tags.some((entryTag) => entryTag.toLowerCase() === tag)
      : true;

    return categoriaMatch && tagMatch;
  });
}