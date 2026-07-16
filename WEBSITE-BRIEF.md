# Power Electric India — Website Brief

> A self-contained brief for building the Power Electric India website. Written so a
> fresh agent with **no access to the existing codebase** can build a comparable site.
> Requirements are tech-agnostic; the current implementation is noted only as an
> optional reference in the Appendix.

---

## 1. What this is

A **B2B marketing website** for **Power Electric India**, a Delhi-based bulk supplier of
electric vehicles and EV components. The site's job is to make high-volume buyers
(fleets, dealers, institutions) trust the business and start a WhatsApp conversation to
get a bulk quote. It is a **lead-gen / catalog site, not an e-commerce store** — there is
no cart, no checkout, no online payment.

**Primary goal:** visitor → WhatsApp enquiry with a pre-filled message.

---

## 2. Real business facts (single source of truth)

Put ALL of these in ONE central config/data file — never hardcode them in components.

| Field | Value |
|---|---|
| Business name | **Power Electric India** |
| Tagline | Bulk EV Supply for Fleets, Dealers & Institutions |
| Short pitch | Reliable bulk EV supply, GST billing, fast dispatch. |
| Phone / WhatsApp | **+91 63999 88690** (E.164 digits: `916399988690`) |
| Email | **sukhjotev@gmail.com** |
| Address | **Nangli Industrial Area, Delhi, India** (exact PIN / plot no. TBD — do not invent one) |
| Hours | **Mon–Sat: 11 AM – 7 PM IST**; **Sunday closed**; WhatsApp available 24h |
| Service area | **Nationwide** (all-India bulk dispatch); Delhi NCR / North India core |
| Social media | **None** (do not invent Instagram/LinkedIn/etc.) |
| Domain | Not confirmed yet (`powerelectric.in` is a placeholder — verify before using in SEO) |
| Map | No confirmed Google Maps location yet — **hide the map** until a real embed is provided rather than show a wrong pin |

**Logo:** black circular badge — a white stylized "P" with a lightning bolt, and the words
"POWER ELECTRIC INDIA". (Provided as `logo.jpg`.) Use it in the header, footer, and as the
favicon. On a white header it reads as a clean black badge.

---

## 3. What the business sells

Three product families. Model the catalog on **real Delhi EV-supplier product lines**
(reference: motorkit.in and similar IndiaMART/TradeIndia suppliers). Use **honest,
spec-descriptive listings** — NOT invented brand/model names.

1. **Complete electric scooters** — fleet delivery, city commuter, cargo/loader, low-speed
   campus (≤25 km/h, non-registration). Specs: range, top speed, LFP/NMC battery.
2. **EV batteries & chargers** — LFP and NMC packs (48V–72V), lead-acid sets (4×12V for
   e-rickshaw/entry platforms), smart fast chargers (3A–8A). Specs: voltage, capacity (Ah/kWh),
   chemistry.
3. **Parts** — BLDC motor controllers (45–85A), DC-DC converters (to 12V, 15–20A),
   throttle/display/wiring-harness kits. Specs: voltage, current, compatibility.

**Key differentiator to feature prominently:** they handle **full-container / bulk orders**
(container-load quantities), not just small lots. Also: **GST billing on every order**,
tiered bulk pricing, verified stock, nationwide dispatch, manufacturer-warranty coordination.

Each product needs: name, category, "best for" tags (Fleet/Delivery/Commuter/Campus/
Replacement/Universal/Industrial), short description, 2–3 spec rows, image.

---

## 4. Core requirements & rules (non-negotiable)

1. **WhatsApp-first CTAs.** Every primary call-to-action opens WhatsApp via a `wa.me`
   click-to-chat link with a **pre-filled message** (greeting + product/quantity context).
   Do NOT use `tel:` links or server-side form submissions as the *primary* CTA. A floating
   WhatsApp button should be present site-wide.
