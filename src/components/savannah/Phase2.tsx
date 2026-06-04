// Phase 2 — Tsavo Fluency: 4D Blueprint, Prompt Hub, RAG Portal
import { useState } from "react";
import { User, Bot, Users, Sparkles, CloudRain, Droplet, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DELEGATION, DEFAULT_PROMPTS, AGRI_OBSERVATORY } from "@/lib/savannah-data";

export function Phase2() {
  const [prompts, setPrompts] = useState(DEFAULT_PROMPTS);
  const [tone, setTone] = useState<"current" | "preview">("current");

  return (
    <div className="space-y-6">
      {/* 4D Delegation Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>4D Delegation Matrix</CardTitle>
          <CardDescription>Who owns what across the Ujima credit workflow.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {[
            { key: "human", icon: User, title: "Human", color: "text-primary", items: DELEGATION.human },
            { key: "ai", icon: Bot, title: "AI", color: "text-accent-foreground", items: DELEGATION.ai },
            { key: "collab", icon: Users, title: "Collaborative", color: "text-chart-3", items: DELEGATION.collaborative },
          ].map((col) => {
            const Icon = col.icon;
            return (
              <div key={col.key} className="rounded-xl border bg-secondary/30 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Icon className={`size-5 ${col.color}`} />
                  <h3 className="text-lg font-bold">{col.title}</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  {col.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Prompt Engineering Hub */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-5 text-accent" />
            Prompt Engineering Hub
          </CardTitle>
          <CardDescription>
            Edit Product / Process / Performance prompts and preview tone impact.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(["product", "process", "performance"] as const).map((k) => (
            <div key={k}>
              <Label className="capitalize">{k} prompt</Label>
              <Textarea
                className="mt-1 font-mono text-xs"
                rows={3}
                value={prompts[k]}
                onChange={(e) => setPrompts({ ...prompts, [k]: e.target.value })}
              />
            </div>
          ))}
          <div className="flex gap-2">
            <Button
              variant={tone === "current" ? "default" : "outline"}
              size="sm"
              onClick={() => setTone("current")}
            >
              Current tone
            </Button>
            <Button
              variant={tone === "preview" ? "default" : "outline"}
              size="sm"
              onClick={() => setTone("preview")}
            >
              Simulate AI response
            </Button>
          </div>
          {tone === "preview" && (
            <div className="rounded-lg border-l-4 border-primary bg-secondary/40 p-3 text-sm">
              <b>AI →</b> "Karibu Grace! Tumeona ya kwamba mauzo yako ya matooke yanapanda Machi na Septemba. Tutapanga marejesho yapungue miezi mingine ili biashara yako iendelee kustawi. (We've designed lighter repayments for off-harvest months so your business keeps thriving.)"
            </div>
          )}
        </CardContent>
      </Card>

      {/* Kenya Agricultural Observatory RAG */}
      <Card className="border-accent/60">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="size-5 text-accent" />
                Kenya Agricultural Observatory — Live RAG
              </CardTitle>
              <CardDescription>
                Region: {AGRI_OBSERVATORY.region} · Updated {AGRI_OBSERVATORY.updatedAt}
              </CardDescription>
            </div>
            <Badge className="bg-accent text-accent-foreground">LIVE</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Stat
            icon={<Droplet className="size-4" />}
            label="Soil moisture"
            value={`${AGRI_OBSERVATORY.soilMoisturePct}%`}
            sub="Optimal: 55–70%"
          />
          <Stat
            icon={<CloudRain className="size-4" />}
            label="7-day rainfall"
            value="32–48 mm"
            sub="Above average"
          />
          <Stat
            icon={<TrendingUp className="size-4" />}
            label="Matooke market"
            value={`KES ${AGRI_OBSERVATORY.marketPriceMatookePerBunch}`}
            sub={AGRI_OBSERVATORY.marketTrend + " / bunch"}
          />
          <div className="md:col-span-3 rounded-lg border border-dashed border-accent/50 bg-accent/10 p-3 text-sm">
            <b>Injected into evaluation engine →</b> {AGRI_OBSERVATORY.advisory}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">{icon}{label}</div>
      <div className="mt-1 text-2xl font-bold tabular-nums">{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
