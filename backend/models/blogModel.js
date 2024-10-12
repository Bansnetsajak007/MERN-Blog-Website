const mongoose = require('mongoose');


const  blogPostSchema =  mongoose.Schema(
    {
        author: {
            type: String,
            required: [true,"Please Enter the author name"], 
            trim: true,
            minlength: [2,"The name must be of atleast 2 characters"],
            maxlength : [50,"The name must not exceed 50 characters"],
        },
        title: {
            type: String,
            required: [true, "Please enter the title"],
            trim: true,
            minlength: [2, "Title must be atleast of 5 characters"],
        },
        summary: {
            type:String,
            required: [true, "Please enter the Summary"],
            minlength: [10,"Summary  must be of atleast 10 characters"],

        }
        ,
        description: {
            type:String,
            required: [true, "Please enter the description"],
            minlength: [10,"Description must be of atleast 20 characters"],

        },

    },
    {
        timestamps: true,
    }
);

const Blogpost = mongoose.model("Blogpost",blogPostSchema);

module.exports =Blogpost;

