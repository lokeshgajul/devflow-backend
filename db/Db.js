import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected Successfully");
  } catch (error) {
    console.log("error occurred ", error.message);
  }
};
