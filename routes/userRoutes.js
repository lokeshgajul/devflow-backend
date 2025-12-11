import express from "express";
import {
  getUserDetailsById,
  updateProfile,
} from "../controllers/userController.js";
import { VerifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/user-details", getUserDetailsById);
router.post("/update-profile", VerifyToken, updateProfile);

export default router;
