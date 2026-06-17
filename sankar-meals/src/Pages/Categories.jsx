import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchmealsCategories, fetchCategories } from "../assets/api/mealapi";
import Loadingspin from "../components/Loadingspin";
import Mealcard from "../components/Mealcard";

const Categories = () => {
  const [data, setData] = useState([]);
  const { category } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (category) {
      fetchmealsCategories(category)
        .then((res) => setData(res.data.meals || []))
        .catch((err) => {
          console.error(err);
          setData([]);
        })
        .finally(() => setLoading(false));
    } else {
      fetchCategories()
        .then((res) => setData(res.data.categories || []))
        .catch((err) => {
          console.error(err);
          setData([]);
        })
        .finally(() => setLoading(false));
    }
  }, [category]);

  if (loading) return <Loadingspin />;

  if (!category) {
    return (
      <div>
        <h1 className="text-3xl font-bold capitalize mb-6 text-pink-500">
          Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {data.map((cat) => (
            <Link to={`/categories/${cat.strCategory}`} key={cat.idCategory} className="border-pink-500 border-3 rounded-lg shadow-md p-4 hover:shadow-lg hover:animate-pulse block">
              <img
                src={cat.strCategoryThumb}
                alt={cat.strCategory}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-center">{cat.strCategory}</h2>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold capitalize mb-6 text-pink-500">
        {category} Meals
      </h1>

      {data.length === 0 ? (
        <p className="text-center">No meals found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {data.map((meal) => (
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
