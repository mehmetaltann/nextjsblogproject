import mongoose from "mongoose";

const InfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isPic: {
    type: Boolean,
    default: true,
  },
});

const InfoModel = mongoose.models.info || mongoose.model("info", InfoSchema);

export default InfoModel;
