import express from "express";
import {
  askQuestion,
  getAllQuestions,
  getQuestionDetailsById,
} from "../controllers/questionController.js";
import { VerifyToken } from "../middleware/verifyToken.js";
import {
  getAllAnswersByQuestionId,
  postAnswerByQuestionId,
} from "../controllers/answerController.js";

const router = express.Router();

router.post("/ask-question", askQuestion);
router.get("/all_question", VerifyToken, getAllQuestions);
router.post("/question/:id", VerifyToken, getQuestionDetailsById);
router.post("/post-answer", postAnswerByQuestionId);
router.post("/get-answers", getAllAnswersByQuestionId);

export default router;
