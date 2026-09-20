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
    // Rendering the Response as HTML
    <article className={styles.recipe}>
      <header className={styles.recipeHeader}>
        <div>
          <h1 className={styles.recipeTitle}>{recipe.title}</h1>
          <p className={styles.recipeDescription}>{recipe.description}</p>
        </div>
        <div className={styles.recipeMeta}>
          <span>{recipe.cookTimeMinutes} mins</span>
          <span>{recipe.servings} servings</span>
        </div>
      </header>

      <section className={styles.recipeSection}>
        <h2 className={styles.sectionTitle}>Ingredients</h2>
        <ul className={styles.bulletList}>
          {recipe.ingredients.map((ingredient) => (
            <li
              className={styles.listItem}
              key={`${ingredient.name}-${ingredient.quantity}`}
            >
              <div className={styles.ingredientName}>{ingredient.name}</div>
              <div className={styles.ingredientQuantity}>
                {ingredient.quantity}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.recipeSection}>
        <h2 className={styles.sectionTitle}>Steps</h2>
        <ol className={styles.numberedList}>
          {recipe.steps.map((step, index) => (
            <li className={styles.stepItem} key={`${index}-${step}`}>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {recipe.notes.length > 0 ? (
        <section className={styles.recipeSection}>
          <h2 className={styles.sectionTitle}>Notes</h2>
          <ul className={styles.bulletList}>
            {recipe.notes.map((note, index) => (
              <li className={styles.noteItem} key={`${index}-${note}`}>
                {note}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
