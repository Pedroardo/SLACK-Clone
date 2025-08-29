import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(ENV.MONGO_URI);

    console.log("Connected on MongoDB", con.connection.host);
  } catch (error) {
    console.log("Error Connecting on MongoDB: ", error);
    process.exit(1); // Status 1 indicate error, 0 indicate success
  }
};
