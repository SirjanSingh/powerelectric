# MCP Connectors — setup, auth, gotchas

Two ready configs are in this folder:
- **`mcp/.mcp.json`** — project-scope servers for **Claude Code** (Context7, Playwright, shadcn).
- **`mcp/claude-desktop-config.json`** — **Blender-MCP** for **Claude Desktop**.

General facts (verify with `claude mcp list` / `/mcp`):
- Claude Code stores global MCP config in `~/.claude.json`; per-project config in `./.mcp.json`
  (commit it so the setup is shareable; teammates get a one-time approval prompt).
- Add servers either by editing `.mcp.json` or via CLI: `claude mcp add <name> <command> [args…]`,
  with `--scope project` (shared) or `--scope user` (all your projects).
- **Node 20+ required.** On Windows, npx-based servers work in Claude Code directly.
- Tip: name the tool explicitly in your first message ("use Playwright MCP…") — otherwise Claude
  sometimes falls back to running things through Bash.

---

## ★★★ Context7 — live, version-correct docs
**Why:** stops hallucinated APIs. Pulls current docs for react-three-fiber, drei, three@0.183,
Next 16, Tailwind 4 on demand.
**Add (CLI):** `claude mcp add context7 --scope project -- npx -y @upstash/context7-mcp`
**Auth:** works without a key; `CONTEXT7_API_KEY` (from context7.com) raises rate limits.
**Use:** append "use context7" or ask "get the drei OrbitControls docs" while coding.

## ★★★ Playwright MCP — real-browser verification
**Why:** satisfies the rule "never report a UI fix without exercising it in the running app."
Drives a real browser to confirm the canvas mounts, the GLB loads, and the CTA opens `wa.me`.
**Add (CLI):** `claude mcp add playwright --scope project -- npx -y @playwright/mcp@latest`
**Auth:** none. First run downloads browser binaries (**disk-space watch on C:**).
**Use:** "Using Playwright MCP, open http://localhost:3000, wait for the hero canvas, and confirm
the 'WhatsApp for Quote' link points to wa.me."

## ★★☆ shadcn MCP — real component code
**Why:** fetches exact shadcn/ui component source/props from the live registry — good for adding
loading skeletons, dialogs, selects (the UI-REVIEW.md gaps) without guessing.
**Add (CLI):** `claude mcp add shadcn --scope project -- npx -y shadcn@latest mcp`
**Note:** shadcn is **not initialized** in this repo yet (`UI-REVIEW.md` says so). Run
`npx shadcn@latest init` first if you want to actually install components; Tailwind 4 is supported.

## ★★★ Blender-MCP — natural-language 3D modeling (Claude Desktop)
**Why:** build/refine the scooter model and export a web-ready GLB by talking to Blender.
Integrates **PolyHaven** (HDRIs, textures, materials) and **Hyper3D Rodin** (image→3D mesh).
**Setup:**
1. Install uv: `pip install uv` (gives you `uvx`).
2. Clone `ahujasid/blender-mcp`, install its **Blender add-on** (`addon.py`) and enable it in
   Blender → Preferences → Add-ons.
3. In Blender's sidebar (N-panel) → "BlenderMCP" tab → **Start MCP server**.
4. Put `mcp/claude-desktop-config.json` contents into `%APPDATA%\Claude\claude_desktop_config.json`
   and restart Claude Desktop.
**Capabilities:** create/move/delete objects, set materials/colors, read scene info, viewport
screenshots, arbitrary Python in Blender, PolyHaven asset fetch, Hyper3D image→3D.
**Gotcha:** Blender must be open with the socket server running, or the tools error out. Heavy on
disk/RAM — check space first.

## ★★★ Figma MCP — design-to-code (already attached this session)
**Why:** turn a Figma frame of the new hero/configurator into React+Tailwind, or push code into
Figma. Already available in this Claude session (no install). Use `/figma-use` skill before
`use_figma`. Give it a `figma.com` frame URL.

## ★☆☆ Magic UI / 21st.dev MCP — animated marketing components
**Why:** generate polished animated sections (marquee of client logos, blur-fade headings).
**Add:** requires an API key from 21st.dev/magicui; add under `mcpServers` with the key in `env`.
Optional — the `website-builder-setup` skill can install this stack for you.

---

## Custom MCP connector (optional, future)
If you later want Claude to read/write the product catalog or manage GLB assets directly, build a
tiny custom MCP server. Use the **`mcp-builder`** skill. A minimal starter and pointer are in
`mcp/custom-mcp-starter/`. This is **not** needed for the 3D upgrade — only if/when the AWS backend
(DynamoDB catalog) from the roadmap lands and you want an agent-facing interface to it.

## What you already have in this session (no install)
Claude-in-Chrome (browser automation), Figma, Canva, Google (Gmail/Calendar), PowerPoint MCPs are
already connected here. For repeatable scripted checks, Playwright MCP is still the better fit than
ad-hoc Chrome driving.
