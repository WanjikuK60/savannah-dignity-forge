import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/savannah/PageHeading";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Savannah Precision Loan System" },
      { name: "description", content: "The Savannah Precision Project Framework: a four-phase approach to dismantling loan approval bias against informal vendors in East Africa." },
      { property: "og:title", content: "About — Savannah Precision" },
      { property: "og:description", content: "How Ujima SACCO replaces rigid banking logic with a harvest-aware, dignity-centered credit model." },
      { property: "og:url", content: "https://savannah-dignity-forge.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://savannah-dignity-forge.lovable.app/about" }],
  }),
  component: About,
});

const PHASES = [
  { n: "01", title: "Diagnostic", body: "Audit the 2025 legacy model. Quantify bias, name the broken pipelines, surface seasonal income blindness, and re-architect repayment around harvests via the MAP engine." },
  { n: "02", title: "Tsavo Fluency", body: "Teach the system to listen. The 4D Delegation Matrix routes work to humans or AI by stakes & sensitivity. Prompt craft and RAG grounding over the Kenya Agricultural Observatory keep the model in the right vocabulary." },
  { n: "03", title: "Ethical Savannah", body: "Ethics as code. ETHOS rewrites blind prompts into dignity-centered ones. TRACK audits five drift axes. OASIS gives applicants sovereignty over their data. A Kill Switch halts automation when variance breaches 25%." },
  { n: "04", title: "Agent Savannah", body: "Scout coaches and plans. Guardian triages and screens. Hunter writes one-page briefings for human credit officers. GUARD rails block bias in flight; CYCLE optimises CSAT against repayment." },
] as const;

function About() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 md:px-8">
      <PageHeading
        eyebrow="About"
        title="The Savannah Precision Project Framework"
        subtitle="A field-grounded, four-phase response to the systemic credit bias documented across East African SACCOs in 2025."
      />

      <Card>
        <CardHeader><CardTitle>Why this exists</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Across Kenyan SACCOs in 2025, informal market vendors were denied loans at <b className="text-foreground">68%</b> versus
            <b className="text-foreground"> 22%</b> for formally-employed peers. The cause wasn't malice — it was a credit
            architecture that quietly assumed every borrower receives a flat monthly payslip.
          </p>
          <p>
            Grace Akech, a matooke vendor straddling Kampala and Nairobi, was denied four times despite
            healthy M-Pesa cash velocity and reliable harvest-season income. Ujima SACCO commissioned
            the Savannah Precision Project to retire that model — and replace it with one that recognises
            the actual rhythm of vendor life.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight">The four phases</h3>
        {PHASES.map((p) => (
          <Card key={p.n} className="border-l-4 border-l-primary">
            <CardContent className="flex gap-4 pt-6">
              <div className="text-3xl font-bold text-primary">{p.n}</div>
              <div>
                <div className="font-semibold">{p.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-secondary/30">
        <CardHeader><CardTitle>Try it</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">Run Grace's profile through both models side-by-side.</p>
          <Button asChild className="gap-2">
            <Link to="/applicants">Open Applicants <ArrowRight className="size-4" /></Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
