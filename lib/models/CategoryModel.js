import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const CategoryModel =
  mongoose.models.category || mongoose.model("category", CategoriesSchema);

export default CategoryModel;
