"use client";

import styles from "./cookingLoader.module.css";

export default function CookingLoader() {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.fireBase} />
        <div className={styles.flameLeft} />
        <div className={styles.flameCenter} />
        <div className={styles.flameRight} />
        <div className={styles.emberLeft} />
        <div className={styles.emberCenter} />
        <div className={styles.emberRight} />
      </div>
      <p className={styles.label}>Cooking up your next recipe...</p>
    </div>
  );
}
