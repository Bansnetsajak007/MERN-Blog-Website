import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider">Recent Posts</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post._id} className="border p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.summary}</p>
            <button onClick={() => navigate(`/posts/${post._id}`)} className="text-black hover:underline">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
