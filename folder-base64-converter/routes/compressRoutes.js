// app/routes/compressRoutes.js
const express = require('express');
const compressController = require('../controllers/compressController');

const router = express.Router();

router.get('/compress', compressController.compress);
router.get('/decompress', compressController.decompress);

router.get('/compress64', compressController.compress64);
router.get('/decompress64', compressController.decompress64);

module.exports = router;
