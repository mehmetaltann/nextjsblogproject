import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    isim: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default UserModel;
