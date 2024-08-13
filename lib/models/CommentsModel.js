import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorEmail: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CommentModel =
  mongoose.models.comment || mongoose.model("comment", CommentsSchema);

export default CommentModel;
