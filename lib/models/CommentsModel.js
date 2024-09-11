import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema(
  {
    content: {
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
    parentCommentId: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const CommentModel =
  mongoose.models.comment || mongoose.model("comment", CommentsSchema);

export default CommentModel;
