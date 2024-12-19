import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked'; // Import marked for parsing Markdown

const ReadMore = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/posts/${id}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <span className="loading loading-spinner loading-lg"></span>;
  if (error) return <div className="alert alert-error">{error}</div>;

  if (!post) return <div className="alert alert-info">Post not found.</div>;

  const markdownDescription = marked(post.description); // Convert Markdown to HTML

  return (
    <div className="min-h-screen bg-white text-black px-6 sm:px-12 py-8 flex justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-left mb-8">{post.title}</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6">{post.author} | {new Date(post.createdAt).toLocaleDateString()}</p>
        
        <div className="text-base sm:text-lg leading-relaxed text-black">
          <div>{post.summary}</div>
          <div
            className="mt-6"
            dangerouslySetInnerHTML={{ __html: markdownDescription }} // Render HTML from Markdown
          />
        </div>
      </div>
    </div>
  );
};

export default ReadMore;
