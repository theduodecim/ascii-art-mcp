# ascii-art-mcp

**ascii-art-mcp** is a **Model Context Protocol (MCP) server** built with **Node.js and TypeScript** that exposes tools for retrieving **ASCII and Unicode art** from a local database.

The server communicates using **stdio transport**, making it compatible with MCP clients such as Claude Desktop, Cursor, LM Studio, Open WebUI, and other MCP-compatible environments.

---

# 📦 Installation

The package is available on npm:

https://www.npmjs.com/package/ascii-art-mcp

Install locally:

```bash
npm install ascii-art-mcp
```

Or run directly:

```bash
npx ascii-art-mcp
```

---

# 🌐 MCP Registry

This server is also published in the official **Model Context Protocol Registry**:

https://registry.modelcontextprotocol.io/?q=ascii-art

Server name:

```
io.github.theduodecim/ascii-art
```

This allows MCP-compatible tools to discover and install it automatically.

---

# ⚙️ Requirements

* Node.js **20+**
* npm

---

# 🚀 Running the server

Development mode:

```bash
npm run dev
```

Build + production run:

```bash
npm run build
npm start
```

The server uses **stdio transport** and loads its data from:

```
db.json
```

located in the repository root.

---

# 🧰 Available MCP Tools

## get_ascii_art

Finds an art entry by exact `nombre` or by an exact value in `aliases`.

### Input

| Field | Type   | Required |
| ----- | ------ | -------- |
| query | string | yes      |

### Output

Returns the entry's **art field** as plain text.

---

## search_ascii

Searches entries by **categoria**, **tags**, or both.

### Input

| Field     | Type   | Required |
| --------- | ------ | -------- |
| categoria | string | optional |
| tag       | string | optional |

At least **one filter is required**.

### Output

Returns matching entries' **art fields combined as text output**.

---

## random_ascii

Returns a **random entry** from the database.

### Input

| Field | Type            | Required |
| ----- | --------------- | -------- |
| tipo  | ascii | unicode | optional |

### Output

Returns the selected entry's **art field** as plain text.

---

## list_categories

Lists all **unique categories** present in the database.

### Input

None

### Output

Category names as **newline-separated text**.

---

# 🗂 Data Model

Entries in `db.json` follow the **AsciiArtEntry** TypeScript interface:

```
src/types/asciiArt.ts
```

Each entry contains metadata such as:

* name
* category
* tags
* aliases
* art content

---

# 🧪 Testing the MCP Server

A simple integration test was used to verify MCP communication using **JSON-RPC over stdio**.

Example test script (`test.mjs`):

```javascript
import { spawn } from "child_process";

const proc = spawn("node", ["dist/server.js"], {
  stdio: ["pipe", "pipe", "pipe"]
});

proc.stderr.on("data", (d) => {
  console.log("LOG:", d.toString());
});

proc.stdout.on("data", (d) => {
  console.log("SERVER:", d.toString());
});

function send(msg) {
  const json = JSON.stringify(msg);

  const payload =
    `Content-Length: ${Buffer.byteLength(json)}\r\n\r\n${json}\r\n`;

  console.log("\nSENDING:\n", json, "\n");

  proc.stdin.write(payload);
}

setTimeout(() => {
  send({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "tester", version: "1.0" }
    }
  });
}, 500);

setTimeout(() => {
  send({
    jsonrpc: "2.0",
    method: "initialized",
    params: {}
  });
}, 1000);

setTimeout(() => {
  send({
    jsonrpc: "2.0",
    id: 2,
    method: "tools/list"
  });
}, 1500);

setTimeout(() => {
  proc.kill();
  console.log("TEST FINISHED");
}, 4000);
```

This verifies that the server:

* initializes correctly
* registers MCP tools
* responds over stdio

---

# 🧠 Architecture

The project is structured as:

```
src/
  server.ts
  tools/
  types/
dist/
db.json
```

Main components:

* **TypeScript MCP server**
* **JSON database (db.json)**
* **Zod validation for tool inputs**
* **stdio transport**

---

# 🎯 Purpose

This project demonstrates how to build a **simple MCP tool server** that:

* runs locally
* requires no API keys
* exposes structured tools
* serves static data through MCP

It can be used for:

* testing MCP clients
* demonstrations
* fun ASCII art generation
* example implementations of MCP tooling

---

# 📜 License

MIT
