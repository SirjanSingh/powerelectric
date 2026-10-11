# Power Electric India: Design Brief

Paste this whole file into the design tool, or point the tool at this repository (branch
`cla` holds the current site). Screenshots of the current site are in `screenshots/` next to
this file (desktop 1440px and mobile 390px, above-the-fold and full-page for every page). The
logo is `public/assets/logo.jpg`. If you can read the repo, every path mentioned below is real:
tokens in `src/app/globals.css`, business info in `src/config/site.ts`, products in
`src/data/products.ts`, sections in `src/components/sections/`.

---

## 0. The ask in one paragraph

Redesign the visual layer of an existing, working B2B website for **Power Electric India**, a
Delhi bulk supplier of electric scooters, EV batteries, chargers and parts. The content,
page structure and WhatsApp-first conversion flow already exist and mostly stay. What we want
from you is a **sharper, more distinctive, more trustworthy visual design** that looks like a
serious industrial supplier, not a SaaS template, and that does not read as AI-generated.
Deliver a design system plus desktop and mobile layouts for the 4 public pages (Home,
Products, Contact, Configure), in a form we can port into Next.js + Tailwind CSS 4.

---

## 1. The business (real facts only)

| Field | Value |
|---|---|
| Name | **Power Electric India** |
| What they do | Bulk supply of EVs and EV components. Lead-gen / catalog site, **not** e-commerce (no cart, no checkout, no prices online). |
| Tagline (current) | Bulk EV Supply for Fleets, Dealers & Institutions |
| Short pitch | Reliable bulk EV supply, GST billing, fast dispatch. |
| Phone / WhatsApp | +91 63999 88690 |
| Email | sukhjotev@gmail.com |
| Address | Nangli Industrial Area, Delhi, India (exact plot/PIN not confirmed, do not invent one) |
| Hours | Mon to Sat, 11 AM to 7 PM IST. Sunday closed. WhatsApp answered 24h. |
| Service area | Nationwide dispatch. Core market Delhi NCR / North India. Full-container bulk and export enquiries. |
| Social media | None. Do not add Instagram/LinkedIn/etc. icons. |
| Domain | Not confirmed yet. |
| Map location | Not confirmed yet. |

**Product lines (3 categories, 12 representative listings today):**

1. **Electric scooters**: fleet delivery, city commuter, cargo/loader, low-speed campus (25 km/h, no registration needed). Specs shown: range, top speed, battery.
2. **EV batteries**: LFP and NMC lithium packs (48V to 72V), lead-acid sets (4 x 12V) for e-rickshaw/entry platforms. Specs: voltage, capacity, chemistry.
3. **Chargers & parts**: smart chargers (3A to 8A), BLDC motor controllers (45 to 85A), DC-DC converters, throttle/display/wiring kits. Specs: voltage, current, compatibility.

Listings are deliberately spec-descriptive ("LFP Battery Pack 72V 30Ah"), not invented brand
names. Exact makes, stock and pricing are shared per enquiry on WhatsApp.

**Differentiators to make visible:** full-container / bulk quantities, GST invoice on every
order, tiered bulk pricing, verified stock, nationwide dispatch, manufacturer-warranty
coordination, fast WhatsApp response.

---

## 2. Audience and the one job of the site

**Who visits:** procurement people and owners at delivery/last-mile fleets, local EV dealers
and resellers, campuses/hospitals/hotels/factories buying low-speed fleets, municipal buyers.
Mostly on phones, often on mid-range Android over mobile data, many in North India. They are
comparing suppliers and want to know: is this a real business, do they have what I need, can
they handle my volume, will I get a GST invoice, how fast can I talk to someone.

**The one job:** get the visitor to open WhatsApp with a pre-filled enquiry. Every page and
section should push toward that. Secondary: phone call, email, the quote form (which also
opens WhatsApp, there is no backend form submission).

**Tone:** direct, practical, confident. "Built for serious buyers: fleets, dealers,
institutions, not hobbyists." Not playful, not hype, not startup-speak.

