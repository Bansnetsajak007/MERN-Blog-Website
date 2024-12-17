import React from 'react';

const UpdatePost = () => {
  return (
    <div>
      <h1>Create a New Post</h1>
      <form>
       
        <input type="text" placeholder="Title" />
        <textarea placeholder="Content"></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default UpdatePost;
