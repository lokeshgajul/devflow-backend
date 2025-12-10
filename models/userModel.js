import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    authProvider: {
      type: String,
      enum: ["email/password", "google"],
      default: "email/password",
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
    avatar: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
