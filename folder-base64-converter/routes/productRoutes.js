// app/routes/compressRoutes.js
const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();


router.get('/view', productController.getProductList);

module.exports = router;
