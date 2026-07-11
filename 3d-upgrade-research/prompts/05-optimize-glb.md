# Prompt — Optimize the GLB (Draco + gltf-transform + gltfjsx)

---
Optimize `public/models/scooter.glb` for the web and generate a typed React component.

Steps (use `@gltf-transform/cli` and `gltfjsx`):
1. Inspect: `npx @gltf-transform/cli inspect public/models/scooter.glb` — report tris, textures, size.
2. Optimize textures + dedupe + prune:
   `npx @gltf-transform/cli optimize public/models/scooter.glb public/models/scooter-opt.glb --texture-compress webp`
3. Draco-compress geometry:
   `npx @gltf-transform/cli draco public/models/scooter-opt.glb public/models/scooter-draco.glb`
4. Generate JSX: `npx gltfjsx public/models/scooter-draco.glb -o src/components/three/Scooter.tsx --types`
   — this emits a component with every mesh named so the configurator can recolor parts.
5. Report before/after file sizes. Target **< ~1.5 MB** for the hero model; if larger, reduce
   texture resolution or decimate geometry and repeat.

Confirm the model still loads correctly in the app (Playwright MCP: network 200, no console errors).
---

**Windows note:** these are npx commands (Node 20+). No Python needed. Watch C: disk space.
