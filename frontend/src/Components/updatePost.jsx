import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePost = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://blog-sooty-ten-83.vercel.app/posts/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const post = await response.json();
        setAuthor(post.author);
        setTitle(post.title);
        setSummary(post.summary);
        setDescription(post.description);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to fetch the post. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!author || !title || !summary || !description) {
      setError("Please enter all the fields");
      return;
    }

    const updatedPost = { author, title, summary, description };

    try {
      const response = await fetch(`https://blog-sooty-ten-83.vercel.app/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Post updated', data);
      navigate('/'); // Redirect to home page after successful update
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to update post. Please try again.');
    }
  }

  if (isLoading) return <p className="text-center">Loading post...</p>;

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider">Update Post</h1>
      <div className="max-w-4xl mx-auto">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">Author</label>
            <input
              type="text"
              id="author"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-black"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">Title</label>
            <input
              type="text"
              id="title"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">Summary</label>
            <input
              type="text"
              id="summary"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-black"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">Description</label>
            <textarea
              id="description"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="10"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white py-3 px-6 hover:bg-gray-800 transition duration-300 w-full text-sm uppercase tracking-wider"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePost;