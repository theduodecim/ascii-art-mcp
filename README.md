# ascii-art-mcp

`ascii-art-mcp` is a Model Context Protocol (MCP) server built with Node.js and TypeScript. It serves ASCII and Unicode art from the local `db.json` database through validated MCP tools.

## Requirements

- Node.js 20+
- npm

## Installation

```bash
npm install
```

## Run the MCP server

Development mode:

```bash
npm run dev
```

Build + production run:

```bash
npm run build
npm start
```

The server uses stdio transport and loads data from `db.json` at the repository root.

## Available tools

### `get_ascii_art`
Finds an art entry by exact `nombre` or exact value in `aliases`.

**Input**
- `query` (string, required)

**Output**
- Returns the entry's `art` field as plain text.

### `search_ascii`
Searches entries by `categoria`, `tags`, or both.

**Input**
- `categoria` (string, optional)
- `tag` (string, optional)

At least one filter is required.

**Output**
- Returns matching entries' `art` fields combined in text output.

### `random_ascii`
Returns a random entry from the database.

**Input**
- `tipo` (`ascii` | `unicode`, optional)

**Output**
- Returns the selected entry's `art` field as plain text.

### `list_categories`
Lists unique categories present in the database.

**Input**
- none

**Output**
- Returns category names as newline-separated text.

## Data model

Entries in `db.json` are represented by the `AsciiArtEntry` TypeScript interface in `src/types/asciiArt.ts`.
