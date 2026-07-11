# Prompt — Build the 3D configurator → WhatsApp quote

---
Use `superpowers:brainstorming` FIRST to lock scope, then `frontend-design` for the UI.

Build a scooter configurator (on `/products` or a new `/configure` route) using react-three-fiber
+ drei:
- Run `gltfjsx` on the scooter GLB so each mesh (body, seat, rims) is a named node I can recolor.
- Controls: color swatches, battery type (LFP / NMC), quantity stepper (min order 5 units — match
  the Hero spec rail). Selections update the 3D materials live.
- **Final CTA follows the WhatsApp-first rule:** build a pre-filled `wa.me` message from the
  selected options and open it using the helpers in `src/lib/whatsapp.ts` (add a
  `configuredQuoteUrl({ model, color, battery, qty, city })` helper if needed — do NOT use forms
  or `tel:`).
- Data: map options onto the `Product` interface in `src/data/products.ts`. Do NOT create a
  parallel data model and do NOT refactor `products.ts` toward a backend (roadmap defers that).
- Colors from design tokens (`var(--color-*)`), not new hardcoded hex (see UI-REVIEW.md).
- Controls must be keyboard-accessible native elements with labels; the canvas stays `aria-hidden`.

Verify with **Playwright MCP**: changing color updates the scene; the CTA `href` starts with
`https://wa.me/` and contains the selected quantity + variant.
---
