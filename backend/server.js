const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Blogpost = require('./models/blogModel');
const cors = require('cors');

const app = express();

// CORS configuration
const allowedOrigins = [
    'https://mern-blog-website-iota.vercel.app', // Add your first frontend URL
    'https://mern-blog-website-nfkesl52u-dipsankadariyas-projects.vercel.app', // Add your current frontend URL
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Reject the request
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Creating a new post
app.post('/create', async (req, res) => {
    try {
        const post = await Blogpost.create(req.body);
        res.status(201).json(post); // Use 201 for resource creation
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Fetching all the posts
app.get('/', async (req, res) => {
    try {
        const posts = await Blogpost.find({});
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Fetching a single post
app.get('/:id', async (req, res) => {
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
app.put('/:id', async (req, res) => {
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
app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Blogpost.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error.message);
        res.status(500).json({ message: error.message });
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
        console.error('Database connection error:', error.message);
    });
