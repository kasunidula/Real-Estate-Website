import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('❌ MONGO_URI is not defined in .env file');
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database connection failed: ${error.message}`);
        process.exit(1); // Exit the process if DB connection fails
    }
};
