export interface AsciiArtEntry {
  id: number;
  nombre: string;
  aliases: string[];
  categoria: string;
  tags: string[];
  tipo: "ascii" | "unicode";
  art: string;
}
