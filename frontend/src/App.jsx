import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Navigation from './Components/Navigation';
import CreatePost from './Components/CreatePost';
import './index.css'; // Adjust the path if necessary

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigation />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'create',
          element: <CreatePost />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
