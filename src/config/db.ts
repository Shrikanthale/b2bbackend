import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string || "mongodb://localhost:27017/backendecom";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected succesfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
