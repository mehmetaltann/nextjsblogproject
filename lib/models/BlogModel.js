import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Array,
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
    default: Date.now(),
  },
  isHome: {
    type: Boolean,
    default: true,
  },
});

const BlogModel =
  mongoose.models.blog || mongoose.model("blog", BlogPostSchema);

export default BlogModel;
