import { useState, useEffect, useCallback } from "react";
import { Droplets, Leaf, Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { cn } from "./ui/utils";
import { usePlants, type Plant } from "./PlantContext";

function getDaysUntilWater(plant: Plant): number {
  const nextWaterMs = plant.lastWateredDate.getTime() + plant.frequencyDays * 86400000;
  return Math.ceil((nextWaterMs - Date.now()) / 86400000);
}

function getStatus(plant: Plant): "overdue" | "today" | "soon" | "ok" {
  const daysUntil = getDaysUntilWater(plant);
  if (daysUntil < 0) return "overdue";
  if (daysUntil === 0) return "today";
  if (daysUntil < Math.max(2, Math.ceil(plant.frequencyDays / 2))) return "soon";
  return "ok";
}

const statusBadgeVariant: Record<string, "destructive" | "sunshine" | "sky" | "subtle"> = {
  overdue: "destructive",
  today: "sunshine",
  soon: "sky",
  ok: "subtle",
};

const statusLabel: Record<string, string> = {
  overdue: "Overdue",
  today: "Water today",
  soon: "Soon",
  ok: "Healthy",
};

function LiveCountdown({ plant, inverted }: { plant: Plant; inverted?: boolean }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const nextWaterMs = plant.lastWateredDate.getTime() + plant.frequencyDays * 86400000;
  const msLeft = nextWaterMs - Date.now();
  const daysUntil = getDaysUntilWater(plant);
  const captionClass = inverted ? "text-caption text-[var(--fg-on-inverse)]" : "text-caption";

  if (msLeft <= 86400000) {
    const absMs = Math.abs(msLeft);
    const h = Math.floor(absMs / 3600000);
    const m = Math.floor((absMs % 3600000) / 60000);
    const s = Math.floor((absMs % 60000) / 1000);
    const formatted = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return (
      <span
        className={cn(
          "flex items-center gap-[var(--space-1)] tabular-nums text-caption",
          inverted ? "text-[var(--fg-on-inverse)]" : "text-[var(--sunshine-fg)]"
        )}
      >
        <Clock className="size-3 shrink-0" aria-hidden="true" />
        {msLeft < 0 ? `+${formatted} overdue` : formatted}
      </span>
    );
  }

  if (daysUntil === 1) return <span className={captionClass}>Tomorrow</span>;
  return <span className={captionClass}>In {daysUntil} days</span>;
}

function needsWatering(status: ReturnType<typeof getStatus>): boolean {
  return status !== "ok";
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getWaterSummary(needsWaterCount: number, totalPlants: number): string {
  if (totalPlants === 0) return "Add your first plant to get started";
  if (needsWaterCount === 0) return "No plants need water today";
  if (needsWaterCount === 1) return "1 plant needs water today";
  return `${needsWaterCount} plants need water today`;
}

function WateredConfirmation({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex items-center justify-center rounded-[inherit]",
        "bg-[var(--accent-active)]/90",
        "animate-in fade-in zoom-in-95 duration-[var(--duration-base)]"
      )}
      role="status"
      aria-live="polite"
    >
      <span className="text-[var(--fg-on-accent)] font-medium text-sm tracking-wide flex items-center gap-[var(--space-2)]">
        <Droplets className="size-4" aria-hidden="true" />
        Watered!
      </span>
    </div>
  );
}

function PriorityDoneCard() {
  return (
    <Card className="gap-0 bg-[var(--bg-surface)] border-[var(--border-default)] animate-in fade-in duration-[var(--duration-base)]">
      <CardContent className="py-[var(--space-3)] px-[var(--space-4)] text-center">
        <p className="text-sm text-[var(--green-800)] font-medium leading-[var(--leading-snug)] tracking-wide">
          Well done! No plants need water today
        </p>
      </CardContent>
    </Card>
  );
}

type PlantSection = "priority" | "grid";

type WateredFlash = {
  plantId: number;
  section: PlantSection;
} | null;

