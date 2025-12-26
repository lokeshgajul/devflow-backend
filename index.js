import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnect } from "./db/Db.js";

async function startServer() {
  await dbConnect();
  await import("./config/passport.js");

  const app = express();

  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://devflow-qna-platform.netlify.app",
      ],
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(cookieParser());

  app.get("/", (req, res) => {
    res.send("Welcome to devflow backend ");
  });

  app.use("/auth", (await import("./routes/authRoute.js")).default);
  app.use("/api/question", (await import("./routes/questionRoute.js")).default);
  app.use("/api/answer", (await import("./routes/answerRoute.js")).default);
  app.use("/api/user", (await import("./routes/userRoutes.js")).default);

  app.listen(3000, () => {
    console.log("Listening at port 3000");
  });
}

startServer().catch((err) => {
  console.error("Startup failed:", err);
});
