import { createFileRoute } from "@tanstack/react-router";
import { Phase4 } from "@/components/savannah/Phase4";
import { PageHeading } from "@/components/savannah/PageHeading";

export const Route = createFileRoute("/phase-4")({
  head: () => ({
    meta: [
      { title: "Phase 4 · Agent Savannah — Savannah Precision" },
      { name: "description", content: "Scout, Guardian and Hunter agents with the live GUARD/CYCLE bias-blocking and dignity-filter feed." },
      { property: "og:title", content: "Phase 4 · Agent Savannah" },
      { property: "og:description", content: "Specialized agents with human oversight by default." },
      { property: "og:url", content: "https://savannah-dignity-forge.lovable.app/phase-4" },
    ],
    links: [{ rel: "canonical", href: "https://savannah-dignity-forge.lovable.app/phase-4" }],
  }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <PageHeading eyebrow="Phase 4" title="Agent Savannah" subtitle="Specialized agents, live GUARD logs, and the CYCLE optimisation loop." />
      <Phase4 />
    </div>
  ),
});
