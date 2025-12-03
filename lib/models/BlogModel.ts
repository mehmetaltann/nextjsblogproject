import mongoose, { Document, Model, Schema } from "mongoose";

interface ICategory {
  name: string;
}

interface IBlogPost extends Document {
  title: string;
  slug: string;
  description: string;
  category: ICategory[];
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
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: [{ name: { type: String, required: true } }],
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
