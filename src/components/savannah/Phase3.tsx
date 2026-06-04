// Phase 3 — Ethical Savannah: ETHOS, TRACK, OASIS / PRIDE
import { useState } from "react";
import { Shield, ShieldAlert, Power, ArrowRight, Users2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ETHOS_TRANSFORMS, TRACK_AXES, OASIS_DEFAULTS, BIAS_BASELINE } from "@/lib/savannah-data";

export function Phase3() {
  const [killSwitch, setKillSwitch] = useState(false);
  const [toggles, setToggles] = useState(OASIS_DEFAULTS);
  const variance = BIAS_BASELINE.marketVendorDenial - BIAS_BASELINE.formalEmployeeDenial;
  const variancePastThreshold = variance > BIAS_BASELINE.killSwitchThreshold;

  return (
    <div className="space-y-6">
      {/* ETHOS Transformer */}
      <Card>
        <CardHeader>
          <CardTitle>ETHOS Transformation Tool</CardTitle>
          <CardDescription>
            Blind prompts → Dignity-centered commands.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ETHOS_TRANSFORMS.map((t, i) => (
            <div key={i} className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm">
                <Badge variant="destructive" className="mb-1">Blind</Badge>
                <div>{t.blind}</div>
              </div>
              <ArrowRight className="mx-auto text-primary" />
              <div className="rounded-lg border border-primary/40 bg-primary/5 p-3 text-sm">
                <Badge className="mb-1 bg-primary">Dignity-Centered</Badge>
                <div>{t.dignity}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* TRACK */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="size-5" /> TRACK Forensic Audit
              </CardTitle>
              <CardDescription>Bias drift across five axes (last 30 days).</CardDescription>
            </div>
            <div className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${killSwitch ? "border-destructive bg-destructive/10" : ""}`}>
              <Power className={`size-4 ${killSwitch ? "text-destructive" : ""}`} />
              <Label htmlFor="kill" className="text-sm font-semibold">
                Kill Switch — halts automated screening if variance &gt; {BIAS_BASELINE.killSwitchThreshold}%
              </Label>
              <Switch id="kill" checked={killSwitch} onCheckedChange={setKillSwitch} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {variancePastThreshold && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-sm">
              ⚠️ Current vendor-denial variance is <b>{variance}%</b> — above {BIAS_BASELINE.killSwitchThreshold}% threshold.
              Recommend engaging Kill Switch and routing all decisions to human officers.
            </div>
          )}
          {TRACK_AXES.map((a) => (
            <div key={a.code}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium">[{a.code}] {a.label}</span>
                <span className="tabular-nums text-muted-foreground">{a.drift}% drift</span>
              </div>
              <Progress value={a.drift * 10} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* OASIS + PRIDE */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-5 text-primary" />
            OASIS Data Stewardship & PRIDE Oversight Loop
          </CardTitle>
          <CardDescription>Data Sovereignty Charter — applicant-controlled opt-ins.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="font-semibold">Sovereignty toggles (per applicant)</h4>
            {toggles.map((t) => (
              <div key={t.key} className="flex items-center justify-between rounded-lg border bg-secondary/30 p-3">
                <Label htmlFor={t.key} className="text-sm">{t.label}</Label>
                <Switch
                  id={t.key}
                  checked={t.on}
                  onCheckedChange={(v) => setToggles(toggles.map(x => x.key === t.key ? { ...x, on: v } : x))}
                />
              </div>
            ))}
            <div className="rounded-lg border border-dashed p-2 font-mono text-xs text-muted-foreground">
              anon_log: hash(applicant_id) + salted+rotated daily · last purge 04:00 EAT
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">PRIDE — Human Oversight Workflow</h4>
            <ol className="space-y-2 text-sm">
              {[
                "AI Tier-1 triage",
                "Auto-approve / auto-flag",
                "Credit officer review",
                "Borderline → Elders Council Review Trigger",
                "Decision logged with cultural rationale",
              ].map((step, i) => (
                <li key={step} className="flex gap-3 rounded-lg border bg-card p-2">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{i+1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <Button className="w-full gap-2">
              <Users2 className="size-4" /> Trigger Elders Council Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
