import User from "../models/userModel.js";

export const getUserDetailsById = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User id is not Provided" });
    }

    const userDetails = await User.findById(userId);

    return res
      .status(200)
      .json({ message: "User Details", userDetails, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error ", error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, location, portfolio, socialLinks, skills } =
      req.body;
    const userId = req.user.id;

    const errors = {};
    if (bio && bio.length < 20 && bio.length > 300) {
      errors.bio = "Bio should be in specified length";
    }

    if (location && location.length > 50) {
      errors.location = "Location cannot exceed 50 characters";
    }

    if (skills && (!Array.isArray(skills) || skills.length > 20)) {
      errors.skills = "Skills must be an array with max 20 items";
    } else if (skills) {
      skills.forEach((skill) => {
        if (skill.length > 15) {
          errors.skillItem = "Each skill must be less than 10 characters";
        }
      });
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const profile = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      message: "Profile is updated successfully ",
      profile,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error  ", error: error.message });
  }
};
