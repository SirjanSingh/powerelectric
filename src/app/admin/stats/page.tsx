"use client";

import { useEffect, useState, useCallback } from "react";
import type { Stats } from "@/lib/analytics-store";

/**
 * Owner dashboard: how many people land, how many reach WhatsApp, and where
 * they clicked from. Phone-first — the owner checks this from a handset.
 *
 * Auth is a shared key held in sessionStorage for the tab's lifetime. The
 * roadmap replaces it with Cognito when the AWS backend lands.
 */

const KEY_STORE = "pe_admin_key";

function Tile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div
      className="p-5"
      style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)" }}
    >
      <p className="meta-label" style={{ marginBottom: 6 }}>
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-display, 'Barlow Condensed'), sans-serif",
          fontSize: "2.25rem",
          fontWeight: 700,
          lineHeight: 1,
          color: "var(--color-text)",
        }}
      >
        {value}
      </p>
      {hint && (
        <p
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.6rem",
            color: "var(--color-subtle)",
            marginTop: 6,
          }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

function Bars({ rows }: { rows: { name: string; clicks: number }[] }) {
  if (!rows.length) {
    return (
      <p style={{ fontSize: "0.8rem", color: "var(--color-subtle)" }}>
        No clicks recorded yet.
      </p>
    );
  }
  const max = Math.max(...rows.map((r) => r.clicks));
  return (
    <div className="flex flex-col gap-2">
      {rows.map((r) => (
        <div key={r.name} className="flex items-center gap-3">
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.7rem",
              color: "var(--color-muted-2)",
              width: 140,
              flexShrink: 0,
            }}
          >
            {r.name}
          </span>
          <div
            style={{
              flex: 1,
              height: 10,
              background: "var(--color-surface-alt-2)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(r.clicks / max) * 100}%`,
                height: "100%",
                background: "var(--color-accent)",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.7rem",
              color: "var(--color-text)",
              width: 34,
              textAlign: "right",
            }}
          >
            {r.clicks}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AdminStatsPage() {
  const [key, setKey] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (k: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stats", {
        cache: "no-store",
        headers: { "x-admin-key": k },
      });
      if (res.status === 401) throw new Error("Wrong key.");
      if (res.status === 503)
        throw new Error("ADMIN_KEY is not set on the server (.env.local).");
      if (!res.ok) throw new Error(`Request failed (${res.status}).`);
      setStats((await res.json()) as Stats);
      sessionStorage.setItem(KEY_STORE, k);
    } catch (e) {
      setStats(null);
      setError(e instanceof Error ? e.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY_STORE);
    if (saved) {
      setKey(saved);
      void load(saved);
    }
  }, [load]);

  return (
    <div className="pt-24 pb-20" style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <p className="section-label mb-2">Owner Dashboard</p>
        <h1 className="section-title" style={{ fontSize: "2.25rem" }}>
          WhatsApp Conversions
        </h1>

        <form
          className="flex flex-wrap gap-3 mt-6 mb-10"
          onSubmit={(e) => {
            e.preventDefault();
            void load(key);
          }}
        >
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin key"
            aria-label="Admin key"
            style={{
              fontFamily: "var(--font-body, 'Barlow'), sans-serif",
              fontSize: "0.9rem",
              padding: "12px 14px",
              minWidth: 220,
              flex: "1 1 220px",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 2,
              color: "var(--color-text)",
            }}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading…" : stats ? "Refresh" : "Unlock"}
          </button>
        </form>

        {error && (
          <p
            className="mb-8"
            style={{ fontSize: "0.85rem", color: "var(--color-danger)" }}
          >
            {error}
          </p>
        )}

        {stats && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-10" style={{ background: "var(--color-border)" }}>
              <Tile label="Visits" value={String(stats.visits)} />
              <Tile label="Visitors" value={String(stats.uniqueVisitors)} hint="unique, anonymous" />
              <Tile label="WhatsApp Clicks" value={String(stats.whatsappClicks)} />
              <Tile
                label="Conversion"
                value={`${stats.conversionRate.toFixed(1)}%`}
                hint="clicks / visits"
              />
            </div>

            <section className="mb-10">
              <h2 className="card-title mb-4">Clicks by CTA</h2>
              <Bars rows={stats.byCta.map((r) => ({ name: r.cta, clicks: r.clicks }))} />
            </section>

            <section className="mb-10">
              <h2 className="card-title mb-4">Clicks by Product</h2>
              <Bars rows={stats.byProduct.map((r) => ({ name: r.product, clicks: r.clicks }))} />
            </section>

            <section className="mb-10">
              <h2 className="card-title mb-4">Daily</h2>
              <Bars
                rows={stats.daily.map((d) => ({
                  name: `${d.day} (${d.visits}v)`,
                  clicks: d.clicks,
                }))}
              />
            </section>

            <section>
              <h2 className="card-title mb-4">Recent Enquiries</h2>
              {stats.recent.length === 0 ? (
                <p style={{ fontSize: "0.8rem", color: "var(--color-subtle)" }}>
                  Nothing yet.
                </p>
              ) : (
                <div className="flex flex-col gap-px" style={{ background: "var(--color-border)" }}>
                  {stats.recent.map((e, i) => (
                    <div
                      key={i}
                      className="flex flex-wrap gap-x-3 gap-y-1 p-3"
                      style={{
                        background: "var(--color-surface)",
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.68rem",
                        color: "var(--color-muted-2)",
                      }}
                    >
                      <span style={{ color: "var(--color-subtle)" }}>
                        {new Date(e.ts).toLocaleString()}
                      </span>
                      <span style={{ color: "var(--color-accent)" }}>{e.cta}</span>
                      {e.product && <span>{e.product}</span>}
                      {e.variant && <span>· {e.variant}</span>}
                      {e.city && <span>· {e.city}</span>}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
