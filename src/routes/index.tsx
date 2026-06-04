import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Activity, Network, ShieldCheck, Bot, Users, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BIAS_BASELINE } from "@/lib/savannah-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Savannah Precision Loan System — Ujima SACCO" },
      { name: "description", content: "Human-centered, bias-aware credit decisioning for informal market vendors in East Africa." },
      { property: "og:title", content: "Savannah Precision Loan System" },
      { property: "og:description", content: "Dismantling loan approval bias through the Savannah Precision Project Framework (Phases 1–4)." },
      { property: "og:url", content: "https://savannah-dignity-forge.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://savannah-dignity-forge.lovable.app/" }],
  }),
  component: Home,
});

const PHASES = [
  { to: "/phase-1", icon: Activity, title: "Phase 1 · Diagnostic", desc: "Bias audit, OCEAN checks, and the MAP harvest-aware repayment engine." },
  { to: "/phase-2", icon: Network, title: "Phase 2 · Tsavo Fluency", desc: "4D Delegation Matrix, prompt-engineering hub & Agricultural Observatory RAG." },
  { to: "/phase-3", icon: ShieldCheck, title: "Phase 3 · Ethical Savannah", desc: "ETHOS transforms, TRACK forensic audit, OASIS data sovereignty & Kill Switch." },
  { to: "/phase-4", icon: Bot, title: "Phase 4 · Agent Savannah", desc: "Scout, Guardian, Hunter agents with live GUARD/CYCLE oversight feed." },
] as const;

function Home() {
  const variance = BIAS_BASELINE.marketVendorDenial - BIAS_BASELINE.formalEmployeeDenial;

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 md:px-8">
      {/* Hero */}
      <section className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div className="space-y-5">
          <Badge className="bg-accent text-accent-foreground">
            <Sparkles className="mr-1 size-3" /> Pilot · Nairobi · 2026
          </Badge>
          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Loans recalculated around <span className="text-primary">harvests</span>, not payslips.
          </h2>
          <p className="text-lg text-muted-foreground">
            Ujima SACCO's Savannah Precision Loan System replaces rigid 2025-era credit logic with a
            harvest-aware, mobile-money-literate, dignity-centered model — purpose-built for the
            informal vendors who keep East Africa's markets alive.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link to="/applicants">Try the live applicant demo <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/about">How the framework works</Link>
            </Button>
          </div>
        </div>

        <Card className="border-primary/40 bg-gradient-to-br from-primary/5 to-accent/10">
          <CardHeader>
            <CardTitle className="text-base">2025 Legacy Model — Bias Snapshot</CardTitle>
            <CardDescription>From the Phase 1 internal audit, Q4 2025.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Stat label="Market vendor denial rate" value={`${BIAS_BASELINE.marketVendorDenial}%`} tone="bad" />
            <Stat label="Formal employee denial rate" value={`${BIAS_BASELINE.formalEmployeeDenial}%`} tone="good" />
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm">
              <b>Variance: {variance} pp</b> — above the {BIAS_BASELINE.killSwitchThreshold}% Kill Switch threshold.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Phase grid */}
      <section className="space-y-5">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Explore the four phases</h3>
            <p className="text-sm text-muted-foreground">Each phase is now its own dedicated workspace.</p>
          </div>
          <Button asChild variant="ghost" className="hidden gap-2 md:inline-flex">
            <Link to="/applicants"><Users className="size-4" /> Applicants</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {PHASES.map((p) => (
            <Link key={p.to} to={p.to} className="group">
              <Card className="h-full transition group-hover:border-primary group-hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary p-2 text-primary-foreground">
                      <p.icon className="size-5" />
                    </div>
                    <CardTitle className="text-lg">{p.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open phase <ArrowRight className="size-3 transition group-hover:translate-x-0.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border bg-gradient-to-br from-primary to-primary/85 p-8 text-primary-foreground">
        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto]">
          <div>
            <h3 className="text-2xl font-bold">See Grace Akech's case in 30 seconds.</h3>
            <p className="mt-1 text-primary-foreground/85">
              The legacy model denies her 4×. The Savannah Precision Model approves her with a safe,
              harvest-aligned schedule. Open the side-by-side demo.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <Link to="/applicants">Open Applicants <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "good" | "bad" }) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-card p-3">
      <span className="text-sm">{label}</span>
      <span className={`text-2xl font-bold tabular-nums ${tone === "bad" ? "text-destructive" : "text-primary"}`}>{value}</span>
    </div>
  );
}
