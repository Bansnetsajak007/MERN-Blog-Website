import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Handle delete post
  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`http://localhost:5000/posts/${postId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete post');
        }
        // Remove deleted post from the state
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
      <h1 className="text-4xl sm:text-5xl font-light text-center text-black mb-16">
        Blog Posts
      </h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-6 sm:p-8 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl sm:text-2xl font-light text-black mb-6">{post.title}</h2>
              <p className="text-base sm:text-lg text-gray-700 mb-6">{post.summary}</p>
              <div className="flex justify-between items-center text-sm sm:text-base text-gray-500">
                <span>{post.author}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Link
                  to={`/readmore/${post._id}`}
                  className="inline-block px-8 py-3 text-lg sm:text-xl text-black border-2 border-gray-400 rounded-none hover:bg-gray-700 hover:text-white transition-all sm:w-auto w-full"
                >
                  Read More
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="inline-block px-8 py-3 text-lg sm:text-xl text-white bg-red-500 border-2 border-red-500 rounded-none hover:bg-red-700 hover:text-white transition-all sm:w-auto w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen text-gray-500">
          No posts found.
        </div>
      )}
    </div>
  );
}

export default Home;
