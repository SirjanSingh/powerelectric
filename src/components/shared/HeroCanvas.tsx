"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const mount = mountRef.current!;
    let w = mount.clientWidth || window.innerWidth;
    let h = mount.clientHeight || window.innerHeight;

    // ── Renderer ─────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 55;

    // ── Particles ─────────────────────────────────────────────
    const COUNT = 140;
    const SPREAD_X = 70;
    const SPREAD_Y = 45;

    const posArr = new Float32Array(COUNT * 3);
    const velArr: { x: number; y: number }[] = [];

    for (let i = 0; i < COUNT; i++) {
      posArr[i * 3] = (Math.random() - 0.5) * SPREAD_X * 2;
      posArr[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y * 2;
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 4;
      velArr.push({
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
      });
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(posArr, 3)
    );

    // Blue-cyan particle color
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color("#0EA5E9"),
      size: 0.45,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(particleGeom, particleMat);
    scene.add(points);

    // ── Connecting Lines (pre-allocated) ──────────────────────
    const MAX_SEGS = COUNT * (COUNT - 1); // max possible pairs
    const linePos = new Float32Array(MAX_SEGS * 6);
    const lineGeom = new THREE.BufferGeometry();
    const linePosAttr = new THREE.BufferAttribute(linePos, 3);
    linePosAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeom.setAttribute("position", linePosAttr);

    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#0369A1"),
      transparent: true,
      opacity: 0.13,
    });

    const linesMesh = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(linesMesh);

    const THRESHOLD = 15;

    function updateLines() {
      let idx = 0;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = posArr[i * 3] - posArr[j * 3];
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < THRESHOLD) {
            linePos[idx++] = posArr[i * 3];
            linePos[idx++] = posArr[i * 3 + 1];
            linePos[idx++] = posArr[i * 3 + 2];
            linePos[idx++] = posArr[j * 3];
            linePos[idx++] = posArr[j * 3 + 1];
            linePos[idx++] = posArr[j * 3 + 2];
          }
        }
      }
      lineGeom.setDrawRange(0, idx / 3);
      linePosAttr.needsUpdate = true;
    }

    // ── Mouse Parallax ────────────────────────────────────────
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = ((e.clientX / window.innerWidth) - 0.5) * 6;
      targetY = -((e.clientY / window.innerHeight) - 0.5) * 4;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Animate ───────────────────────────────────────────────
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);

      for (let i = 0; i < COUNT; i++) {
        posArr[i * 3] += velArr[i].x;
        posArr[i * 3 + 1] += velArr[i].y;
        // Wrap around edges
        if (posArr[i * 3] > SPREAD_X) posArr[i * 3] = -SPREAD_X;
        else if (posArr[i * 3] < -SPREAD_X) posArr[i * 3] = SPREAD_X;
        if (posArr[i * 3 + 1] > SPREAD_Y) posArr[i * 3 + 1] = -SPREAD_Y;
        else if (posArr[i * 3 + 1] < -SPREAD_Y) posArr[i * 3 + 1] = SPREAD_Y;
      }

      (particleGeom.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      updateLines();

      // Smooth camera parallax
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();

    // ── Resize ────────────────────────────────────────────────
    const onResize = () => {
      w = mount.clientWidth;
      h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeom.dispose();
      lineGeom.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
