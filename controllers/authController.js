import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createSecretToken } from "../utils/createSecretToken.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required " });
    }

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(201).json({ message: "Email already exist " });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      authProvider: "email/password",
      password: hashPass,
    });
    await newUser.save();

    return res
      .status(200)
      .json({ message: "User Created Successfully ", newUser });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required " });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ message: "Password is incorrect " });
    }
    const token = createSecretToken(user._id, user.email);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      message: "Login successful",
      sucess: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
