const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/authController');

router.post('/register', register);
router.post('/login', login);

// router.get('/', getAllProducts);
// router.post('/', authMiddleware, createProduct);
module.exports = router;