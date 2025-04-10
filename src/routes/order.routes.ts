import express from 'express';
import * as orderController from '../controllers/order.controller';
// import { authenticate, isAdmin } from '../middleware/auth.middleware'; // Example middleware

const router = express.Router();

// Most order operations require authentication
// router.use(/* authenticate */); // Apply middleware to all routes in this router

router.post('/', orderController.createOrder);
router.get('/', orderController.getUserOrders); // Gets orders for the logged-in user
router.get('/:orderId', orderController.getOrderById);

// Updating status might be admin-only
router.patch('/:orderId/status', /* isAdmin, */ orderController.updateOrderStatus);

export default router;