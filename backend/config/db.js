import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async (url) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("db connected");
  } catch (error) {
    console.error("db error");
  }
}

export default connectDB;