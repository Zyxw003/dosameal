import React, { useEffect, useState } from "react";
import Loadingspin from "../components/Loadingspin";
import { fetchCategories } from "../assets/api/mealapi";
import { Link } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loadingspin />;

  return (
    <div className="max-w-6xl mx-auto p-3 text-center">
      <div className="text-center">
        <h1 className="md:text-xl">
          WELCOME TO <span className="text-pink-500 text-xl mt-2 "> SP</span>{" "}
          MEALS
        </h1>
        <br />
        <p className="mb-2 ">Choose your favorite dish.....!</p>
        <div className="h-1  bg-pink-500 mt-4 rounded-full mx-96  transition gap-2 sm:w-85 sm: flex justify-center items-center sm:w-70% "></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
        {Array.isArray(categories) &&
          categories.map((cat) => (
            <Link to={`/categories/${cat.strCategory}`} key={cat.idCategory}>
              <img
                src={cat.strCategoryThumb}
                alt={cat.strCategory}
                className=" hover:shadow-pink-500 w-full rounded-lg shadow-xl mt-4 hover:transition scale-110 "
              />
              <p>{cat.strCategory}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
