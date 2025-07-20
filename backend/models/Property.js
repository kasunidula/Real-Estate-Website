import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    price: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    tenure: { type: String, required: true },
    googleMap: { type: String, required: true },
    floorPlan: { type: String, required: true },
    image: { type: String, required: true }, // This might need to store image URL
    added: { type: Date, default: Date.now }
});

export const Property = mongoose.model('Property', propertySchema);
