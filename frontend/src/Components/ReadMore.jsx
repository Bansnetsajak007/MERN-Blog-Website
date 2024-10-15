import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

function ReadMore() {
  const location = useLocation();
  const { id } = useParams();
  const [post, setPost] = useState(location.state || null);
  const [isLoading, setIsLoading] = useState(!location.state);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!post) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`https://blog-sooty-ten-83.vercel.app/posts/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error('Error fetching post:', error);
          setError('Failed to fetch the post. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [id, post]);

  if (isLoading) return <p className="text-center">Loading post...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!post) return <p className="text-center">No post found</p>;

  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider'>
        {post.title}
      </h1>
      <div className='max-w-4xl mx-auto'>
        <p className='text-gray-500 text-lg font-bold mb-2 uppercase tracking-wider'>{post.author}</p>
        <p className='text-gray-700 text-lg whitespace-pre-wrap'>{post.description}</p>
      </div>
    </div>
  );
}

export default ReadMore;