"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import { products } from "@/data/products";
import { configuredQuoteUrl } from "@/lib/whatsapp";
import { SceneErrorBoundary } from "@/components/three/SceneErrorBoundary";
import { cn } from "@/lib/utils";
import { trackWhatsAppClick } from "@/lib/analytics";

// The R3F canvas touches WebGL/window and must never run during SSR.
const ConfiguratorScene = dynamic(
  () => import("@/components/three/ConfiguratorScene"),
  { ssr: false },
);

const scooterModels = products.filter((p) => p.category === "scooters");

interface ColorOption {
  name: string;
  hex: string;
}

const colorOptions: ColorOption[] = [
  { name: "Fleet Blue", hex: "#0369A1" },
  { name: "Sky", hex: "#0EA5E9" },
  { name: "Graphite", hex: "#334155" },
  { name: "Pearl White", hex: "#E2E8F0" },
  { name: "Signal Red", hex: "#DC2626" },
  { name: "Forest", hex: "#059669" },
];

const QTY_MIN = 5;
const QTY_MAX = 500;
const QTY_PRESETS = [5, 10, 25, 50];

export default function Configurator() {
  const [modelId, setModelId] = useState(scooterModels[0].id);
  const [color, setColor] = useState(colorOptions[0]);
  const [battery, setBattery] = useState<"LFP" | "NMC">("LFP");
  const [qty, setQty] = useState(QTY_MIN);
  // Mirrors `qty` but stays a free-typed string while the quantity input has
  // focus, so entering a two-digit number whose first digit is below
  // QTY_MIN (e.g. "25") isn't clamped-then-appended into "55" on every
  // keystroke. Clamped back into `qty` on blur/Enter.
  const [qtyInput, setQtyInput] = useState(String(QTY_MIN));
  const [city, setCity] = useState("");
  const [sceneReady, setSceneReady] = useState(false);
  const [sending, setSending] = useState(false);

  const model = scooterModels.find((m) => m.id === modelId) ?? scooterModels[0];

  const quoteUrl = useMemo(
    () =>
      configuredQuoteUrl({
        model: model.name,
        color: color.name,
        battery,
        qty,
        city: city.trim() || undefined,
      }),
    [model, color, battery, qty, city],
  );

  const summary = `${qty} × ${model.name} · ${color.name} · ${battery}${
    city.trim() ? ` · ${city.trim()}` : ""
  }`;

  function clampQty(next: number) {
    if (Number.isNaN(next)) return QTY_MIN;
    return Math.min(QTY_MAX, Math.max(QTY_MIN, Math.round(next)));
  }

  /** Used by the stepper buttons / presets, which always pass a valid
   * number — keeps the free-typed input field's mirror in sync. */
  function setQtyClamped(next: number) {
    const clamped = clampQty(next);
    setQty(clamped);
    setQtyInput(String(clamped));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
      {/* ════ LEFT: live 3D canvas ════ */}
      <div className="flex flex-col gap-2.5">
      <div
        className="relative w-full"
        style={{
          aspectRatio: "4 / 3",
          background: "var(--color-surface-alt)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-card)",
          overflow: "hidden",
        }}
      >
        {/* Corner markers — matches the hero visual frame */}
        <span
          aria-hidden="true"
          className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 z-10"
          style={{ borderColor: "var(--color-accent)" }}
        />
        <span
          aria-hidden="true"
          className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 z-10"
          style={{ borderColor: "var(--color-accent)" }}
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 z-10"
          style={{ borderColor: "var(--color-accent)" }}
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 z-10"
          style={{ borderColor: "var(--color-accent)" }}
        />

        <SceneErrorBoundary onError={() => setSceneReady(false)}>
          <ConfiguratorScene bodyColor={color.hex} onReady={() => setSceneReady(true)} />
        </SceneErrorBoundary>

        {/* Static fallback — visible until the R3F scene reports it has
            created a WebGL context, then crossfades out. Permanent fallback
            for reduced-motion / no-WebGL / scene-error cases. */}
        <Image
          src="/assets/scootyimg.png"
          alt="Electric scooter — representative model, live 3D preview when available"
          fill
          priority
          className={cn(
            "object-contain p-8 transition-opacity duration-500",
            sceneReady ? "opacity-0" : "opacity-100",
          )}
        />

      </div>

        {/* Caption sits BELOW the frame, not over the model — an overlay
            badge here landed squarely on the scooter's body and obscured
            the very paint colour the user is picking. */}
        <p
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-subtle)",
          }}
        >
          {sceneReady ? "Drag to rotate · representative model" : "Representative model"}
        </p>
      </div>

      {/* ════ RIGHT: controls panel ════ */}
      <div className="flex flex-col gap-7">
        {/* Model */}
        <fieldset className="border-0 p-0 m-0">
          <legend className="meta-label mb-3">01 · Model</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-label="Scooter model">
            {scooterModels.map((m) => {
              const selected = m.id === modelId;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setModelId(m.id)}
                  className="text-left px-4 py-3 transition-all"
                  style={{
                    border: `1.5px solid ${selected ? "var(--color-accent)" : "var(--color-border)"}`,
                    background: selected ? "var(--color-accent-light)" : "var(--color-surface)",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  <span
                    className="block"
                    style={{
                      fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: selected ? "var(--color-accent)" : "var(--color-text)",
                    }}
                  >
                    {m.name}
                  </span>
                  <span
                    className="block mt-0.5"
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.65rem",
                      color: "var(--color-subtle)",
                    }}
                  >
                    {m.bestFor.join(" / ")}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Color */}
        <fieldset className="border-0 p-0 m-0">
          <legend className="meta-label mb-3">02 · Color</legend>
          <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Body color">
            {colorOptions.map((c) => {
              const selected = c.hex === color.hex;
              return (
                <button
                  key={c.hex}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={c.name}
                  onClick={() => setColor(c)}
                  className="flex flex-col items-center gap-1.5"
                  style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
                >
                  <span
                    className="block rounded-full"
                    style={{
                      width: 34,
                      height: 34,
                      background: c.hex,
                      border: selected
                        ? "2.5px solid var(--color-accent)"
                        : "2.5px solid var(--color-border)",
                      boxShadow: selected ? "0 0 0 3px var(--color-accent-light)" : "none",
                      transition: "all 0.15s ease",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.03em",
                      color: selected ? "var(--color-accent)" : "var(--color-subtle)",
                    }}
                  >
                    {c.name}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Battery */}
        <fieldset className="border-0 p-0 m-0">
          <legend className="meta-label mb-3">03 · Battery</legend>
          <div className="flex gap-2" role="group" aria-label="Battery chemistry">
            {(["LFP", "NMC"] as const).map((b) => {
              const selected = battery === b;
              return (
                <button
                  key={b}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setBattery(b)}
                  className="px-5 py-2.5"
                  style={{
                    fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    border: `1.5px solid ${selected ? "var(--color-accent)" : "var(--color-border)"}`,
                    background: selected ? "var(--color-accent)" : "var(--color-surface)",
                    color: selected ? "#fff" : "var(--color-text)",
                    borderRadius: 6,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {b}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Quantity */}
        <fieldset className="border-0 p-0 m-0">
          <legend className="meta-label mb-3">04 · Quantity (Min. 5 Units)</legend>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQtyClamped(qty - 1)}
              disabled={qty <= QTY_MIN}
              className="flex items-center justify-center"
              style={{
                width: 40,
                height: 40,
                border: "1.5px solid var(--color-border)",
                background: "var(--color-surface)",
                borderRadius: 6,
                cursor: qty <= QTY_MIN ? "not-allowed" : "pointer",
                opacity: qty <= QTY_MIN ? 0.4 : 1,
                color: "var(--color-text)",
              }}
            >
              <Minus size={16} />
            </button>
            <input
              type="number"
              inputMode="numeric"
              min={QTY_MIN}
              max={QTY_MAX}
              value={qtyInput}
              onChange={(e) => setQtyInput(e.target.value)}
              onBlur={() => setQtyClamped(Number(qtyInput))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setQtyClamped(Number(qtyInput));
                  (e.target as HTMLInputElement).blur();
                }
              }}
              aria-label="Quantity"
              className="text-center"
              style={{
                width: 72,
                height: 40,
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "1rem",
                fontWeight: 600,
                border: "1.5px solid var(--color-border)",
                borderRadius: 6,
                background: "var(--color-surface)",
                color: "var(--color-text)",
              }}
            />
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQtyClamped(qty + 1)}
              disabled={qty >= QTY_MAX}
              className="flex items-center justify-center"
              style={{
                width: 40,
                height: 40,
                border: "1.5px solid var(--color-border)",
                background: "var(--color-surface)",
                borderRadius: 6,
                cursor: qty >= QTY_MAX ? "not-allowed" : "pointer",
                opacity: qty >= QTY_MAX ? 0.4 : 1,
                color: "var(--color-text)",
              }}
            >
              <Plus size={16} />
            </button>
            <div className="flex gap-1.5 ml-1">
              {QTY_PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setQtyClamped(p)}
                  className="px-2.5 py-1.5"
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.04em",
                    border: `1px solid ${qty === p ? "var(--color-accent)" : "var(--color-border)"}`,
                    color: qty === p ? "var(--color-accent)" : "var(--color-muted-2)",
                    background: qty === p ? "var(--color-accent-light)" : "transparent",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </fieldset>

        {/* City */}
        <fieldset className="border-0 p-0 m-0">
          <legend className="meta-label mb-3">05 · City (Optional)</legend>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Pune, Bengaluru..."
            aria-label="Delivery city"
            className="w-full px-4 py-2.5"
            style={{
              fontFamily: "var(--font-body, 'Barlow'), sans-serif",
              fontSize: "0.875rem",
              border: "1.5px solid var(--color-border)",
              borderRadius: 6,
              background: "var(--color-surface)",
              color: "var(--color-text)",
            }}
          />
        </fieldset>

        {/* Summary line */}
        <div
          className="px-4 py-3"
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.75rem",
            letterSpacing: "0.02em",
            color: "var(--color-text)",
            background: "var(--color-surface-alt)",
            border: "1px solid var(--color-border)",
            borderRadius: 6,
          }}
          aria-live="polite"
        >
          {summary}
        </div>

        {/* CTA */}
        <a
          href={quoteUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={sending}
          onClick={(e) => {
            if (sending) {
              e.preventDefault();
              return;
            }
            setSending(true);
            trackWhatsAppClick("configurator", {
              product: model.name,
              variant: `${color.name} · ${battery} · qty ${qty}`,
              city: city.trim() || undefined,
            });
            window.setTimeout(() => setSending(false), 1500);
          }}
          className={cn("btn wa-btn justify-center text-base", sending && "pointer-events-none opacity-70")}
          style={{ padding: "14px 24px" }}
        >
          <MessageCircle size={18} aria-hidden="true" />
          Send Quote Request on WhatsApp
        </a>
      </div>
    </div>
  );
}