---

## 3. Hard rules (non-negotiable)

1. **WhatsApp-first CTAs.** Primary buttons open `wa.me` links with a pre-filled message. WhatsApp green (#25D366) is reserved for WhatsApp actions only. A floating WhatsApp button stays on every page.
2. **No invented data.** No customer counts, ratings, testimonials, review stars, client logos, years-in-business, certifications, awards, "10,000+ units delivered" or any number that is not in this brief. If there is no real number, show no number.
3. **Honest imagery.** Product photos are representative stock today and are labeled "representative". Do not design around fake product photography or AI-rendered "hero products" presented as real stock.
4. **Mobile-first.** Must work at 390px wide: no horizontal scroll, thumb-sized tap targets (44px+), readable type, hamburger nav.
5. **Accessibility and motion.** WCAG AA contrast. Visible focus states. Respect `prefers-reduced-motion`. Any 3D needs a static fallback.
6. **Things that make a site look AI-generated, avoid all of them:**
   - purple/violet gradients or any gradient used as the default accent
   - cursive/script display fonts
   - emoji used as icons (use a real icon set or custom SVG)
   - text-only logo with no mark (we have a real mark, use it)
   - vague hero headline that does not say what the business is
   - scroll animations on every section
   - animated gradient text, glowing blobs, glassmorphism everywhere
   - fake metrics, fake testimonials, dead buttons, "Made with ..." badges
   - em dashes in the copy
7. **Every button and link must go somewhere real.** No placeholder CTAs.
8. **Data collection needs a privacy note.** The site sets an anonymous first-party visitor cookie and logs page views and WhatsApp clicks (no personal data, city only if the buyer typed it). Design a small privacy note page/link in the footer. No fake cookie banners or terms pages beyond what is real.

---

## 4. The current site, page by page

Live structure: fixed header, then page content, then footer, plus a floating WhatsApp button.
Header nav: Home, Products, Configure, Contact, plus a green "WhatsApp" button. Mobile: logo
plus hamburger that drops down a menu with the same links and a full-width "WhatsApp for
Quote" button.

### Home (9 sections, top to bottom)

1. **Hero** (full viewport height). Left: mono overline "Bulk EV Supply, Fleets · Dealers · Institutions"; huge condensed uppercase headline stacked on 3 lines: "ELECTRIC / VEHICLES (blue, indented) / AT SCALE. (smaller, grey, indented further)"; body paragraph about scooters, LFP/NMC packs, chargers and parts, single-fleet lots to full-container orders, GST invoicing, pan-India dispatch; a 4-cell "spec rail" (Min. Order: 5 UNITS, Battery: LFP / NMC, Billing: GST READY, Dispatch: PAN INDIA); CTAs "WhatsApp for Quote" (solid blue) and "Configure & Get Quote" (ghost). Right: a framed box with blue L-shaped corner brackets containing an interactive 3D scooter (drag to rotate) over a faint particle field, a small tag "E-SCOOTER · FLEET GRADE". Background: very light blue-grey with a faint 80px grid.
2. **Trust strip** (dark navy band, 4 columns, 2x2 on mobile): GST / Billing Included; 5+ / Units Min Order; PAN / India Dispatch; OEM / Warranty Support, each with an icon and one-line description.
3. **Category cards** "What We Supply / Three Lines. One Supplier.": 3 joined cards (01 Electric Scooters, 02 EV Batteries, 03 Chargers & Parts) with icon, mono tag (MOQ 5 UNITS, LFP / NMC, OEM SPEC), description and "Explore" link to the filtered products page. Below: text link "Configure a scooter in 3D & get a quote".
4. **Featured products** "Catalog Highlights / Featured for Bulk Orders": 6 product cards in a 3-column grid (image, category tag, best-for chips, name, 2-line description, 2 spec rows, green "Ask Price" WhatsApp button). Footer bar: "12 SKUs in catalog" and "View All".
5. **Gallery band** "Fleet Ready / Purpose-Built for Commercial Use": a framed auto-scrolling marquee of 5 representative product images. Caption "Representative models, contact us for OEM sourcing".
6. **Why us** "Built for Serious Buyers." (the last two words have an animated blue shine gradient): 4 cards in a 2x2 grid: Reliable Supply, Transparent Quotes, Battery Options (LFP vs NMC explained), After-Sales Support.
7. **How it works** "How Bulk Ordering Works": 3 numbered steps joined by a line that draws on scroll: Share Your Requirement; Quote + Stock Confirmation; Dispatch + GST Invoice.
8. **Industries** "Who Buys From Us": 8 pill chips (Delivery Fleets, Campus / Institutions, Factories & Warehouses, Local EV Dealers, Last-Mile Logistics, Hospitality & Hotels, Municipal Services, Healthcare / Hospitals). **Currently each chip uses an emoji as its icon. This must change.**
9. **Contact band** "We're Here for Bulk Orders": left panel with WhatsApp / Call Now / Email buttons, phone, email, hours, address, service-area chips, "Request Bulk Quote" button. Right: map area, currently a "Map embed coming soon" placeholder because the real location is not confirmed.

### Products (`/products`)
Title "Products & Parts". Category tab rail (All / Scooters / Batteries / Chargers & Parts), a search box, a "Best for" dropdown filter (Fleet, Delivery, Commuter, Campus, Replacement, Universal, Industrial), clear-filters control, product grid (same card anatomy as Featured, with all specs and all best-for chips, green "Ask on WhatsApp" per card), empty state "No Products Match", disclaimer "Product images are representative. Specifications are indicative."

### Contact (`/contact`)
Title "Get a Bulk Quote". Quick-action strip (WhatsApp, Call, Email, each showing the number/address). Two columns: a **Bulk Quote Request form** (Name, Phone, City, Category select, Quantity, Message) whose submit button builds a structured WhatsApp message and opens WhatsApp, with a "WhatsApp Opened" confirmation state; and a side panel with contact details, hours, service areas, an FAQ accordion, and the map placeholder.

### Configure (`/configure`)
Title "Configure & Get Quote". Left: large 3D scooter viewer (drag to rotate, color updates live). Right: a stepped form: 01 Model (scooter models from the catalog), 02 Color (swatches: Fleet Blue, Sky, Graphite, Pearl White, Signal Red, Forest), 03 Battery (LFP / NMC toggle), 04 Quantity (stepper, minimum 5, plus quick chips 5 / 10 / 25 / 50), 05 City (optional). A one-line summary ("5 × Fleet Delivery E-Scooter · Fleet Blue · LFP") and a full-width green "Send Quote Request on WhatsApp" button. Disclaimer that the 3D model is representative. Note: when 3D is off, the viewer shows a static photo and picking a color changes nothing visible.

### Footer (all pages)
Logo + name + tagline + "WhatsApp for Quote"; Quick Links (Home, Products, EV Batteries, Chargers & Parts, Get a Quote); Contact Us (phone, email, address, hours). Bottom bar: copyright and "Product images are representative. Final specs on request."

### Not in scope
`/admin/stats` is a private owner dashboard (WhatsApp click analytics). Ignore it for this brief.

---

## 5. Current design system (what exists today)

**Overall direction (named in the code as "Industrial Ledger"):** light, technical, engineered.
Corner-bracket frames, uppercase monospaced micro-labels, spec tables, thin hairline borders,
faint grid backgrounds.

**Color tokens (CSS custom properties):**

| Token | Value | Use |
|---|---|---|
| `--color-bg` | #F0F4FA | page background (almost every section) |
| `--color-surface` | #FFFFFF | cards, header, footer |
| `--color-surface-alt` / `-alt-2` | #F4F6F9 / #EEF2F9 | image wells, form panels |
| `--color-border` | #E2E8F0 | hairlines |
| `--color-text` / `--color-navy` | #0F172A | text, trust strip background |
| `--color-muted` / `-muted-2` / `--color-subtle` | #475569 / #64748B / #94A3B8 | secondary text, labels |
| `--color-accent` | #0369A1 | primary blue: CTAs, labels, icons, active states |
| `--color-accent-bright` | #0EA5E9 | cyan highlight (trust strip, gradients) |
| `--color-whatsapp` | #25D366 (hover #1EBE5D) | WhatsApp buttons only |
| `--color-green` / `--color-success` | #059669 / #00D97E | status dots, success state |

Light theme only. No dark mode today. The logo is pure black and white, so the blue accent is
a site choice, not a brand-book color. You may propose a different accent if it is better
reasoned (but not purple, and WhatsApp green stays reserved).

**Typography (Google Fonts):**
- Display: **Barlow Condensed** 600/700/800, uppercase, tight leading. Hero H1 is clamp(4.5rem, 9vw, 8rem); section titles clamp(2rem, 4vw, 3.2rem).
- Body: **Barlow** 400/500/600, 16px base, 1.6 line height.
- Labels/specs: **IBM Plex Mono** 400/500, 0.6 to 0.75rem, uppercase, 0.1 to 0.14em tracking.

**Shape and depth:** card radius 12px, button radius 8px, but hero buttons, spec rail, tags
and image frames use 2 to 3px. Soft layered shadows (sm to xl). Some glass/blur on the
header and hero spec cells.

**Layout:** 1180px max container, 24px side padding, 80px vertical section padding. Section
headers are always left-aligned: mono label, big uppercase title, grey subline.

**Icons:** Lucide (line icons) everywhere except the Industries chips (emoji).

**Motion:** Framer Motion blur-and-rise reveal on nearly every block; CSS fade-in on hero
copy; pulsing dots; animated gradient-shine text; card tilt, spotlight-follow and magnetic
hover effects; count-up on the trust strip; auto-scrolling marquee; self-drawing line in How
It Works; spring underline on the active nav link. All reduced-motion safe.

**3D:** React Three Fiber. Hero shows an interactive scooter model over a particle field with a
neutral spinner while it loads; static image only for reduced-motion / no-WebGL visitors. The
current model is a **low-poly, CC-BY licensed Vespa-style scooter** and looks crude. A better
licensed model is expected from the owner.

---

## 6. Assets we actually have

- **Logo:** black circular badge, white stylized "P" whose stem is a lightning bolt, with "POWER ELECTRIC INDIA" in heavy italic caps underneath (`logo.jpg`, raster only, square, white corners). Used in header (36px), footer (40px) and as favicon. At small sizes the words inside the badge are unreadable, and the header repeats the name as text next to it. **A cleaned-up vector version of the mark (the P-bolt alone) for small sizes, and a horizontal lockup, would help a lot.** Do not change the mark itself.
- **Product images (representative stock, 5 files):** one electric scooter photo, one alternative scooter render, one battery pack, one chargers/parts flat-lay, one scooter line-up. The 12 catalog listings reuse only 4 of these, so many cards show the identical image. Quality problems you will see in the screenshots: the battery and parts images are AI renders with an old placeholder brand name ("POWERELECTRIC") printed on the product; the "Low-Speed Campus E-Scooter" image is actually a stand-up kick scooter; the line-up image is a dark neon render that looks AI-generated. Treat all of these as temporary and do not build the look around them.
- **3D model:** `scooter.glb`, 12 KB, low-poly, CC-BY (attribution in `public/models/LICENSE.txt`).
- **No** real product photography, warehouse/team/dispatch photos, client logos or testimonials yet.

---

## 7. What is working (keep the spirit)

- The **industrial / technical identity**: corner brackets, mono spec labels, spec rails, datasheet-style product cards. It is the most distinctive part of the site; push it further rather than replacing it with generic SaaS styling.
- **Spec-first product cards** (voltage, capacity, chemistry, range) suit B2B buyers.
- **Condensed uppercase display type** reads "industrial" and fits the logo's heavy italic caps.
- **Clear conversion paths:** WhatsApp CTA in header, hero, every product card, contact band, footer and floating button; pre-filled structured messages.
- **Honest disclaimers** ("images are representative").
- The **configurator** is a genuine differentiator for a supplier site.

---

## 8. What is not working (please fix)

1. **Monotone page rhythm.** Almost every section sits on the same pale blue-grey (#F0F4FA) with the same left-aligned label/title/subline pattern. Only the trust strip breaks it. The home page reads as one long beige scroll of cards.
2. **Template gimmicks dilute the industrial feel:** animated gradient-shine text, tilt cards, spotlight cards, magnetic chips, count-up applied to words ("GST", "PAN"), auto-scrolling marquee, reveal animation on every block. Too much "component library demo", not enough "serious supplier".
3. **Inconsistent shape language:** 2 to 3px sharp corners in the hero and tags vs 8 to 12px rounded cards and buttons elsewhere. Pick one system.
4. **Repetitive imagery:** 12 products, 4 images. Need a design that looks intentional with limited photography (for example a spec-led card with a consistent category illustration or silhouette, or a neutral product-well treatment) and that will look even better when real photos arrive.
5. **Emoji icons** in the Industries section.
6. **Weak hero visual** (see `home-desktop-fold.jpg`): the 3D model is a crude low-poly Vespa-style scooter, it is not contained by its corner-bracket frame (it spills past the brackets and over the vertical rule), and the "E-SCOOTER · FLEET GRADE" tag sits on top of the model. The background is a connected-dots "plexus" particle network, a generic tech-stock cliché. The hero needs to look premium whether the 3D loads or not (compare `home-desktop-fold-static.jpg`, the fallback that reduced-motion and no-WebGL visitors see).
7. **Hero headline is generic.** "Electric Vehicles At Scale." is fine but could be any EV company. The concrete part (bulk supply for fleets, dealers, institutions; GST; full-container orders) lives in the small overline and paragraph. Make the concrete offer more prominent.
8. **Logo handling:** small raster badge plus repeated wordmark in the header; white corners of the JPG can show on tinted backgrounds.
9. **The gallery band adds little:** 5 stock images scrolling. Either give it a job (for example dispatch/warehouse proof when real photos exist) or cut it.
10. **Copy leaks dev-speak and em dashes:** for example "No backend, no delays." on the contact page; em dashes in roughly 35 places. Rewrite with plain, human copy.
11. **Map placeholder** ("Map embed coming soon") looks unfinished. Design the contact block so it looks complete without a map.
12. **Mobile:** the product category tab strip runs off the right edge ("Chargers & Parts" is cut off) instead of wrapping; the hero spec rail wraps into a ragged 2x2 with unequal cell widths; the hero visual falls below the first screen while the particle lines run behind the paragraph and spec rail and hurt readability; long sections become very long stacks.
13. **No privacy note** despite the analytics cookie. Worse, the contact form says "No data is stored" while the click tracker does log the category, quantity and city typed into that form. The copy must match what the site really does.
14. **Section headers are misaligned:** the label and title are left-aligned but the grey subline is centred in the container, so it floats in the middle of the page under a left-aligned title (visible in every home section).
15. **Footer has no vertical padding:** its columns touch the top border and the copyright bar is squeezed against the bottom edge.
16. **Address formatting:** shows "Nangli Industrial Area, Delhi, Delhi" (city and state repeated), and on the contact page "Nangli Industrial Area, , Delhi —" with an empty slot and a stray dash.
17. **Product grid is a wall of green:** every card ends in a full-width bright green WhatsApp button, 12 in a row on the Products page. The green should stay for WhatsApp, but the grid needs a calmer hierarchy (for example one clear action per card that does not shout).
18. **Large dead gaps** between home sections (80px padding plus extra margins), which make the page feel emptier and longer than its content.
19. Small inconsistencies: the hero button hover turns a different blue (#1D4ED8) than the accent; a near-black vertical rule in the hero; trust-strip claims (min 5 units, OEM warranty) still need owner confirmation, so keep them easy to edit.

---

## 9. What we want from you

**Type of work:** visual redesign and design-system cleanup of an existing site. Evolve the
industrial/technical direction into something more confident and premium, not a full rebrand
and not a change of business model.

**Deliverables:**
1. **Design system / tokens:** color palette (with contrast-checked text pairs), type scale (display/body/mono with exact sizes for H1, H2, H3, body, small, label), spacing scale, radius, borders, shadows, motion rules (what animates and what does not). Deliver as CSS custom properties we can drop into `globals.css`.
2. **Component specs:** header (desktop + mobile menu), buttons (primary, secondary/ghost, WhatsApp), product card, category card, spec rail/table, trust item, step item, industry chip with real icons, form fields (default, focus, error, disabled), tabs/filters, footer, floating WhatsApp button, empty state, loading state for the 3D viewer.
3. **Page layouts at 1440px and 390px** for Home, Products, Contact, Configure. Show the hero with the 3D visual and with its static fallback.
4. **Rewritten copy** where it is weak (hero headline options, section titles, contact page intro), following the rules in section 3. Plain English, no em dashes, no hype words.
5. **Notes for the developer:** anything that changes behavior (for example removing the marquee or a section) called out explicitly.

**Direction ideas (suggestions, not requirements):**
- Lean into an "engineering datasheet / industrial catalog" language: ruled spec tables, part-number style labels, measured grids, technical line illustrations.
- Alternate light and dark bands (or use one strong dark section) to give the home page rhythm.
- Make the conversion moment feel fast and personal: the WhatsApp action, the response promise, the hours.
- Keep motion to a few purposeful moments (hero entrance, 3D interaction, maybe the process line), not every block.
- Make it feel Indian-market credible (GST, pan-India dispatch, rupee-free since prices are on request) without clichés.

**Out of scope:** backend, prices, checkout, accounts, the admin dashboard, inventing new
products or claims, changing the logo mark.

---

## 10. Unknowns (do not invent, design around them)

- Exact address plot/PIN and map location
- Domain name
- Real product photos and real SKU/brand list
- Confirmation of trust claims: minimum order 5 units, OEM warranty coordination
- Years in business, volumes, client names: unknown, so do not show any

---

## 11. Technical constraints for handoff

- Stack: **Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion, React Three Fiber / drei / three.js, Lucide icons, Radix UI primitives.** Static site plus small analytics API, no CMS yet.
- Design tokens live as CSS custom properties in `src/app/globals.css`; shared utility classes `.btn`, `.btn-primary`, `.btn-outline`, `.card`, `.section-pad`, `.container`.
- All business info comes from one config file and products from one typed data file, so designs should not depend on hardcoded content lengths (names and specs vary).
- Fonts load through `next/font/google`, so any Google Font is easy; self-hosted fonts are possible but must be licensed for web.
- Future: an owner-facing mobile admin to add/edit products and photos, and a DynamoDB-backed catalog. Product cards should cope with 0 to many images and 2 to 6 spec rows.

---

## Appendix: screenshots

In `screenshots/` (captured from the current production build on 2026-10-11):

| File pattern | What it shows |
|---|---|
| `<page>-desktop-fold.jpg` | first screen at 1440x900, live 3D where the page has it |
| `<page>-mobile-fold.jpg` | first screen at 390x844 |
| `<page>-desktop-full.jpg` / `<page>-mobile-full.jpg` | whole page, top to bottom |
| `home-*-fold-static.jpg`, `configure-*-fold-static.jpg` | the static fallback shown when 3D is off (reduced motion / no WebGL) |

Pages: `home`, `products`, `contact`, `configure`. The full-page shots of home and configure
were taken with 3D off, so their hero shows the static photo instead of the 3D model.
