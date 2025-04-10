"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../utils/database"));
class OrderItem extends sequelize_1.Model {
}
OrderItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    productId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    name: sequelize_1.DataTypes.STRING,
    price: sequelize_1.DataTypes.FLOAT,
    quantity: sequelize_1.DataTypes.INTEGER,
}, {
    sequelize: database_1.default,
    modelName: 'orderItem',
    tableName: 'order_items',
    timestamps: true,
});
exports.default = OrderItem;
//# sourceMappingURL=OrderItem.js.map