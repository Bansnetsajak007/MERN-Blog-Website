import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Navigation from './Components/Navigation';
import CreatePost from './Components/CreatePost';
import ReadMore from './Components/ReadMore';
import Markdown from 'react-markdown'
import './index.css';
import UpdatePost from './Components/updatePost';

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
        {
          path: 'readmore/:id',
          element: <ReadMore />, 
        },
        {path:'update/:id',
          element:<UpdatePost/>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
