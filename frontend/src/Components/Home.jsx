import React, { useEffect, useState } from 'react';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const blogs = async () => {
      const response = await fetch('http://localhost:3000/');
      const data = await response.json();
      setPosts(data);
    };

    blogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/${id}`, {
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
  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider'>Blogs</h1>
      <div className='max-w-4xl mx-auto space-y-8'>
        {posts.map((post) => (
          <div
            key={post._id}
            className='border-t border-gray-200 pt-8 first:border-t-0 first:pt-0'
          >
            <p className='text-gray-500 text-sm mb-2 uppercase tracking-wider'>{post.author}</p>
            <h2 className='text-2xl font-bold text-black mb-3'>{post.title}</h2>
            <p className='text-gray-700 mb-4'>{post.description}</p>
            <div className='flex space-x-4'>
              <button className='bg-black text-white py-2 px-4 hover:bg-gray-800 transition duration-300 text-sm uppercase tracking-wider'>
                Update
              </button>
              <button  onClick={()=>handleDelete(post._id)} className='bg-white text-black border border-black py-2 px-4 hover:bg-gray-100 transition duration-300 text-sm uppercase tracking-wider'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;