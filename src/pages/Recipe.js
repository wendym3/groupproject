
import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Navbar from "../components/NavBar";

const Recipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  let { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
      .then((r) => r.json())
      .then((data) => {
        setRecipe(data.meals[0]);
        console.log(location.state?.mealData);
      });
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Add the new comment to the comments list
    setComments([...comments, comment]);
    setComment(""); // Clear the comment field after submission
    setCommentSubmitted(true); // Show the submission confirmation message
    // Hide the confirmation message after a few seconds
    setTimeout(() => {
      setCommentSubmitted(false);
    }, 3000);
  };

  return (
    <div>
      <Navbar category={location?.state?.mealData} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {recipe ? (
          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <img
              className="w-full h-72 object-cover object-center"
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
            <div className="p-6 flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold mb-4">Ingredients:</h3>
                <ul className="list-disc list-inside">
                  {Object.keys(recipe).map((key) => {
                    if (key.startsWith("strIngredient") && recipe[key]) {
                      const measureKey = `strMeasure${key.slice(13)}`;
                      return (
                        <li key={key}>
                          {recipe[key]} - {recipe[measureKey]}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
              <div className="md:w-2/3 md:pl-6">
                <h2 className="text-3xl font-bold mb-4">{recipe.strMeal}</h2>
                <p className="text-lg font-normal text-gray-700">
                  {recipe.strInstructions}
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Comments:</h3>
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  rows="4"
                  placeholder="Leave a comment..."
                  value={comment}
                  onChange={handleCommentChange}
                ></textarea>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
              {commentSubmitted && (
                <p className="text-green-500 mt-4">Comment submitted!</p>
              )}
              <ul className="mt-4">
                {comments.map((c, index) => (
                  <li key={index} className="border-b border-gray-200 py-2">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Recipe;
