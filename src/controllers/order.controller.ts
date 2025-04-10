import { Request, Response } from 'express';
import Order from '../models/sql/Order';
import OrderItem from '../models/sql/OrderItem';
import Product from '../models/mongo/Product.model';

export const getOrders = async (req: any, res: Response) => {
    const userId = req.user?.userId;

    try {
        const orders = await Order.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
            // raw: true,
        });

        const orderIds = orders.map(o => o.id);
        const items = await OrderItem.findAll({
            where: { orderId: orderIds },
            // raw: true,
        });

        // Group items by orderId
        const itemsGrouped: Record<number, OrderItem[]> = {};
        for (const item of items) {
            if (!itemsGrouped[item.orderId]) itemsGrouped[item.orderId] = [];
            itemsGrouped[item.orderId].push(item);
        }

        const productIds = [...new Set(items.map(item => item.productId))];

        const mongoProducts = await Product.find({ _id: { $in: productIds } });
        const productMap = Object.fromEntries(
            mongoProducts.map(p => [p._id.toString(), p.toObject()])
        );

        // Construct full order data
        const result = orders.map(order => ({
            id: order.id,
            createdAt: order.createdAt,
            items: (itemsGrouped[order.id] || []).map(item => ({
                ...item,
                productDetails: productMap[item.productId] || null,
            })),
        }));

        res.status(200).json(result);
    } catch (err) {
        console.error('Get orders error:', err);
        res.status(500).json({ error: 'Failed to fetch orders', details: err });
    }
};
