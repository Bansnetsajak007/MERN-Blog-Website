import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DBconnection = async () => { 
    const MONGODB_URI = process.env.MONGODB_URI;
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        throw error; 
    }
};

export default DBconnection;
