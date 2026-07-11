# Setup Checklist — do this when you're back

Nothing below was run while you were away (external installs + tight disk). Tick through in order.

## 0. Read
- [ ] `00-EXTENSIVE-REPORT.md` (the plan) and this checklist.

## 1. Wire up MCP connectors
- [ ] Copy `mcp/.mcp.json` → project root as `.mcp.json` (or run the `claude mcp add` commands in
      `01-mcp-connectors.md`). Restart Claude Code; approve the servers.
- [ ] `claude mcp list` shows **context7**, **playwright**, **shadcn** connected.
- [ ] (Optional, 3D modeling) Install Blender + BlenderMCP add-on; put
      `mcp/claude-desktop-config.json` into `%APPDATA%\Claude\claude_desktop_config.json`; start the
      socket server in Blender. **Check disk space first.**

## 2. Get the model
- [ ] Pick a source from `assets-guide/3d-assets.md` (CC0/royalty-free) **or** generate via
      Blender-MCP (`prompts/04`). Save raw GLB to `public/models/scooter.glb`.
- [ ] Run the optimize pipeline (`prompts/05`) → `public/models/scooter-draco.glb` + generated
      `src/components/three/Scooter.tsx`. Confirm **< ~1.5 MB**.

## 3. Build the 3D
- [ ] `npm i @react-three/fiber @react-three/drei` (three@^0.183 already present).
- [ ] Port hero to R3F (`prompts/01`) — verify parity in browser.
- [ ] Load the GLB in the hero with fallback ladder (`prompts/02`).
- [ ] Build the configurator → WhatsApp quote (`prompts/03`).

## 4. Fix the audit + polish
- [ ] Run `prompts/06` to clear the UI-REVIEW.md findings (tokens, states, fallbacks).

## 5. Verify (do not skip — your standing rule)
- [ ] `npm run dev`, then **Playwright MCP**: hero canvas mounts, GLB request 200, configurator
      recolors live, CTA `href` starts with `https://wa.me/` and includes qty/variant. Screenshot
      desktop + mobile.
- [ ] `npm run build` passes. `npm run lint` clean.

## 6. Close out
- [ ] Run the `wrap` skill (session notes + memory + logical commits authored as Sirjan, no AI
      trailers + push).

---
### Guardrails to keep in mind
- **WhatsApp-first**: all primary CTAs go through `src/lib/whatsapp.ts` (`wa.me`), never `tel:`/forms.
- **Centralized config**: contact/business info from `src/config/site.ts`; product/variant data in
  `src/data/products.ts` — don't refactor it toward a backend yet (roadmap defers to AWS).
- **Design tokens**: colors via `var(--color-*)`, not new hardcoded hex.
- **Disk space**: check free space before Blender / big model libraries / node_modules; prefer G:.
