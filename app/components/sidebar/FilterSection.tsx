"use client";

import styles from "./filterSection.module.css";

export const FILTERS = [
  {
    id: "max-5-ingredients",
    label: "Max 5 ingredients",
    value: "use a maximum of 5 ingredients",
  },
  {
    id: "cook-in-15",
    label: "Cook in 15 mins or less",
    value: "make the recipe take 15 minutes or less",
  },
  {
    id: "keep-it-veggie",
    label: "Keep it veggie",
    value: "keep the recipe vegetarian, do NOT use meat ingredients",
  },
] as const;

export type FilterId = (typeof FILTERS)[number]["id"];
export type FilterValue = (typeof FILTERS)[number]["value"];
export type FilterState = FilterValue[];

export function createInitialFilters(): FilterState {
  return [];
}

type FilterSectionProps = {
  filters: FilterState;
  onToggle: (filterValue: FilterValue) => void;
};

export default function FilterSection({
  filters,
  onToggle,
}: FilterSectionProps) {

  return (
    <section className={styles.section} aria-labelledby="filters-title">
      <h2 className={styles.title} id="filters-title">
        Filters
      </h2>
      <div className={styles.list}>
        {FILTERS.map((filter) => {
          const isActive = filters.includes(filter.value);

          return (
            <div className={styles.row} key={filter.id}>
              <span className={styles.label}>{filter.label}</span>
              <button
                className={`${styles.switch} ${isActive ? styles.switchActive : ""}`}
                type="button"
                role="switch"
                aria-checked={isActive}
                aria-label={filter.label}
                onClick={() => onToggle(filter.value)}
              >
                <span
                  aria-hidden="true"
                  className={`${styles.knob} ${isActive ? styles.knobActive : ""}`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
