import mongoose from "mongoose";

export const ConnectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://altan:S3outf0Y@cluster0.glrxk.mongodb.net/BlogApp"
  );
  console.log("DB Connected");
};
