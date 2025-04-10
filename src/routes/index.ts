import express from 'express';
// import logger from '../utils/logger'; // Uncomment if logger is set up
// import { healthCheck, welcome } from '../controllers/health.controller'; // Import handlers

// Import feature routers
import authRoutes from './auth.routes';
import productRoutes from './product.routes';
import cartRoutes from './cart.routes';
import orderRoutes from './order.routes';
import reportRoutes from './report.routes';

const router = express.Router();

/* GET home page. */
// router.get('/', welcome); // Use the welcome handler

/* GET health check endpoint. */
// router.get('/health', healthCheck); // Use the healthCheck handler

// Mount feature routers under a base path (e.g., /api/v1)
const apiBasePath = '/api/v1';

router.use(`${apiBasePath}/auth`, authRoutes);
router.use(`${apiBasePath}/products`, productRoutes);
router.use(`${apiBasePath}/cart`, cartRoutes); // User's cart
router.use(`${apiBasePath}/orders`, orderRoutes);
router.use(`${apiBasePath}/reports`, reportRoutes); // Admin reports

// Optional: Log route registration if logger is available
// logger?.info('API Routes registered');

// Fallback for unhandled routes within this router scope
router.use('*', (_req, res) => {
    res.status(404).json({ message: 'API route not found' });
});

export default router;