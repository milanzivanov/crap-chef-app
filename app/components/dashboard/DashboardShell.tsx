"use client";

import { useState } from "react";
import type { Recipe } from "@/app/types/recipe";
import styles from "@/app/layout.module.css";
import Sidebar from "@/app/components/sidebar/Sidebar";
import {
  RecipeProvider,
  type GenerateRecipeInput,
} from "@/app/context/RecipeContext";

type DashboardShellProps = {
  children: React.ReactNode;
};

type GenerateRecipeResponse = {
  recipe: Recipe;
};

export default function DashboardShell({ children }: DashboardShellProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateRecipe({ items, filters }: GenerateRecipeInput) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          filters,
        }),
      });

      if (!response.ok) {
        throw new Error("Recipe generation failed.");
      }

      const data = (await response.json()) as GenerateRecipeResponse;
      setRecipe(data.recipe);
    } catch (error) {
      console.error("Failed to generate recipe.", error);
      setError("Couldn't generate a recipe right now.");
      setRecipe(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <RecipeProvider value={{ recipe, isLoading, error, generateRecipe }}>
      <div className={styles.contentGrid}>
        <Sidebar isLoading={isLoading} onGenerateRecipe={generateRecipe} />
        <div className={styles.mainColumn}>
          <main className={styles.mainContent}>{children}</main>
        </div>
      </div>
    </RecipeProvider>
  );
}
