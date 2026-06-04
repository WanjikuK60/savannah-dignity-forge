// Consistent per-page heading block
import { Badge } from "@/components/ui/badge";

export function PageHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-6 space-y-2">
      {eyebrow && <Badge variant="outline" className="border-primary/40 text-primary">{eyebrow}</Badge>}
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="max-w-3xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
