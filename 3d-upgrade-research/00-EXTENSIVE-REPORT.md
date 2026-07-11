# PowerElectric — 3D + Website Upgrade Research Report

**Prepared:** 2026-07-11
**For:** Sirjan / PowerElectric (B2B EV bulk-supply marketing site)
**Scope:** How to build a "perfect" 3D experience + level up the website, which MCP
connectors / prompts / skills to wire in, and exactly what to do when you sit back down.

> **TL;DR** — Your site is already a strong Next.js 16 / React 19 / Tailwind 4 build with a
> hand-rolled three.js particle hero. The highest-leverage upgrade is to move from **raw
> three.js** to the **react-three-fiber (R3F) + drei** ecosystem, show a **real interactive 3D
> e-scooter** (GLB model, Draco-compressed, orbit + color/variant configurator), and wire up a
> small set of **MCP connectors** (Blender-MCP for model generation, Figma for design-to-code,
> shadcn + Context7 + Playwright for build/verify). Nothing here has been installed or downloaded
> yet — this folder is the plan + ready-to-paste configs so you can pull the trigger fast.

---

## 0. What's already in the repo (context I built)

| Area | State today | Implication |
|------|-------------|-------------|
| Framework | Next.js **16.1.6**, React **19.2.3**, Tailwind **4** (App Router) | Modern; R3F v9 + drei work here with `"use client"` + `dynamic(ssr:false)` |
| 3D | `src/components/shared/HeroCanvas.tsx` — **raw three.js** particle field (140 pts, line web, mouse parallax, respects reduced-motion) | Works, but hand-managed. No real product model. Good candidate to port to R3F. |
| three.js version | `three@^0.183`, `@types/three@^0.183` | Current enough for R3F v9 / drei latest |
| Hero | `Hero.tsx` renders `HeroCanvas` via `dynamic(..., {ssr:false})` + a static `<Image>` of the scooter | The static PNG is where a **live 3D scooter** should go |
| Design system | Tokens in `globals.css` (`--color-accent #2563EB` etc.), utility classes `.btn`, `.card`, `.section-pad` | Good foundation — but see UI-REVIEW.md: **183 hardcoded hex** values bypass tokens |
| CTA strategy | WhatsApp-first via `src/lib/whatsapp.ts` (never `tel:`/forms) | Any 3D "Configure & Quote" flow must funnel to a `wa.me` deep link |
| Data | Static `src/data/products.ts` (typed `Product`) | 3D variant/color options should map onto this same catalog shape |
| Existing audit | `UI-REVIEW.md` scored the UI **18/24** | Fix those before/with the 3D work (color tokens, error/loading states, image fallback) |

**Two hard project rules (from CLAUDE.md) any 3D work must respect:**
1. **WhatsApp-first** — a 3D configurator's final CTA must build a pre-filled `wa.me` link via
   the helpers in `src/lib/whatsapp.ts`, not a form or `tel:`.
2. **Centralized config** — no hardcoded contact/business details; pull from `src/config/site.ts`.
   Product/variant data belongs in `src/data/products.ts` (don't prematurely refactor toward a
   backend — the roadmap defers that to AWS).

---

## 1. The "perfect 3D" — recommended stack

There are three viable routes. Ranked for *your* case (marketing site, product hero, needs to
stay fast + accessible + maintainable inside Next.js):

### ✅ Route A (recommended): react-three-fiber + drei + a real GLB model
The industry-standard React way to do three.js. Declarative components instead of imperative
`useEffect` soup. drei gives you `<OrbitControls>`, `<Environment>`, `<Stage>`, `<Bounds>`,
`<Detailed>` (LOD), `<Html>`, `useGLTF`, `<PresentationControls>` — most of a product viewer for free.

- **Model format:** ship **`.glb`** (binary glTF — geometry+textures+animation in one file, far
  smaller than `.gltf`).
- **Compression:** run models through **Draco** (geometry −90–95%) and **`gltf-transform`**
  (texture compression). drei's `useGLTF` supports a Draco decoder path; decompression runs in a
  Web Worker so it won't jank the main thread.
- **Codegen:** run **`gltfjsx`** on the model → it emits a typed, declarative JSX component with
  every mesh named, so you can recolor "seat", "body", "rims" independently for a configurator.
- **Performance:** use `<Detailed>` for LOD (30–40% FPS win in busy scenes), lazy-load the canvas
  (`dynamic(ssr:false)`), and gate on `prefers-reduced-motion` (you already do this in HeroCanvas —
  reuse that pattern).

**Why over raw three.js:** you keep your current reduced-motion + cleanup discipline but get
maintainable components, a huge helper library, and an easy path to a variant/color configurator
that maps onto `products.ts`.

