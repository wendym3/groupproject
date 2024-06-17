import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from '../pages/Home';
import Recipe from '../pages/Recipe';
import Meals from './Meals';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
        path: "/recipe/:id",
        element: <Recipe />
    },
    {
        path: "/meals/:categories",
        element: <Meals />
    }
  ]);  


  return (
    <div>
        <RouterProvider router={router} />

    </div>
    
  );
}

export default App;