import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { loadAsciiArtDb } from "./data/loadDb.js";
import { getAsciiArt, getAsciiArtInputSchema } from "./tools/getAsciiArt.js";
import { listCategories, listCategoriesInputSchema } from "./tools/listCategories.js";
import { randomAscii, randomAsciiInputSchema } from "./tools/randomAscii.js";
import { searchAscii, searchAsciiInputSchema } from "./tools/searchAscii.js";

const entries = loadAsciiArtDb();

const server = new McpServer({
  name: "ascii-art-mcp",
  version: "0.1.0",
});

server.tool(
  "get_ascii_art",
  "Search an ASCII/Unicode art entry by nombre or aliases and return the art text.",
  getAsciiArtInputSchema,
  async ({ query }) => {
    const entry = getAsciiArt(entries, query);

    if (!entry) {
      return {
        content: [
          {
            type: "text",
            text: `No entry found for query: ${query}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: entry.art,
        },
      ],
    };
  }
);

server.tool(
  "search_ascii",
  "Search entries by categoria or tags and return matching art texts.",
  searchAsciiInputSchema,
  async ({ categoria, tag }) => {
    const results = searchAscii(entries, { categoria, tag });

    if (results.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "No entries found with the provided filters.",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: results.map((entry) => entry.art).join("\n\n---\n\n"),
        },
      ],
    };
  }
);

server.tool(
  "random_ascii",
  "Return a random ASCII/Unicode art entry, optionally filtered by tipo.",
  randomAsciiInputSchema,
  async ({ tipo }) => {
    const entry = randomAscii(entries, tipo);

    if (!entry) {
      return {
        content: [
          {
            type: "text",
            text: "No entries available for the selected tipo.",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: entry.art,
        },
      ],
    };
  }
);

server.tool(
  "list_categories",
  "List all unique categories available in the database.",
  listCategoriesInputSchema,
  async () => {
    const categories = listCategories(entries);

    return {
      content: [
        {
          type: "text",
          text: categories.join("\n"),
        },
      ],
    };
  }
);

async function main() {
  try {
    console.error("Starting MCP server...");

    const transport = new StdioServerTransport();

    console.error("Connecting transport...");

    await server.connect(transport);

    console.error("MCP server connected.");
  } catch (error) {
    console.error("Failed to start MCP server:", error);
    process.exit(1);
  }
}

main();