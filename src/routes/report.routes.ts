import express from 'express';
import * as reportController from '../controllers/report.controller';
const router = express.Router();


router.get('/sales', reportController.getSalesReport);
router.get('/user-activity', reportController.getUserActivityReport);
router.get('/inventory', reportController.getInventoryReport);

export default router;