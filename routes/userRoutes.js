import express from "express";
import { getUserDetailsById } from "../controllers/userController.js";

const router = express.Router();

router.post("/user-details", getUserDetailsById);

export default router;
