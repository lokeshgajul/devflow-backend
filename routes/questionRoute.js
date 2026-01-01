import express from "express";
import {
  askQuestion,
  createHashtags,
  deleteQuestion,
  getAllQuestionByUserId,
  getAllQuestions,
  getQuestionDetailsById,
  toggleLike,
} from "../controllers/questionController.js";
import { VerifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/ask-question", askQuestion);
router.get("/all_question", getAllQuestions);
router.post("/likes", toggleLike);
router.post("/createHashtags", createHashtags);
router.post("/user-questions", getAllQuestionByUserId);
router.post("/delete_question", deleteQuestion);
router.post("/:id", VerifyToken, getQuestionDetailsById);

export default router;
