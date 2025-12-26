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

    profileImage: {
      type: String,
      required: false,
    },
    fullName: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      default: "",
    },
    portfolio: {
      type: String,
      default: "",
    },
    socialLinks: {
      github: { type: String, default: "" },
      linkedIn: { type: String, default: "" },
      twitter: { type: String, default: "" },
    },
    skills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
