import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Meals() {
  const [meallist, setMeallist] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  let { categories } = useParams();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories}`)
      .then((r) => r.json())
      .then((data) => {
        setMeallist(data.meals);
        setCategoryName(categories);
      });
  }, [categories]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const filteredMeals = meallist.filter((meal) =>
        meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredMeals);
    } else {
      setSearchResults(meallist);
    }
  }, [searchTerm, meallist]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <header className="bg-gray-800 text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{categoryName}</h1>
          <nav className="flex items-center">
            <input
              type="text"
              placeholder="Search meals..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-3 py-2 mr-4 border border-gray-300 rounded-lg focus:outline-none text-black"
            />
            <Link to="/" className="text-white hover:text-gray-300 px-3 py-2">
              Home
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {searchResults.map((item) => (
          <Link
            key={item.idMeal}
            to={{
              pathname: `/recipe/${item.idMeal}`,
              state: { categories: categoryName },
            }}
          >
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
              <img
                className="p-8 rounded-t-lg"
                src={item.strMealThumb}
                alt={item.strMeal}
              />
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                  {item.strMeal}
                </h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Meals;