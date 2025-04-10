"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, index: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, index: true },
    stock: { type: Number, default: 0 },
    image: String,
}, {
    timestamps: true,
});
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
//# sourceMappingURL=Product.model.js.map