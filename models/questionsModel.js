import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    codeSnippet: {
      type: String,
      required: false,
    },
    hashtags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hashtag",
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: {
      type: Number,
      default: 0,
      required: false,
      // ref: "Answer",
    },
  },
  { timestamps: true }
);
const AskQuestion = mongoose.model("Question", questionSchema);
export default AskQuestion;
