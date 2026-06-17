import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Favorite from "./Pages/Favorate";
import MealDetails from "./Pages/Mealdeatils";
import { FavoritesProvider } from "./Context/Favoritecontext";
import Search from "./Pages/Search";

const App = () => {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<Categories />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/meal/:id" element={<MealDetails />} />
          <Route path={"/searchmeal"} element={<Search />} />
          <Route
            path="*"
            element={
              <h1 className="text-center mt-20 text-5xl text-red-800">
                Page not found
              </h1>
            }
          />
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  );
};

export default App;
