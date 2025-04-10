import express from 'express';
import * as reportController from '../controllers/report.controller';
// import { authenticate, isAdmin } from '../middleware/auth.middleware'; // Example middleware

const router = express.Router();

// All report routes likely require admin authentication
// router.use(/* authenticate, isAdmin */); // Apply middleware to all routes

router.get('/sales', reportController.getSalesReport);
router.get('/user-activity', reportController.getUserActivityReport);
router.get('/inventory', reportController.getInventoryReport);

export default router;