import mongoose, { Document, Model, Schema } from "mongoose";

interface ICategory extends Document {
  name: string;
  color: string;
}

const CategoriesSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const CategoryModel: Model<ICategory> =
  mongoose.models.category || mongoose.model<ICategory>("category", CategoriesSchema);

export default CategoryModel;
