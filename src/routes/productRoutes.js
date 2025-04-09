const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct } = require('../controller/productController');

router.get('/', getAllProducts);

module.exports = router;