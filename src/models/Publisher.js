import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema(
  {
    id: {type: String},
    name: {type: String, required: true},
    headquartersLocation: {type: String},
  },
  {
    versionKey: false
  }
)

export const publishers = mongoose.model("publisher", publisherSchema);

export default publishers;