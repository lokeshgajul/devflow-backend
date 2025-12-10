import Hashtag from "../models/hashtagModel.js";
import AskQuestion from "../models/questionsModel.js";
import Answer from "../models/answerModel.js";

export const createHashtags = async (hashtags) => {
  try {
    // const { hashtags } = req.body;

    if (!hashtags.length) {
      return res.status(400).json({ message: "Send at least one hashtag" });
    }

    const result = [];
    for (let tag of hashtags) {
      const eachTag = tag.trim().toLowerCase();

      let existing = await Hashtag.findOne({ tag: eachTag });

      if (existing) {
        existing.usageCount += 1;
        await existing.save();
      } else {
        existing = await Hashtag.create({ tag: eachTag, usageCount: 1 });
      }

      result.push(existing._id);
    }

    return result;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const askQuestion = async (req, res) => {
  try {
    const {
      userId,
      username,
      avatar,
      title,
      description,
      codeSnippet,
      hashtags,
    } = req.body;

    if (
      !userId ||
      !username ||
      !title ||
      !description ||
      !codeSnippet ||
      !Array.isArray(hashtags)
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashtasIds = await createHashtags(hashtags);

    if (!hashtasIds.length) {
      return res
        .status(400)
        .json({ message: "Problem occurred while passing hashtag ids" });
    }
    const newQuestion = new AskQuestion({
      userId,
      username,
      avatar,
      title,
      description,
      codeSnippet,
      hashtags: hashtasIds,
    });

    await newQuestion.save();

    return res
      .status(201)
      .json({ message: "Question posted successfully", newQuestion });
  } catch (error) {
    console.error("Ask Question Error:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const allQuestions = await AskQuestion.find()
      .populate("hashtags")
      .sort({ createdAt: -1 });

    if (!allQuestions.length) {
      return res.status(404).json({
        message: "No questions found",
        questions: [],
      });
    }

    return res.status(200).json({
      message: "Fetched all questions successfully",
      total: allQuestions.length,
      allQuestions,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllQuestionByUserId = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User Id not found " });
    }

    const questions = await AskQuestion.find({ userId }).populate("hashtags");

    return res
      .status(200)
      .json({ message: "questions posted by user ", questions, success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

export const getQuestionDetailsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User Id not found " });
    }

    const details = await AskQuestion.findById(id).populate("hashtags");

    return res.status(200).json({
      status: true,
      message: "Question Details fetched successfully",
      details,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { userId, questionId } = req.body;

    const question = await AskQuestion.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Not found" });
    }

    const alreadyLiked = question.likedBy.includes(userId);

    if (alreadyLiked) {
      question.likedBy.pull(userId);
      question.likes -= 1;
    } else {
      question.likedBy.push(userId);
      question.likes += 1;
    }
    await question.save();

    return res
      .status(200)
      .json({ likes: question.likes, liked: !alreadyLiked });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error ", error });
  }
};
