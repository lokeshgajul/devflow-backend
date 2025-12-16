import Answer from "../models/answerModel.js";
import AskQuestion from "../models/questionsModel.js";

export const postAnswerByQuestionId = async (req, res) => {
  try {
    const { userId, username, userAvatar, questionId, questionTitle, answer } =
      req.body;

    if (!userId || !username || !questionId || !questionTitle || !answer) {
      return res.status(400).json({ message: "Required all fields " });
    }

    const newAnswer = await new Answer({
      userId,
      username,
      userAvatar,
      questionId,
      questionTitle,
      answer,
    });
    await newAnswer.save();

    // increment the count of comment in question model
    const comment = await AskQuestion.findByIdAndUpdate(questionId, {
      $inc: { comments: 1 },
    });
    return res
      .status(200)
      .json({ message: "Answer posted successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error ", error });
  }
};

// fetches all answers for specific questions
export const getAllAnswersByQuestionId = async (req, res) => {
  try {
    const { questionId } = req.body;

    if (!questionId) {
      return res.status(400).json({ message: "Question id is not provided" });
    }

    const allAnswers = await Answer.find({ questionId }).sort({
      createdAt: -1,
    });

    if (allAnswers.length < 1) {
      return res.status(200).json({
        message: "No answer posted for this question",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All answers fetched",
      allAnswers,
      comments: allAnswers.length,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// fetches all answers posted by specific user
export const getAllAnswersByUserId = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User Id not found " });
    }

    const answers = await Answer.find({ userId });

    return res
      .status(200)
      .json({ message: "Answer posted by user ", answers, success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};
