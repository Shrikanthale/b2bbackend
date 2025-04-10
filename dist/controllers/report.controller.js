"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventoryReport = exports.getUserActivityReport = exports.getSalesReport = void 0;
const getSalesReport = async (req, res, next) => {
    res.status(501).json({ message: 'Sales report endpoint not implemented' });
};
exports.getSalesReport = getSalesReport;
const getUserActivityReport = async (req, res, next) => {
    res.status(501).json({ message: 'User activity report endpoint not implemented' });
};
exports.getUserActivityReport = getUserActivityReport;
const getInventoryReport = async (req, res, next) => {
    res.status(501).json({ message: 'Inventory report endpoint not implemented' });
};
exports.getInventoryReport = getInventoryReport;
//# sourceMappingURL=report.controller.js.map