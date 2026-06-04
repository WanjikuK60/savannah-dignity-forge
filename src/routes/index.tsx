import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mountain, Activity, Network, ShieldCheck, Users, Bot } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Phase1 } from "@/components/savannah/Phase1";
import { Phase2 } from "@/components/savannah/Phase2";
import { Phase3 } from "@/components/savannah/Phase3";
import { Phase4 } from "@/components/savannah/Phase4";
import { Applicants } from "@/components/savannah/Applicants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Savannah Precision Loan System — Ujima SACCO" },
      { name: "description", content: "Human-centered, bias-aware credit decisioning for informal market vendors in East Africa." },
      { property: "og:title", content: "Savannah Precision Loan System" },
      { property: "og:description", content: "Dismantling loan approval bias through the Savannah Precision Project Framework (Phases 1–4)." },
    ],
  }),
  component: Page,
});

function Page() {
  const [tab, setTab] = useState("applicants");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-gradient-to-br from-primary via-primary to-primary/85 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-accent p-2.5 text-accent-foreground">
                <Mountain className="size-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Savannah Precision Loan System</h1>
                <p className="text-sm text-primary-foreground/80">
                  Ujima SACCO · East Africa · Human-centered credit decisioning
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge className="bg-accent text-accent-foreground">CBK Aligned</Badge>
              <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">v1.0 · Pilot Nairobi</Badge>
              <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">Kill Switch: armed</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-6 grid h-auto w-full grid-cols-2 gap-1 bg-secondary p-1 md:grid-cols-5">
            <Trigger value="applicants" icon={<Users className="size-4" />} label="Applicants" />
            <Trigger value="p1" icon={<Activity className="size-4" />} label="Phase 1 · Diagnostic" />
            <Trigger value="p2" icon={<Network className="size-4" />} label="Phase 2 · Tsavo Fluency" />
            <Trigger value="p3" icon={<ShieldCheck className="size-4" />} label="Phase 3 · Ethical" />
            <Trigger value="p4" icon={<Bot className="size-4" />} label="Phase 4 · Agents" />
          </TabsList>

          <TabsContent value="applicants"><Applicants /></TabsContent>
          <TabsContent value="p1"><Phase1 /></TabsContent>
          <TabsContent value="p2"><Phase2 /></TabsContent>
          <TabsContent value="p3"><Phase3 /></TabsContent>
          <TabsContent value="p4"><Phase4 /></TabsContent>
        </Tabs>

        <footer className="mt-12 border-t pt-6 text-center text-xs text-muted-foreground">
          Built on the Savannah Precision Project Framework · Phases 1–4 · OCEAN · ETHOS · TRACK · OASIS · PRIDE · GUARD · CYCLE
        </footer>
      </div>
    </main>
  );
}

function Trigger({ value, icon, label }: { value: string; icon: React.ReactNode; label: string }) {
  return (
    <TabsTrigger
      value={value}
      className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
    >
      {icon}<span className="hidden sm:inline">{label}</span>
    </TabsTrigger>
  );
}
