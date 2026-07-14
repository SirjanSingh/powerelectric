"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Center,
  ContactShadows,
  Environment,
  Lightformer,
  PresentationControls,
} from "@react-three/drei";
import * as THREE from "three";
import { Scooter } from "./Scooter";

// The canvas box is a fixed 4:3 (set in CSS on the parent), so the frustum
// is the same shape at every viewport width — one fit calculation holds for
// 375w, 1280w and 1440w alike.
const CAMERA_Z = 24;
const CAMERA_FOV = 42;
const CANVAS_ASPECT = 4 / 3;
/** Fraction of the frustum the model is allowed to occupy — the rest is
 * deliberate breathing room so nothing touches the corner-marker frame. */
const FILL = 0.72;

/** Static three-quarter presentation angle. The hero spins its scooter
 * idly, but a configurator is an inspection surface: a stable, flattering
 * 3/4 view that never rotates itself round to a head-on silhouette is worth
 * more than idle motion here. The user can still drag to rotate. */
const YAW = 2.3;
const PITCH = 0.05;

interface Dims {
  width: number;
  height: number;
  depth: number;
}

/** Scales the (already-centered) model so its worst-case silhouette — the
 * diagonal of its footprint, i.e. the widest angle the user can drag it to
 * — still fits inside the frustum with margin. Measured from the real GLB
 * bounds via <Center onCentered>, not a hand-tuned magic number, so the
 * framing can't silently break if the asset is ever re-exported. */
function useFitScale(dims: Dims | null) {
  return useMemo(() => {
    if (!dims) return null;
    const halfH = CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV) / 2);
    const halfW = halfH * CANVAS_ASPECT;

    // Worst-case horizontal half-extent across a full 360° of yaw.
    const halfHoriz = Math.sqrt(dims.width ** 2 + dims.depth ** 2) / 2;
    const halfVert = dims.height / 2;

    const scale = Math.min((halfW * FILL) / halfHoriz, (halfH * FILL) / halfVert);
    return { scale, modelHalfHeight: halfVert * scale };
  }, [dims]);
}

function ReadySignal({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

function ScooterRig({ bodyColor, onReady }: { bodyColor: string; onReady?: () => void }) {
  const [dims, setDims] = useState<Dims | null>(null);
  const fit = useFitScale(dims);

  // Latch the measurement to the FIRST <Center> callback. Applying the
  // resulting scale to this group makes Center re-run its layout effect and
  // report again, which would set state, rescale, re-measure… — a genuine
  // infinite loop (React bailed out with "Maximum update depth exceeded").
  // The GLB's geometry is immutable, so one measurement at scale 1 is the
  // true intrinsic size and every later report is just an echo of our own
  // scaling. Ignore them.
  const measured = useRef(false);
  const handleCentered = ({ width, height, depth }: Dims) => {
    if (measured.current) return;
    measured.current = true;
    setDims({ width, height, depth });
  };

  return (
    <>
      {/* Held invisible for the single frame between mount and measurement so
          the model never flashes at the wrong size before the fit lands.
          onCentered runs in a layout effect, so this resolves before paint. */}
      <group scale={fit?.scale ?? 1} visible={!!fit}>
        <PresentationControls
          global
          snap
          speed={1.2}
          cursor
          rotation={[PITCH, YAW, 0]}
          polar={[-0.15, 0.3]}
          azimuth={[-Math.PI, Math.PI]}
        >
          <Suspense fallback={null}>
            <Center onCentered={handleCentered}>
              <Scooter bodyColor={bodyColor} />
            </Center>
            <ReadySignal onReady={onReady} />
          </Suspense>
        </PresentationControls>
      </group>

      {/* Outside the scaled group — its own world-space plane, parked just
          under the model's measured footprint rather than at a fixed depth
          that only happened to look right at one hand-picked scale. */}
      {fit && (
        <Suspense fallback={null}>
          <ContactShadows
            position={[0, -fit.modelHalfHeight - 0.25, 0]}
            opacity={0.35}
            scale={fit.modelHalfHeight * 6}
            blur={2.4}
            far={20}
          />
        </Suspense>
      )}
    </>
  );
}

function supportsWebGL(): boolean {
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

interface ConfiguratorSceneProps {
  /** Live-selected paint color (hex), passed straight through to the
   * Scooter's cloned Body material. */
  bodyColor: string;
  /** Fired once the GLB has resolved and the scene is about to draw — used
   * by the parent to fade the static fallback image out (Hero pattern). */
  onReady?: () => void;
}

export default function ConfiguratorScene({ bodyColor, onReady }: ConfiguratorSceneProps) {
  // Only ever mounted client-side (parent uses dynamic(..., { ssr: false })).
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !supportsWebGL()) return null;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV, near: 0.1, far: 1000 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.65} />
      <directionalLight position={[20, 25, 15]} intensity={1.4} castShadow={false} />
      <directionalLight position={[-15, 5, -10]} intensity={0.35} color="#7DD3FC" />
      <Suspense fallback={null}>
        <Environment resolution={64} environmentIntensity={0.5}>
          <Lightformer
            form="rect"
            intensity={2.2}
            position={[0, 5, 7]}
            scale={[10, 5, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={1.1}
            position={[-7, 2, -3]}
            rotation-y={Math.PI / 2}
            scale={[7, 3, 1]}
            color="#BFE3F7"
          />
          <Lightformer
            form="rect"
            intensity={0.9}
            position={[7, 1, -2]}
            rotation-y={-Math.PI / 2}
            scale={[7, 3, 1]}
            color="#ffffff"
          />
        </Environment>
        <ScooterRig bodyColor={bodyColor} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
