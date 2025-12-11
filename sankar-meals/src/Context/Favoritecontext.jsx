import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "mealdb_favorites";
const FavoriteContext = createContext();

// Load favorites from localStorage
const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.log("Local storage load error:", err);
    return [];
  }
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(loadFromStorage);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.log("Save to storage failed", err);
    }
  }, [favorites]);

  // Toggle favorite
  const toggle = (meal) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.idMeal === meal.idMeal);

      return exists
        ? prev.filter((m) => m.idMeal !== meal.idMeal) // remove
        : [...prev, meal]; // add
    });
  };

  // Check is favorite
  const isFavorites = (idMeal) => {
    return (
      Array.isArray(favorites) && favorites.some((m) => m.idMeal === idMeal)
    );
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggle, isFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

// Custom Hook
export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("Something went wrong: FavoriteContext not found");
  }
  return context;
};
