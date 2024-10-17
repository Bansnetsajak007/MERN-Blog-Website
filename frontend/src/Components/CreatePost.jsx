import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_URL = 'https://backend-eight-chi-19.vercel.app';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!author || !title || !summary || !description) {
      setError("Please enter all the fields");
      return;
    }

    const newPost = { author, title, summary, description };

    try {
      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Post created', data);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create post. Please try again.');
    }
  }

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider">Create a New Post</h1>
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
              placeholder="Enter the author's name"
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
              placeholder="Enter the post title"
            />
          </div>

          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">Summary</label>
            <textarea
              id="summary"
              rows="4"
              className="w-full border-2 border-gray-300 p-2 focus:outline-none focus:border-black rounded"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Briefly describe the post"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">Description</label>
            <textarea
              id="description"
              rows="20"
              className="w-full border-2 border-gray-300 p-4 focus:outline-none focus:border-black rounded resize-y min-h-[400px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed blog content"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-6 hover:bg-gray-800 transition duration-300 text-sm uppercase tracking-wider rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;