import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ReadMore() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider">{post.title}</h1>
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-500 text-lg font-bold mb-2 uppercase tracking-wider">{post.author}</p>
        <p className="text-gray-700 text-lg whitespace-pre-wrap">{post.description}</p>
      </div>
    </div>
  );
}

export default ReadMore;