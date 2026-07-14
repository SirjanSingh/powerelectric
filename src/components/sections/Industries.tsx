"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/shared/Reveal";
import Magnet from "@/components/reactbits/Magnet";

const industries = [
  { name: "Delivery Fleets",           icon: "🚚" },
  { name: "Campus / Institutions",     icon: "🏫" },
  { name: "Factories & Warehouses",    icon: "🏭" },
  { name: "Local EV Dealers",          icon: "🏪" },
  { name: "Last-Mile Logistics",       icon: "📦" },
  { name: "Hospitality & Hotels",      icon: "🏨" },
  { name: "Municipal Services",        icon: "🏛️" },
  { name: "Healthcare / Hospitals",    icon: "🏥" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Industries() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section
      className="section-pad"
      style={{ background: "var(--color-bg)" }}
      aria-labelledby="industries-heading"
    >
      <div className="container">
        <Reveal>
          <div className="mb-10">
            <p className="section-label mb-2">Industries We Serve</p>
            <h2 className="section-title" id="industries-heading">
              Who Buys From Us
            </h2>
            <p className="section-sub">
              From last-mile delivery operators to reseller dealers — our
              supply chain is built for diverse B2B buyers.
            </p>
          </div>
        </Reveal>

        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={containerVariants}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {industries.map(({ name, icon }) => (
            <motion.div key={name} variants={chipVariants}>
              <Magnet strength={8}>
                <div className="industry-chip cursor-default">
                  <span role="img" aria-hidden="true" style={{ fontSize: "0.9rem" }}>
                    {icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--color-text)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {name}
                  </span>
                </div>
              </Magnet>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
