import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { authenticate } from '../middlewares/auth.middleware'; // Example middleware

const router = express.Router();

router.post('/', authenticate, cartController.addToCart);
router.get('/', authenticate, cartController.viewCart);
router.post('/checkout', authenticate, cartController.checkout);


export default router;
