"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartItemSchema = new mongoose_1.default.Schema({
    productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
});
const cartSchema = new mongoose_1.default.Schema({
    userId: { type: Number, required: true },
    items: [cartItemSchema],
}, {
    timestamps: true,
});
const Cart = mongoose_1.default.model('Cart', cartSchema);
exports.default = Cart;
//# sourceMappingURL=Cart.model.js.map