### Route B: Spline (no-code 3D editor) + `@splinetool/react-spline`
Design the scene visually in Spline, export, drop in as a React component. `@splinetool/react-spline/next`
even renders an auto-generated blurred placeholder for SSR. **Live URL promotion** lets you push
visual changes to prod *without a code redeploy* — great if a designer iterates often.
- **Trade-off:** less control, heavier runtime, scene lives in Spline's cloud/format. Good for a
  fast "wow" hero; weaker for a precise, data-driven configurator. Spline can also export **GLB**,
  so you can prototype in Spline then move the asset into Route A.

### Route C: keep raw three.js, just add a model loader
Lowest churn — load a GLB into the existing `HeroCanvas` with `GLTFLoader`. Fine as a stopgap, but
you'll re-implement what drei already gives you. Not recommended as the destination.

**Verdict:** Build the **hero + a `/configure` (or product-page) 3D viewer in Route A**. Optionally
prototype the "hero wow shot" in **Spline (Route B)** and export its GLB into Route A.

### Concrete 3D features worth building (in priority order)
1. **Interactive hero scooter** — replace the static `scootyimg.png` with a slow auto-rotating GLB;
   `<PresentationControls>` so users can nudge it; falls back to the PNG when reduced-motion or WebGL
   unavailable.
2. **Product configurator** on `/products` or a new `/configure`: pick model → color → battery
   (LFP/NMC) → quantity, all updating the 3D mesh, ending in **"Configure & WhatsApp for Quote"**
   that deep-links a pre-filled message (variant + qty + city) via `whatsapp.ts`.
3. **360° spin / exploded view** for battery packs & chargers (great for a B2B spec story).
4. **Scroll-driven camera** (drei `<ScrollControls>`) tying the scooter to your existing
   scroll-reveal sections.

---

## 2. MCP connectors — what to wire in and why

MCP (Model Context Protocol) is Anthropic's open standard that lets Claude talk to external tools
over a live connection. For *this* project, these are the ones that pay off. Ready-to-paste configs
are in **`mcp/.mcp.json`** (project scope) and **`mcp/claude-desktop-config.json`** (for Blender).

| MCP server | What it does for you | Priority | Install surface |
|------------|----------------------|----------|-----------------|
| **Blender-MCP** (`ahujasid/blender-mcp`) | Natural-language 3D modeling in Blender; integrates **PolyHaven** (HDRIs/textures) + **Hyper3D Rodin** (image→3D mesh). Model/refine your scooter, export GLB. | ★★★ | `uvx blender-mcp` + Blender add-on |
| **Figma MCP** (official) *(already connected in this session)* | Design-to-code: point at a Figma frame → get implementation. Also code→design. | ★★★ | Already available here |
| **shadcn MCP** (official) | Live shadcn/ui registry — fetch real component code/props instead of guessing. Fixes UI-REVIEW gaps (loading skeletons, dialogs). | ★★☆ | `npx shadcn@latest mcp` / `.mcp.json` |
| **Context7** (`@upstash/context7-mcp`) | Real-time, version-correct docs for R3F, drei, three, Next 16, Tailwind 4. Kills hallucinated APIs. | ★★★ | `npx -y @upstash/context7-mcp` |
| **Playwright MCP** (`@playwright/mcp`) | Drives a real browser to **verify** the 3D loads, canvas mounts, CTA opens WhatsApp — satisfies your "never report fixed without exercising it" rule. | ★★★ | `npx @playwright/mcp@latest` |
| **Magic UI / 21st.dev MCP** | Generate animated marketing components (marquees, blur-fade) in React+Tailwind. | ★☆☆ | `.mcp.json` (API key) |

**"Custom MCP connector"** — if you ever want Claude to read/write your product catalog or push
GLB assets, a tiny custom MCP server is the clean way. A **starter scaffold + the `mcp-builder`
skill pointer** is in `mcp/custom-mcp-starter/` so it's ready if you want it. Not required for the
3D upgrade.

> **Note on browser tooling:** this Claude Code session also has the **Claude-in-Chrome** MCP and
> **Canva/Figma/PowerPoint** MCPs already attached — no install needed. Playwright MCP is still
> worth adding for scripted, repeatable verification runs.

See **`01-mcp-connectors.md`** for per-server setup commands, auth notes, and gotchas.

---

## 3. Skills to use (most are already installed here)

You already have a rich skill library loaded. The ones that matter for this work:

- **`frontend-design` / `frontend-design:frontend-design`** — distinctive, intentional visual
  design (not templated). Use it when styling the 3D sections.
- **`nextjs-best-practices`, `react-best-practices`, `react-patterns`** — Server/Client boundaries,
  data fetching, perf. Critical because R3F must be client-only.
- **`tailwind-patterns`** — Tailwind v4 CSS-first tokens; directly addresses the "183 hardcoded
  hex" finding.
- **`superpowers:brainstorming`** — run this *before* building the configurator to lock scope.
- **`superpowers:test-driven-development` + `webapp-testing` / `playwright-skill`** — verify the
  3D + WhatsApp flow in a real browser.
- **`mcp-builder`** — only if you build the custom catalog MCP.
- **`website-builder-setup`** — one-shot installer for a UI/animation/component stack (Framer
  Motion + 21st.dev). Optional.
