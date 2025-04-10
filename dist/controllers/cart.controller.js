"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = exports.viewCart = exports.checkout = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Cart_model_1 = __importDefault(require("../models/mongo/Cart.model"));
const Order_1 = __importDefault(require("../models/sql/Order"));
const OrderItem_1 = __importDefault(require("../models/sql/OrderItem"));
const checkout = async (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const cart = await Cart_model_1.default.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }
        const order = await Order_1.default.create({ userId });
        await cart.populate('items.productId');
        const orderItems = cart.items.map(item => {
            var _a, _b, _c, _d, _e, _f, _g;
            return ({
                orderId: order === null || order === void 0 ? void 0 : order.id,
                productId: (_c = (_b = (_a = item.productId) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '',
                name: (_e = (_d = item.productId) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : 'Unknown',
                price: (_g = (_f = item.productId) === null || _f === void 0 ? void 0 : _f.price) !== null && _g !== void 0 ? _g : 0,
                quantity: item.quantity,
            });
        });
        await OrderItem_1.default.bulkCreate(orderItems);
        await Cart_model_1.default.deleteOne({ userId });
        res.status(201).json({ message: 'Checkout complete', orderId: order.id });
    }
    catch (err) {
        console.error('Checkout error:', err);
        res.status(500).json({ error: 'Checkout failed', details: err });
    }
};
exports.checkout = checkout;
const viewCart = async (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const cart = await Cart_model_1.default.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ message: 'Cart is empty', items: [] });
        }
        res.status(200).json({ items: cart.items });
    }
    catch (err) {
        console.error('View cart error:', err);
        res.status(500).json({ error: 'Failed to fetch cart', details: err });
    }
};
exports.viewCart = viewCart;
const addToCart = async (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { productId, quantity } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Invalid productId' });
    }
    const productObjectId = new mongoose_1.default.Types.ObjectId(productId);
    try {
        let cart = await Cart_model_1.default.findOne({ userId });
        if (!cart) {
            cart = await Cart_model_1.default.create({
                userId,
                items: [{ productId: productObjectId, quantity }],
            });
        }
        else {
            const existingItem = cart.items.find(item => { var _a; return ((_a = item === null || item === void 0 ? void 0 : item.productId) === null || _a === void 0 ? void 0 : _a.toString()) === productId; });
            if (existingItem) {
                existingItem.quantity += quantity;
            }
            else {
                cart.items.push({ productId: productObjectId, quantity });
            }
            await cart.save();
        }
        res.status(200).json({ message: 'Product added to cart', cart });
    }
    catch (err) {
        console.error('Cart error:', err);
        res.status(500).json({ error: 'Cart update failed', details: err });
    }
};
exports.addToCart = addToCart;
//# sourceMappingURL=cart.controller.js.map