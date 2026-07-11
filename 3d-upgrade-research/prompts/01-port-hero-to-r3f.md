# Prompt — Port HeroCanvas to react-three-fiber (parity)

Copy-paste to Claude Code in this repo:

---
Use the `nextjs-best-practices` and `react-best-practices` skills, and Context7 MCP for current
react-three-fiber / drei docs.

Refactor `src/components/shared/HeroCanvas.tsx` from raw three.js to **react-three-fiber + drei**,
keeping **visual and behavioral parity**:
- Same particle field (140 points, blue-cyan `#0EA5E9`), same connecting-line web (threshold 15,
  color `#0369A1`, opacity ~0.13), same wrap-around drift, same smooth mouse parallax.
- Keep the `prefers-reduced-motion` guard: if reduced, render nothing / a static background (no
  animation loop), exactly like today.
- Keep it client-only; `Hero.tsx` must keep importing it via `dynamic(..., { ssr: false })`.
- Dispose custom geometries on unmount.

Add deps: `@react-three/fiber @react-three/drei` (keep `three@^0.183`). Drive motion in `useFrame`,
not a manual `requestAnimationFrame` loop. Then start the dev server and, using **Playwright MCP**,
confirm the canvas mounts on `http://localhost:3000` and there are no console errors. Do not report
done until you've exercised it in the browser.
---
