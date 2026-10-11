## 2026-10-12 — Redesign brief for an external design tool

Sirjan wanted all the context on the current site design and the work we want, to hand to a
design bot (and possibly to ChatGPT with just the repo). No app code changed.

### What changed & why

- **`docs/design-brief/DESIGN-BRIEF.md`** (new). Different from `WEBSITE-BRIEF.md` (which is a
  build-from-scratch spec): this one describes the *current* site section by section with its
  real copy, the actual design tokens / fonts / motion / 3D setup, the assets and their limits,
  what works, 19 concrete problems, and the deliverables we want (design system, component
  specs, 1440px + 390px layouts for Home/Products/Contact/Configure, copy rewrites). Hard rules
  carried over: WhatsApp-first, no invented numbers/testimonials, no vibecoded tells (purple
  gradients, emoji icons, em dashes, etc.).
- **Assumed scope:** visual redesign within the current structure and industrial look, not a
  rebrand. Stated in section 9 so it can be changed.
- **`docs/design-brief/screenshots/`** (20 JPGs, 2.6 MB): every page at desktop 1440 and mobile
  390, above-the-fold and full-page, plus the static fallback hero. Committed (unlike
  `.planning/ui-reviews/`) because the brief references them and the repo itself may be the
  hand-off.
- **`README.md`**: replaced the bare create-next-app intro with a short project header that
  points at both briefs and the session notes. `CLAUDE.md` is gitignored, so README is the
  only entry point an outside tool sees.

### Real bugs found from the screenshots (not fixed; listed in the brief)
- Hero 3D scooter at 1440x900 spills out of its corner-bracket frame and the "E-SCOOTER · FLEET
  GRADE" tag overlaps it. The 2026-07-17 note said framing was fixed; it is not at this size.
  The configurator viewer frames correctly.
- Contact form says "No data is stored" but `trackWhatsAppClick("contact_form")` logs category,
  quantity and city. Copy is false; site also has no privacy note despite the `pe_vid` cookie.
- Footer has no vertical padding: unlayered `.container { padding: 0 24px }` in globals.css
  beats Tailwind 4's `py-14` / `py-5`. Likely affects every `container py-*` combination.
- `.section-sub` has `margin: 0 auto`, so subtitles centre under left-aligned section titles.
- Address renders "Delhi, Delhi" (city + state) and on `/contact` line ~479 builds
  "Nangli Industrial Area, , Delhi —" by hand instead of using `formatAddress()`.
- Stock battery/parts images have the old "POWERELECTRIC" placeholder brand printed on them;
  the campus scooter image is a stand-up kick scooter.
- Mobile: product tab strip runs off-screen; hero particle lines run behind the body copy.

### How verified
- Served the existing production build with `next start -p 3005` (no rebuild: C:/D: had
  ~1 GB free). Confirmed the build includes the 2026-07-17 content (real name, logo, loader,
  new catalog) via rendered HTML.
- Python Playwright captured all screenshots; horizontal overflow = 0px on every page at both
  widths. Looked at each screenshot before writing the findings above.

### Open items for next session
- **Branch:** all work since March is on `cla` (18 commits ahead of `main`, which is the
  default branch and still the placeholder site). Merge via PR #2 before handing anyone "the
  repo", or point them at `cla`.
- Fix the bugs above (footer padding, subtitle alignment, address formatting, false "No data is
  stored" copy, hero 3D framing) or let the redesign absorb them.
- Add a real privacy note page linked from the footer.
- Still open from 2026-07-17: licensed seated-e-scooter `.glb`, exact PIN + map embed, domain,
  owner confirmation of trust claims, real product photos.
