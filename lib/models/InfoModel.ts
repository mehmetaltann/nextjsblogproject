import mongoose, { Document, Schema } from "mongoose";

interface IInfo extends Document {
  name: string;
  content: string;
}

const InfoSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const InfoModel =
  mongoose.models.Info || mongoose.model<IInfo>("Info", InfoSchema);

export default InfoModel;
