import express from "express";
import {
  askQuestion,
  getAllQuestions,
  getQuestionDetailsById,
  toggleLike,
} from "../controllers/questionController.js";
import { VerifyToken } from "../middleware/verifyToken.js";
import {
  getAllAnswersByQuestionId,
  postAnswerByQuestionId,
} from "../controllers/answerController.js";

const router = express.Router();

router.post("/ask-question", askQuestion);
router.get("/all_question", getAllQuestions);
router.post("/post-answer", postAnswerByQuestionId);
router.post("/get-answers", getAllAnswersByQuestionId);
router.post("/likes", toggleLike);
router.post("/question/:id", VerifyToken, getQuestionDetailsById);

export default router;
