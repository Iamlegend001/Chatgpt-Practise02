import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDb Connected");
  } catch (error) {
    console.log("Mongodb not connected", error);
  }
};

export default connectDB;
