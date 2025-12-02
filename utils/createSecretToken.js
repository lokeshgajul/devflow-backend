import jwt from "jsonwebtoken";

export const createSecretToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};
