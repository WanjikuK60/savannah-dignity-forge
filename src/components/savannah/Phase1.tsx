// Phase 1 — Savannah Precision: Diagnostic & MAP Repayment Engine
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, Legend,
} from "recharts";
import { AlertTriangle, Database, Tags, Sprout, Terminal, CheckCircle2, Flag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  BIAS_BASELINE, FAILURE_HYPOTHESES, OCEAN_CHECKS, buildSchedule,
} from "@/lib/savannah-data";

export function Phase1() {
  const [principal, setPrincipal] = useState(150_000);
  const [tenure, setTenure] = useState(12);
  const [rate, setRate] = useState(14);
  const [mapMode, setMapMode] = useState(true);

  const std = buildSchedule(principal, tenure, rate, "standard");
  const map = buildSchedule(principal, tenure, rate, "map");
  const merged = std.map((s, i) => ({
    label: `${s.label} ${Math.floor(i / 12) > 0 ? "Y" + (Math.floor(i / 12) + 1) : ""}`,
    Standard: s.payment,
    "MAP Harvest": map[i].payment,
  }));

  const biasData = [
    { group: "Market Vendors", denial: BIAS_BASELINE.marketVendorDenial },
    { group: "Formal Employees", denial: BIAS_BASELINE.formalEmployeeDenial },
  ];
  const variance = BIAS_BASELINE.marketVendorDenial - BIAS_BASELINE.formalEmployeeDenial;

  return (
    <div className="space-y-6">
      {/* Bias Audit */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-destructive" />
              2025 Bias Audit — Denial Rate Disparity
            </CardTitle>
            <CardDescription>
              Ujima SACCO baseline. Variance of <b>{variance}pp</b> exceeds the {BIAS_BASELINE.killSwitchThreshold}% kill-switch threshold.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer>
              <BarChart data={biasData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="group" />
                <YAxis unit="%" />
                <Tooltip />
                <Bar dataKey="denial" fill="var(--color-chart-3)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pipeline Failure Hypotheses</CardTitle>
            <CardDescription>Three structural defects in the legacy scoring stack.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {FAILURE_HYPOTHESES.map((f) => (
              <div key={f.id} className="rounded-lg border bg-secondary/40 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-semibold">
                    {f.id === "data-pipelines" && <Database className="size-4 text-primary" />}
                    {f.id === "taxonomy" && <Tags className="size-4 text-primary" />}
                    {f.id === "seasonal" && <Sprout className="size-4 text-primary" />}
                    {f.title}
                  </div>
                  <Badge variant="destructive">{f.impact}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{f.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* MAP Repayment Engine */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>MAP Repayment Engine</CardTitle>
              <CardDescription>
                Aligns instalments with matooke harvest cycles (Mar/Apr & Sep/Oct).
              </CardDescription>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-secondary/40 px-3 py-2">
              <Label htmlFor="map-mode" className="text-sm">Standard</Label>
              <Switch id="map-mode" checked={mapMode} onCheckedChange={setMapMode} />
              <Label htmlFor="map-mode" className="text-sm font-semibold text-primary">MAP Adaptive</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Principal (KES)</Label>
              <Slider value={[principal]} min={20000} max={500000} step={5000}
                onValueChange={(v) => setPrincipal(v[0])} />
              <div className="text-lg font-bold tabular-nums">KES {principal.toLocaleString()}</div>
            </div>
            <div className="space-y-2">
              <Label>Tenure (months)</Label>
              <Slider value={[tenure]} min={6} max={36} step={1}
                onValueChange={(v) => setTenure(v[0])} />
              <div className="text-lg font-bold tabular-nums">{tenure} months</div>
            </div>
            <div className="space-y-2">
              <Label>Annual rate (%)</Label>
              <Slider value={[rate]} min={6} max={24} step={0.5}
                onValueChange={(v) => setRate(v[0])} />
              <div className="text-lg font-bold tabular-nums">{rate}%</div>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={merged}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="label" />
                <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => `KES ${v.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="Standard" stroke="var(--color-chart-4)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="MAP Harvest"
                  stroke="var(--color-chart-1)" strokeWidth={3}
                  strokeDasharray={mapMode ? "0" : "4 4"} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground">
            {mapMode
              ? "MAP schedule lowers off-harvest payments to ~KES "
                + map.filter((_, i) => ![2,3,8,9].includes(i % 12))[0]?.payment.toLocaleString()
                + " and concentrates burden in harvest months — projected default risk for matooke vendors drops from 31% to 8%."
              : "Standard flat schedule. Vendors face uniform pressure in lean months — historical default rate 31%."}
          </p>
        </CardContent>
      </Card>

      {/* Verifier Pattern Terminal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="size-5" /> Verifier Pattern Terminal — OCEAN Audit
          </CardTitle>
          <CardDescription>
            Chain-of-Thought + Verifier check against CBK Microfinance Prudential Guidelines.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg bg-foreground p-4 font-mono text-xs leading-relaxed text-background overflow-x-auto">
{`▶ verifier start  applicant=grace.akech  policy=CBK/PG/22
▶ chain-of-thought:
  1. parse_mpesa(window=12mo) → 432 txns, KES 864,000 inflow
  2. detect_occupation_cluster → ["vendor","subsistence_farmer"]
  3. align_repayment(harvest=[Mar,Apr,Sep,Oct])
  4. compute_risk(blended_velocity, seasonality=0.82)
▶ verifier OCEAN:`}
{"\n"}{OCEAN_CHECKS.map((c) =>
  `  [${c.code}] ${c.label.padEnd(12)} ${c.line}`
).join("\n")}
{`\n▶ verdict: PASS (score 0.91/1.00) — route to human cultural validator`}
          </pre>
          <div className="mt-3 flex flex-wrap gap-2">
            {OCEAN_CHECKS.map((c) => (
              <Badge key={c.code} variant="outline" className="gap-1">
                {c.code === "N" ? <Flag className="size-3" /> : <CheckCircle2 className="size-3 text-primary" />}
                {c.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" className="ml-auto block">Re-run diagnostic</Button>
    </div>
  );
}
