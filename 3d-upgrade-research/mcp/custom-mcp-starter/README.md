# Custom MCP starter — PowerElectric catalog (optional / future)

Only build this if you want Claude to read/write the product catalog or manage 3D assets through a
tool interface (most relevant once the roadmap's AWS DynamoDB catalog exists). For the 3D website
upgrade you do **not** need it.

## The clean way
Use the installed **`mcp-builder`** skill — it scaffolds a well-designed MCP server with proper tool
schemas, error handling, and tests. Ask Claude: *"Use the mcp-builder skill to create a TypeScript
MCP server exposing `list_products`, `get_product`, and `upsert_product` backed by
`src/data/products.ts` (later: DynamoDB)."*

## Minimal shape (TypeScript, @modelcontextprotocol/sdk)
```ts
// server.ts — sketch only; let mcp-builder generate the real thing
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { products } from "../../src/data/products"; // keep Product type in sync

const server = new McpServer({ name: "powerelectric-catalog", version: "0.1.0" });

server.tool(
  "list_products",
  "List all PowerElectric products, optionally filtered by category.",
  { category: z.string().optional() },
  async ({ category }) => ({
    content: [{ type: "text", text: JSON.stringify(
      category ? products.filter(p => p.category === category) : products, null, 2) }],
  })
);

await server.connect(new StdioServerTransport());
```

## Register it (project scope)
```jsonc
// add to project .mcp.json
"powerelectric-catalog": {
  "command": "node",
  "args": ["3d-upgrade-research/mcp/custom-mcp-starter/dist/server.js"]
}
```

## Guardrails
- Keep the `Product` TypeScript interface as the single source of truth (matches CLAUDE.md roadmap).
- Don't wire write-tools to a live DB while unattended.
- Never expose secrets in tool output; read from `.env` by name.
