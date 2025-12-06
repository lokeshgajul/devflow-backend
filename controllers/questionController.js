import Hashtag from "../models/hashtagModel.js";
import AskQuestion from "../models/questionsModel.js";

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
    console.log(result);

    return result;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const askQuestion = async (req, res) => {
  try {
    const { userId, username, title, description, codeSnippet, hashtags } =
      req.body;

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
