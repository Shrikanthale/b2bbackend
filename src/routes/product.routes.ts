import express from 'express';
import * as productController from '../controllers/product.controller';
// import { authenticate, isAdmin } from '../middleware/auth.middleware'; // Example middleware

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);

// Example protected routes (assuming admin role)
router.post('/', /* authenticate, isAdmin, */ productController.createProduct);
router.put('/:productId', /* authenticate, isAdmin, */ productController.updateProduct);
router.delete('/:productId', /* authenticate, isAdmin, */ productController.deleteProduct);

export default router;