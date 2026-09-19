"use client";

import { createContext } from "react";
import type { Recipe } from "@/app/types/recipe";

export type GenerateRecipeInput = {
  items: string[];
  filters: string[];
};

export type RecipeContextValue = {
  recipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
  generateRecipe: (input: GenerateRecipeInput) => Promise<void>;
};

export const RecipeContext = createContext<RecipeContextValue | undefined>(undefined);

type RecipeProviderProps = {
  value: RecipeContextValue;
  children: React.ReactNode;
};

export function RecipeProvider({ value, children }: RecipeProviderProps) {
  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}