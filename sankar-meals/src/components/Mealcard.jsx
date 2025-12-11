import { useFavorite } from "../Context/Favoritecontext";
import { Link } from "react-router-dom";
import Fav from "../components/Fav"

const Mealcard = ({ meal }) => {
  const { toggle, isFavorites } = useFavorite();
  const fav = isFavorites(meal.idMeal);

  return (
    <div>
      <Link to={`/meal/${meal.idMeal}`}>
        <Fav meal={meal} onToggle={toggle} isfav={fav} />
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover rounded-md mb-4 border-pink-500 shadow-2xl border-3 transition-all duration-0"
        />
        <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
      </Link>
    </div>
  );
};

export default Mealcard;
