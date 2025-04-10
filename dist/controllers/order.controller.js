"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = void 0;
const Order_1 = __importDefault(require("../models/sql/Order"));
const OrderItem_1 = __importDefault(require("../models/sql/OrderItem"));
const Product_model_1 = __importDefault(require("../models/mongo/Product.model"));
const getOrders = async (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const orders = await Order_1.default.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });
        const orderIds = orders.map(o => o.id);
        const items = await OrderItem_1.default.findAll({
            where: { orderId: orderIds },
        });
        const itemsGrouped = {};
        for (const item of items) {
            if (!itemsGrouped[item.orderId])
                itemsGrouped[item.orderId] = [];
            itemsGrouped[item.orderId].push(item);
        }
        const productIds = [...new Set(items.map(item => item.productId))];
        const mongoProducts = await Product_model_1.default.find({ _id: { $in: productIds } });
        const productMap = Object.fromEntries(mongoProducts.map(p => [p._id.toString(), p.toObject()]));
        const result = orders.map(order => ({
            id: order.id,
            createdAt: order.createdAt,
            items: (itemsGrouped[order.id] || []).map(item => (Object.assign(Object.assign({}, item), { productDetails: productMap[item.productId] || null }))),
        }));
        res.status(200).json(result);
    }
    catch (err) {
        console.error('Get orders error:', err);
        res.status(500).json({ error: 'Failed to fetch orders', details: err });
    }
};
exports.getOrders = getOrders;
//# sourceMappingURL=order.controller.js.map