import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/savannah/PageHeading";
import { ArrowRight } from "lucide-react";
import { KENYA_FACTS, KENYA_RULES } from "@/lib/kenya-facts";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Savannah Precision Loan System" },
      {
        name: "description",
        content:
          "The Savannah Precision Project Framework: a four-phase approach to dismantling loan approval bias against informal vendors in East Africa.",
      },
      { property: "og:title", content: "About — Savannah Precision" },
      {
        property: "og:description",
        content:
          "A concept for replacing rigid banking logic with a harvest-aware, dignity-centered credit model.",
      },
      { property: "og:url", content: "https://wanjikuk60.github.io/savannah-loan-system/about" },
    ],
    links: [{ rel: "canonical", href: "https://wanjikuk60.github.io/savannah-loan-system/about" }],
  }),
  component: About,
});

const PHASES = [
  {
    n: "01",
    title: "Diagnostic",
    body: "Audit the 2025 legacy model. Quantify bias, name the broken pipelines, surface seasonal income blindness, and re-architect repayment around harvests via the MAP engine.",
  },
  {
    n: "02",
    title: "Tsavo Fluency",
    body: "Teach the system to listen. The 4D Delegation Matrix routes work to humans or AI by stakes & sensitivity. Prompt craft and RAG grounding over agricultural data keep the model in the right vocabulary.",
  },
  {
    n: "03",
    title: "Ethical Savannah",
    body: "Ethics as code. ETHOS rewrites blind prompts into dignity-centered ones. TRACK audits five drift axes. OASIS gives applicants sovereignty over their data. A Kill Switch halts automation when variance breaches 25%.",
  },
  {
    n: "04",
    title: "Agent Savannah",
    body: "Scout coaches and plans. Guardian triages and screens. Hunter writes one-page briefings for human credit officers. GUARD rails block bias in flight; CYCLE optimises CSAT against repayment.",
  },
] as const;

function About() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 md:px-8">
      <PageHeading
        eyebrow="About"
        title="The Savannah Precision Project Framework"
        subtitle="A four-phase concept for fairer credit for Kenya's informal workers."
      />

      <Card>
        <CardHeader>
          <CardTitle>Why this exists</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Most Kenyans earn their living informally. In 2025,{" "}
            <b className="text-foreground">18.1 million</b> people worked in the informal sector,
            and about <b className="text-foreground">9 in 10</b> new jobs over the last five years
            were informal (KNBS Economic Survey 2026). Mobile money is how they get paid:{" "}
            <b className="text-foreground">52.6%</b> of Kenyans use it every day (FinAccess 2024).
          </p>
          <p>
            Yet many credit models still assume every borrower has a flat monthly payslip. A matooke
            vendor with strong M-Pesa inflows and reliable harvest income can look "risky" simply
            because her income is seasonal and informal.
          </p>
          <p>
            This project is a concept prototype that shows a different approach.{" "}
            <b className="text-foreground">Ujima SACCO</b> and{" "}
            <b className="text-foreground">Grace Akech</b> are illustrative: a fictional SACCO and
            persona used to walk through the framework. Their figures are worked examples, not real
            data.
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

      <Card>
        <CardHeader>
          <CardTitle>Facts &amp; sources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <ul className="space-y-2">
            {KENYA_FACTS.map((f) => (
              <li key={f.value}>
                <b className="text-foreground">{f.value}</b> {f.label}{" "}
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  {f.source}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <div className="mb-2 font-semibold text-foreground">
              Kenyan rules this design respects
            </div>
            <ul className="space-y-2">
              {KENYA_RULES.map((r) => (
                <li key={r.name}>
                  {r.url ? (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary underline-offset-2 hover:underline"
                    >
                      {r.name}
                    </a>
                  ) : (
                    <span className="font-medium text-foreground">{r.name}</span>
                  )}
                  : {r.what}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-secondary/30">
        <CardHeader>
          <CardTitle>Try it</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Run Grace's profile through both models side-by-side.
          </p>
          <Button asChild className="gap-2">
            <Link to="/applicants">
              Open Applicants <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
