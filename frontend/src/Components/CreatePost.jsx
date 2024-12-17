import React, { useState } from 'react';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    summary: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      console.log('Post created successfully:', data);
      setFormData({
        author: '',
        title: '',
        summary: '',
        description: '',
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-start items-start min-h-screen bg-white px-6 md:px-0 overflow-hidden">
      <div className="w-full max-w-4xl p-8 bg-white">
        <h1 className="text-3xl font-bold text-black text-left mb-6">Add a Blog Post</h1>

        {error && <p className="text-sm text-red-600 text-left mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-black mb-1">
              Author:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full text-sm px-3 py-3 border-b border-black focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-black mb-1">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full text-sm px-3 py-3 border-b border-black focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-black mb-1">
              Summary:
            </label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              className="w-full text-sm px-3 py-3 border-b border-black focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-black mb-1">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full h-48 text-sm px-3 py-3 border-b border-black focus:outline-none"
              style={{ whiteSpace: 'pre-wrap' }}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-medium text-white bg-black rounded-sm hover:bg-gray-800 transition duration-300"
          >
            {loading ? 'Creating Post...' : 'Create Post'}
          </button>
        </form>

        {formData.description && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Post Preview</h2>
            <div
              className="text-sm"
              style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
            >
              {formData.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
