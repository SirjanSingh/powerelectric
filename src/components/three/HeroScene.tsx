"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
import { canRender3D } from "./capabilities";

const PARTICLE_COUNT = 140;
const SPREAD_X = 70;
const SPREAD_Y = 45;
const LINK_THRESHOLD = 15;

const PARTICLE_COLOR = "#0EA5E9";
const LINE_COLOR = "#0369A1";
const SCOOTER_BODY_COLOR = "#0369A1";

/**
 * Blue-cyan particle field + dynamic line web, ported 1:1 from the old
 * raw-three.js `HeroCanvas` (same counts/colors/threshold/drift/parallax),
 * just re-expressed as an R3F component sharing the scene's camera.
 */
interface ParticleData {
  positions: Float32Array;
  velocities: { x: number; y: number }[];
  linePositions: Float32Array;
}

function createParticleData(): ParticleData {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities: { x: number; y: number }[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * SPREAD_X * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    velocities.push({
      x: (Math.random() - 0.5) * 0.05,
      y: (Math.random() - 0.5) * 0.05,
    });
  }

  const MAX_SEGS = PARTICLE_COUNT * (PARTICLE_COUNT - 1);
  const linePositions = new Float32Array(MAX_SEGS * 6);

  return { positions, velocities, linePositions };
}

function ParticleField() {
  const { camera } = useThree();
  // The live camera object is stable across renders but is a value
  // returned from a hook — route mutations through a ref (mirrors the
  // idle-rotation pattern below) instead of mutating it directly.
  const cameraRef = useRef(camera);
  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  const target = useRef({ x: 0, y: 0 });
  const pointsGeomRef = useRef<THREE.BufferGeometry>(null);
  const linesGeomRef = useRef<THREE.BufferGeometry>(null);

  // Lazy, one-time imperative construction of the particle buffers. This is
  // the sanctioned "lazy ref init" escape hatch — the impure Math.random
  // calls only ever run once, guarded by the null check, not on every render.
  const dataRef = useRef<ParticleData | null>(null);
  if (dataRef.current === null) {
    dataRef.current = createParticleData();
  }

  // Callback refs set the "position" attribute the instant each geometry
  // mounts (synchronously, during commit) rather than in a later effect —
  // the render loop can tick before a useEffect runs, which previously
  // raced `needsUpdate` against an attribute that didn't exist yet.
  const setPointsGeom = (geom: THREE.BufferGeometry | null) => {
    pointsGeomRef.current = geom;
    const data = dataRef.current;
    if (geom && data && !geom.getAttribute("position")) {
      geom.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    }
  };
  const setLinesGeom = (geom: THREE.BufferGeometry | null) => {
    linesGeomRef.current = geom;
    const data = dataRef.current;
    if (geom && data && !geom.getAttribute("position")) {
      const linePosAttr = new THREE.BufferAttribute(data.linePositions, 3);
      linePosAttr.setUsage(THREE.DynamicDrawUsage);
      geom.setAttribute("position", linePosAttr);
    }
  };

  // Mouse parallax target, same feel as the original (lerp 0.04/frame).
  // A ref-only mutation on subscribe — no setState involved — so this is a
  // textbook "subscribe to an external system" effect, not the
  // setState-in-effect anti-pattern.
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 6;
      target.current.y = -(e.clientY / window.innerHeight - 0.5) * 4;
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useFrame(() => {
    const data = dataRef.current;
    const pointsGeom = pointsGeomRef.current;
    const linesGeom = linesGeomRef.current;
    const cam = cameraRef.current;
    if (!data || !pointsGeom || !linesGeom || !cam) return;

    const posAttr = pointsGeom.getAttribute("position") as
      | THREE.BufferAttribute
      | undefined;
    const lineAttrCheck = linesGeom.getAttribute("position");
    if (!posAttr || !lineAttrCheck) return;

    const { positions, velocities, linePositions } = data;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      if (positions[i * 3] > SPREAD_X) positions[i * 3] = -SPREAD_X;
      else if (positions[i * 3] < -SPREAD_X) positions[i * 3] = SPREAD_X;
      if (positions[i * 3 + 1] > SPREAD_Y) positions[i * 3 + 1] = -SPREAD_Y;
      else if (positions[i * 3 + 1] < -SPREAD_Y) positions[i * 3 + 1] = SPREAD_Y;
    }
    posAttr.needsUpdate = true;

    let idx = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < LINK_THRESHOLD) {
          linePositions[idx++] = positions[i * 3];
          linePositions[idx++] = positions[i * 3 + 1];
          linePositions[idx++] = positions[i * 3 + 2];
          linePositions[idx++] = positions[j * 3];
          linePositions[idx++] = positions[j * 3 + 1];
          linePositions[idx++] = positions[j * 3 + 2];
        }
      }
    }
    linesGeom.setDrawRange(0, idx / 3);
    (linesGeom.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;

    cam.position.x += (target.current.x - cam.position.x) * 0.04;
    cam.position.y += (target.current.y - cam.position.y) * 0.04;
    cam.lookAt(0, 0, 0);
  });

  return (
    <>
      <points>
        <bufferGeometry ref={setPointsGeom} />
        <pointsMaterial
          color={PARTICLE_COLOR}
          size={0.45}
          transparent
          opacity={0.75}
          sizeAttenuation
        />
      </points>
      <lineSegments>
        <bufferGeometry ref={setLinesGeom} />
        <lineBasicMaterial color={LINE_COLOR} transparent opacity={0.13} />
      </lineSegments>
    </>
  );
}

const BASE_CAMERA_Z = 55;

