import { createFileRoute } from "@tanstack/react-router";
import { Phase1 } from "@/components/savannah/Phase1";
import { PageHeading } from "@/components/savannah/PageHeading";

export const Route = createFileRoute("/phase-1")({
  head: () => ({
    meta: [
      { title: "Phase 1 · Diagnostic — Savannah Precision" },
      { name: "description", content: "Bias audit, pipeline failure hypotheses, OCEAN checks and the MAP harvest-aware repayment engine." },
      { property: "og:title", content: "Phase 1 · Diagnostic" },
      { property: "og:description", content: "Quantifying where the legacy 2025 model fails informal vendors." },
      { property: "og:url", content: "https://savannah-dignity-forge.lovable.app/phase-1" },
    ],
    links: [{ rel: "canonical", href: "https://savannah-dignity-forge.lovable.app/phase-1" }],
  }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <PageHeading eyebrow="Phase 1" title="Diagnostic & MAP Repayment Engine" subtitle="Audit the bias. Diagnose the pipeline. Re-shape the schedule around harvests." />
      <Phase1 />
    </div>
  ),
});
