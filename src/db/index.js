import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    console.log(`\n Mongo db connected! ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("\n Mongodb Connection error", error);
    process.exit(1);
  }
};

export default connectDB;
