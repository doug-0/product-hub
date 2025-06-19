import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export function connectDB(): void {
    mongoose
        .connect(process.env.MONGO_URI as string)
        .then(() => console.log('✅ MongoDB connected!'))
        .catch(err => {
            console.error('❌ Connection error:', err);

            process.exit(1);
        });
}