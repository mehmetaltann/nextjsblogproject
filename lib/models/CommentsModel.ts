import mongoose, { Document, Model, Schema } from "mongoose";

interface IComment extends Document {
  content: string;
  authorName: string;
  authorEmail: string;
  postId: string;
  parentCommentId?: string;
  date?: Date;
}

const CommentsSchema: Schema = new Schema(
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
      default: Date.now,
    },
  },
  { timestamps: true }
);

const CommentModel: Model<IComment> =
  mongoose.models.comment || mongoose.model<IComment>("comment", CommentsSchema);

export default CommentModel;
