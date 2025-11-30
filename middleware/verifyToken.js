import jwt from "jsonwebtoken";

export const VerifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ status: false });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = verifiedToken;
    // console.log("user data", req.user);
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
};
