import React from 'react';
import { useLocation } from 'react-router-dom';

function ReadMore() {
  const location = useLocation();
  const { author, title, description } = location.state; 

  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider'>
        {title}
      </h1>
      <div className='max-w-4xl mx-auto'>
        <p className='text-gray-500 text-lg font-bold mb-2 uppercase tracking-wider'>{author}</p>
        <p className='text-gray-700 text-lg whitespace-pre-wrap'>{description}</p>
      </div>
    </div>
  );
}

export default ReadMore;
