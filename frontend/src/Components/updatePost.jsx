import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdatePost() {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setAuthor(data.author);
        setTitle(data.title);
        setSummary(data.summary);
        setDescription(data.description);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, title, summary, description })
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating post');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider">Update Post</h1>
      <div className="max-w-4xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">Author</label>
            <input
              type="text"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-black"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">Title</label>
            <input
              type="text"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">Summary</label>
            <textarea
              className="w-full border-2 border-gray-300 p-2 focus:outline-none focus:border-black rounded"
              rows="4"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">Description</label>
            <textarea
              className="w-full border-2 border-gray-300 p-4 focus:outline-none focus:border-black rounded"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-3 px-6 hover:bg-gray-800 transition duration-300 text-sm uppercase tracking-wider rounded">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}
export default UpdatePost;