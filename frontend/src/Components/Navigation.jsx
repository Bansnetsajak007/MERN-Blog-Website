import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      <nav className="bg-white shadow-md">
        <ul className="flex space-x-8 p-4">
          <li>
            <Link to="/" className="text-black font-bold hover:text-gray-600 transition-colors duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/create" className="text-black font-bold hover:text-gray-600 transition-colors duration-300">
              Create Post
            </Link>
          </li>
         
        </ul>
      </nav>
      <main className="p-4 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default Navigation;
