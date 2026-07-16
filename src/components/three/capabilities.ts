/**
 * Shared client-side capability checks for the hero 3D scene.
 *
 * Both the scene itself (HeroScene) and its parent (Hero) must agree on
 * whether WebGL 3D will actually render: the parent uses this to decide
 * between showing a neutral loader (3D is coming) versus the permanent static
 * image fallback (3D will never come — reduced-motion or no WebGL).
 */

export function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** True when the interactive 3D hero scene should be attempted. */
export function canRender3D(): boolean {
  return !prefersReducedMotion() && supportsWebGL();
}
