import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    if (!process.env.mongoUri) {
      throw new Error("Missing mongoUri environment variable");
    }

    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};
