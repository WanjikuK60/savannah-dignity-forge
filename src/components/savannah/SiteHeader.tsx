// Shared site header & nav rendered on every route
import { Link } from "@tanstack/react-router";
import { Mountain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/applicants", label: "Applicants" },
  { to: "/phase-1", label: "Phase 1 · Diagnostic" },
  { to: "/phase-2", label: "Phase 2 · Tsavo" },
  { to: "/phase-3", label: "Phase 3 · Ethical" },
  { to: "/phase-4", label: "Phase 4 · Agents" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b bg-gradient-to-br from-primary via-primary to-primary/85 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-xl bg-accent p-2.5 text-accent-foreground">
              <Mountain className="size-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight md:text-2xl">Savannah Precision Loan System</h1>
              <p className="text-xs text-primary-foreground/80 md:text-sm">
                Ujima SACCO · East Africa · Human-centered credit decisioning
              </p>
            </div>
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge className="bg-accent text-accent-foreground">CBK Aligned</Badge>
            <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">v1.0 · Pilot Nairobi</Badge>
            <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">Kill Switch: armed</Badge>
          </div>
        </div>

        <nav className="mt-5 flex flex-wrap gap-1 rounded-xl bg-primary-foreground/10 p-1 backdrop-blur">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.exact ?? false }}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-primary-foreground/80 transition hover:bg-primary-foreground/15 hover:text-primary-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground md:text-sm"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-muted-foreground md:px-8">
        Built on the Savannah Precision Project Framework · Phases 1–4 · OCEAN · ETHOS · TRACK · OASIS · PRIDE · GUARD · CYCLE
      </div>
    </footer>
  );
}
