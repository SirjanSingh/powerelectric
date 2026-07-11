# Prompt — Fix the UI-REVIEW.md findings

Knock out the audit issues (current score 18/24) alongside the 3D work.

---
Read `UI-REVIEW.md` and fix its Top 3 + supporting findings. Use the `tailwind-patterns` skill
(Tailwind v4 CSS-first tokens) and `frontend-design`.

1. **Design tokens** — migrate the ~183 hardcoded hex values across the 13 component TSX files to
   `var(--color-accent | --color-text | --color-muted | --color-border)`. Fix the one-off
   `#00d97e` success color to `--color-green`, and the stray amber `rgba(245,166,35,.3)` card-hover
   border to the blue accent.
2. **Image fallback** — replace every `e.currentTarget.style.display = "none"` (FeaturedProducts,
   GalleryBand, Hero, products/page) with a **visible** fallback (surface the emoji/icon placeholder
   at a higher z-index, or swap to a placeholder image). This also aligns with the 3D fallback ladder.
3. **States** — add an `error.tsx` boundary for `/products` and `/contact`; disable the contact
   submit button during the `submitted` transition; add a real loading skeleton for the product grid
   (use **shadcn MCP** to fetch a Skeleton component if you initialize shadcn).
4. **Copy** — fix "Submit another request" → "Start New Request"; remove the dev-instruction map
   placeholder string exposed to users in `contact/page.tsx`.
5. **Consistency** — reconcile the two map iframe treatments (one uses an invert filter, one
   doesn't).

Verify each fix in the running app with **Playwright MCP** before claiming done. Then re-run the
6-pillar audit mentally and report the new expected score.
---
