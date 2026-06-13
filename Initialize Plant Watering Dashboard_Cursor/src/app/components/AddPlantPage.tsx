import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { ArrowLeft } from "lucide-react";
import { cn } from "./ui/utils";
import { usePlants } from "./PlantContext";

type QuickPickTemplate = {
  id: string;
  name: string;
  emoji: string;
  defaultFrequencyDays: number;
  species: string;
  location: string;
};

const QUICK_PICKS: QuickPickTemplate[] = [
  { id: "monstera",   name: "Monstera",   emoji: "🌿", defaultFrequencyDays: 7,  species: "Monstera deliciosa", location: "Indoors" },
  { id: "peace-lily", name: "Peace Lily", emoji: "🌸", defaultFrequencyDays: 7,  species: "Spathiphyllum",      location: "Indoors" },
  { id: "sunflower",  name: "Sunflower",  emoji: "🌻", defaultFrequencyDays: 2,  species: "Helianthus annuus",  location: "Outdoors" },
  { id: "succulent",  name: "Succulent",  emoji: "🪴", defaultFrequencyDays: 14, species: "Echeveria elegans",  location: "Indoors" },
  { id: "fern",       name: "Fern",       emoji: "🌱", defaultFrequencyDays: 3,  species: "Nephrolepis exaltata", location: "Indoors" },
  { id: "cactus",     name: "Cactus",     emoji: "🌵", defaultFrequencyDays: 14, species: "Cactaceae",          location: "Indoors" },
];

const FREQUENCY_OPTIONS: { label: string; days: number }[] = [
  { label: "Every day",     days: 1  },
  { label: "Every 2 days",  days: 2  },
  { label: "Every 3 days",  days: 3  },
  { label: "Every week",    days: 7  },
  { label: "Every 2 weeks", days: 14 },
  { label: "Every month",   days: 30 },
];

export function AddPlantPage() {
  const navigate = useNavigate();
  const { addPlant } = usePlants();

  const [selectedQuickPick, setSelectedQuickPick] = useState<string | null>(null);
  const [plantName, setPlantName] = useState("");
  const [frequencyDays, setFrequencyDays] = useState<number>(7);

  const handleQuickPick = (template: QuickPickTemplate) => {
    setSelectedQuickPick(template.id);
    setPlantName(template.name);
    setFrequencyDays(template.defaultFrequencyDays);
  };

  const handleAdd = () => {
    const trimmed = plantName.trim();
    if (!trimmed) return;

    const template = QUICK_PICKS.find((q) => q.id === selectedQuickPick);
    addPlant({
      name: trimmed,
      species: template?.species ?? trimmed,
      emoji: template?.emoji ?? "🌱",
      frequencyDays,
      location: template?.location ?? "Indoors",
    });
    navigate("/");
  };

  const canAdd = plantName.trim().length > 0;

  return (
    <div className="flex flex-col min-h-full px-[var(--page-margin-mobile)] py-[var(--space-4)] gap-[var(--space-5)]">
      <Button variant="ghost" size="sm" className="-ml-[var(--space-2)] self-start" onClick={() => navigate(-1)}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back
      </Button>

      <header className="space-y-[var(--space-2)]">
        <p className="text-kicker">New plant</p>
        <h1>Add a plant</h1>
        <p className="text-body-lg text-[var(--neutral-700)]">
          Pick a template or fill in the details yourself.
        </p>
      </header>

      {/* 01 Quick Pick */}
      <section>
        <div className="flex items-baseline gap-[var(--space-3)] mb-[var(--space-4)]">
          <span className="text-sm font-medium tracking-[var(--tracking-wider)] text-[var(--fg-muted)]" aria-hidden="true">01</span>
          <h2>Quick pick</h2>
        </div>
        <div className="flex gap-[var(--tile-gap)] overflow-x-auto pb-[var(--space-2)] -mx-[var(--page-margin-mobile)] px-[var(--page-margin-mobile)] scrollbar-none">
          {QUICK_PICKS.map((template) => {
            const isActive = selectedQuickPick === template.id;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => handleQuickPick(template)}
                className={cn(
                  "flex flex-col items-center justify-center gap-[var(--space-2)] shrink-0 w-20 h-20 rounded-[var(--radius-md)] border-hairline transition-[background-color,border-color] duration-[var(--duration-fast)] outline-none focus-visible:shadow-[var(--shadow-focus-ring)]",
                  isActive
                    ? "border-[var(--border-accent)] bg-[var(--accent-subtle)] text-[var(--fg-default)]"
                    : "border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--fg-default)] hover:bg-[var(--white)]"
                )}
              >
                <span className="text-2xl leading-none" aria-hidden="true">{template.emoji}</span>
                <span className="text-xs leading-[var(--leading-snug)] tracking-wide text-center px-[var(--space-2)] truncate w-full">
                  {template.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <Separator />

      {/* 02 Details */}
      <section className="space-y-[var(--space-5)]">
        <div className="flex items-baseline gap-[var(--space-3)]">
          <span className="text-sm font-medium tracking-[var(--tracking-wider)] text-[var(--fg-muted)]" aria-hidden="true">02</span>
          <h2>Details</h2>
        </div>

        <div className="space-y-[var(--space-2)]">
          <Label htmlFor="plant-name">Plant name</Label>
          <Input
            id="plant-name"
            placeholder="e.g. My Monstera"
            value={plantName}
            onChange={(e) => {
              setPlantName(e.target.value);
              if (selectedQuickPick) {
                const template = QUICK_PICKS.find((q) => q.id === selectedQuickPick);
                if (template && e.target.value !== template.name) {
                  setSelectedQuickPick(null);
                }
              }
            }}
          />
        </div>

        <div className="space-y-[var(--space-2)]">
          <Label htmlFor="frequency">Watering frequency</Label>
          <Select
            value={String(frequencyDays)}
            onValueChange={(v) => setFrequencyDays(Number(v))}
          >
            <SelectTrigger id="frequency" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FREQUENCY_OPTIONS.map((opt) => (
                <SelectItem key={opt.days} value={String(opt.days)}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <div className="flex-1" />

      <Button
        variant="default"
        className="w-full bg-[var(--accent)] text-[var(--fg-on-accent)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent-active)] disabled:bg-[var(--accent)] disabled:text-[var(--fg-on-accent)] disabled:opacity-50"
        disabled={!canAdd}
        onClick={handleAdd}
      >
        Add plant
      </Button>
    </div>
  );
}
