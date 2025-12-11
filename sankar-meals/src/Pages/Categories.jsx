import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchmealsCategories } from "../assets/api/mealapi";
import Loadingspin from "../components/Loadingspin";
import Mealcard from "../components/Mealcard";

const Categories = () => {
  const [Meals, setMeals] = useState([]);
  const { category } = useParams(); // FIX
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchmealsCategories(category) // FIX
      .then((res) => setMeals(res.data.meals || []))
      .catch((err) => {
        console.error(err);
        setMeals([]);
      })
      .finally(() => setLoading(false));
  }, [category]); // FIX

  if (loading) return <Loadingspin />;

  return (
    <div>
      <h1 className="text-3xl font-bold capitalize mb-6 text-pink-500">
        {category} Meals {/* FIX */}
      </h1>

      {Meals.length === 0 ? (
        <p className="text-center">No meals found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {Meals.map((meal) => (
            <Mealcard
              key={meal.idMeal}
              meal={meal}
              className="border-pink-500 border-3 rounded-lg shadow-md p-4 hover:shadow-lg hover:animate-pulse"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
