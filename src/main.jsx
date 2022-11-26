import React from 'react';
import ReactDOM from 'react-dom/client';

import HomePage from './routes/HomePage';
import Login from './routes/Login';
import Overview from './routes/Overview';
import Root from './routes/Root';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />	
      },
      {
	path: "overview",
	element: <Overview />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
