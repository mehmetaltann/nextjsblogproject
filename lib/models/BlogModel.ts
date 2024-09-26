import mongoose, { Document, Model, Schema } from "mongoose";

interface IBlogPost extends Document {
  title: string;
  description: string;
  category: string[];
  author: string;
  cloudinaryImageId: string;
  date?: Date;
  isHome?: boolean;
}

const BlogPostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: [],
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    cloudinaryImageId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isHome: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const BlogModel: Model<IBlogPost> =
  mongoose.models.blog || mongoose.model<IBlogPost>("blog", BlogPostSchema);

export default BlogModel;
