import express from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getOrders } from '../controllers/order.controller';

const router = express.Router();

router.get('/', authenticate, getOrders);

export default router;
