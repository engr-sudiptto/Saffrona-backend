import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('DB connected successfully');
    });

    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
