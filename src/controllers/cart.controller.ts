import { Request, Response } from 'express';
import Cart from '../models/mongo/Cart.model';

export const addToCart = async (req: any, res: Response) => {
    const userId = req.user?.userId; // from auth middleware
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [{ productId, quantity }],
            });
        } else {
            const existingItem = cart.items.find(item => item?.productId?.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
            await cart.save();
        }

        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (err) {
        res.status(500).json({ error: 'Cart update failed', details: err });
    }
};
