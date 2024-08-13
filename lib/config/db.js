import mongoose from "mongoose";

export const ConnectDb = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};
