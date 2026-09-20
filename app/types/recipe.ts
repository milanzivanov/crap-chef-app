export type RecipeIngredient = {
  name: string;
  quantity: string;
};

export type Recipe = {
  title: string;
  description: string;
  cookTimeMinutes: number;
  servings: number;
  ingredients: RecipeIngredient[];
  steps: string[];
  notes: string[];
};
