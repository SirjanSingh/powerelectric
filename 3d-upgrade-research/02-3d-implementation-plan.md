# 3D Implementation Plan — react-three-fiber upgrade

Concrete, staged plan to move from the raw-three.js particle hero to a real interactive 3D scooter
+ configurator, without breaking the current design system or the WhatsApp-first rule.

## Dependencies to add (when you build)
```bash
npm i @react-three/fiber @react-three/drei
# already present: three@^0.183, @types/three
# optional dev tooling for the asset pipeline:
npm i -D gltfjsx @gltf-transform/cli
```
> R3F v9 targets React 19 — compatible with this repo. Keep `three` on ^0.183 to match `@types/three`.

## Stage 1 — Port `HeroCanvas` to R3F (parity first)
Keep the exact same look (particle field + line web + mouse parallax + reduced-motion guard), but
declarative. Skeleton:
```tsx
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
// wrap the existing particle/line logic in a <Points>/<lineSegments> component,
// drive positions in useFrame instead of a manual rAF loop.
// Gate the whole <Canvas> behind prefers-reduced-motion (return the static bg if reduced).
```
- Preserve the `dynamic(() => import(...), { ssr: false })` import in `Hero.tsx`.
- Preserve cleanup (R3F handles disposal on unmount, but dispose custom geometries).
- **Verify parity** with Playwright MCP before moving on.

## Stage 2 — Load the real scooter GLB in the hero
Replace the static `<Image src="/assets/scootyimg.png">` with a live model on the right side.
```tsx
import { useGLTF, PresentationControls, Environment, Stage } from "@react-three/drei";
function Scooter(props) {
  const { scene } = useGLTF("/models/scooter-draco.glb"); // Draco-compressed
  return <primitive object={scene} {...props} />;
}
// <Canvas> → <Stage> → <PresentationControls> → <Scooter/>; add <Environment preset="city"/>
useGLTF.preload("/models/scooter-draco.glb");
```
- **Fallback ladder:** WebGL unavailable OR reduced-motion OR load error → render the existing
  `scootyimg.png` (fixes the current silent-hide fallback too). Use an error boundary + `<Suspense>`
  with a skeleton, not `display:none`.
- Put models in `public/models/`.

## Stage 3 — Configurator (color / variant / qty → WhatsApp)
- Run `gltfjsx` so each mesh (body, seat, rims) is a named, recolorable node.
- UI: drei `<Html>` overlay or a normal React panel beside the canvas — color swatches, battery
  (LFP/NMC), quantity stepper. State updates material colors live.
- **CTA:** build the quote message from selected options and open a `wa.me` deep link via the
  helpers in `src/lib/whatsapp.ts` (e.g. extend `genericEnquiryUrl` or add `configuredQuoteUrl`).
  Map options onto the `Product` shape in `src/data/products.ts` — do **not** invent a parallel data
  model, and do **not** refactor `products.ts` toward a backend (roadmap defers that).
- Respect design tokens: colors from `var(--color-*)`, not new hardcoded hex (see UI-REVIEW.md).

## Stage 4 — Polish & perf
- `<Detailed>` LOD if the model is heavy; `<Bounds>` to auto-fit; `<AdaptiveDpr>` for weaker GPUs.
- Lazy-mount the configurator canvas (only when scrolled into view / on a `/configure` route).
- Keep the particle hero lightweight; don't run two heavy canvases at once.
- Accessibility: the canvas is decorative (`aria-hidden`) but the configurator controls must be
  real, keyboard-operable `<button>`/`<select>` elements with labels (your codebase already favors
  native elements — keep that).

## Where 3D fits the current pages
- **Hero** (`src/components/sections/Hero.tsx`) — Stage 1–2.
- **Products** (`src/app/products/page.tsx`) or new **`/configure`** — Stage 3.
- **GalleryBand** (single placeholder image today) — good candidate to replace with a 360° spin.

## Verification (required before "done")
Use Playwright MCP: dev server up → hero canvas mounts → GLB network request 200 → configurator
color change reflects in DOM/canvas → CTA `href` starts with `https://wa.me/` and contains the
selected qty/variant. Screenshot desktop + mobile widths.