2. **Pre-filled quote messages.** Generic enquiry, per-product enquiry ("interested in bulk
   pricing for X, quantity, city…"), and a contact-form flow that builds a structured
   WhatsApp message (name, phone, city, category, quantity) instead of emailing a server.
3. **Honesty — no fabricated data.** Never invent contact details, addresses, stats,
   certifications, or product SKUs. Product photos and any placeholder specs must be clearly
   labeled **"representative"**. Only make claims (GST billing, min order, warranty) that are
   actually true — confirm with the owner.
4. **Asset licensing.** Never scrape competitor/manufacturer product photos and republish
   them (copyright + it misrepresents their stock as yours). Use the owner's own photos,
   supplier-authorized images, or properly-licensed CC0/CC-BY/royalty-free stock (with
   attribution where required). Same rule for any 3D model.
5. **Mobile-first / fully responsive.** Must look and work well on a phone (≈390px):
   hamburger nav, no horizontal overflow, large tap targets, readable type, stacked layouts.
6. **Accessibility & motion.** Respect `prefers-reduced-motion`; provide non-WebGL fallbacks
   for any 3D; proper alt text, aria labels, and keyboard/focus states.
7. **B2B tone.** Positioning is "built for serious buyers — fleets, dealers, institutions,
   not hobbyists." Emphasize volume, documentation (GST), and reliable post-order support.

---

## 5. Pages & structure

- **Home** — hero (headline + pitch + spec rail + WhatsApp/Configure CTAs + product visual);
  trust strip (GST / min order / nationwide dispatch / warranty); product category cards;
  featured products; industries served; "how it works"; "why us"; contact/quote band with
  hours, service areas, and map (or map-hidden placeholder).
- **Products** — full catalog with category tabs (Scooters / Batteries / Chargers & Parts),
  search, and a "best for" filter. Each card → per-product WhatsApp enquiry. Honest
  "images are representative" note.
- **Contact** — WhatsApp / call / email quick actions; a **bulk-quote form** that composes a
  pre-filled WhatsApp message (no backend); contact details, hours, service areas; map (hidden
  until a real location is available).
- **Configure** (optional wow-feature) — a simple product configurator (pick model, color,
  battery type, quantity) that generates a pre-filled WhatsApp quote for that build.

---

## 6. Design direction

- **Aesthetic:** industrial / technical B2B. Clean, confident, "engineered" feel. Corner-bracket
  frames, uppercase mono micro-labels, generous whitespace.
- **Color:** accent **blue** (deep `#0369A1` + cyan `#0EA5E9`), near-black navy text, light
  surfaces; WhatsApp green reserved for WhatsApp CTAs. Support light **and** dark rendering
  where feasible.
- **Type:** condensed bold display face for headlines (e.g. Barlow Condensed), a clean sans
  for body (e.g. Barlow/Inter), and a monospace for labels/specs (e.g. IBM Plex Mono).
- **Motion:** subtle scroll-reveal, tasteful hover states, optional parallax — always
  reduced-motion-safe.

### Optional 3D hero (nice-to-have, not required)
An interactive 3D e-scooter in the hero can add a premium feel. If included:
- Use a **properly-licensed** e-scooter model (CC0/CC-BY, seated e-scooter shape matching the
  product — not a retro moped or a stand-up kick scooter), optimized for web (Draco-compressed
  GLB, target < ~1.5 MB).
- **No "photo-then-3D" flash:** show a neutral branded loader while the model loads, then reveal
  the 3D. Keep a static image only as the reduced-motion / no-WebGL fallback.
- Frame the model fully within its container (don't let it clip); tune position/scale separately
  for desktop and mobile.

---

## 7. Suggested tech (agent's choice)

Any modern responsive stack is fine (the point is to compare approaches). It should support:
component-based UI, a central config module, easy WhatsApp-link helpers, good image handling,
and — if doing 3D — a WebGL/Three.js layer with graceful fallback. Static hosting is enough;
there is no backend required for v1.

---

## 8. Future roadmap (out of scope for v1, but design so it's addable)

- **AWS backend:** DynamoDB (dynamic product catalog), API Gateway + Lambda (CRUD),
  S3 + CloudFront (product image hosting), Cognito (admin auth).
- **Admin CMS:** a mobile-friendly protected `/admin` where the owner can add/edit/remove
  products and images from their phone (large tap targets, image picker, minimal typing).
  Keep product data in one typed module now so it can later be swapped for an API client.

---

## Appendix — current reference implementation (optional to follow)

The existing site is built with: **Next.js 15 (App Router) + React 19 + Tailwind CSS 4**,
**Framer Motion** for animation, and **React Three Fiber / drei / three.js** for the 3D hero
and configurator. Business info lives in a single `siteConfig` module; products in one typed
`products.ts`; WhatsApp links are built by helpers in a `whatsapp.ts` lib. There is also
lightweight WhatsApp-click analytics with a simple owner dashboard. A fresh build does **not**
need to match this stack — it's provided only for comparison.
