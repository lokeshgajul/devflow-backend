import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { VerifyToken } from "../middleware/verifyToken.js";
import User from "../models/userModel.js";
import { signIn, signUp } from "../controllers/authController.js";

const router = express.Router();

// step 1: redirect to google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user.id, email: req.user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      res.redirect(`${process.env.CLIENT_URL}/home`);
    } catch (error) {
      // console.log("google login error ", error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`);
    }
  }
);

router.get("/verify", VerifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json({ sucess: true, user });
  } catch (error) {
    return res.status(500).json({ status: false });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "Logged out successfully" });
});

router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