- **`dataviz`** — if you add spec charts (range/kWh comparisons) to product pages.

Full mapping with when-to-use notes: **`04-skills.md`**.

---

## 4. Ready-to-use prompt library

`prompts/` contains copy-paste prompts, each scoped to one job:
- `prompts/01-port-hero-to-r3f.md` — convert `HeroCanvas` to react-three-fiber cleanly.
- `prompts/02-load-scooter-glb.md` — add a real GLB scooter to the hero with fallbacks.
- `prompts/03-build-configurator.md` — color/variant/qty → WhatsApp quote configurator.
- `prompts/04-blender-mcp-model.md` — drive Blender-MCP to make/refine + export the scooter GLB.
- `prompts/05-optimize-glb.md` — Draco + gltf-transform + gltfjsx pipeline.
- `prompts/06-fix-ui-review.md` — knock out the UI-REVIEW.md findings (tokens, states, fallbacks).

---

## 5. 3D asset sourcing & pipeline

Where to legally get an e-scooter model and how to make it web-fast. Full detail in
**`assets-guide/3d-assets.md`**. Summary:

- **Free / commercial-safe sources:** **Poly Pizza** (low-poly, no login), **Meshy** (CC0,
  royalty-free, commercial OK, no attribution), **Sketchfab** (filter Downloadable + check each
  license), **CGTrader** (free + premium). Always confirm the per-model license before shipping.
- **Generate one:** Blender-MCP + **Hyper3D Rodin** (image→3D) from a photo of the actual scooter
  you sell — most on-brand option.
- **Pipeline:** source/generate `.glb` → `gltf-transform` (dedupe, texture compress) → **Draco**
  geometry compression → **`gltfjsx`** to get a typed JSX component → drop into R3F → LOD via
  `<Detailed>`. Target **< ~1.5 MB** for a hero model.

---

## 6. Recommended sequence (when you're back)

1. Read this report + `SETUP-CHECKLIST.md`.
2. Add MCP servers from `mcp/.mcp.json` (`claude mcp add ...` or approve the project file).
3. Source or generate the scooter GLB → run the optimize pipeline (`prompts/05`).
4. Port hero to R3F (`prompts/01`) → load the GLB (`prompts/02`).
5. Build the configurator → WhatsApp quote (`prompts/03`).
6. Fix the UI-REVIEW.md issues (`prompts/06`).
7. Verify in a real browser via Playwright MCP before calling anything done.

**Disk-space note (your machine):** C:/D: are chronically tight. Blender, model libraries, and
`node_modules` for R3F add up — check free space before installing, and prefer G: for large model
libraries/exports. No large installs were run while you were away.

---

## Sources

- [React Three Fiber — Loading Models (Poimandres docs)](https://r3f.docs.pmnd.rs/tutorials/loading-models)
- [100 Three.js Tips That Actually Improve Performance (2026)](https://www.utsubo.com/blog/threejs-best-practices-100-tips)
- [Configure 3D models with react-three-fiber (LogRocket)](https://blog.logrocket.com/configure-3d-models-react-three-fiber/)
- [blender-mcp (GitHub, ahujasid)](https://github.com/ahujasid/blender-mcp)
- [Blender MCP overview](https://blender-mcp.com/) · [Blender.org MCP Server](https://www.blender.org/lab/mcp-server/)
- [Best MCP Servers for Developers and Designers in 2026 (shadcn studio)](https://shadcnstudio.com/blog/best-mcp-servers/)
- [The Best MCP Servers for Developers in 2026 (Builder.io)](https://www.builder.io/blog/best-mcp-servers-2026)
- [Spline vs react-three-fiber (Medium)](https://medium.com/@akbar123jason/simplifying-3d-integration-in-react-spline-vs-react-three-fiber-3f5e1a9e39d3)
- [@splinetool/react-spline (npm)](https://www.npmjs.com/package/@splinetool/react-spline)
- [Spline.design in 2026 complete guide](https://medium.com/@abhinav.dobhal/spline-design-in-2026-the-complete-guide-to-building-immersive-3d-web-experiences-without-code-097f475b3951)
- [Meshy — free scooter 3D models (CC0)](https://www.meshy.ai/tags/scooter) · [Poly Pizza](https://poly.pizza/) · [Sketchfab electric-scooter](https://sketchfab.com/tags/electric-scooter)
- [3D Car Configurator showcases (three.js forum)](https://discourse.threejs.org/t/performance-focused-real-time-3d-car-configurator-in-three-js/87892)
- [automotive-configurator (GitHub, glTF + Three.js)](https://github.com/rendercodeninja/automotive-configurator)
- [Connect to MCP servers — Claude Code Docs](https://code.claude.com/docs/en/mcp-quickstart)
- [Using Playwright MCP with Claude Code (Builder.io)](https://www.builder.io/blog/playwright-mcp-server-claude-code)
