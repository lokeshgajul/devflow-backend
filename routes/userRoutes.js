import express from "express";
import {
  getUserDetailsById,
  updateProfile,
  updateProfileImage,
} from "../controllers/userController.js";
import { VerifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/user-details", VerifyToken, getUserDetailsById);
router.post("/update-profile", VerifyToken, updateProfile);
router.post("/upload-image", VerifyToken, updateProfileImage);

export default router;
