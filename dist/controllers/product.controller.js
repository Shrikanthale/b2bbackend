"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.addProduct = void 0;
const Product_model_1 = __importDefault(require("../models/mongo/Product.model"));
const addProduct = async (req, res) => {
    try {
        const product = await Product_model_1.default.create(req.body);
        res.status(201).json(product);
    }
    catch (err) {
        res.status(400).json({ error: 'Add product failed', details: err });
    }
};
exports.addProduct = addProduct;
const getProducts = async (req, res) => {
    const { search, category, page = 1, limit = 10 } = req.query;
    const query = {};
    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }
    if (category) {
        query.category = category;
    }
    try {
        const products = await Product_model_1.default.find(query)
            .skip((+page - 1) * +limit)
            .limit(+limit);
        const total = await Product_model_1.default.countDocuments(query);
        res.status(200).json({ data: products, total });
    }
    catch (err) {
        res.status(500).json({ error: 'Fetch failed', details: err });
    }
};
exports.getProducts = getProducts;
//# sourceMappingURL=product.controller.js.map