const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Blogpost = require('./models/blogModel');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;



//creating a new post
app.post('/create', async (req, res) => {
    try {
        const post = await Blogpost.create(req.body);
        res.status(200).json(post);
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
})

//fetching all the post
app.get('/', async (req, res) => {
    try {
        const posts = await Blogpost.find({});
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//fetching a single post
app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Blogpost.findById(id);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//updating a post 
app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Blogpost.findByIdAndUpdate(id, req.body);

        if (!post) {
            return res.status(404).json({ message: `Cannot find post ` });
        }

        const updatedPost = await Blogpost.findById(id);
        res.status(200).json(updatedPost);
    }

    catch (error) {
        res.status(500).json({ message: error.message });
    }

})


//deleting a post

app.delete('/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const post =  await  Blogpost.findByIdAndDelete(id);

        if(!post){
            res.status(404).json({message:error.message});
        }
        res.status(200).json(post)
       
    }
    catch(error){
     res.status(500).json({message:error.message});
    }
})





mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    })
    console.log('Connected to the database');
}).catch((error) => {
    console.log(error);
})