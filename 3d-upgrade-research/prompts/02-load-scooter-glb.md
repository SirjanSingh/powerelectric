# Prompt — Add a real GLB scooter to the hero

---
Use Context7 MCP for drei docs. In `src/components/sections/Hero.tsx`, replace the static
`<Image src="/assets/scootyimg.png">` on the right with a **live 3D scooter** rendered by
react-three-fiber + drei.

Requirements:
- Model at `public/models/scooter-draco.glb` (Draco-compressed). Load via `useGLTF` with the Draco
  decoder; `useGLTF.preload(...)`.
- Wrap in `<Canvas>` → `<Stage>`/`<Environment preset="city">` → `<PresentationControls>` so users
  can gently rotate it; add a slow idle auto-rotate.
- **Fallback ladder** (fixes today's silent `display:none` bug): wrap in `<Suspense>` with a
  skeleton; on WebGL-unavailable OR `prefers-reduced-motion` OR load error, render the existing
  `scootyimg.png` as a proper visible fallback (not hidden).
- Match the design system: use existing tokens/utility classes; no new hardcoded hex.
- Keep the hero performant — don't run the particle canvas and the model canvas both at full tilt;
  reuse one `<Canvas>` or make the model canvas the primary.

Then verify with **Playwright MCP**: model request returns 200, canvas mounts, reduced-motion shows
the PNG fallback. Screenshot desktop + mobile.
---
