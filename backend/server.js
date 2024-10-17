const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Blogpost = require('./models/blogModel');
const cors = require('cors');

const app = express();

// Simplified CORS configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Root route
app.get('/', (req, res) => {
    res.send('Blog API is running');
});

// Creating a new post
app.post('/create', async (req, res) => {
    try {
        const post = await Blogpost.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Fetching all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Blogpost.find({});
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Fetching a single post
app.get('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Blogpost.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Updating a post
app.put('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPost = await Blogpost.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Deleting a post
app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Blogpost.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error.message);
        res.status(500).json({ messege: error.message });
    }
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Database connection error:', error.messsage);
    });