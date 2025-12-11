import React from "react";
import UseFavorites from "../hook/Usefavorate";
import Mealcard from "../components/Mealcard";


const Favorite = () => {
  const { Favorities } = UseFavorites(); // ✅ now defined

  return (
    <div className="max-w-6xl mb-6 min-h-screen ">
      <h1 className="text-pink-900 font-semibold text-2xl mt-2.5">Favorate meals</h1>
      {Favorities.length === 0 ? (
        "No favorites yet"
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-2.5 ">
          {Favorities.map((meal) => (
            <Mealcard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
