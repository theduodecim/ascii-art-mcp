import { z } from "zod";

const cleanLabel = z.string().min(1).refine((value) => value.trim() === value);

export const asciiArtEntrySchema = z
  .object({
    id: z.number().int().positive(),
    nombre: cleanLabel,
    aliases: z.array(cleanLabel),
    categoria: cleanLabel,
    tags: z.array(cleanLabel),
    tipo: z.enum(["ascii", "unicode"]),
    art: z.string().min(1),
  })
  .strict();

export const asciiArtDatabaseSchema = z.array(asciiArtEntrySchema).superRefine((entries, context) => {
  const ids = new Set<number>();
  const lookupNames = new Map<string, number>();

  entries.forEach((entry, index) => {
    if (ids.has(entry.id)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [index, "id"],
        message: `Duplicate id ${entry.id}.`,
      });
    }
    ids.add(entry.id);

    for (const name of [entry.nombre, ...entry.aliases]) {
      const normalized = name.toLocaleLowerCase();
      const previousIndex = lookupNames.get(normalized);
      if (previousIndex !== undefined) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [index, "nombre"],
          message: `Name or alias "${name}" duplicates an entry at index ${previousIndex + 1}.`,
        });
      } else {
        lookupNames.set(normalized, index);
      }
    }

    const normalizedTags = entry.tags.map((tag) => tag.toLocaleLowerCase());
    if (new Set(normalizedTags).size !== normalizedTags.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [index, "tags"],
        message: "Tags must be unique, ignoring case.",
      });
    }
  });
});

export type AsciiArtEntry = z.infer<typeof asciiArtEntrySchema>;
