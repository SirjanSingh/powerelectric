# Phase 00 — UI Review

**Audited:** 2026-04-04
**Baseline:** Abstract 6-pillar standards (no UI-SPEC.md)
**Screenshots:** Not captured (no dev server detected on ports 3000, 5173, 8080)

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | Strong B2B-specific CTAs; one generic "Submit another request" label and one dev-mode map placeholder exposed to users |
| 2. Visuals | 4/4 | Consistent industrial-ledger aesthetic with clear hierarchy, corner markers, spec rails, and deliberate motion |
| 3. Color | 3/4 | 183 hardcoded hex occurrences in TSX across all components; design token system in CSS exists but is largely bypassed in components |
| 4. Typography | 3/4 | Coherent three-font system; 12+ distinct inline fontSize values create maintenance risk despite visual consistency |
| 5. Spacing | 3/4 | One arbitrary Tailwind value; mixed Tailwind + inline padding throughout; functional but inconsistent method |
| 6. Experience Design | 2/4 | No loading skeletons, no ErrorBoundary, image onError silently hides images with no fallback visible to user, no disabled states on form submit |

**Overall: 18/24**

---

## Top 3 Priority Fixes

1. **Image onError silently hides product images with no visible fallback** — Buyers on the products and featured products pages see a blank space (emoji placeholder is z-index 0, behind the image) when assets fail to load — Replace `e.currentTarget.style.display = "none"` with a proper visible fallback state (e.g., show the emoji/icon placeholder at a higher z-index, or swap `src` to a dedicated placeholder image)

2. **183 hardcoded hex color values in component TSX files bypass the design token system** — Any brand color change requires a grep-and-replace across 13 files instead of updating a single CSS variable — Migrate inline `color: "#2563EB"`, `background: "#111827"`, `color: "#64748B"`, `color: "#94A3B8"`, and `border: "1px solid #DDE1E9"` to reference `var(--color-accent)`, `var(--color-text)`, `var(--color-muted)`, and `var(--color-border)` respectively

3. **No error boundary or form-submit disabled state** — If the WhatsApp URL construction fails silently or if a user double-taps the contact form submit button, there is no guard — Add an `ErrorBoundary` wrapper around `ProductsGrid` and `ContactPage`, and set `button[type=submit]` to `disabled` during the `submitted` state transition

---

## Detailed Findings

### Pillar 1: Copywriting (3/4)

**Strengths:**
- Primary CTAs are specific and action-oriented: "WhatsApp for Quote", "Browse Products", "Ask on WhatsApp", "Send via WhatsApp", "Request Bulk Quote"
- Empty state for product search is well-written: "No Products Match / Try clearing filters or contact us directly on WhatsApp" (products/page.tsx:199-210)
- Pre-filled WhatsApp messages in `whatsapp.ts` include structured fields (quantity, city, warranty request) — a significant UX win for B2B
- FAQ answers on the contact page are specific, not boilerplate
- Section headings are direct and B2B-appropriate: "Built for Serious Buyers.", "We're Here for Bulk Orders"

**Issues:**
- `contact/page.tsx:250` — "Submit another request" is generic. In context of a WhatsApp-first flow, "Send Another Quote" or "Start New Request" would match the interaction model better
- `contact/page.tsx:438` — Map empty state exposes a developer instruction: "Update googleMapsEmbedUrl in src/config/site.ts". This string is rendered to end users when the map URL is not configured. Replace with "Map loading" or the business address only
- `contact/page.tsx:127` — The `submitted` state label "WhatsApp Opened" (line 231) is clear, but the green color used (`#00d97e`) is a one-off hardcode not matching the design system's `--color-green: #059669`

### Pillar 2: Visuals (4/4)

**Strengths:**
- Strong and consistent visual identity throughout: industrial-ledger grid lines, corner L-bracket markers in Hero and GalleryBand, monospaced spec rails, muted watermark step numbers in HowItWorks
- Clear visual hierarchy: hero H1 at clamp(4.5rem–8rem), section titles at clamp(2rem–3.2rem), body copy at 0.875rem–1rem, metadata labels at 0.6rem–0.65rem mono
- Scroll-reveal animations (`Reveal.tsx`) use a tasteful blur + translate-Y with `once: true` — no looping distractions
- Hero parallax properly respects `prefers-reduced-motion`
- Header glassmorphism on scroll is well-implemented with proper passive event listener
- FloatingWhatsApp button is size 14x14 with adequate tap target (56x56px) and high-contrast green
- Mobile menu collapses via `max-h` transition (no layout shift), closes on outside click and route change