/**
 * Below the `lg` breakpoint the `.hero-image-wrap` column stacks under the
 * copy instead of sitting beside it, and the section's height then grows
 * well past one viewport (it is content-driven, not `100svh`-clamped) —
 * which, since the canvas is full-bleed over that same section, starves
 * the *horizontal* frustum under a fixed vertical FOV (a tall/narrow
 * render target = a very narrow slice of world width). This widens the
 * vertical FOV on compact layouts to hold a usable horizontal frustum at
 * the scooter's depth, instead of leaving it pinched to a sliver.
 */
function useCompactCameraFov(isCompact: boolean) {
  const { camera, size } = useThree();
  const cameraRef = useRef(camera);
  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  useEffect(() => {
    const cam = cameraRef.current;
    if (!(cam instanceof THREE.PerspectiveCamera)) return;
    const aspect = size.width / size.height;
    cam.aspect = aspect;
    if (isCompact) {
      const distance = BASE_CAMERA_Z - 34; // matches the compact rig depth
      const desiredHalfWidth = 11; // world units of scooter "elbow room"
      const halfHeight = desiredHalfWidth / Math.max(aspect, 0.15);
      const fov = THREE.MathUtils.radToDeg(2 * Math.atan(halfHeight / distance));
      cam.fov = THREE.MathUtils.clamp(fov, 60, 130);
    } else {
      cam.fov = 60;
    }
    cam.updateProjectionMatrix();
  }, [size, isCompact]);
}

/** Desktop shows the scooter right-of-center (matching the `.hero-image-wrap`
 * right column in the CSS layout); below the `lg` breakpoint that column
 * stacks under the copy, so the rig re-centers and pulls closer to camera
 * to stay fully framed in the (FOV-corrected) narrower frustum. */
function useScooterRigConfig() {
  const width = useThree((state) => state.size.width);
  const isCompact = width < 1024;
  useCompactCameraFov(isCompact);
  return isCompact
    ? { x: 0, y: -18, z: 34, scale: 3.3, isCompact }
    : { x: 8.5, y: 2, z: 25, scale: 3.8, isCompact };
}

/** Mounts only once every sibling inside the same Suspense boundary (i.e.
 * the GLB-loading <Scooter>) has resolved — so this signal fires exactly
 * when the scooter is actually about to draw, not merely when the WebGL
 * context exists. If the model fetch hangs or fails, this never mounts and
 * the static fallback image never fades out. */
function ReadySignal({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

/** Scooter rig: gentle drag-to-rotate (PresentationControls) plus a slow
 * idle auto-rotate that pauses while the user is actively dragging. */
function ScooterRig({ onReady }: { onReady?: () => void }) {
  const idleGroup = useRef<THREE.Group>(null!);
  const dragging = useRef(false);
  const rig = useScooterRigConfig();

  useFrame((_, delta) => {
    if (!dragging.current && idleGroup.current) {
      idleGroup.current.rotation.y += delta * 0.15;
    }
  });

  return (
    // Position/scale is the OUTERMOST transform, fixed in world space.
    // PresentationControls' drag spring and the idle auto-rotate both live
    // *inside* this anchor and rotate around its local origin, so the
    // scooter spins in place at (rig.x, rig.y, rig.z) instead of orbiting
    // the world/camera origin.
    <group position={[rig.x, rig.y, rig.z]} scale={rig.scale}>
      <PresentationControls
        global
        snap
        speed={1.2}
        cursor
        rotation={[0.08, 0.35, 0]}
        polar={[-0.2, 0.25]}
        azimuth={[-0.6, 0.6]}
      >
        <group
          ref={idleGroup}
          onPointerDown={() => (dragging.current = true)}
          onPointerUp={() => (dragging.current = false)}
          onPointerLeave={() => (dragging.current = false)}
        >
          <Suspense fallback={null}>
            <group rotation={[0, 0.5, 0]}>
              {/* Center on the mesh's true geometric bounding box so
                  rotation pivots predictably regardless of how the
                  source GLB authored its local origin. */}
              <Center>
                <Scooter bodyColor={SCOOTER_BODY_COLOR} />
              </Center>
            </group>
            <ReadySignal onReady={onReady} />
          </Suspense>
        </group>
      </PresentationControls>
      <Suspense fallback={null}>
        <ContactShadows
          position={[0, -6.5, 0]}
          opacity={0.35}
          scale={40}
          blur={2.4}
          far={20}
        />
      </Suspense>
    </group>
  );
}

interface HeroSceneProps {
  /** Fired once the scooter GLB has resolved and rendered (via the
   * <ReadySignal> mounted inside the model's Suspense boundary), so the
   * parent only fades the static fallback out when there's a real frame to
   * reveal — never during the gap between context creation and GLB load. */
  onReady?: () => void;
}

export default function HeroScene({ onReady }: HeroSceneProps) {
  // This component is only ever mounted client-side (parent uses
  // `dynamic(..., { ssr: false })`), so reading browser APIs directly in
  // the render body here is safe and never causes a hydration mismatch.
  if (!canRender3D()) return null;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 55], fov: 60, near: 0.1, far: 1000 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.6} />
      <directionalLight position={[20, 25, 15]} intensity={1.4} castShadow={false} />
      <directionalLight position={[-15, 5, -10]} intensity={0.35} color="#7DD3FC" />
      <Suspense fallback={null}>
        {/* Procedural studio environment built from Lightformers — fully
            self-contained, unlike the HDR presets which fetch from an
            external CDN at runtime and take the whole scene down (via the
            error boundary) whenever that fetch fails. */}
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
        <ScooterRig onReady={onReady} />
      </Suspense>
      <ParticleField />
    </Canvas>
  );
}
