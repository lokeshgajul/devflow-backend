import mongoose from "mongoose";

const answerSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userAvatar: {
      type: String,
      required: true,
    },
    questionId: {
      type: String,
      required: true,
    },
    questionTitle: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Answer = mongoose.model("Answer", answerSchema);
export default Answer;
