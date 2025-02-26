import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  tenure: { type: String, required: true },
  added: { type: Date, required: true },
  postcode: { type: String, required: true },
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  image: { type: String, required: true },
  images: { type: [String], required: true },
  floorPlan: { type: String, required: true },
  googleMap: { type: String, required: true }
});

export const Property = mongoose.model("Property", propertySchema);
