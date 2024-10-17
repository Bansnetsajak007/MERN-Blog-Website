import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_URL = 'https://backend-eight-chi-19.vercel.app';

  useEffect(() => {
    const fetchPosts = async () => {
      setIsFetching(true);
      setError('');
      try {
        const response = await fetch(`${API_URL}/posts`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts. Please try again.');
      } finally {
        setIsFetching(false);
      }
    };
    fetchPosts();
  }, [API_URL]);

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider">Recent Posts</h1>
      {isFetching ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="border p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.summary}</p>
              <button
                onClick={() => navigate(`/posts/${post._id}`)}
                className="text-black hover:underline"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
