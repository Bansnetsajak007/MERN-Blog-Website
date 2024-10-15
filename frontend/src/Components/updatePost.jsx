import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdatePost = () => {
  const { state: post } = useLocation(); 
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setAuthor(post.author);
      setTitle(post.title);
      setSummary(post.summary);
      setDescription(post.description);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!author || !title || !summary || !description) {
      alert("Please fill out all fields");
      return;
    }

    const updatedPost = { author, title, summary, description };

    try {
      const response = await fetch(`https://blog-sooty-ten-83.vercel.app/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Post updated', data);
        alert('Post updated successfully!');
        navigate('/'); 
      } else {
        console.log('Error:', response.status);
        alert('Failed to update post. Please try again.');
      }
    } catch (error) {
      console.log('error', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider">Update Post</h1>
      <div className="max-w-4xl mx-auto">
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
            <textarea
              id="summary"
              rows="4"
              className="w-full border-2 border-gray-300 p-2 focus:outline-none focus:border-black rounded"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
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
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-6 hover:bg-gray-800 transition duration-300 text-sm uppercase tracking-wider rounded"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePost;
