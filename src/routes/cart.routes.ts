import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { authenticate } from '../middlewares/auth.middleware'; // Example middleware

const router = express.Router();

router.post('/', authenticate, cartController.addToCart);

export default router;
