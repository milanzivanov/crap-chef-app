"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "scrapchef-pantry-items";
const DEFAULT_ITEMS = ["Tomatoes", "Pasta", "Garlic"];

let pantryItems = DEFAULT_ITEMS;
let hasLoadedPantry = false;

const listeners = new Set<() => void>();

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((entry) => typeof entry === "string" && entry.trim().length > 0)
  );
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function getSnapshot() {
  return pantryItems;
}

function getServerSnapshot() {
  return DEFAULT_ITEMS;
}

function readPantryItems() {
  const storedItems = window.localStorage.getItem(STORAGE_KEY);

  if (!storedItems) {
    return DEFAULT_ITEMS;
  }

  let parsedItems: unknown;

  try {
    parsedItems = JSON.parse(storedItems);
  } catch (error) {
    console.error("Failed to parse pantry items from local storage.", error);
    return DEFAULT_ITEMS;
  }

  if (!isStringArray(parsedItems)) {
    console.error("Pantry items in local storage are not a valid string array.");
    return DEFAULT_ITEMS;
  }

  return parsedItems;
}

function writePantryItems(nextItems: string[]) {
  pantryItems = nextItems;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  emitChange();
}

function loadPantryOnce() {
  if (hasLoadedPantry || typeof window === "undefined") {
    return;
  }

  hasLoadedPantry = true;
  pantryItems = readPantryItems();
}

export default function usePantry() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const previousItems = pantryItems;

    loadPantryOnce();

    if (previousItems !== pantryItems) {
      emitChange();
    }
  }, []);

  const addItem = useCallback((item: string) => {
    const nextItem = item.trim();

    if (!nextItem) {
      return false;
    }

    const hasDuplicate = pantryItems.some(
      (pantryItem) => pantryItem.toLocaleLowerCase() === nextItem.toLocaleLowerCase(),
    );

    if (hasDuplicate) {
      return false;
    }

    writePantryItems([...pantryItems, nextItem]);
    return true;
  }, []);

  const removeItem = useCallback((indexToRemove: number) => {
    if (indexToRemove < 0 || indexToRemove >= pantryItems.length) {
      return;
    }

    writePantryItems(
      pantryItems.filter((_, index) => index !== indexToRemove),
    );
  }, []);

  return {
    items,
    addItem,
    removeItem,
  };
}
