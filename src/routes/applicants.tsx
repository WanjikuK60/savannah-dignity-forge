import { createFileRoute } from "@tanstack/react-router";
import { Applicants } from "@/components/savannah/Applicants";
import { PageHeading } from "@/components/savannah/PageHeading";

export const Route = createFileRoute("/applicants")({
  head: () => ({
    meta: [
      { title: "Applicants — Savannah Precision" },
      { name: "description", content: "Run mock vendor profiles through both the legacy 2025 model and the Savannah Precision Model side-by-side." },
      { property: "og:title", content: "Applicants — Savannah Precision" },
      { property: "og:description", content: "Side-by-side recalculation of informal vendor risk profiles." },
      { property: "og:url", content: "https://savannah-dignity-forge.lovable.app/applicants" },
    ],
    links: [{ rel: "canonical", href: "https://savannah-dignity-forge.lovable.app/applicants" }],
  }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <PageHeading
        eyebrow="Live demo"
        title="Applicant comparison"
        subtitle="Process Grace, John, or David through both models and watch the verdicts diverge."
      />
      <Applicants />
    </div>
  ),
});
