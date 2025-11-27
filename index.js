import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/Db.js";
import authRoute from "./routes/authRoute.js";
import "./config/passport.js";

const app = express();
connectDb();
app.use(
  cors({
    origin: "http://localhost:5173", // front-end URL
    credentials: true, // allow cookies to be sent
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("Welcome to dev Flow backend ");
});

app.use("/auth", authRoute);
app.listen(3000, (req, res) => {
  console.log("Listening at port 3000");
});
