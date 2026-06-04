import { createFileRoute } from "@tanstack/react-router";
import { Phase3 } from "@/components/savannah/Phase3";
import { PageHeading } from "@/components/savannah/PageHeading";

export const Route = createFileRoute("/phase-3")({
  head: () => ({
    meta: [
      { title: "Phase 3 · Ethical Savannah — Savannah Precision" },
      { name: "description", content: "ETHOS dignity transforms, TRACK forensic audit, OASIS data sovereignty and the Kill Switch." },
      { property: "og:title", content: "Phase 3 · Ethical Savannah" },
      { property: "og:description", content: "Where ethics is operational, not aspirational." },
      { property: "og:url", content: "https://savannah-dignity-forge.lovable.app/phase-3" },
    ],
    links: [{ rel: "canonical", href: "https://savannah-dignity-forge.lovable.app/phase-3" }],
  }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <PageHeading eyebrow="Phase 3" title="Ethical Savannah" subtitle="ETHOS · TRACK · OASIS · PRIDE — dignity by construction." />
      <Phase3 />
    </div>
  ),
});
