import { z } from "zod";
import type { AsciiArtEntry } from "../types/asciiArt.js";

export const searchAsciiInputSchema = z
  .object({
    categoria: z.string().min(1).optional(),
    tag: z.string().min(1).optional()
  })
  .refine((data) => Boolean(data.categoria || data.tag), {
    message: "At least one filter is required: categoria or tag"
  });

export function searchAscii(
  entries: AsciiArtEntry[],
  filters: { categoria?: string; tag?: string }
): AsciiArtEntry[] {
  const categoria = filters.categoria?.trim().toLowerCase();
  const tag = filters.tag?.trim().toLowerCase();

  return entries.filter((entry) => {
    const categoriaMatch = categoria ? entry.categoria.toLowerCase() === categoria : true;
    const tagMatch = tag
      ? entry.tags.some((entryTag) => entryTag.toLowerCase() === tag)
      : true;

    return categoriaMatch && tagMatch;
  });
}
