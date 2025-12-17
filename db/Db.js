import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.DB_URI) {
    throw new Error("Missing DB_URI environment variable");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 10000,
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
