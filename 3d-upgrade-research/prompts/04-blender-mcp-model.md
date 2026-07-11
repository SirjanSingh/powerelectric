# Prompt — Drive Blender-MCP to make/refine the scooter (Claude Desktop)

**Prereqs:** Blender open with the BlenderMCP add-on's socket server started; `blender` MCP server
configured in Claude Desktop (see `../mcp/claude-desktop-config.json`); `uvx` available.

---
Using the **Blender MCP**:
1. Take a screenshot of the current viewport to confirm the connection.
2. From the reference photo I provide (a real scooter we sell), use **Hyper3D Rodin** (image→3D) to
   generate a base mesh, OR build a clean low-poly e-scooter from primitives.
3. Apply realistic materials; pull an HDRI + metal/rubber textures from **PolyHaven**.
4. Keep it web-light: reasonable poly count, no unused data, sensible UVs.
5. Export as **GLB** to `public/models/scooter.glb` (I'll Draco-compress separately — see prompt 05).
6. Show me viewport screenshots at each major step so I can direct changes.

Then stop and let me review before I run the optimization pipeline.
---

**Notes:** Blender-MCP can also run arbitrary Python in Blender if you need precise edits. It's
heavy on disk/RAM — confirm free space first (prefer G: for exports/libraries).
