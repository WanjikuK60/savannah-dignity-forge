// Phase 4 — Agent Savannah: Scout / Guardian / Hunter + GUARD/CYCLE
import { useEffect, useState } from "react";
import { Compass, ShieldCheck, Crosshair, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SCOUT_FEED, GUARDIAN_FEED, HUNTER_BRIEFING, GUARD_LOGS } from "@/lib/savannah-data";

export function Phase4() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 2500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <AgentCard
          icon={<Compass className="size-5" />}
          title="Scout Agent"
          subtitle="Literacy coach & harvest planner"
          feed={SCOUT_FEED}
          status="active"
        />
        <AgentCard
          icon={<ShieldCheck className="size-5" />}
          title="Guardian Agent"
          subtitle="Tier-1 triage & anomaly screening"
          feed={GUARDIAN_FEED}
          status="active"
        />
        <AgentCard
          icon={<Crosshair className="size-5" />}
          title="Hunter Agent"
          subtitle="Human-in-the-loop briefings"
          feed={[`📋 Briefing prepared for ${HUNTER_BRIEFING.applicant}`, "⏱ Synthesised in 1.2s", "✉ Pushed to credit officer queue"]}
          status="active"
        />
      </div>

      {/* Hunter briefing packet */}
      <Card>
        <CardHeader>
          <CardTitle>Hunter Briefing Packet — {HUNTER_BRIEFING.applicant}</CardTitle>
          <CardDescription>One-page synthesis for SACCO credit officers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-3 font-semibold">
            {HUNTER_BRIEFING.oneLine}
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Evidence</h4>
            <ul className="space-y-1 text-sm">
              {HUNTER_BRIEFING.evidence.map((e) => (
                <li key={e} className="flex gap-2"><span className="text-primary">▸</span>{e}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border bg-secondary/40 p-3 text-sm">
            <b>Recommendation:</b> {HUNTER_BRIEFING.recommendation}
          </div>
          <div className="flex gap-2">
            <Button>Approve as recommended</Button>
            <Button variant="outline">Send to Elders Council</Button>
            <Button variant="ghost">Request more info</Button>
          </div>
        </CardContent>
      </Card>

      {/* GUARD + CYCLE */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="size-5 text-accent" />
            GUARD Rails & CYCLE Engine — Live Logs
          </CardTitle>
          <CardDescription>
            Bias-blocks, dignity filters & CSAT ↔ repayment optimisation loop.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-56 rounded-lg border bg-foreground p-3 font-mono text-xs text-background">
            {GUARD_LOGS.concat(GUARD_LOGS).slice(0, 6 + (tick % 3)).map((log, i) => (
              <div key={i} className="mb-1.5 flex gap-2">
                <span className="text-accent">[{new Date(Date.now() - i * 17000).toLocaleTimeString()}]</span>
                <span className="font-bold text-accent">{log.type}:</span>
                <span>{log.msg}</span>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

function AgentCard({
  icon, title, subtitle, feed, status,
}: { icon: React.ReactNode; title: string; subtitle: string; feed: string[]; status: string }) {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-2 text-primary-foreground">{icon}</div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="text-xs">{subtitle}</CardDescription>
            </div>
          </div>
          <Badge className="gap-1 bg-primary/15 text-primary">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" /> {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {feed.map((f) => (
          <div key={f} className="rounded-md bg-secondary/40 p-2">{f}</div>
        ))}
      </CardContent>
    </Card>
  );
}
