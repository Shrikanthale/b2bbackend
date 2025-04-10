import express from 'express';
import * as cartController from '../controllers/cart.controller';
// import { authenticate } from '../middleware/auth.middleware'; // Example middleware

const router = express.Router();

// All cart operations require authentication
// router.use(/* authenticate */); // Apply middleware to all routes in this router

router.get('/', cartController.getCart);
router.post('/items', cartController.addItemToCart);
router.put('/items/:itemId', cartController.updateCartItem);
router.delete('/items/:itemId', cartController.removeCartItem);
router.delete('/', cartController.clearCart); // Route to clear the entire cart

export default router;