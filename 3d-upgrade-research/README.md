# 3D + Website Upgrade Research — folder index

Everything researched and prepared for turning PowerElectric into a "perfect" 3D + polished web
experience. Prepared 2026-07-11. **Read `00-EXTENSIVE-REPORT.md` first, then `SETUP-CHECKLIST.md`.**

> No external installs or downloads were run while you were away (disk space is tight + these are
> outward actions). This folder is the plan + ready-to-paste configs + prompts so you can move fast.

## Contents
| File | What it is |
|------|-----------|
| **`00-EXTENSIVE-REPORT.md`** | The main report: current-repo context, the "perfect 3D" stack choice (react-three-fiber + drei), MCP/skills/prompts overview, sequence, sources. |
| **`SETUP-CHECKLIST.md`** | Tick-through steps for when you sit back down. |
| **`01-mcp-connectors.md`** | Per-server MCP setup, auth, gotchas (Context7, Playwright, shadcn, Blender, Figma, Magic UI). |
| **`02-3d-implementation-plan.md`** | Staged R3F upgrade: port hero → load GLB → configurator → polish, with code skeletons. |
| **`04-skills.md`** | Which installed skills to invoke and when. |
| **`mcp/.mcp.json`** | Ready project-scope MCP config for Claude Code. |
| **`mcp/claude-desktop-config.json`** | Blender-MCP config for Claude Desktop. |
| **`mcp/custom-mcp-starter/`** | Optional custom catalog MCP starter (future/AWS). |
| **`prompts/01..06`** | Copy-paste prompts: port hero, load GLB, build configurator, Blender modeling, optimize GLB, fix UI-REVIEW. |
| **`assets-guide/3d-assets.md`** | Where to get scooter models (licensing) + the web optimization pipeline. |

## The one-paragraph version
Move the hand-rolled three.js hero to **react-three-fiber + drei**, show a **real Draco-compressed
GLB scooter** with a **color/variant/quantity configurator** that ends in a pre-filled **WhatsApp
quote** (respecting the repo's WhatsApp-first + design-token rules). Wire up **Context7 + Playwright
+ shadcn** MCP in Claude Code and optionally **Blender-MCP** in Claude Desktop to build/refine the
model. Fix the existing `UI-REVIEW.md` issues along the way. Verify everything in a real browser
before calling it done.
