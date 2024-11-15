// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Blogpost = require('./models/blogModel');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection using the URI from the .env file
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Database connection error:', error));

// Routes
app.post('/create', async (req, res) => {
    try {
        const post = await Blogpost.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await Blogpost.find({}).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/posts/:id', async (req, res) => {
    try {
        const post = await Blogpost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/posts/:id', async (req, res) => {
    try {
        const post = await Blogpost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Port from environment variable, default to 3000 if not specified
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
