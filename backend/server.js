// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Blogpost from './models/blogModel.js'; // Ensure file extension is included
import DBconnection from './database/dbConfig.js'; // Ensure file extension is included

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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



DBconnection().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
            console.log("listening for requests");
        })
    })
