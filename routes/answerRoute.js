import express from "express";
import {
  getAllAnswersByQuestionId,
  getAllAnswersByUserId,
  postAnswerByQuestionId,
} from "../controllers/answerController.js";

const router = express.Router();

router.post("/post-answer", postAnswerByQuestionId);
router.post("/get-answers", getAllAnswersByQuestionId);
router.post("/user-answers", getAllAnswersByUserId);

export default router;
