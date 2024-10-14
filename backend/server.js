const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Blogpost = require('./models/blogModel');
const cors = require('cors');
const compression = require('compression');
const nodeCache = require('node-cache');

const app = express();
const cache = new nodeCache({ stdTTL: 300 }); // Cache for 5 minutes

app.use(cors());
app.use(express.json());
app.use(compression());

const PORT = process.env.PORT || 5000;

// Helper function to clear cache
const clearCache = () => {
  cache.del('all_posts');
};

// Fetching posts with pagination
app.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    const cacheKey = `posts_${page}_${limit}`;
    const cachedPosts = cache.get(cacheKey);

    if (cachedPosts) {
      return res.status(200).json(cachedPosts);
    }

    const posts = await Blogpost.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .lean();

    const total = await Blogpost.countDocuments();

    const result = {
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total
    };

    cache.set(cacheKey, result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Creating a new post
app.post('/create', async (req, res) => {
  try {
    const post = await Blogpost.create(req.body);
    clearCache();
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Fetching a single post
app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `post_${id}`;
    const cachedPost = cache.get(cacheKey);

    if (cachedPost) {
      return res.status(200).json(cachedPost);
    }

    const post = await Blogpost.findById(id).lean();
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    cache.set(cacheKey, post);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Updating a post 
app.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Blogpost.findByIdAndUpdate(id, req.body, { new: true });

    if (!post) {
      return res.status(404).json({ message: 'Cannot find post' });
    }

    clearCache();
    cache.del(`post_${id}`);
    res.status(200).json(post);
  } catch (error) {
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

    clearCache();
    cache.del(`post_${id}`);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.log(error);
  });