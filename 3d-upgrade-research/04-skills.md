# Skills — what to invoke and when

These are already installed in this Claude Code environment (invoke by name / `/name`). No download
needed. Grouped by phase of the 3D + website upgrade.

## Before you build (process skills — invoke first)
- **`superpowers:brainstorming`** — run before designing the configurator to pin down scope, options,
  and the WhatsApp quote flow. (Process skills set the approach before implementation skills act.)
- **`superpowers:writing-plans`** — turn the agreed scope into an executable step plan.

## Design & frontend
- **`frontend-design` / `frontend-design:frontend-design`** — distinctive, intentional visual design
  for the 3D sections; avoids templated defaults.
- **`tailwind-patterns`** — Tailwind v4 CSS-first tokens; directly fixes the "183 hardcoded hex"
  finding by centralizing color into design tokens.
- **`nextjs-best-practices`** — Server vs Client boundaries (R3F must be `"use client"` +
  `dynamic(ssr:false)`), data fetching, routing for a `/configure` page.
- **`react-best-practices` / `react-patterns`** — component composition, memoization, avoiding
  re-renders that would stutter the canvas.
- **`website-builder-setup`** — optional one-shot installer for a UI/animation/component stack
  (Framer Motion + 21st.dev components). Use only if you want that stack.

## 3D / assets
- No dedicated three.js skill is installed, so lean on **Context7 MCP** for R3F/drei/three docs and
  the prompts in `prompts/`. `frontend-design` still governs the aesthetic.

## Build tooling / MCP
- **`mcp-builder`** — only if you build the custom catalog MCP (`mcp/custom-mcp-starter/`).
- **`claude-code-expert`** / **`claude-code-guide`** (agent) — for questions about hooks, MCP,
  settings, slash commands.

## Verification (required by your workflow rule)
- **`superpowers:test-driven-development`** — write the check before the fix where it makes sense.
- **`webapp-testing`** / **`playwright-skill`** — native Playwright scripts to exercise the 3D +
  WhatsApp flow in a real browser. Pairs with Playwright MCP.
- **`superpowers:verification-before-completion`** — enforces "evidence before claiming done."
- **`dataviz`** — if you add spec-comparison charts (range, kWh, price/unit) to product pages.

## Session close-out (your standing preference)
- **`wrap`** — when you say "wrap"/"push"/"done": session notes + memory + logical commits (authored
  as Sirjan, no AI trailers) + push, in one pass.

## Suggested invocation order for the upgrade
1. `superpowers:brainstorming` → 2. `superpowers:writing-plans` → 3. build with
`nextjs-best-practices` + `react-best-practices` + `frontend-design` + `tailwind-patterns` (Context7
MCP alongside) → 4. verify with `webapp-testing` + Playwright MCP + `verification-before-completion`
→ 5. `wrap`.
