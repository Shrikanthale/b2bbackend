import express from 'express';
import * as productController from '../controllers/product.controller';
const router = express.Router();

router.post('/', productController.addProduct);
router.get('/', productController.getProducts);

export default router;
