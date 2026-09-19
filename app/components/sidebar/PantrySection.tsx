"use client";

import { type ComponentProps, useState } from "react";
import usePantry from "@/app/hooks/usePantry";
import styles from "./pantrySection.module.css";

export default function PantrySection() {
  const [draft, setDraft] = useState("");
  const { items, addItem, removeItem } = usePantry();

  const handleSubmit: NonNullable<ComponentProps<"form">["onSubmit"]> = (
    event,
  ) => {
    event.preventDefault();

    if (addItem(draft)) {
      setDraft("");
    }
  };

  return (
    <section className={styles.section} aria-labelledby="pantry-title">
      <h2 className={styles.title} id="pantry-title">
        My Pantry
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add an ingredient..."
          aria-label="Add an ingredient"
        />
      </form>
      <div className={styles.chips} aria-label="Pantry items">
        {items.map((item, index) => (
          <div className={styles.chip} key={`${item}-${index}`}>
            <span className={styles.chipLabel}>{item}</span>
            <button
              className={styles.removeButton}
              type="button"
              onClick={() => removeItem(index)}
              aria-label={`Remove ${item}`}
            >
              <svg
                aria-hidden="true"
                className={styles.removeIcon}
                viewBox="0 0 16 16"
              >
                <path
                  d="M4 4L12 12M12 4L4 12"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
