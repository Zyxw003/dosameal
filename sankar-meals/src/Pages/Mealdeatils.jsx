import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFavorite } from "../Context/Favoritecontext";
import { fetchmealid } from "../assets/api/mealapi";
import Loadingspin from "../components/Loadingspin";
import Fav from "../components/Fav";

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toggle, isFavorites } = useFavorite();

  useEffect(() => {
    setLoading(true);
    fetchmealid(id)
      .then((res) => setMeal(res.data.meals?.[0] || null))
      .catch((err) => console.error("Error fetching meal:", err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loadingspin />;
  if (!meal)
    return (
      <p className="text-center text-xl mt-20 text-pink-500">Meal not found</p>
    );

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing?.trim()) ingredients.push(`${measure?.trim() || ""} ${ing.trim()}`);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-2xl font-semibold text-pink-900 text-center mb-8">
        {meal.strMeal}
      </h1>

      <div className="grid md:grid-cols-2 gap-16">
        <ul className="list-disc pl-6">
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="relative">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full rounded shadow-sm"
          />

          <div className="absolute top-4 mx-69 md:mx-30">
            <Fav
              meal={meal}
              onToggle={toggle}
              isfav={isFavorites(meal.idMeal)}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        {meal.strYoutube && (
          <a
            href={meal.strYoutube}
            target="_blank"
            className="text-xl bg-pink-500 mx-2.5 rounded-xl p-1.5 m-1 hover:cursor-pointer hover:border-2 "
          >
            watchvideo
          </a>
        )}
      </div>
      <div className="mt-25">
        <h2 className="text-2xl text-blue-600">Instructions</h2>
        <div className="space-y-4">
          <p>{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
