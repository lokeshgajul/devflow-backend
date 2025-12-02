import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hashtags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hashtag",
    },
  ],
});
const AskQuestion = mongoose.model("Question", questionSchema);
export default AskQuestion;
