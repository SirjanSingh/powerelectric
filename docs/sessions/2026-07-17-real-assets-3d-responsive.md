## 2026-07-17 — Real assets, honest content, 3D + responsive fixes

Replaced the site's placeholder/made-up content with the real Power Electric India
business, fixed the 3D hero, verified mobile, and produced a portable website brief.

### What changed & why

**1. Real identity, contact & branding** (was all invented — "PowerElectric", a fake
Gurugram address, fabricated Instagram/LinkedIn, placeholder map coords).
- `src/config/site.ts` — real name **Power Electric India**, email `sukhjotev@gmail.com`,
  phone `+91 63999 88690`, **Nangli Industrial Area, Delhi**, hours Mon–Sat 11–7 / Sun
  closed, nationwide service, bulk/container angle in the meta description. Removed the fake
  socials; blanked the Google Maps URL (map now shows a graceful placeholder instead of the
  wrong location); PIN/domain intentionally left empty (not fabricated — see open items).
- Real **logo** wired into `Header.tsx` + `Footer.tsx` (replacing the generic `<Zap>` icon),
  copied to `public/assets/logo.jpg`. Favicon now derives from the logo via App Router
  convention (`src/app/icon.jpg`); removed the default `src/app/favicon.ico` and its explicit
  metadata override in `layout.tsx`.
- Brand-string cleanup ("PowerElectric" → "Power Electric India") in `whatsapp.ts` message
  templates, `WhyUs.tsx`, `ContactMap.tsx`, `contact/page.tsx`; honest disclaimers on
  `Footer.tsx` and `products/page.tsx` ("images are representative").
- Added `formatAddress()` in `src/lib/utils.ts` so empty PIN/line2 render cleanly (no stray
  commas/dashes) in the footer and contact panel.

**2. Honest product catalog** — `src/data/products.ts` rewritten. Removed all 12 invented
brand-name SKUs (Urban Fleet S1, City Pro S2, Cargo Hauler…) and replaced them with
spec-descriptive, genuinely-available listings modeled on real Delhi EV-supplier lines
(e-scooters, LFP/NMC + lead-acid batteries, smart chargers, BLDC controllers, DC-DC
converters, throttle/display kits), framed as representative stock.

**3. 3D hero fixes** (user: model "in the wrong place", a photo flashes before it, looks
crude).
- **No more photo flash:** new `src/components/three/capabilities.ts` (shared WebGL/
  reduced-motion checks). `Hero.tsx` now uses `useSyncExternalStore` to show a neutral
  branded loader while the 3D loads, then reveals the canvas; the static photo remains only
  as the reduced-motion / no-WebGL fallback. Chosen over a `setState`-in-effect approach
  because the repo lint forbids that and it avoids a hydration mismatch.
- **Positioning:** desktop rig retuned in `HeroScene.tsx` (`scale 4.8→3.8`, `y -4→2`,
  `x 9.5→8.5`) so the scooter is fully framed within the corner markers, not clipped.
- Added `aspect-ratio: 4/3` to `.hero-image-inner` (globals.css) so the loader→3D swap
  doesn't shift layout; added `.hero-loader*` styles.

**4. Model quality** — still the low-poly CC-BY Vespa. Decided against blind-swapping to
another low-poly model or building from scratch in Blender MCP (unreliable/crude). Owner will
supply a licensed `.glb` (Meshy CC0) to run through the optimize→draco→gltfjsx pipeline.

**5. Website brief** — `WEBSITE-BRIEF.md`: a portable, tech-agnostic spec so the owner can
feed it to a different agent and build a comparison site.

### How verified
- `npm run lint` + `npm run build` clean.
- Rendered-HTML checks (curl) confirmed real content in, placeholders (fake socials, Gurugram,
  invented SKUs) out, WhatsApp prefills say "Power Electric India", logo + `/icon.jpg` serve 200.
- **Live browser (desktop):** logo renders; loader shows a clean spinner then reveals the 3D;
  scooter now framed correctly.
- **Playwright @ 390px mobile (WebGL via swiftshader):** Home/Products/Contact all render with
  **zero horizontal overflow**, hamburger nav, 2×2 spec tiles, large tap targets, real contact
  info, 3D framed within markers.

### Open items for next session
- **Model swap:** owner to send a licensed seated-e-scooter `.glb`; then optimize + wire in +
  re-tune desktop/mobile framing.
- **Confirm & fill:** exact PIN/plot for the Nangli address; real Google Maps embed; whether
  `powerelectric.in` is owned (SEO `siteUrl`); accuracy of trust-strip claims (min 5 units,
  OEM warranty, GST).
- Real product photography (currently representative stock images).
- Minor: mobile product-category tab strip scrolls horizontally — could wrap instead.
