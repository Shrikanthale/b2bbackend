import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, index: true },
    stock: { type: Number, default: 0 },
    image: String,
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
