"use client";

import CookingLoader from "./CookingLoader";
import { useRecipe } from "@/app/hooks/useRecipe";
import styles from "@/app/page.module.css";

export default function RecipePanel() {
  const { recipe, isLoading, error } = useRecipe();

  if (isLoading) {
    return <CookingLoader />;
  }

  if (error) {
    return (
      <div className={styles.placeholder}>
        <p className={styles.kicker}>{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className={styles.placeholder}>
        <p className={styles.kicker}>
          Generate a recipe from the sidebar to see it here.
        </p>
      </div>
    );
  }

  return (
    <article className={styles.recipe}>
      <p>{recipe}</p>
    </article>
  );
}