**Minor observations:**
- `GalleryBand.tsx` is effectively a single placeholder image with a decorative caption. Once real product photography is available, this section has minimal content value in its current form (one image, no interactivity)
- The `hero-vline` CSS class references `background: linear-gradient(to bottom, transparent, #1c2028 30% ...)` — a near-black dark color that reads as a leftover from a dark-mode variant. On the light background it should be `#DDE1E9` or `var(--color-border)` for correctness

### Pillar 3: Color (3/4)

**Token system defined but inconsistently applied:**

The globals.css defines a complete token system:
- `--color-accent: #2563EB`
- `--color-text: #111827`
- `--color-muted: #64748B`
- `--color-border: #DDE1E9`
- `--color-surface: #FFFFFF`
- `--color-bg: #F4F6F9`

**Problem:** Across 13 TSX files, there are 183 occurrences of raw hex codes. The tokens are used in `globals.css` utilities (`.btn-primary`, `.card`, `.section-pad`) but almost all component-level inline styles hardcode the raw values.

Representative violations:
- `TrustStrip.tsx:32` — `style={{ color: "#2563EB" }}` instead of `var(--color-accent)`
- `WhyUs.tsx:76` — `style={{ color: "#2563EB" }}` on icon
- `ContactMap.tsx:90` — `color: "#2563EB"` inline on service area tags
- `Footer.tsx` — 22 occurrences of raw hex values

**Accent application is appropriate** — blue is used for icons, active states, labels, and primary CTAs only. It is not overused decoratively. The 60/30/10 color split is roughly correct (bg/surface as neutral dominant, text-muted as secondary, accent for interactive elements).

**One-off hardcodes:**
- `contact/page.tsx:230` — `color: "#00d97e"` (success state) does not match `--color-green: #059669`
- `globals.css:133` — `.card:hover` uses `border-color: rgba(245, 166, 35, 0.3)` — amber/orange — which appears nowhere else in the design system and conflicts with the blue accent identity. This should be `rgba(37, 99, 235, 0.3)`

### Pillar 4: Typography (3/4)

**Three-font system is well-structured:**
- `--font-display`: Barlow Condensed (headings, section titles, product names, step labels)
- `--font-body`: Barlow (body copy, nav, buttons, descriptions)
- `--font-mono`: IBM Plex Mono (metadata labels, specs, overlines, section labels)

Each font has a clear semantic role. No mixed usage detected (e.g., mono on body copy or display on metadata).

**Font size proliferation (inline `fontSize` values found):**

| Size | Usage context |
|------|---------------|
| 5rem | HowItWorks watermark number (decorative) |
| 4rem | Hero fallback emoji |
| 2rem | Contact success state |
| 1.5rem | Products empty state heading |
| 1.3rem | CategoryCards h3 |
| 1.25rem | HowItWorks h3 |
| 1.2rem | WhyUs h3 |
| 1.15rem | Header logo |
| 1.1rem | FeaturedProducts h3, Footer logo |
| 1rem | Page subtitles |
| 0.875rem | Body copy throughout |
| 0.8rem | Card descriptions |
| 0.75rem | TrustStrip descriptions, service area tags |
| 0.7rem | Spec values, CategoryCards step label |
| 0.65rem | Multiple monospace label uses |
| 0.6rem | Most section-label / metadata sizes |

That is 16+ distinct fontSize values defined as inline strings. Even accounting for decorative outliers (5rem, 4rem), there are 12+ actively used sizes. The `section-title` CSS class uses `clamp(2rem, 4vw, 3.2rem)` correctly, but the card heading sizes (1.1rem, 1.2rem, 1.25rem, 1.3rem) are functionally identical and could be consolidated to 3 levels: `1rem`, `1.15rem`, `1.3rem`.

**Weights:** Only `font-medium` and `fontWeight: 700` / `fontWeight: 600` / `fontWeight: 500` are used inline — no weight inconsistency found.

### Pillar 5: Spacing (3/4)

