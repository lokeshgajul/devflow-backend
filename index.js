import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/Db.js";
import "./config/passport.js";
import authRoutes from "./routes/authRoute.js";
import questionRoutes from "./routes/questionRoute.js";
import answerRoutes from "./routes/answerRoute.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
connectDb();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("Welcome to dev Flow backend ");
});

app.use("/auth", authRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/user", userRoutes);

app.listen(3000, (req, res) => {
  console.log("Listening at port 3000");
});
