import React, { useState } from 'react';

function CreatePost() {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!author || !title || !summary || !description) {
      alert("Please enter all the fields");
      return;
    }

    const newPost = { author, title, summary, description };

    try {
      const response = await fetch('http://localhost:3000/create', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPost)
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Post created', data);
        
        setAuthor('');
        setTitle('');
        setSummary('');
        setDescription('');
        alert('Post created successfully!');
      } else {
        console.log('Error:', response.status);
        alert('Failed to create post. Please try again.');
      }
    } catch (error) {
      console.log('error', error);
      alert('An error occurred. Please try again.');
    }
  }

  return (
    <div className='bg-white min-h-screen p-8'>
      <h1 className='text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider'>Create a New Post</h1>
      <div className='max-w-2xl mx-auto'>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor='author' className='block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1'>Author</label>
            <input
              type='text'
              id='author'
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-black"
              value={author}
              onChange={(e) => setAuthor(e.target.value)} 
            />
          </div>

          <div>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1'>Title</label>
            <input
              type='text'
              id='title'
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>

          <div>
            <label htmlFor='summary' className='block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1'>Summary</label>
            <textarea
              id='summary'
              rows='4'
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-black"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1'>Description</label>
            <textarea
              id='description'
              rows='5'
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className="w-full bg-black text-white py-2 px-4 hover:bg-gray-800 transition duration-300 text-sm uppercase tracking-wider"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;