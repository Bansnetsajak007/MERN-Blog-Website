import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-grey shadow-sm">
      
      <div className="text-xl font-semibold text-white-700">My Blogs</div>

     
      <div className="hidden md:flex items-center space-x-6">
        <Link 
          to="/" 
          className="text-white-700 hover:text-neutral-900 transition-colors duration-300 ease-in-out text-sm font-medium uppercase tracking-wider relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-neutral-700 hover:after:w-full after:transition-all after:duration-300"
        >
          Home
        </Link>
        <div className="h-4 w-px bg-neutral-300"></div>
        <Link 
          to="/create" 
          className="text-white-700 hover:text-neutral-900 transition-colors duration-300 ease-in-out text-sm font-medium uppercase tracking-wider relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-neutral-700 hover:after:w-full after:transition-all after:duration-300"
        >
          Create Post
        </Link>
        <div className="h-4 w-px bg-neutral-300"></div>
        <Link 
          to="/readmore/1" 
          className="text-white-700 hover:text-neutral-900 transition-colors duration-300 ease-in-out text-sm font-medium uppercase tracking-wider relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-neutral-700 hover:after:w-full after:transition-all after:duration-300"
        >
          Read More
        </Link>
      </div>

    
      <button
        onClick={toggleMenu}
        className="md:hidden text-neutral-700 hover:text-neutral-900 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

   
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 w-full bg-neutral-50 shadow-lg py-4 px-6`}
      >
        <Link 
          to="/" 
          className="block text-neutral-700 hover:text-neutral-900 transition-colors duration-300 ease-in-out text-sm font-medium uppercase tracking-wider mb-4"
        >
          Home
        </Link>
        <Link 
          to="/create" 
          className="block text-neutral-700 hover:text-neutral-900 transition-colors duration-300 ease-in-out text-sm font-medium uppercase tracking-wider mb-4"
        >
          Create Post
        </Link>
        <Link 
          to="/readmore/1" 
          className="block text-neutral-700 hover:text-neutral-900 transition-colors duration-300 ease-in-out text-sm font-medium uppercase tracking-wider"
        >
          Read More
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
