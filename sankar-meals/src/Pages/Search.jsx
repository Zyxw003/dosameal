import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loadingspin from "../components/Loadingspin";
import { fetchSearchmeal } from "../assets/api/mealapi";
import Mealcard from "../components/Mealcard";

const Search = () => {
  const [searchparams] = useSearchParams();
  const query = searchparams.get("q") || "";
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setMeals([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchSearchmeal(query)
      .then((res) => setMeals(res.data.meals || []))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch meals. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) return <Loadingspin />;

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold mb-6 text-pink-600">
        Search Results for "{query}"
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {meals.length === 0 ? (
        <p className="text-center text-gray-600">No meals found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <Mealcard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
