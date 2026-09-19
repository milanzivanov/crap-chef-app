import RecipePanel from "@/app/components/recipe/RecipePanel";
import styles from "./page.module.css";

export default function Home() {
  return (
    <section className={styles.page}>
      <div className={styles.canvas}>
        <RecipePanel />
      </div>
    </section>
  );
}