export function HomePage() {
  const { plants, markWatered } = usePlants();
  const [wateredFlash, setWateredFlash] = useState<WateredFlash>(null);
  const [priorityCompletedIds, setPriorityCompletedIds] = useState<Set<number>>(new Set());

  const isPriorityDone = useCallback(
    (plant: Plant) => priorityCompletedIds.has(plant.id) && getStatus(plant) === "ok",
    [priorityCompletedIds]
  );

  const handleWater = useCallback(
    (plant: Plant, section: PlantSection) => {
      if (!needsWatering(getStatus(plant))) return;

      markWatered(plant.id);

      if (section === "priority") {
        setPriorityCompletedIds((prev) => new Set(prev).add(plant.id));
      } else {
        setWateredFlash({ plantId: plant.id, section: "grid" });
        window.setTimeout(() => setWateredFlash(null), 1800);
      }
    },
    [markWatered]
  );

  const prioritySectionPlants = plants.filter(
    (p) => getDaysUntilWater(p) <= 0 || isPriorityDone(p)
  );
  const hasActivePriority = plants.some(
    (p) => getDaysUntilWater(p) <= 0 && !isPriorityDone(p)
  );

  const needsWaterCount = plants.filter((p) => getDaysUntilWater(p) <= 0).length;

  return (
    <div className="px-[var(--page-margin-mobile)] pt-[var(--space-2)] pb-[var(--space-4)] space-y-[var(--space-4)]">
      <header className="space-y-[var(--space-1)]">
        <div className="flex items-center gap-[var(--space-2)]">
          <Leaf className="size-4 text-[var(--green-400)]" aria-hidden="true" />
          <span className="text-xl font-semibold tracking-[var(--tracking-normal)] text-[var(--green-800)]">
            Blossom
          </span>
        </div>
        <h1 className="text-xl leading-[var(--leading-snug)]">{getGreeting()}</h1>
        <p className="text-caption">{getWaterSummary(needsWaterCount, plants.length)}</p>
      </header>

      {prioritySectionPlants.length > 0 && (
        <section className="space-y-[var(--space-3)]">
          {hasActivePriority && (
            <h2 className="text-lg leading-[var(--leading-snug)]">Needs watering today</h2>
          )}
          <div className="space-y-[var(--space-2)]">
            {prioritySectionPlants.map((plant) => {
              if (isPriorityDone(plant)) {
                return <PriorityDoneCard key={plant.id} />;
              }

              const status = getStatus(plant);
              return (
                <Card
                  key={plant.id}
                  className="gap-0 relative overflow-hidden border-[var(--priority-highlight-bg)] bg-[var(--priority-highlight-bg)]"
                >
                  <CardContent className="py-[var(--space-3)] px-[var(--space-4)]">
                    <div className="flex items-center gap-[var(--space-3)]">
                      <span className="text-2xl leading-none" aria-hidden="true">{plant.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-[var(--space-2)]">
                          <p className="text-sm font-medium text-[var(--fg-on-accent)] truncate">{plant.name}</p>
                          <Badge
                            variant={status === "overdue" ? "outline" : statusBadgeVariant[status]}
                            className={cn(
                              "text-xs",
                              status === "overdue" &&
                                "border-transparent bg-transparent text-[var(--priority-overdue-fg)]"
                            )}
                          >
                            {status === "overdue" && (
                              <AlertTriangle className="size-3" aria-hidden="true" />
                            )}
                            {statusLabel[status]}
                          </Badge>
                        </div>
                        <p className="text-caption leading-[var(--leading-snug)] text-[var(--fg-on-inverse)]">
                          {plant.species}
                        </p>
                        <div className="mt-[var(--space-1)]">
                          <LiveCountdown plant={plant} inverted />
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="mt-[var(--space-2)] w-full bg-[var(--white)] text-[var(--green-700)] border-transparent hover:bg-[var(--green-50)] active:bg-[var(--green-100)] active:text-[var(--green-800)]"
                      onClick={() => handleWater(plant, "priority")}
                    >
                      <Droplets className="size-4" aria-hidden="true" />
                      Watered
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <Separator />
        </section>
      )}

      <section className="space-y-[var(--space-3)]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg leading-[var(--leading-snug)]">My plants</h2>
          <Button asChild size="sm" variant="outline">
            <Link to="/add">+ Add</Link>
          </Button>
        </div>

        {plants.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-[var(--space-3)]">
            {plants.map((plant) => {
              const status = getStatus(plant);
              const isHealthy = !needsWatering(status);
              return (
                <Card
                  key={plant.id}
                  className="gap-0 relative overflow-hidden flex flex-col rounded-[var(--radius-md)] bg-[var(--bg-surface)] border-[var(--border-default)]"
                >
                  <WateredConfirmation
                    visible={wateredFlash?.plantId === plant.id && wateredFlash.section === "grid"}
                  />
                  <CardHeader className="pb-[var(--space-1)] pt-[var(--space-3)] px-[var(--space-3)] gap-[var(--space-1)]">
                    <div className="flex items-start justify-between gap-[var(--space-1)]">
                      <span className="text-2xl leading-none" aria-hidden="true">{plant.emoji}</span>
                      <Badge variant={statusBadgeVariant[status]} className="text-xs shrink-0 px-[var(--space-2)] py-0">
                        {status === "overdue" && (
                          <AlertTriangle className="size-3" aria-hidden="true" />
                        )}
                        {statusLabel[status]}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm mt-[var(--space-1)]">{plant.name}</CardTitle>
                    <p className="text-caption leading-[var(--leading-snug)]">{plant.species}</p>
                  </CardHeader>
                  <CardContent className="px-[var(--space-3)] pb-[var(--space-3)] pt-0 flex-1 flex flex-col justify-end">
                    <Separator className="mb-[var(--space-2)]" />
                    <div className="flex items-center justify-between mb-[var(--space-2)]">
                      <span className="text-caption">Next water</span>
                      <LiveCountdown plant={plant} />
                    </div>
                    <Button
                      size="sm"
                      variant={isHealthy ? "secondary" : "default"}
                      className="w-full"
                      disabled={isHealthy}
                      onClick={() => handleWater(plant, "grid")}
                    >
                      <Droplets className="size-3" aria-hidden="true" />
                      Watered
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-[var(--space-5)] gap-[var(--space-3)] text-center">
      <div className="size-12 rounded-full bg-[var(--bg-surface)] border border-hairline border-[var(--border-default)] flex items-center justify-center">
        <Leaf className="size-6 text-[var(--fg-muted)]" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--fg-default)]">No plants yet</p>
        <p className="text-caption mt-[var(--space-1)]">Add your first plant to start tracking.</p>
      </div>
      <Button asChild size="sm">
        <Link to="/add">Add your first plant</Link>
      </Button>
    </div>
  );
}