**Tailwind spacing classes used appropriately:**
- Consistent `section-pad` (80px top/bottom) applied via the global utility class across all sections
- Container max-width 1180px with 24px horizontal padding is clean and consistent
- Card internals use `p-5`, `p-7`, `p-8` — three levels that are used semantically (5=compact, 7=panel header, 8=card body)
- Grid gaps primarily use `gap-3`, `gap-6`, `gap-8`, `gap-10` — clean scale

**Issues:**
- `Hero.tsx:62` — `max-w-[640px]` is the one arbitrary value. The CSS utility `.container` already handles outer width; this inner constraint could use a Tailwind named class (e.g., `max-w-2xl` = 672px is the closest standard). Low severity.
- Inline style padding is mixed with Tailwind padding in the same components. `TrustStrip.tsx` uses `py-6 px-5` (Tailwind) for grid cells but then `borderBottom: "1px solid #DDE1E9"` inline for borders. This is a maintenance pattern issue rather than a visual problem.
- `ContactMap.tsx` contact panel uses `px-7 py-4`, `px-7 py-5`, `px-7 py-4` alternating across rows — `px-7` is a non-standard Tailwind class (28px). While visually consistent, it would be more maintainable as a CSS variable or wrapper padding.

### Pillar 6: Experience Design (2/4)

**What works:**
- Products page has a Suspense boundary with a fallback for the catalog grid (`products/page.tsx:408-424`)
- Empty search state is handled with a proper message: "No Products Match / Try clearing filters or contact us directly on WhatsApp" (products/page.tsx:189-212)
- Form post-submit state is handled: `submitted` boolean switches the form to a confirmation view (`contact/page.tsx:221-253`)
- WhatsApp opens in a new tab (`target="_blank"` with `rel="noopener noreferrer"`) consistently across all CTA touchpoints
- Mobile menu closes on route change and outside click — correct UX
- Keyboard accessibility: all interactive elements are native `<a>` or `<button>` elements, tab order is natural
- `aria-expanded` on mobile menu button (`Header.tsx:111`), `role="tablist"` and `aria-selected` on product tabs (`products/page.tsx:75-76`), `role="list"` on hero spec rail (`Hero.tsx:92`) — solid accessibility groundwork

**Missing states:**

1. **No loading skeleton for product grid** — The Suspense fallback is a plain text label ("Loading catalog…") styled in monospace. For a product catalog, a skeleton grid would be more professional
2. **Image onError silently hides images** — `FeaturedProducts.tsx:43`, `GalleryBand.tsx:58`, `Hero.tsx:152`, `products/page.tsx:235` all call `e.currentTarget.style.display = "none"`. The emoji/icon placeholder (e.g., `🛵` at z-0 opacity-40) is behind the image element by z-index and won't surface as a meaningful fallback. A user sees a blank image area with no indication of the failure
3. **No ErrorBoundary** — No `error.tsx` boundary in any route segment. A JavaScript error in `ProductsGrid` (which depends on `useSearchParams`) would cause the entire page to crash without a recovery UI
4. **Form submit button has no disabled state** — When the user clicks "Send via WhatsApp", `handleSubmit` opens a new tab and sets `submitted = true`. There is no `disabled` attribute applied to the button during this transition, allowing potential duplicate WhatsApp messages from a quick double-tap
5. **No validation feedback UI** — The form uses `required` HTML attributes, which trigger browser-native validation popups. There are no custom error messages or inline field-level validation states with color feedback
6. **Contact map iframe on contact page** applies `filter: invert(0.9) hue-rotate(180deg)` (`contact/page.tsx:413`) while the homepage ContactMap section renders the same iframe without this filter. The two map instances look inconsistent

---

## Files Audited

- `src/config/site.ts`
- `src/data/products.ts`
- `src/app/globals.css`
- `src/lib/whatsapp.ts`
- `src/lib/utils.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/products/page.tsx`
- `src/app/contact/page.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/TrustStrip.tsx`
- `src/components/sections/FeaturedProducts.tsx`
- `src/components/sections/CategoryCards.tsx`
- `src/components/sections/WhyUs.tsx`
- `src/components/sections/HowItWorks.tsx`
- `src/components/sections/Industries.tsx`
- `src/components/sections/GalleryBand.tsx`
- `src/components/sections/ContactMap.tsx`
- `src/components/shared/Header.tsx`
- `src/components/shared/Footer.tsx`
- `src/components/shared/FloatingWhatsApp.tsx`
- `src/components/shared/Reveal.tsx`

Registry audit: shadcn not initialized — skipped.
