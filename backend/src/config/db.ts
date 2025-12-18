import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI as string;

    if (!mongoUri) {
      throw new Error('MONGO_URI not found in environment variables');
    }

    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
