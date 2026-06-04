import { createFileRoute } from "@tanstack/react-router";
import { Phase2 } from "@/components/savannah/Phase2";
import { PageHeading } from "@/components/savannah/PageHeading";

export const Route = createFileRoute("/phase-2")({
  head: () => ({
    meta: [
      { title: "Phase 2 · Tsavo Fluency — Savannah Precision" },
      { name: "description", content: "4D Delegation Matrix, prompt-engineering hub and the live Kenya Agricultural Observatory RAG card." },
      { property: "og:title", content: "Phase 2 · Tsavo Fluency" },
      { property: "og:description", content: "Teaching the system to speak in vendor-grounded context." },
      { property: "og:url", content: "https://savannah-dignity-forge.lovable.app/phase-2" },
    ],
    links: [{ rel: "canonical", href: "https://savannah-dignity-forge.lovable.app/phase-2" }],
  }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <PageHeading eyebrow="Phase 2" title="Tsavo Fluency" subtitle="Delegation, prompt craft, and grounded retrieval over Kenyan agricultural data." />
      <Phase2 />
    </div>
  ),
});
