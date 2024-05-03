import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbCon = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB is connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default dbCon;
