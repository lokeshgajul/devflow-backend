import mongoose from "mongoose";

const hashtagSchema = mongoose.Schema(
  {
    tag: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Hashtag = mongoose.model("Hashtag", hashtagSchema);
export default Hashtag;
