import Reveal from "@/components/shared/Reveal";
import Configurator from "@/components/configurator/Configurator";

export default function ConfigurePage() {
  return (
    <div className="pt-24 pb-20" style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      <div className="container">
        <Reveal>
          <div className="mb-10">
            <p className="section-label mb-2">Build Your Order</p>
            <h1 className="section-title">Configure &amp; Get Quote</h1>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-body, 'Barlow'), sans-serif",
                fontSize: "1rem",
                color: "var(--color-muted-2)",
                maxWidth: 560,
                lineHeight: 1.65,
              }}
            >
              Rotate the model, pick a color and battery, set your quantity —
              then send the build straight to our sales team on WhatsApp.
              Minimum order 5 units, GST billing available.
            </p>
          </div>
        </Reveal>

        <Configurator />

        <p
          className="mt-14 text-center mx-auto px-5 py-4"
          style={{
            maxWidth: 560,
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.6rem",
            letterSpacing: "0.07em",
            color: "var(--color-subtle)",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface-alt)",
          }}
        >
          3D preview uses a representative model — final unit may vary
          slightly by SKU. Colors shown are indicative; confirm exact shade
          on WhatsApp before ordering.
        </p>
      </div>
    </div>
  );
}
