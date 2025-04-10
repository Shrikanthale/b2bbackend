import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Cart from '../models/mongo/Cart.model';
import Product from '../models/mongo/Product.model'; 
import Order from '../models/sql/Order';
import OrderItem from '../models/sql/OrderItem';

export const checkout = async (req: any, res: Response) => {
    const userId = req.user?.userId;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        
        const order = await Order.create({ userId });

       
        await cart.populate('items.productId');

        const orderItems = cart.items.map(item => ({
            orderId: order?.id, 
            productId: item.productId?._id?.toString() ?? '',
            name: (item.productId as any)?.name ?? 'Unknown',
            price: (item.productId as any)?.price ?? 0,
            quantity: item.quantity,
        }));

        await OrderItem.bulkCreate(orderItems);

        await Cart.deleteOne({ userId });

        res.status(201).json({ message: 'Checkout complete', orderId: order.id });
    } catch (err) {
        console.error('Checkout error:', err);
        res.status(500).json({ error: 'Checkout failed', details: err });
    }
};

export const viewCart = async (req: any, res: Response) => {
    const userId = req.user?.userId;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ message: 'Cart is empty', items: [] });
        }

        res.status(200).json({ items: cart.items });
    } catch (err) {
        console.error('View cart error:', err);
        res.status(500).json({ error: 'Failed to fetch cart', details: err });
    }
};

export const addToCart = async (req: any, res: Response) => {
    const userId = req.user?.userId;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Invalid productId' });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);

    try {
        let cart = await Cart.findOne({ userId }); 

        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [{ productId: productObjectId, quantity }],
            });
        } else {
            const existingItem = cart.items.find(item =>
                item?.productId?.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId: productObjectId, quantity });
            }

            await cart.save();
        }

        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (err) {
        console.error('Cart error:', err);
        res.status(500).json({ error: 'Cart update failed', details: err });
    }
};
