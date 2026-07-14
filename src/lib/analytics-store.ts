import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Server-side event store.
 *
 * Deliberately behind a narrow interface. Today it appends JSONL to disk (zero
 * dependencies, works with `next start` on any Node host). The roadmap moves the
 * catalog + analytics to DynamoDB — when that happens, implement `EventStore`
 * against DynamoDB and swap the export below. Nothing else changes.
 *
 * The record shape is already DynamoDB-friendly: partition on `day`, sort on
 * `ts` (`day` = "2026-07-14", `ts` = epoch ms).
 */

export interface StoredEvent {
  day: string;
  ts: number;
  type: "page_view" | "whatsapp_click";
  cta?: string;
  product?: string;
  variant?: string;
  city?: string;
  page: string;
  visitorId: string;
}

export interface EventStore {
  append(event: StoredEvent): Promise<void>;
  readAll(): Promise<StoredEvent[]>;
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "events.jsonl");

class JsonlEventStore implements EventStore {
  async append(event: StoredEvent): Promise<void> {
    await fs.mkdir(DATA_DIR, { recursive: true });
    // Append is atomic enough for our write volume; each event is one line.
    await fs.appendFile(FILE, JSON.stringify(event) + "\n", "utf8");
  }

  async readAll(): Promise<StoredEvent[]> {
    let raw: string;
    try {
      raw = await fs.readFile(FILE, "utf8");
    } catch {
      return []; // no events yet
    }
    const out: StoredEvent[] = [];
    for (const line of raw.split("\n")) {
      if (!line.trim()) continue;
      try {
        out.push(JSON.parse(line) as StoredEvent);
      } catch {
        // Skip a torn line rather than failing the whole dashboard.
      }
    }
    return out;
  }
}

export const eventStore: EventStore = new JsonlEventStore();

// ── Aggregation ──────────────────────────────────────────────────────────────

export interface Stats {
  visits: number;
  uniqueVisitors: number;
  whatsappClicks: number;
  /** clicks / visits, as a percentage. The headline number. */
  conversionRate: number;
  byCta: { cta: string; clicks: number }[];
  byProduct: { product: string; clicks: number }[];
  daily: { day: string; visits: number; clicks: number }[];
  recent: StoredEvent[];
}

export function aggregate(events: StoredEvent[]): Stats {
  const views = events.filter((e) => e.type === "page_view");
  const clicks = events.filter((e) => e.type === "whatsapp_click");

  const tally = (rows: StoredEvent[], key: "cta" | "product") => {
    const m = new Map<string, number>();
    for (const r of rows) {
      const k = r[key];
      if (!k) continue;
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return [...m.entries()]
      .map(([name, n]) => ({ [key]: name, clicks: n }))
      .sort((a, b) => b.clicks - a.clicks);
  };

  const days = new Map<string, { visits: number; clicks: number }>();
  for (const e of events) {
    const d = days.get(e.day) ?? { visits: 0, clicks: 0 };
    if (e.type === "page_view") d.visits++;
    else d.clicks++;
    days.set(e.day, d);
  }

  return {
    visits: views.length,
    uniqueVisitors: new Set(events.map((e) => e.visitorId)).size,
    whatsappClicks: clicks.length,
    conversionRate: views.length ? (clicks.length / views.length) * 100 : 0,
    byCta: tally(clicks, "cta") as { cta: string; clicks: number }[],
    byProduct: tally(clicks, "product") as { product: string; clicks: number }[],
    daily: [...days.entries()]
      .map(([day, v]) => ({ day, ...v }))
      .sort((a, b) => a.day.localeCompare(b.day)),
    recent: [...clicks].sort((a, b) => b.ts - a.ts).slice(0, 25),
  };
}
