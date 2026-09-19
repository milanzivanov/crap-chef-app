"use client";

import { useState } from "react";
import type { GenerateRecipeInput } from "@/app/context/RecipeContext";
import Button from "@/app/components/ui/Button";
import {
  createInitialFilters,
  type FilterState,
  type FilterValue,
} from "./FilterSection";
import styles from "./sidebar.module.css";
import FilterSection from "./FilterSection";
import PantrySection from "./PantrySection";
import usePantry from "@/app/hooks/usePantry";

type SidebarProps = {
  isLoading: boolean;
  onGenerateRecipe: (input: GenerateRecipeInput) => Promise<void>;
};

export default function Sidebar({
  isLoading,
  onGenerateRecipe,
}: SidebarProps) {
  const { items } = usePantry();
  const [filters, setFilters] = useState<FilterState>(createInitialFilters);

  function handleToggleFilter(filterValue: FilterValue) {
    setFilters((currentFilters) =>
      currentFilters.includes(filterValue)
        ? currentFilters.filter((value) => value !== filterValue)
        : [...currentFilters, filterValue],
    );
  }

  async function handleGenerateRecipes() {
    await onGenerateRecipe({
      items,
      filters,
    });
  }

  return (
    <aside className={styles.sidebar} aria-label="Sidebar">
      <div className={styles.sidebarInner}>
        <PantrySection />
        <FilterSection filters={filters} onToggle={handleToggleFilter} />
        <Button disabled={isLoading} fullWidth onClick={handleGenerateRecipes}>
          {isLoading ? "Generating..." : "Generate Recipes"}
        </Button>
      </div>
    </aside>
  );
}
