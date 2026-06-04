// Applicants — process the three seed profiles through Old vs Savannah Precision
import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { APPLICANTS, scoreApplicant, type Applicant } from "@/lib/savannah-data";

export function Applicants() {
  const [selected, setSelected] = useState<Applicant>(APPLICANTS[0]);
  const [processed, setProcessed] = useState(false);
  const result = scoreApplicant(selected);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mock Applicants — Process through both models</CardTitle>
          <CardDescription>
            Select an applicant to see the legacy 2025 model vs the Savannah Precision recalculation.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {APPLICANTS.map((a) => (
            <button
              key={a.id}
              onClick={() => { setSelected(a); setProcessed(false); }}
              className={`rounded-xl border p-4 text-left transition hover:border-primary ${selected.id === a.id ? "border-primary bg-primary/5" : "bg-card"}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">
                  {a.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.occupation}</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{a.notes}</p>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle>{selected.name}</CardTitle>
              <CardDescription>{selected.location} · Requesting KES {selected.requestedLoan.toLocaleString()} over {selected.tenureMonths} months</CardDescription>
            </div>
            <Button onClick={() => setProcessed(true)} className="gap-2">
              Run through both models <ArrowRight className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm md:grid-cols-3">
          <Stat label="Formal monthly income" value={`KES ${selected.monthlyFormalIncome.toLocaleString()}`} />
          <Stat label="M-Pesa velocity (avg/mo)" value={`KES ${selected.mpesaVelocity.toLocaleString()}`} />
          <Stat label="Seasonality index" value={`${(selected.seasonalityIndex * 100).toFixed(0)}%`} />
        </CardContent>
      </Card>

      {processed && (
        <div className="grid gap-4 md:grid-cols-2">
          <ModelResult
            title="Old 2025 Model"
            tone="bad"
            approved={result.legacyApproved}
            score={result.legacyScore}
            reason={result.legacyReason}
            extra="Only formal payslip income considered. Flat 35% affordability ratio. No seasonal adjustment."
          />
          <ModelResult
            title="Savannah Precision Model"
            tone="good"
            approved={result.precisionApproved}
            score={result.precisionScore}
            reason={result.precisionReason}
            extra={`Blended monthly capacity: KES ${result.blendedMonthly.toLocaleString()}. MAP harvest schedule applied where eligible.`}
          />
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-secondary/30 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-bold tabular-nums">{value}</div>
    </div>
  );
}

function ModelResult({
  title, tone, approved, score, reason, extra,
}: { title: string; tone: "good" | "bad"; approved: boolean; score: number; reason: string; extra: string }) {
  return (
    <Card className={tone === "good" ? "border-primary/50" : "border-destructive/50"}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant={approved ? "default" : "destructive"} className="gap-1">
            {approved ? <CheckCircle2 className="size-3" /> : <XCircle className="size-3" />}
            {approved ? "APPROVED" : "DENIED"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div>
          <div className="text-xs text-muted-foreground">Risk score</div>
          <div className="text-3xl font-bold tabular-nums">{score}<span className="text-base text-muted-foreground">/100</span></div>
        </div>
        <p className="font-medium">{reason}</p>
        <p className="text-muted-foreground">{extra}</p>
      </CardContent>
    </Card>
  );
}
