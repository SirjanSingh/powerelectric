# 3D Assets — sourcing, licensing, and the web pipeline

## Where to get an e-scooter model (check each license before shipping)

| Source | License notes | Best for |
|--------|---------------|----------|
| **Meshy** (meshy.ai/tags/scooter) | Pre-made assets under **CC0** — royalty-free, commercial OK, no attribution. Also AI text/image→3D. | Fastest commercial-safe start |
| **Poly Pizza** (poly.pizza) | Free low-poly, no login. Ready for AR/VR/game engines. Check per-model license (often CC-BY). | Lightweight hero model |
| **Sketchfab** (sketchfab.com/tags/electric-scooter) | Huge library; filter **Downloadable**. Licenses vary per model (CC-BY, CC0, editorial-only, or paid). **Read each.** GLB supported. | Realistic models |
| **CGTrader** (cgtrader.com/3d-models/electric-scooter) | Free + premium. Royalty-free licenses on paid; verify. | High-fidelity paid options |
| **RigModels** | Free, multiple formats incl. GLB. | Backup source |

**On-brand alternative — generate your own:** use **Blender-MCP + Hyper3D Rodin** to turn a photo of
the *actual scooter you sell* into a 3D mesh (see `../prompts/04-blender-mcp-model.md`). Most
authentic; avoids licensing ambiguity entirely.

> ⚠️ **Licensing discipline:** for a commercial B2B site, prefer **CC0** or a purchased
> royalty-free license. Avoid "editorial only" or non-commercial (NC) models. Keep a note of the
> source + license for each asset you ship.

## Formats
- Ship **`.glb`** (binary glTF: geometry + textures + animation in one file; much smaller than
  `.gltf`). Convert other formats (FBX/OBJ/USDZ) to GLB in Blender or with `gltf-transform`.

## The optimization pipeline (see `../prompts/05-optimize-glb.md` for exact commands)
1. **Inspect** with `gltf-transform inspect` (tris, textures, size).
2. **Optimize** — `gltf-transform optimize` (dedupe, prune, WebP texture compression).
3. **Draco** geometry compression (`gltf-transform draco`) — geometry −90–95%; drei's `useGLTF`
   decodes it in a Web Worker (no main-thread jank).
4. **gltfjsx** → typed JSX component with **named meshes** (body/seat/rims) so the configurator can
   recolor parts independently.
5. In-app: **LOD** via drei `<Detailed>` (swap high→low poly at distance; 30–40% FPS win), lazy-mount
   the canvas, respect `prefers-reduced-motion`.

**Targets:** hero model **< ~1.5 MB**; textures ≤ 2K (1K if it still looks good); one primary heavy
canvas at a time.

## Where files live in the repo
- Models: `public/models/*.glb`
- Generated components: `src/components/three/*.tsx`
- HDRIs/environment: drei `<Environment preset="...">` (bundled) or a small `.hdr` in `public/`.

## Disk-space reminder (this machine)
C:/D: are chronically tight. Keep large model libraries and Blender exports on **G:** (external SSD)
and copy only the final optimized GLB into `public/models/`.
