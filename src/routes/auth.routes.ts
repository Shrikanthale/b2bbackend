import express from 'express';
import * as authController from '../controllers/auth.controller';
// import { authenticate } from '../middleware/auth.middleware'; // Example middleware

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', /* authenticate, */ authController.logout); // Logout might need auth
router.get('/me', /* authenticate, */ authController.getCurrentUser); // Getting user info requires auth

export default router;