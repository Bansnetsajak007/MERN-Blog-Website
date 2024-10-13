import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const blogs = async () => {
      setIsFetching(true);
      const response = await fetch('https://mern-blog-website-9f9d.onrender.com/');
      const data = await response.json();
      setPosts(data);
      setIsFetching(false);
    };

    blogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://mern-blog-website-9f9d.onrender.com/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPosts(posts.filter(post => post._id !== id));
      } else {
        const errorData = await response.json();
        console.error('Failed to delete the post:', errorData.message);
        alert('Failed to delete the post. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while trying to delete the post.');
    }
  };

  const handleReadMore = (post) => {
    navigate(`/readmore/${post._id}`, { state: post });
  };

  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider'>Blogs</h1>
      {isFetching ? (
        <p className='text-center'>Fetching blogs...</p>
      ) : (
        <div className='max-w-4xl mx-auto space-y-8'>
          {posts.map((post) => (
            <div
              key={post._id}
              className='border-t border-gray-200 pt-8 first:border-t-0 first:pt-0'
            >
              <p className='text-gray-500 text-sm mb-2 uppercase tracking-wider'>{post.author}</p>
              <h2 className='text-2xl font-bold text-black mb-3'>{post.title}</h2>
              <p className='text-gray-700 mb-4'>{post.summary}</p>
              <div className='flex space-x-4'>
                <button
                  className='bg-black text-white py-2 px-4 hover:bg-gray-800 transition duration-300 text-sm uppercase tracking-wider'
                  onClick={() => handleReadMore(post)}
                >
                  Read More
                </button>
                <button onClick={()=>navigate(`/update/${post._id}`,{state:post})} className='bg-gray-400 text-black py-2 px-4 hover:bg-gray-300 border border-black transition duration-300 text-sm uppercase tracking-wider'>
                  Update Post
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className='bg-white text-black border border-black py-2 px-4 hover:bg-gray-100 transition duration-300 text-sm uppercase tracking-wider'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;