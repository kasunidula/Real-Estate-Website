import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Item', ItemSchema);
