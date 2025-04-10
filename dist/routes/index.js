"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const product_routes_1 = __importDefault(require("./product.routes"));
const cart_routes_1 = __importDefault(require("./cart.routes"));
const order_routes_1 = __importDefault(require("./order.routes"));
const report_routes_1 = __importDefault(require("./report.routes"));
const router = express_1.default.Router();
const apiBasePath = '/api/v1';
router.use(`${apiBasePath}/auth`, auth_routes_1.default);
router.use(`${apiBasePath}/products`, product_routes_1.default);
router.use(`${apiBasePath}/cart`, cart_routes_1.default);
router.use(`${apiBasePath}/orders`, order_routes_1.default);
router.use(`${apiBasePath}/reports`, report_routes_1.default);
router.use('*', (_req, res) => {
    res.status(404).json({ message: 'API route not found' });
});
exports.default = router;
//# sourceMappingURL=index.js.map