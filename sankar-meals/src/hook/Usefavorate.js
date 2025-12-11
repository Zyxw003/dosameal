import { useEffect, useState } from "react";
const STORAGE_KEY = "mealdb_favorites";

// Load favorites from localStorage
const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    // Ensure it is always an array
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.log("Local storage load error:", err);
    return [];
  }
};

export default function UseFavorites() {
  const [Favorities, setFavorities] = useState(loadFromStorage);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Favorities));
    } catch (err) {
      console.log("Save to storage failed", err);
    }
  }, [Favorities]);

  // ✔ CORRECT toggle function
  const toggle = (meal) => {
    setFavorities((prev) => {
      const exists = prev.some((m) => m.idMeal === meal.idMeal);

      return exists
        ? prev.filter((m) => m.idMeal !== meal.idMeal) // Remove
        : [...prev, meal]; // Add (must be array)
    });
  };

  // ✔ Check if a meal is favorite
  const isFavorites = (idMeal) => {
    return (
      Array.isArray(Favorities) && Favorities.some((m) => m.idMeal === idMeal)
    );
  };

  return { Favorities, toggle, isFavorites };
}
