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
