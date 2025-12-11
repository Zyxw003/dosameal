import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Header = () => {
  const [query, Setquery] = useState("");
  const navigate = useNavigate();
  const { category } = useParams();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/searchmeal?q=${encodeURIComponent(query)}`);
  };
  return (
    <header className="bg-pink-500 text-black p-4 shadow">
      <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to={"/"} className="text-xl font-bold">
            SP Meals
          </Link>
          <Link to={"/favorite"} className="text-black">
            Favorate
          </Link>
          <Link to={`/categories/${category}`} className="text-black">
            Catogories
          </Link>
        </div>
        <form onSubmit={handleSearch} className="flex gap-3.5">
          <input
            type="text"
            value={query}
            onChange={(e) => Setquery(e.target.value)}
            placeholder="Search dishes"
            className="bg-black p-0.5 m-0.5 rounded w-48 sm:w-64 text-amber-50 hover:bg-amber-50 outline-0 hover:text-indigo-950"
          />
          <button
            type="submit"
            className="rounded-2xl border-amber-50 bg-black p-1.5   text-white hover:bg-amber-50 hover:text-black transition-shadow"
          >
            Search
          </button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
