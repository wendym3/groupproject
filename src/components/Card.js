import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Card({ list }) {
  const [visibleDescription, setVisibleDescription] = useState(null);

  const toggleDescription = (e, id) => {
    e.preventDefault();
    setVisibleDescription(visibleDescription === id ? null : id);
  };

  return (
    <div>
      <section className="bg-transparent">
        <div className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {list.map((item) => (
            <div
              key={item.idCategory}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow"
            >
              <Link to={"/meals/" + item.strCategory}>
                <img
                  className="p-8 rounded-t-lg"
                  src={item.strCategoryThumb}
                  alt={item.strCategory}
                />
              </Link>

              <div className="px-5 pb-5 h-full">
                <Link to={"/meals/" + item.strCategory}>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                    {item.strCategory}
                  </h5>
                </Link>
                <div className="flex items-center mt-2.5 mb-5">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {[...Array(4)].map((_, index) => (
                      <svg
                        key={index}
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                    <svg
                      className="w-4 h-4 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                    5.0
                  </span>
                </div>

                <div className="flex items-end w-full justify-end">
                  <button
                    onClick={(e) => toggleDescription(e, item.idCategory)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {visibleDescription === item.idCategory
                      ? "Hide"
                      : "Read more"}
                  </button>
                </div>

                {visibleDescription === item.idCategory && (
                  <div className="mt-3 text-gray-900 dark:text-gray-800 max-h-32 overflow-y-auto">
                    {item.strCategoryDescription}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Card;