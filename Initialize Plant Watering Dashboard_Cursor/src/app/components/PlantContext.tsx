import { createContext, useContext, useState } from "react";

export type Plant = {
  id: number;
  name: string;
  species: string;
  emoji: string;
  lastWateredDate: Date;
  frequencyDays: number;
  location: string;
};

type PlantContextValue = {
  plants: Plant[];
  addPlant: (plant: Omit<Plant, "id" | "lastWateredDate">) => void;
  markWatered: (id: number) => void;
};

const PlantContext = createContext<PlantContextValue | null>(null);

const INITIAL_PLANTS: Plant[] = [
  { id: 1, name: "Monstera", species: "Monstera deliciosa", emoji: "🌿", lastWateredDate: new Date(Date.now() - 6 * 86400000), frequencyDays: 7, location: "Living room" },
  { id: 2, name: "Peace Lily", species: "Spathiphyllum", emoji: "🌸", lastWateredDate: new Date(Date.now() - 7 * 86400000), frequencyDays: 7, location: "Bedroom" },
  { id: 3, name: "Sunflower", species: "Helianthus annuus", emoji: "🌻", lastWateredDate: new Date(Date.now() - 1 * 86400000), frequencyDays: 2, location: "Balcony" },
  { id: 4, name: "Succulent", species: "Echeveria elegans", emoji: "🪴", lastWateredDate: new Date(Date.now() - 10 * 86400000), frequencyDays: 14, location: "Desk" },
];

let nextId = INITIAL_PLANTS.length + 1;

function initialLastWateredDate(frequencyDays: number): Date {
  // New plants start due for their first watering today based on their schedule.
  return new Date(Date.now() - frequencyDays * 86400000);
}

export function PlantProvider({ children }: { children: React.ReactNode }) {
  const [plants, setPlants] = useState<Plant[]>(INITIAL_PLANTS);

  const addPlant = (plant: Omit<Plant, "id" | "lastWateredDate">) => {
    setPlants((prev) => [
      ...prev,
      { ...plant, id: nextId++, lastWateredDate: initialLastWateredDate(plant.frequencyDays) },
    ]);
  };

  const markWatered = (id: number) => {
    setPlants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, lastWateredDate: new Date() } : p))
    );
  };

  return (
    <PlantContext.Provider value={{ plants, addPlant, markWatered }}>
      {children}
    </PlantContext.Provider>
  );
}

export function usePlants() {
  const ctx = useContext(PlantContext);
  if (!ctx) throw new Error("usePlants must be used inside <PlantProvider>");
  return ctx;
}
