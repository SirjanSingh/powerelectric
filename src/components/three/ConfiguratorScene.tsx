"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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

/** Mounts only once the GLB-loading <Scooter> inside the same Suspense
 * boundary has resolved — fires exactly when the scooter is about to draw,
 * not merely when the WebGL context exists (mirrors HeroScene). */
function ReadySignal({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

/** Slow idle auto-rotate that pauses while the user is actively dragging —
 * same feel as the hero rig, ported down to a single fixed camera position
 * since the configurator canvas is a small, self-contained box rather than
 * a full-bleed hero backdrop. */
function ScooterRig({ bodyColor, onReady }: { bodyColor: string; onReady?: () => void }) {
  const idleGroup = useRef<THREE.Group>(null!);
  const dragging = useRef(false);

  useFrame((_, delta) => {
    if (!dragging.current && idleGroup.current) {
      idleGroup.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group position={[0, -2, 0]} scale={5.4}>
      <PresentationControls
        global
        snap
        speed={1.2}
        cursor
        rotation={[0.08, 0.35, 0]}
        polar={[-0.15, 0.3]}
        azimuth={[-Math.PI, Math.PI]}
      >
        <group
          ref={idleGroup}
          onPointerDown={() => (dragging.current = true)}
          onPointerUp={() => (dragging.current = false)}
          onPointerLeave={() => (dragging.current = false)}
        >
          <Suspense fallback={null}>
            <group rotation={[0, 0.5, 0]}>
              <Center>
                <Scooter bodyColor={bodyColor} />
              </Center>
            </group>
            <ReadySignal onReady={onReady} />
          </Suspense>
        </group>
      </PresentationControls>
      <Suspense fallback={null}>
        <ContactShadows position={[0, -6.5, 0]} opacity={0.35} scale={40} blur={2.4} far={20} />
      </Suspense>
    </group>
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
  /** Fired once the canvas has created a WebGL context and is about to
   * draw its first frame — used by the parent to fade the static fallback
   * image out, mirroring the Hero pattern. */
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
      camera={{ position: [0, 0, 24], fov: 42, near: 0.1, far: 1000 }}
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
