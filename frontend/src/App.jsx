import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Navigation from './Components/Navigation.jsx';
import CreatePost from './Components/CreatePost.jsx';
import ReadMore from './Components/ReadMore.jsx';
import UpdatePost from './Components/updatePost.jsx';
import './index.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="readmore/:id" element={<ReadMore />} />
        <Route path="update/:id" element={<UpdatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
