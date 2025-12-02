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
    const { userId, username, title, description, hashtags } = req.body;

    if (
      !userId ||
      !username ||
      !title ||
      !description ||
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
      hashtags: hashtasIds,
    });

    await newQuestion.save();

    return res
      .status(201)
      .json({ message: "Question posted successfully", newQuestion });
  } catch (error) {
    console.error("Ask Question Error:", error); // <--- ADD THIS
    return res.status(500).json({ message: "Internal server error", error });
  }
};
